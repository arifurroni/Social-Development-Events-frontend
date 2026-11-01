import { Banner } from "@/components/home/Banner";
import { PlatformFeatures } from "@/components/home/PlatformFeatures";
import { VolunteerTestimonials } from "@/components/home/VolunteerTestimonials";
import { CauseAlerts } from "@/components/home/CauseAlerts";

export default function Home() {
  return (
    <main>
      <Banner />
      <PlatformFeatures />
      <VolunteerTestimonials />
      <CauseAlerts />
    </main>
  );
}
