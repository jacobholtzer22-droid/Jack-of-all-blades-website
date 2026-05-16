import { NextResponse } from "next/server";
import { Resend } from "resend";

let resend: Resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const RATE_LIMIT_MAP = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = RATE_LIMIT_MAP.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  RATE_LIMIT_MAP.set(ip, recent);
  return false;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, phone, email, service, message, website, smsConsent } = body;

    if (website) {
      return NextResponse.json({ success: true });
    }

    const errors: Record<string, string> = {};
    if (!name?.trim()) errors.name = "Full name is required.";
    if (smsConsent !== true) {
      errors.smsConsent = "You must consent to receive SMS messages to continue.";
    }
    if (!email?.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone?.trim()) errors.phone = "Phone number is required.";

    if (phone?.trim()) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 10) errors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const clientEmail = process.env.CLIENT_EMAIL!;
    const clientPhone = process.env.CLIENT_PHONE!;
    const telnyxFromNumber = process.env.TELNYX_FROM_NUMBER!;
    const telnyxApiKey = process.env.TELNYX_API_KEY!;

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Detroit",
      dateStyle: "full",
      timeStyle: "short",
    });

    const e = escapeHtml;
    const nameSafe = e(name.trim());
    const emailTrim = email.trim();
    const emailSafe = e(emailTrim);
    const phoneSafe = e(phone.trim());
    const hasMessage = Boolean(message?.trim());
    const messageSafe = hasMessage ? e(message.trim()) : "";
    const serviceLine = service?.trim()
      ? e(service.trim())
      : "Not specified";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #333;">
          <tr>
            <td style="background:linear-gradient(135deg,#2d5a27,#3a7d34);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:0.5px;">
                Jack of All Blades
              </h1>
              <p style="margin:6px 0 0;color:#d9ebd6;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;">
                Quote Request (Contact Page)
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#142a12;border:1px solid #244a20;border-radius:12px;padding:16px 20px;text-align:center;">
                    <p style="margin:0;color:#8cc384;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Service Interested In</p>
                    <p style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">${serviceLine}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border:1px solid #2a2a2a;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#808080;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Full Name</p>
                    <p style="margin:6px 0 0;color:#ffffff;font-size:16px;font-weight:600;">${nameSafe}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#808080;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</p>
                    <p style="margin:6px 0 0;color:#ffffff;font-size:16px;font-weight:600;">
                      <a href="mailto:${encodeURIComponent(emailTrim)}" style="color:#5fa654;text-decoration:none;">${emailSafe}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#808080;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone Number</p>
                    <p style="margin:6px 0 0;color:#ffffff;font-size:16px;font-weight:600;">
                      <a href="tel:${phone.replace(/\D/g, "")}" style="color:#5fa654;text-decoration:none;">${phoneSafe}</a>
                    </p>
                  </td>
                </tr>
                ${hasMessage ? `<tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;color:#808080;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Project Details</p>
                    <p style="margin:10px 0 0;color:#e0e0e0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${messageSafe}</p>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 28px;">
              <p style="margin:0;color:#4d4d4d;font-size:12px;text-align:center;">
                Submitted on ${submittedAt} &bull; via jackofallbladeslandscaping.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const emailPromise = getResend().emails.send({
      from: "Jack of All Blades Leads <leads@alignandacquire.com>",
      to: clientEmail,
      replyTo: emailTrim,
      subject: `Quote request: ${name.trim()}`,
      html: emailHtml,
    });

    const smsBody = `Quote request from your website!\n\n${name.trim()}\nEmail: ${emailTrim}\nPhone: ${phone.trim()}${service?.trim() ? `\nService: ${service.trim()}` : ""}\n\nCheck your email for project details.`;

    const smsPromise = fetch("https://api.telnyx.com/v2/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${telnyxApiKey}`,
      },
      body: JSON.stringify({
        from: telnyxFromNumber,
        to: clientPhone,
        text: smsBody,
        messaging_profile_id: process.env.TELNYX_MESSAGING_PROFILE_ID,
      }),
    });

    const [emailResult, smsResponse] = await Promise.allSettled([
      emailPromise,
      smsPromise,
    ]);

    const emailOk = emailResult.status === "fulfilled" && !emailResult.value.error;
    const smsOk = smsResponse.status === "fulfilled" && smsResponse.value.ok;

    if (!emailOk && !smsOk) {
      console.error("Quote email result:", emailResult);
      console.error("Quote SMS result:", smsResponse);
      return NextResponse.json(
        { error: "Failed to send your request. Please call us at 616-250-8044." },
        { status: 500 }
      );
    }

    if (!emailOk) console.error("Quote email failed:", emailResult);
    if (!smsOk) console.error("Quote SMS failed:", smsResponse);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call us at 616-250-8044." },
      { status: 500 }
    );
  }
}
