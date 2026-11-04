import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  formatEventDate,
  getEventCategory,
  getEventImage,
  
} from "@/lib/events";

import { getTokenFromServer } from "@/lib/getTokenFromServer";

const categoryColors: Record<string, string> = {
  donation: "bg-rose-50 text-rose-700 ring-rose-200",
  food: "bg-amber-50 text-amber-800 ring-amber-200",
  education: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  health: "bg-sky-50 text-sky-700 ring-sky-200",
  "tree-planting": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "blood-donation": "bg-rose-50 text-rose-700 ring-rose-200",
};

function getOrganizerInitials(email?: string | null) {
  if (!email) return "U";

  return email.slice(0, 1).toUpperCase();
}

// export default async function EventDetailsPage({ params, }: { params: Promise<{ id: string }>; }) {
const EventDetailsPage = async ({ params, }: {params: Promise<{ id: string }>;}) => {
  const { id } = await params;

  
  const token = await getTokenFromServer();

  const res = await fetch(`http://localhost:8000/event/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  if (!res.ok) notFound();
  
  const event = await res.json();
  

  const category = getEventCategory(event.eventType);
  const categoryColor =
    categoryColors[event.eventType] ??
    "bg-[#EAF7EF] text-[#16734F] ring-[#CBE5D3]";
  const organizerName = event.organizerEmail.split("@")[0] || "Event Organizer";
  const joinSubject = encodeURIComponent(`I'd like to join ${event.title}`);

  return (
    <main className="relative flex-1 overflow-hidden bg-[#F4FAF6] px-4 py-8 sm:px-6 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-28 h-112 w-md rounded-full bg-[#E3F3E9] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <Link
          className="mb-5 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-[#64756B] transition hover:text-[#16835A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16835A]"
          href="/upcoming-events"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to upcoming events
        </Link>

        <article className="overflow-hidden rounded-[1.75rem] border border-[#E1EAE4] bg-white shadow-[0_24px_70px_-40px_rgba(23,43,36,0.3)]">
          <header className="relative isolate flex min-h-88 items-end overflow-hidden bg-[#1D3429] sm:min-h-112">
            <Image
              alt={event.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              src={getEventImage(event)}
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-[#101F18]/90 via-[#101F18]/25 to-[#101F18]/10"
            />
            <div className="relative w-full p-6 sm:p-9 lg:p-10">
              <span
                className={`mb-4 inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold ring-1 ring-inset ${categoryColor}`}
              >
                {category}
              </span>
              <h1 className="max-w-4xl text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/90">
                <p className="flex items-center gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#76D5B0]"
                  />
                  {event.location}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#76D5B0]"
                  />
                  {formatEventDate(event.eventDate)}
                </p>
              </div>
            </div>
          </header>

          <div className="p-5 sm:p-8 lg:p-9">
            <section
              aria-label="Join this event"
              className="mb-8 flex flex-col gap-5 rounded-2xl border border-[#E0EBE3] bg-[#F7FBF8] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E4F4EA] text-[#16835A]">
                  <UsersRound aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-bold text-[#172B24]">
                    Ready to lend a hand?
                  </h2>
                  <p className="mt-1 text-sm text-[#718078]">
                    Contact the organizer to ask about volunteering.
                  </p>
                </div>
              </div>
              <Button
                className="h-11 shrink-0 rounded-xl bg-[#109987] px-5 font-bold text-white shadow-sm hover:bg-[#0D806F] focus-visible:ring-[#109987]/30"
                nativeButton={false}
                render={
                  <a
                    href={`mailto:${event.organizerEmail}?subject=${joinSubject}`}
                  />
                }
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                Join event
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </section>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10">
              <div>
                <section aria-labelledby="event-about-heading">
                  <h2
                    className="text-xl font-bold text-[#172B24]"
                    id="event-about-heading"
                  >
                    About this community initiative
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#64756B] sm:text-base">
                    {event.description}
                  </p>
                </section>

                <section
                  aria-labelledby="volunteer-guidelines-heading"
                  className="mt-7 border-t border-[#E8EEEA] pt-6"
                >
                  <div className="flex items-center gap-2">
                    <ClipboardCheck
                      aria-hidden="true"
                      className="h-5 w-5 text-[#16835A]"
                    />
                    <h2
                      className="text-sm font-bold uppercase tracking-wide text-[#52645A]"
                      id="volunteer-guidelines-heading"
                    >
                      Before you volunteer
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[#718078]">
                    <li className="flex gap-3">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-[#16A36A]"
                      />
                      Contact the organizer to confirm timing and how you can
                      help.
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-[#16A36A]"
                      />
                      Follow the event instructions and arrive at the agreed
                      time.
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-[#16A36A]"
                      />
                      Bring supplies only if the organizer has requested them.
                    </li>
                  </ul>
                </section>
              </div>

              <aside className="h-fit rounded-2xl border border-[#E3EAE5] bg-white p-5 shadow-[0_12px_30px_-26px_rgba(23,43,36,0.35)]">
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#829087]">
                  Event organizer
                </h2>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F4EA] text-lg font-bold text-[#16835A]"
                  >
                    {getOrganizerInitials(event.organizerEmail)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#263B30]">
                      {organizerName}
                    </p>
                    <a
                      className="mt-1 block truncate text-xs text-[#718078] underline-offset-2 hover:text-[#16835A] hover:underline"
                      href={`mailto:${event.organizerEmail}`}
                    >
                      {event.organizerEmail}
                    </a>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-[#E8EEEA] pt-4 text-xs font-medium text-[#718078]">
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-4 w-4 text-[#16A36A]"
                  />
                  Community event organizer
                </div>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

export default EventDetailsPage;