"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Tag,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CommunityEvent } from "@/lib/events";

const categoryLabels: Record<string, string> = {
  donation: "Donation",
  food: "Food support",
  education: "Education",
  health: "Health",
  "tree-planting": "Tree planting",
  "community-support": "Community support",
  cleanup: "Cleanup",
  "blood-donation": "Blood donation",
  other: "Community event",
};

const fallbackImages: Record<string, string> = {
  donation: "/images/blood_donation.png",
  food: "/images/food_distribute.png",
  education: "/images/education.png",
  health: "/images/Health.png",
  "tree-planting": "/images/plantation.png",
  "blood-donation": "/images/blood_donation.png",
};

const categoryColors: Record<string, string> = {
  donation: "bg-rose-50 text-rose-700 ring-rose-200",
  food: "bg-amber-50 text-amber-800 ring-amber-200",
  education: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  health: "bg-sky-50 text-sky-700 ring-sky-200",
  "tree-planting": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "blood-donation": "bg-rose-50 text-rose-700 ring-rose-200",
};

function formatEventDate(value: string) {
  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getCategoryLabel(eventType: string) {
  return (
    categoryLabels[eventType] ??
    eventType
      .split(/[-_]/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function getEventImage(event: CommunityEvent) {
  if (/^https?:\/\//i.test(event.imageUrl)) {
    return event.imageUrl;
  }

  return fallbackImages[event.eventType] ?? "/images/plantation.png";
}

export function EventCard({ event }: { event: CommunityEvent }) {
  const eventDate = formatEventDate(event.eventDate);
  const category = getCategoryLabel(event.eventType);
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

        <Dialog>
          <DialogTrigger
            render={
              <Button className="mt-5 h-11 w-full rounded-xl bg-[#109987] text-sm font-bold text-white shadow-[0_8px_20px_-14px_rgba(16,153,135,0.8)] hover:bg-[#0D806F] focus-visible:ring-[#109987]/30" />
            }
          >
            View event
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#E1EAE4] p-0 sm:max-w-xl">
            <div className="relative aspect-[1.8] overflow-hidden bg-[#E8F2EB]">
              <Image
                alt={event.title}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 576px"
                src={getEventImage(event)}
                unoptimized
              />
            </div>
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <DialogHeader className="gap-3">
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${categoryColor}`}
                >
                  {category}
                </span>
                <DialogTitle className="pr-8 text-2xl leading-tight font-bold text-[#172B24]">
                  {event.title}
                </DialogTitle>
                <DialogDescription className="text-sm leading-6 text-[#687970]">
                  {event.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 grid gap-3 rounded-xl bg-[#F4FAF6] p-4 text-sm text-[#46594E] sm:grid-cols-2">
                <p className="flex items-start gap-2">
                  <CalendarDays
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#16835A]"
                  />
                  <span>{eventDate}</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#16835A]"
                  />
                  <span>{event.location}</span>
                </p>
                <p className="flex items-start gap-2 sm:col-span-2">
                  <Clock3
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#16835A]"
                  />
                  <span>
                    Contact the organizer for event timing and participation
                    details.
                  </span>
                </p>
              </div>

              <DialogFooter className="mt-5 rounded-xl border-0 bg-transparent p-0 sm:justify-between">
                <a
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#16835A] px-4 text-sm font-semibold text-white transition hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16835A]"
                  href={`mailto:${event.organizerEmail}?subject=${encodeURIComponent(`Question about ${event.title}`)}`}
                >
                  Contact organizer
                </a>
                <span className="self-center text-xs text-[#77847D]">
                  {event.organizerEmail}
                </span>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
