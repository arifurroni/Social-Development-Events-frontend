import Image, { type StaticImageData } from "next/image";

import cleanupImage from "../../../public/images/banner_cleanup.jpg";
import eventImage from "../../../public/images/banner_event.jpg";
import heroImage from "../../../public/images/banner_hero.jpg";
import plantingImage from "../../../public/images/banner_planting.jpg";

const eventPhotos: {
  src: StaticImageData;
  alt: string;
  title: string;
  category: string;
  layout: string;
}[] = [
  {
    src: heroImage,
    alt: "Volunteers planting young trees together in a green community space",
    title: "Growing a greener tomorrow",
    category: "Tree planting",
    layout: "md:col-span-1 md:row-span-2 md:min-h-[34rem]",
  },
  {
    src: eventImage,
    alt: "Community volunteers sharing information at an outdoor event booth",
    title: "Neighbors coming together",
    category: "Community outreach",
    layout: "md:min-h-64",
  },
  {
    src: cleanupImage,
    alt: "Bags collected during a volunteer cleanup at a local park",
    title: "A cleaner place for everyone",
    category: "Park cleanup",
    layout: "md:min-h-64",
  },
  {
    src: plantingImage,
    alt: "A volunteer planting a tree as part of a neighborhood greening project",
    title: "Small acts, lasting roots",
    category: "Greening projects",
    layout: "md:col-span-2 md:min-h-72",
  },
];

export function EventGallery() {
  return (
    <section
      aria-labelledby="event-gallery-heading"
      className="bg-[#F0FDF4] px-5 py-20 sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-4 sm:mb-11 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#16835A]">
              Moments that bring us together
            </p>
            <h2
              id="event-gallery-heading"
              className="text-3xl leading-tight font-extrabold tracking-tight text-[#172B24] sm:text-4xl"
            >
              Community in action
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-[#64756B]">
            A look at the hands, heart, and shared effort behind stronger
            neighborhoods.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-[repeat(2,minmax(16rem,1fr))] lg:grid-cols-3">
          {eventPhotos.map(({ src, alt, title, category, layout }) => (
            <figure
              className={`group relative isolate min-h-72 overflow-hidden rounded-3xl bg-[#DCECE1] shadow-[0_16px_40px_-28px_rgba(23,43,36,0.5)] ${layout}`}
              key={title}
            >
              <Image
                alt={alt}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={src}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-[#10291F]/80 via-[#10291F]/10 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-5 sm:p-6">
                <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {category}
                </span>
                <span className="text-lg font-bold text-white sm:text-xl">
                  {title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
