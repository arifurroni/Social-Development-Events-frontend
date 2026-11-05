import { connection } from "next/server";
import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight, CalendarDays, SearchX } from "lucide-react";

import { EventCard } from "@/components/events/EventCard";

type Event = ComponentProps<typeof EventCard>["event"];

export async function RecentUpcomingEvents() {
  await connection();

  let events: Event[] = [];
  let hasError = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recent-upcoming-events`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid events API response.");
    }

    events = data as Event[];

    // Sort by event date (nearest upcoming event first)
    events.sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    );
  } catch (error) {
    console.error(
      "Failed to load recent upcoming events for the homepage.",
      error
    );

    hasError = true;
  }

  const recentEvents = events.slice(0, 6);

  return (
    <section
      aria-labelledby="recent-events-heading"
      className="relative overflow-hidden bg-[#F4FAF6] px-5 py-16 sm:px-8 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-40 h-96 w-96 rounded-full bg-[#E4F3E9] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#16835A]">
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Upcoming initiatives
            </p>

            <h2
              className="text-3xl leading-tight font-extrabold tracking-tight text-[#172B24] sm:text-4xl"
              id="recent-events-heading"
            >
              Recent upcoming events
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#687970] sm:text-base">
              Fresh opportunities to lend a hand and bring our community closer.
            </p>
          </div>

          <Link
            className="group inline-flex w-fit items-center gap-2 rounded-lg py-2 text-sm font-bold text-[#16835A] transition hover:text-[#166534] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16835A]"
            href="/upcoming-events"
          >
            View all events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </header>

        {hasError ? (
          <div className="rounded-3xl border border-[#E1EAE4] bg-white px-6 py-10 text-center">
            <h3 className="text-lg font-bold text-[#172B24]">
              Events are temporarily unavailable.
            </h3>
            <p className="mt-2 text-sm text-[#687970]">
              Please check back soon.
            </p>
          </div>
        ) : recentEvents.length > 0 ? (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentEvents.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#C9DED0] bg-white/80 px-6 py-12 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7EF] text-[#16835A]">
              <SearchX className="h-6 w-6" />
            </span>

            <h3 className="font-bold text-[#172B24]">
              New events are on the way
            </h3>

            <p className="mt-2 text-sm text-[#687970]">
              Check back soon to find your next way to help.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}