import { Banner } from "@/components/home/Banner";
import { PlatformFeatures } from "@/components/home/PlatformFeatures";
import { EventGallery } from "@/components/home/EventGallery";
import { VolunteerTestimonials } from "@/components/home/VolunteerTestimonials";
import { CauseAlerts } from "@/components/home/CauseAlerts";

export default function Home() {
  return (
    <main>
      <Banner />
      <PlatformFeatures />
      <EventGallery />
      <VolunteerTestimonials />
      <CauseAlerts />
    </main>
  );
}
