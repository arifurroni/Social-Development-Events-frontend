
export type CommunityEvent = {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  description: string;
  organizerEmail: string;
};

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

function isCommunityEvent(value: unknown): value is CommunityEvent {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const event = value as Record<string, unknown>;

  return (
    typeof event._id === "string" &&
    typeof event.title === "string" &&
    typeof event.eventType === "string" &&
    typeof event.eventDate === "string" &&
    typeof event.location === "string" &&
    typeof event.imageUrl === "string" &&
    typeof event.description === "string" &&
    typeof event.organizerEmail === "string"
  );
}

export async function getUpcomingEvents(): Promise<CommunityEvent[]> {
  const response = await fetch("http://localhost:8000/upcoming-events", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Could not load upcoming events: server returned ${response.status}.`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isCommunityEvent)) {
    throw new Error("The upcoming events response has an invalid format.");
  }

  return data.sort((first, second) =>
    first.eventDate.localeCompare(second.eventDate),
  );
}


export function getEventCategory(eventType: string) {
  return (
    categoryLabels[eventType] ??
    eventType
      .split(/[-_]/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function getEventImage(event: CommunityEvent) {
  if (/^https?:\/\//i.test(event.imageUrl)) {
    return event.imageUrl;
  }

  return fallbackImages[event.eventType] ?? "/images/plantation.png";
}

export function formatEventDate(value: string) {
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
