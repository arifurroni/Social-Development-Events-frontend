"use client";

import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ImagePlus,
  MapPin,
  PlusCircle,
  Sparkles,
  Tag,
  Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const imagePresets = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=1200&q=85",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
  },
];

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AddEventPage() {
  const [eventType, setEventType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<{
    kind: "error" | "info";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!eventType) {
      setStatus({ kind: "error", message: "Please choose an event type." });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const eventDate = String(formData.get("eventDate") ?? "");

    if (eventDate < getLocalDateString(new Date())) {
      setStatus({
        kind: "error",
        message: "Choose today or a future date for your event.",
      });
      return;
    }

    setStatus({
      kind: "info",
      message:
        "Your details look good, but event publishing is not connected yet. Your event has not been published.",
    });

    const res = await fetch("http://localhost:8000/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: String(formData.get("title") ?? ""),
          eventType,
            eventDate,
            location: String(formData.get("location") ?? ""),
            imageUrl,
            description: String(formData.get("description") ?? ""),
            organizerEmail: String(formData.get("organizerEmail") ?? ""),
        }),
    });

    const data = await res.json();

    toast.success("Event has been created successfully.")
    console.log(data);

  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F3F8F5] px-4 py-10 sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-40 h-96 w-96 rounded-full bg-[#DFF2E6] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-96 w-96 rounded-full bg-[#E4F3E9] blur-3xl"
      />

      <section
        aria-labelledby="add-event-heading"
        className="relative mx-auto max-w-4xl rounded-[1.75rem] border border-[#E1EAE4] bg-white p-6 shadow-[0_24px_70px_-42px_rgba(23,43,36,0.28)] sm:p-9 lg:p-10"
      >
        <header className="mb-8 sm:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EAF7EF] px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#16734F]">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Social service drive
          </div>
          <h1
            id="add-event-heading"
            className="text-3xl leading-tight font-extrabold tracking-tight text-[#172B24] sm:text-4xl"
          >
            Create a community event
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#697970] sm:text-base">
            Bring people together for a local relief effort, neighborhood
            cleanup, or community support drive.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-semibold text-[#263B30]"
              htmlFor="event-title"
            >
              <Type aria-hidden="true" className="h-4 w-4 text-[#718078]" />
              Event title <span className="text-rose-600">*</span>
            </label>
            <Input
              autoComplete="off"
              className="h-11 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
              id="event-title"
              maxLength={100}
              name="title"
              placeholder="e.g. Winter Clothes Distribution — Daulatpur, Khulna"
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#263B30]">
                <Tag aria-hidden="true" className="h-4 w-4 text-[#718078]" />
                Event type <span className="text-rose-600">*</span>
              </label>
              <Select
                name="eventType"
                onValueChange={(value) => {
                  setEventType(value ?? "");
                  setStatus(null);
                }}
                value={eventType}
              >
                <SelectTrigger
                  aria-label="Event type"
                  className="h-11 w-full rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donation">Donation drive</SelectItem>
                  <SelectItem value="community-support">
                    Community support
                  </SelectItem>
                  <SelectItem value="distribution-clothing">Distribution clothing</SelectItem>
                  <SelectItem value="cleanup">Community cleanup</SelectItem>
                  <SelectItem value="tree-planting">Plantation</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                className="flex items-center gap-2 text-sm font-semibold text-[#263B30]"
                htmlFor="event-date"
              >
                <CalendarDays
                  aria-hidden="true"
                  className="h-4 w-4 text-[#718078]"
                />
                Event date <span className="text-rose-600">*</span>
              </label>
              <Input
                className="h-11 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
                id="event-date"
                name="eventDate"
                required
                type="date"
              />
              <p className="text-xs text-[#7D8B83]">
                Choose today or a future date.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-semibold text-[#263B30]"
              htmlFor="event-location"
            >
              <MapPin aria-hidden="true" className="h-4 w-4 text-[#718078]" />
              Location / venue <span className="text-rose-600">*</span>
            </label>
            <Input
              autoComplete="street-address"
              className="h-11 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
              id="event-location"
              maxLength={160}
              name="location"
              placeholder="e.g. Daulatpur, Khulna"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-semibold text-[#263B30]"
              htmlFor="event-image"
            >
              <ImagePlus
                aria-hidden="true"
                className="h-4 w-4 text-[#718078]"
              />
              Thumbnail image URL{" "}
              <span className="text-rose-600">*</span>
            </label>
            <Input
              className="h-11 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
              id="event-image"
              name="imageUrl"
              onChange={(event) => {
                setImageUrl(event.target.value);
                setStatus(null);
              }}
              placeholder="https://example.com/your-event-image.jpg"
              required
              type="url"
              value={imageUrl}
            />
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="mr-1 text-xs text-[#7D8B83]">
                Quick photo presets:
              </span>
              {imagePresets.map((preset) => (
                <button
                  className="rounded-full border border-[#DDEBE1] bg-[#F6FBF7] px-3 py-1.5 text-xs font-medium text-[#47715A] transition hover:border-[#9BCBAA] hover:bg-[#EAF7EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16835A]"
                  key={preset.label}
                  onClick={() => {
                    setImageUrl(preset.url);
                    setStatus(null);
                  }}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-[#263B30]"
              htmlFor="event-description"
            >
              Event description <span className="text-rose-600">*</span>
            </label>
            <Textarea
              className="min-h-32 resize-y rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 py-3 leading-6 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
              id="event-description"
              maxLength={2000}
              name="description"
              placeholder="Share the purpose of the event, what volunteers will do, and any items or support participants should bring."
              required
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-[#263B30]"
              htmlFor="organizer-email"
            >
              Organizer email <span className="text-rose-600">*</span>
            </label>
            <Input
              autoComplete="email"
              className="h-11 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
              id="organizer-email"
              name="organizerEmail"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div
            aria-live="polite"
            className={`min-h-5 text-sm ${
              status?.kind === "error" ? "text-rose-700" : "text-[#47715A]"
            }`}
            role="status"
          >
            {status && (
              <p className="flex items-start gap-2">
                {status.kind === "info" && (
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0"
                  />
                )}
                {status.message}
              </p>
            )}
          </div>

          <Button
            className="h-12 w-full rounded-xl bg-[#109987] text-base font-bold text-white shadow-[0_10px_24px_-14px_rgba(16,153,135,0.8)] hover:bg-[#0D806F] focus-visible:ring-[#109987]/30"
            type="submit"
          >
            <PlusCircle aria-hidden="true" className="h-5 w-5" />
            Publish event
          </Button>
          <p className="text-center text-xs leading-5 text-[#7D8B83]">
            Fields marked <span className="font-semibold text-rose-600">*</span>{" "}
            are required. You can review your event before sharing it with the
            community.
          </p>
        </form>
      </section>
    </main>
  );
}
