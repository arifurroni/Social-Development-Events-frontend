import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Caveat } from "next/font/google";
import { ArrowRight, Heart, Sprout, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import heroImg from "../../../public/images/banner_hero.jpg";
import plantingImg from "../../../public/images/banner_planting.jpg";
import eventImg from "../../../public/images/banner_event.jpg";
import cleanupImg from "../../../public/images/banner_cleanup.jpg";
import logo from "../../../public/images/logo_navbar.png";


/*
 * Photo sources (Wikimedia Commons, free licenses):
 * - banner_hero.jpg     https://commons.wikimedia.org/wiki/File:DUSAFO_planting_trees.jpg
 * - banner_planting.jpg https://commons.wikimedia.org/wiki/File:Volunteer_Tree_Planting_120802-F-OS776-021.jpg
 * - banner_event.jpg    https://commons.wikimedia.org/wiki/File:Volunteers_at_Convention_Days_(65fa6a5e-8cfb-4497-83fa-8b92a23a0fb3).JPG
 * - banner_cleanup.jpg  https://commons.wikimedia.org/wiki/File:Smithville_Lake_Cleanup_Day_(8020882186).jpg
 * Replace them with your own event photos anytime.
 */

const scriptFont = Caveat({ subsets: ["latin"], weight: ["700"], display: "swap" });


const stats = [
  {
    value: "1,300+",
    label: "Active Volunteers",
    valueClass: "text-[#16A36A]",
  },
  {
    value: "120+",
    label: "Events Completed",
    valueClass: "text-[#16A36A]",
  },
  {
    value: "20,000+",
    label: "Lives Impacted",
    valueClass: "text-[#4F46E5]",
  },
  {
    value: "100%",
    label: "Community Driven",
    valueClass: "text-[#F59E0B]",
  },
];



const values = [
  { icon: Users, label: "Community" },
  { icon: Heart, label: "Kindness" },
  { icon: Sprout, label: "Change" },
] as const;

const gallery = [
  {
    src: plantingImg,
    alt: "Volunteer planting a young tree during a plantation drive",
    frame: "w-28 sm:w-36 lg:w-44",
    rotate: "-rotate-6",
  },
  {
    src: eventImg,
    alt: "Volunteers running a community event booth at a local fair",
    frame: "w-32 sm:w-40 lg:w-48",
    rotate: "rotate-3 -translate-y-3",
  },
  {
    src: cleanupImg,
    alt: "Collected trash bags from a neighborhood cleanup drive",
    frame: "w-28 sm:w-36 lg:w-44",
    rotate: "-rotate-3",
  },
] as const;


export function Banner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#F3FBF6] via-[#E9F7EF] to-[#DDF1E6]">
      {/* Soft Circle Behind The Photo */}
      <div className="pointer-events-none absolute -top-24 right-[-12%] h-140 w-140 rounded-full bg-linear-to-b from-[#D5EFDF] to-[#EDF8F1] blur-[2px]" />

      {/* Bottom Waves + City Skyline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="h-44 w-full lg:h-60"
        >
          <defs>
            <linearGradient id="banner-wave-back" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="55%" stopColor="#22C07A" />
              <stop offset="100%" stopColor="#14A46C" />
            </linearGradient>
            <linearGradient id="banner-wave-front" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#16A36A" />
              <stop offset="70%" stopColor="#12855A" />
              <stop offset="100%" stopColor="#0E6E4A" />
            </linearGradient>
          </defs>

          {/* City Skyline */}
          <g fill="#2FA46B" opacity="0.5">
            <rect x="70" y="118" width="34" height="70" />
            <rect x="112" y="92" width="26" height="96" />
            <rect x="146" y="128" width="40" height="60" />
            <rect x="196" y="70" width="30" height="118" />
            <rect x="210" y="52" width="2" height="20" />
            <rect x="234" y="104" width="44" height="84" />
            <rect x="288" y="132" width="30" height="56" />
            <rect x="326" y="84" width="36" height="104" />
            <rect x="370" y="118" width="26" height="70" />
            <rect x="404" y="96" width="46" height="92" />
            <rect x="458" y="136" width="30" height="52" />
            <rect x="496" y="110" width="36" height="78" />
            <rect x="540" y="140" width="48" height="48" />
            <rect x="596" y="122" width="30" height="66" />
            <rect x="634" y="146" width="40" height="42" />
          </g>

          {/* Trees */}
          <g fill="#2FA46B" opacity="0.5">
            <ellipse cx="30" cy="160" rx="34" ry="26" />
            <ellipse cx="66" cy="172" rx="24" ry="18" />
            <ellipse cx="700" cy="168" rx="28" ry="20" />
            <ellipse cx="736" cy="176" rx="20" ry="14" />
          </g>

          {/* Waves */}
          <path
            d="M0,124 C220,70 430,58 700,98 C960,136 1210,140 1440,86 L1440,220 L0,220 Z"
            fill="url(#banner-wave-back)"
            opacity="0.85"
          />
          <path
            d="M0,166 C260,126 520,158 830,156 C1120,154 1300,130 1440,114 L1440,220 L0,220 Z"
            fill="url(#banner-wave-front)"
          />
          <path
            d="M0,198 C300,180 700,206 1000,199 C1220,194 1340,186 1440,178 L1440,220 L0,220 Z"
            fill="#14532D"
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 pt-10 pb-28 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-10 lg:pt-16 lg:pb-40">
        {/* Left Content */}
        <div className="max-w-xl">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16A36A] text-white shadow-lg shadow-[#16A36A]/30">
              <Image
                src={logo}
                alt="TogetherWe Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              {/* <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="h-8 w-8">
                <rect x="11" y="3" width="3.5" height="8" rx="1.75" fill="currentColor" />
                <rect x="25.5" y="3" width="3.5" height="8" rx="1.75" fill="currentColor" />
                <rect x="5" y="7" width="30" height="28" rx="6" fill="currentColor" />
                <path
                  d="M20 27.5c-4.6-3-7.2-5.5-7.2-8.5a3.8 3.8 0 0 1 7.2-1.9 3.8 3.8 0 0 1 7.2 1.9c0 3-2.6 5.5-7.2 8.5Z"
                  fill="#16A36A"
                />
              </svg> */}
            </span>

            <span className="text-4xl font-extrabold tracking-tight text-[#172B24]">
              Together<span className="text-[#16A36A]">We</span>
            </span>
          </Link>

          {/* Tagline */}
          <p className="mt-3 text-lg font-semibold text-[#172B24] sm:text-xl">
            <span className="text-[#16A36A]">Social Development</span> Events
            Management Platform.
          </p>
          <span className="mt-2 block h-1 w-28 rounded-full bg-linear-to-r from-[#16A36A] to-[#BBF7D0]" />

          {/* Headline */}
          <h1 className="mt-5 text-4xl leading-[1.15] font-extrabold tracking-tight text-[#14432B] sm:text-5xl lg:text-[3.4rem]">
            Together, We Can Make a{" "}
            <span className="text-[#16A36A]">Difference.</span>
          </h1>

          {/* Core Values */}
          <ul className="mt-4 inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-full border border-[#16A36A]/25 bg-white/70 px-5 py-2 shadow-[0_10px_30px_-22px_rgba(22,101,52,0.5)] backdrop-blur-sm">
            {values.map(({ icon: Icon, label }, index) => (
              <Fragment key={label}>
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-5 w-px bg-[#16A36A]/40"
                  />
                )}

                <li className="flex items-center gap-2 text-lg font-bold text-[#172B24]">
                  <Icon
                    className={cn(
                      "h-5 w-5 text-[#166534]",
                      label === "Kindness" && "fill-[#166534]",
                    )}
                  />
                  {label}
                </li>
              </Fragment>
            ))}
          </ul>

          {/* Quote */}
          <blockquote className="mt-4 border-l-4 border-[#16A36A] pl-5 text-lg leading-8 text-[#2C3E36]">
            “Connect with compassionate people, organize community initiatives,
            and create meaningful change in your neighborhood.”
          </blockquote>

          {/* Call To Action */}
          <div className="flex gap-3">
            <Link
              href="/upcoming-events"
              className="group mt-4 inline-flex items-center gap-3 rounded-xl bg-[#16A36A] px-5 py-2 text-md font-bold text-white shadow-xl shadow-[#16A36A]/25 transition-colors duration-200 hover:bg-[#166534]"
            >
              Explore Upcoming Events
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login"
              className="group mt-4 inline-flex items-center gap-3 border-2 border-[#166534] rounded-xl bg-[#F0FDF4] px-5 py-2 text-md font-bold text-[#172B24] shadow-xl shadow-[#16A36A]/25 transition-colors duration-200 hover:bg-[#16A36A]"
            >
              Join Our Community
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          {/* Handwritten Note */}
          <div className="relative mb-4 flex justify-end pr-4 sm:pr-10">
            <div className="relative rotate-[-4deg]">
              <p
                className={`${scriptFont.className} text-3xl leading-tight font-bold text-[#166534] lg:text-4xl`}
              >
                Stronger Community.
                <br />
                Brighter Future.
              </p>

              {/* Underline */}
              <svg
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden="true"
                className="mt-1 h-3 w-52 text-[#16A36A] lg:w-60"
              >
                <path
                  d="M3 9C55 3 150 2 217 7"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              {/* Accent Dashes */}
              <svg
                viewBox="0 0 34 34"
                fill="none"
                aria-hidden="true"
                className="absolute -top-3 -right-7 h-7 w-7 rotate-12 text-[#16A36A]"
              >
                <path
                  d="M6 4 10 14"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M17 2 17 13"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M28 4 25 13"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Main Photo */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem] shadow-[0_35px_70px_-30px_rgba(20,67,43,0.55)] ring-8 ring-white/60">
            <Image
              src={heroImg}
              alt="Volunteers planting tree saplings together during a community greening drive"
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Polaroid Gallery */}
          <div className="mt-6 flex items-end justify-center gap-3 sm:absolute sm:-bottom-14 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2 lg:-bottom-16">
            {gallery.map((item) => (
              <figure
                key={item.alt}
                className={cn(
                  "rounded-lg bg-white p-2 shadow-[0_16px_36px_-18px_rgba(20,67,43,0.6)] ring-1 ring-black/5",
                  item.frame,
                  item.rotate,
                )}
              >
                <div className="h-24 overflow-hidden rounded-md sm:h-28 lg:h-32">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 176px, 192px"
                    className="h-full w-full object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E3EDE7] bg-white px-2 py-1 text-center shadow-[0_12px_34px_-24px_rgba(22,101,52,0.4)]"
            >
              <p
                className={cn(
                  "text-md font-extrabold tracking-tight",
                  stat.valueClass,
                )}
              >
                {stat.value}
              </p>

              <p className="mt-1.5 text-sm font-medium text-[#5B6B64]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
