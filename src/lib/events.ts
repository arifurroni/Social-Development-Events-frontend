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
