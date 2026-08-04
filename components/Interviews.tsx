import YouTubeFacade from "./YouTubeFacade";

type Interview = {
  id: string;
  title: string;
  orientation: "landscape" | "vertical";
};

const interviews: Interview[] = [
  { id: "QyploD_pKoo", title: "Interview 1 (Hardscaping)", orientation: "vertical" },
  { id: "NpQtk0D6Q74", title: "Interview 2", orientation: "vertical" },
];

export default function Interviews() {
  return (
    <section
      id="interviews"
      className="relative py-20 sm:py-28 overflow-hidden border-t border-forest-900/30"
    >
      <div className="absolute inset-0 bg-earthy-900" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
            In Their Words
          </span>
          <h2 className="section-heading-accent font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight pt-2">
            Interviews
          </h2>
        </div>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 items-start justify-items-center">
          {interviews.map((v) => (
            <div
              key={v.id}
              className={
                v.orientation === "vertical"
                  ? "w-full max-w-[320px]"
                  : "w-full max-w-[600px] md:mt-8"
              }
            >
              <YouTubeFacade
                id={v.id}
                title={v.title}
                orientation={v.orientation}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
