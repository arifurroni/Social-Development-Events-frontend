"use client"

import {
  Dialog,
  DialogContent,
//   DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ImagePlus,
  MapPin,
//   PlusCircle,
//   Sparkles,
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
// import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { Event } from "@/components/types/event";


interface EditEventDialogProps {
  editEvent: Event;
}


// const imagePresets = [
//   {
//     label: "Winter Clothes",
//     url: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=85",
//   },
//   {
//     label: "Blanket Relief",
//     url: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=1200&q=85",
//   },
//   {
//     label: "Cleanup",
//     url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=85",
//   },
//   {
//     label: "Tree Plantation",
//     url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
//   },
// ];

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}



const EditEventDialog = ({editEvent}: EditEventDialogProps) => {
    console.log(editEvent);

    const [eventType, setEventType] = useState(editEvent.eventType);
      const [imageUrl, setImageUrl] = useState(editEvent.imageUrl);
      const [status, setStatus] = useState<{
        kind: "error" | "info";
        message: string;
      } | null>(null);
    
      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Capture the form before any async operation
        const form = event.currentTarget;
        const formData = new FormData(form);
    
        if (!eventType) {
          setStatus({
            kind: "error",
            message: "Please choose an event type.",
          });
          return;
        }
    
        const eventDate = String(formData.get("eventDate") ?? "");
    
        if (eventDate < getLocalDateString(new Date())) {
          setStatus({
            kind: "error",
            message: "Choose today or a future date for your event.",
          });
          return;
        }
    
        try {
          // const { data, error } = await authClient.token();
    
          // if (error || !data?.token) {
          //   toast.error("Please log in first.");
          //   return;
          // }
          const token = await getTokenFromClient();
    
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${editEvent._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${data.token}`,
              authorization: `Bearer ${token}`,
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
    
          const result = await res.json();
    
          if (!res.ok) {
            throw new Error(result.message || "Failed to create event.");
          }
    
          toast.success("Event has been edited successfully.");
    
          setStatus({
            kind: "info",
            message: "Your event has been published successfully!",
          });
    
          form.reset();
          setEventType("");
          setImageUrl("");
    
          console.log(result);
        } catch (error) {
          console.error("Event creation error:", error);
    
          toast.error(
            error instanceof Error ? error.message : "Something went wrong."
          );
        }
      };


    return (
        <Dialog>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className="flex justify-center items-center gap-1 border-2 border-[#16A36A] py-1 px-2 rounded-xl text-[#16A36A] hover:bg-[#DEEAE1] mb-3 text-sm"
                    />
                }
            >
                <Pencil className="h-3" />
                Edit Event
            </DialogTrigger>

            <DialogContent className={'max-w-md md:max-w-md'}>

                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    {/* <DialogDescription>
                        Update your community event information below.
                    </DialogDescription> */}
                </DialogHeader>

                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                                <label
                                    className="flex items-center gap-2 text-sm font-semibold text-[#263B30]"
                                    htmlFor="event-title"
                                >
                                    <Type aria-hidden="true" className="h-4 w-4 text-[#718078]" />
                                    Event title <span className="text-rose-600">*</span>
                                </label>
                                <Input
                                    autoComplete="off"
                                    className="h-7 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
                                    id="event-title"
                                    maxLength={100}
                                    name="title"
                                    defaultValue={editEvent.title}
                                    required
                                />
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2">
                                <div className="space-y-1">
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
                                            className="h-7 w-full rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
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

                                <div className="space-y-1">
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
                                        className="h-7 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
                                        id="event-date"
                                        name="eventDate"
                                        defaultValue={editEvent.eventDate?.slice(0, 10)}
                                        required
                                        type="date"
                                    />
                                    <p className="text-xs text-[#7D8B83]">
                                        Choose today or a future date.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label
                                    className="flex items-center gap-2 text-sm font-semibold text-[#263B30]"
                                    htmlFor="event-location"
                                >
                                    <MapPin aria-hidden="true" className="h-4 w-4 text-[#718078]" />
                                    Location / venue <span className="text-rose-600">*</span>
                                </label>
                                <Input
                                    autoComplete="street-address"
                                    className="h-7 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
                                    id="event-location"
                                    maxLength={160}
                                    name="location"
                                    defaultValue={editEvent.location}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
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
                                    className="h-7 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
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
                                {/* <div className="flex flex-wrap items-center gap-2 pt-1">
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
                                </div> */}
                            </div>

                            <div className="space-y-1">
                                <label
                                    className="text-sm font-semibold text-[#263B30]"
                                    htmlFor="event-description"
                                >
                                    Event description <span className="text-rose-600">*</span>
                                </label>
                                <Textarea
                                    className="min-h-10 max-h-15 overflow-y-auto resize-none rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 py-2 leading-6 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
                                    id="event-description"
                                    maxLength={2000}
                                    name="description"
                                    defaultValue={editEvent.description}
                                    required
                                    rows={5}
                                />
                            </div>

                            <div className="space-y-1">
                                <label
                                    className="text-sm font-semibold text-[#263B30]"
                                    htmlFor="organizer-email"
                                >
                                    Organizer email <span className="text-rose-600">*</span>
                                </label>
                                <Input
                                    autoComplete="email"
                                    className="h-7 rounded-xl border-[#DCE5DF] bg-[#FAFCFA] px-3.5 placeholder:text-[#97A39C] focus-visible:border-[#16A36A] focus-visible:ring-[#16A36A]/20"
                                    id="organizer-email"
                                    name="organizerEmail"
                                    defaultValue={editEvent.organizerEmail}
                                    required
                                    type="email"
                                />
                            </div>

                            <div
                                aria-live="polite"
                                className={`min-h-5 text-sm ${status?.kind === "error" ? "text-rose-700" : "text-[#47715A]"
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
                                className="h-7 w-full rounded-xl bg-[#109987] text-base font-bold text-white shadow-[0_10px_24px_-14px_rgba(16,153,135,0.8)] hover:bg-[#0D806F] focus-visible:ring-[#109987]/30"
                                type="submit"
                            >
                                {/* <PlusCircle aria-hidden="true" className="h-5 w-5" /> */}
                                <Pencil aria-hidden="true" className="h-5 w-5" />
                                Edit Event
                            </Button>
                            {/* <p className="text-center text-xs leading-5 text-[#7D8B83]">
                                Fields marked <span className="font-semibold text-rose-600">*</span>{" "}
                                are required. You can review your event before sharing it with the
                                community.
                            </p> */}
                </form>

                {/* <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            
                        </form>
                    </DialogDescription>
                </DialogHeader> */}
            </DialogContent>
        </Dialog>
    );
};

export default EditEventDialog;

