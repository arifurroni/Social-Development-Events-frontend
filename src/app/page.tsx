import { Banner } from "@/components/home/Banner";
import { RecentUpcomingEvents } from "@/components/home/RecentUpcomingEvents";
import { PlatformFeatures } from "@/components/home/PlatformFeatures";
import { EventGallery } from "@/components/home/EventGallery";
import { VolunteerTestimonials } from "@/components/home/VolunteerTestimonials";
import { CauseAlerts } from "@/components/home/CauseAlerts";

export default function Home() {
  return (
    <main>
      <Banner />
      <RecentUpcomingEvents />
      <PlatformFeatures />
      <EventGallery />
      <VolunteerTestimonials />
      <CauseAlerts />
    </main>
  );
}
