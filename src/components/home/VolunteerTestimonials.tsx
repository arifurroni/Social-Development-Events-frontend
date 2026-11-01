import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I found a weekend cleanup just a few blocks from home. It was an easy way to meet my neighbors and make our street feel cared for.",
    name: "Nadia Rahman",
    role: "Neighborhood volunteer",
    initials: "NR",
    color: "bg-[#E3F3E9] text-[#16734F]",
  },
  {
    quote:
      "Organizing our winter clothing drive felt manageable from the start. Everyone knew where to go and how they could help.",
    name: "Imran Hossain",
    role: "Community organizer",
    initials: "IH",
    color: "bg-[#E9EAFE] text-[#5149A7]",
  },
  {
    quote:
      "I wanted to give back but did not know where to begin. TogetherWe helped me find a food distribution and show up with confidence.",
    name: "Farzana Akter",
    role: "First-time volunteer",
    initials: "FA",
    color: "bg-[#FFF0DD] text-[#A9631D]",
  },
  {
    quote:
      "The best part is seeing familiar faces at every event. Small acts of kindness really do add up when a community works together.",
    name: "Tanvir Ahmed",
    role: "Returning volunteer",
    initials: "TA",
    color: "bg-[#FCE8EC] text-[#A34E64]",
  },
];

export function VolunteerTestimonials() {
  return (
    <section
      aria-labelledby="volunteer-testimonials-heading"
      className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#F0FDF4] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-11 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#16835A]">
            Voices from the community
          </p>
          <h2
            id="volunteer-testimonials-heading"
            className="text-3xl leading-tight font-extrabold tracking-tight text-[#172B24] sm:text-4xl"
          >
            What Volunteers Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#64756B]">
            Every community is made stronger by the people who show up for it.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.map(
            ({ quote, name, role, initials, color }, index) => (
              <figure
                key={name}
                className="flex min-h-72 flex-col rounded-3xl border border-[#E3EDE7] bg-[#FCFEFC] p-6 shadow-[0_12px_34px_-28px_rgba(22,101,52,0.42)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-26px_rgba(22,101,52,0.25)] sm:p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Quote
                    aria-hidden="true"
                    className="h-7 w-7 fill-[#DDF2E5] text-[#16835A]"
                  />
                  <span className="text-xs font-semibold tracking-[0.12em] text-[#9AABA0]">
                    0{index + 1}
                  </span>
                </div>
                <blockquote className="flex-1 text-[0.95rem] leading-7 text-[#46594E]">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-[#E8F0EA] pt-5">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${color}`}
                  >
                    {initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[#172B24]">
                      {name}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#718078]">
                      {role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
