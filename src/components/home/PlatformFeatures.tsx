import {
  CalendarCheck2,
  Compass,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: UsersRound,
    title: "Community-led projects",
    description:
      "Turn local needs into welcoming events, from neighborhood cleanups to food drives.",
  },
  {
    number: "02",
    icon: CalendarCheck2,
    title: "Easy event participation",
    description:
      "Find a cause that matters to you and join in with clear details and a simple sign-up.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Tools for organizers",
    description:
      "Create initiatives, keep volunteers informed, and manage participation in one place.",
  },
  {
    number: "04",
    icon: Compass,
    title: "Discover what’s next",
    description:
      "Explore upcoming opportunities nearby and choose a time that works for you.",
  },
];

export function PlatformFeatures() {
  return (
    <section
      aria-labelledby="platform-features-heading"
      className="relative overflow-hidden bg-[#F0FDF4] px-5 py-20 sm:px-8 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#D9F3E2] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#16835A]">
              The TogetherWe difference
            </p>
            <h2
              id="platform-features-heading"
              className="text-3xl leading-tight font-extrabold tracking-tight text-[#172B24] sm:text-4xl"
            >
              A better way to show up for your community.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-[#52645A]">
            From a good idea to a day spent making a difference, everything you
            need to bring local people together is in one place.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ number, icon: Icon, title, description }) => (
            <article
              key={number}
              className="group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-[#DCECE1] border-b-4 border-b-[#16A36A] bg-white p-6 shadow-[0_12px_34px_-26px_rgba(22,101,52,0.5)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(22,101,52,0.3)] sm:p-7"
            >
              <div className="mb-7 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F7EE] text-[#16835A] transition-colors group-hover:bg-[#D8F1E2]">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="text-xs font-bold tracking-[0.12em] text-[#8BA395]">
                  {number} / 04
                </span>
              </div>
              <h3 className="mb-3 text-lg leading-snug font-bold text-[#172B24]">
                {title}
              </h3>
              <p className="text-sm leading-6 text-[#64756B]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
