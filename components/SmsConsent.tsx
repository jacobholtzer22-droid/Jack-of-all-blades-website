"use client";

const SMS_CONSENT_TEXT =
  "By checking this box and providing your phone number, you consent to receive SMS messages from Align and Acquire. Message frequency may vary. Standard message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.";

type SmsConsentProps = {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  className?: string;
};

export default function SmsConsent({
  id = "sms-consent",
  checked,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
}: SmsConsentProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <label
        htmlFor={id}
        className="flex items-start gap-3 cursor-pointer group"
      >
        <input
          type="checkbox"
          id={id}
          name="smsConsent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          className="mt-1 w-4 h-4 rounded border-dark-600/50 bg-dark-900/60 text-forest-600 focus:ring-forest-600/50 focus:ring-offset-0 cursor-pointer"
          aria-describedby={`${id}-description`}
        />
        <span
          id={`${id}-description`}
          className="text-dark-300 text-sm leading-relaxed group-hover:text-dark-200 transition-colors"
        >
          {SMS_CONSENT_TEXT}
        </span>
      </label>
      {error && touched && (
        <p className="text-red-400 text-xs mt-1.5 ml-7">{error}</p>
      )}
    </div>
  );
}
