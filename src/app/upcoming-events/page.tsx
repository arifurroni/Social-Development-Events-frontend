import Link from "next/link";
import { connection } from "next/server";
import { CalendarDays, Plus, SearchX } from "lucide-react";

import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/events";
import { toast } from "sonner";

export default async function UpcomingEventsPage() {
  await connection();

  let events;

  try {
    events = await getUpcomingEvents();
  } catch (error) {
    toast.error(`"Failed to load upcoming events." ${error}`);

    return (
      <main className="flex flex-1 items-center bg-[#F4FAF6] px-5 py-20 sm:px-8">
        <section
          aria-labelledby="events-error-heading"
          className="mx-auto max-w-xl rounded-3xl border border-[#E1EAE4] bg-white p-8 text-center shadow-[0_20px_60px_-40px_rgba(23,43,36,0.3)] sm:p-12"
        >
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <CalendarDays aria-hidden="true" className="h-7 w-7" />
          </span>
          <h1
            className="text-2xl font-bold text-[#172B24]"
            id="events-error-heading"
          >
            Events aren&apos;t available right now
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#687970]">
            We couldn&apos;t load upcoming events. Please try again in a moment.
          </p>
          <Button
            className="mt-6 rounded-xl bg-[#16835A] px-5 text-white hover:bg-[#166534]"
            nativeButton={false}
            render={<Link href="/upcoming-events" />}
          >
            Try again
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-[#F4FAF6] px-5 py-14 sm:px-8 sm:py-18">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-112 w-md rounded-full bg-[#E1F2E7] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <header className="mb-9 flex flex-col gap-5 sm:mb-11 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#16835A] ring-1 ring-[#DCECE1]">
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Make time for good
            </span>
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-[#172B24] sm:text-4xl lg:text-5xl">
              Upcoming community events
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#687970] sm:text-base">
              Find a local initiative, meet your neighbors, and make a
              difference together.
            </p>
          </div>
          <Button
            className="w-fit rounded-xl bg-[#16835A] px-5 text-white shadow-sm hover:bg-[#166534]"
            nativeButton={false}
            render={<Link href="/add-event" />}
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
            Create an event
          </Button>
        </header>

        {events.length > 0 ? (
          <>
            <p className="mb-5 text-sm font-medium text-[#687970]">
              {events.length}{" "}
              {events.length === 1 ? "event" : "events"} to get involved in
            </p>
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard event={event} key={event._id} />
              ))}
            </div>
          </>
        ) : (
          <section className="rounded-3xl border border-dashed border-[#C9DED0] bg-white/80 px-6 py-14 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7EF] text-[#16835A]">
              <SearchX aria-hidden="true" className="h-7 w-7" />
            </span>
            <h2 className="text-xl font-bold text-[#172B24]">
              No upcoming events just yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#687970]">
              Check back soon, or start something meaningful in your
              neighborhood.
            </p>
            <Button
              className="mt-5 rounded-xl bg-[#16835A] px-5 text-white hover:bg-[#166534]"
              nativeButton={false}
              render={<Link href="/add-event" />}
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              Create an event
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
