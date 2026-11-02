"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Tag,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  formatEventDate,
  getEventCategory,
  getEventImage,
  type CommunityEvent,
} from "@/lib/events";

const categoryColors: Record<string, string> = {
  donation: "bg-rose-50 text-rose-700 ring-rose-200",
  food: "bg-amber-50 text-amber-800 ring-amber-200",
  education: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  health: "bg-sky-50 text-sky-700 ring-sky-200",
  "tree-planting": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "blood-donation": "bg-rose-50 text-rose-700 ring-rose-200",
};

export function EventCard({ event }: { event: CommunityEvent }) {
  const eventDate = formatEventDate(event.eventDate);
  const category = getEventCategory(event.eventType);
  const categoryColor =
    categoryColors[event.eventType] ?? "bg-[#EAF7EF] text-[#16734F] ring-[#CBE5D3]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#E3EAE5] bg-white shadow-[0_12px_34px_-24px_rgba(23,43,36,0.28)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_-25px_rgba(23,43,36,0.3)]">
      <div className="relative aspect-[1.55] overflow-hidden bg-[#E8F2EB]">
        <Image
          alt={event.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={getEventImage(event)}
          unoptimized
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10"
        />
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ring-1 ring-inset ${categoryColor}`}
        >
          <Tag aria-hidden="true" className="h-3.5 w-3.5" />
          {category}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-[#172B24]/85 px-3 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
          <CalendarDays
            aria-hidden="true"
            className="h-4 w-4 text-[#72D2B0]"
          />
          {eventDate}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-xl leading-snug font-bold text-[#172B24]">
          {event.title}
        </h2>
        <p className="mt-3 flex items-start gap-2 text-sm font-medium text-[#687970]">
          <MapPin
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-[#16A36A]"
          />
          <span>{event.location}</span>
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#77847D]">
          {event.description}
        </p>

        <div className="mt-5 flex items-center gap-2 border-t border-[#E8EEEA] pt-4 text-sm text-[#687970]">
          <UserRound
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-[#16A36A]"
          />
          <span className="truncate">
            Organizer:{" "}
            <a
              className="font-medium text-[#47715A] underline-offset-2 hover:underline"
              href={`mailto:${event.organizerEmail}`}
              onClick={(clickEvent) => clickEvent.stopPropagation()}
            >
              {event.organizerEmail}
            </a>
          </span>
        </div>

        <Button
          className="mt-5 h-11 w-full rounded-xl bg-[#109987] text-sm font-bold text-white shadow-[0_8px_20px_-14px_rgba(16,153,135,0.8)] hover:bg-[#0D806F] focus-visible:ring-[#109987]/30"
          nativeButton={false}
          render={
            <Link href={`/upcoming-events/${encodeURIComponent(event._id)}`} />
          }
        >
          View event
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
