
import Link from "next/link";
import {
  CalendarHeart,
  Mail,
  MapPin,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import navLogo from "../../../public/images/logo_navbar.png";
import Image from "next/image";


const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#123F2B] text-white">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#16A36A]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-green-400/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16A36A] text-white shadow-lg shadow-green-950/30 transition-transform duration-300 group-hover:rotate-6">
                <Image
              src={navLogo}
              alt=""
              className="h-11 w-11 rounded-xl object-contain"
            />
                {/* <CalendarHeart size={28} /> */}
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Together<span className="text-[#4ADE80]">We</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-green-100/70">
              Connecting people, empowering communities, and creating
              meaningful social impact through collaborative events.
              Together, we can make a difference!
            </p>

            {/* Social Media */}
            <div className="mt-7">
              <p className="mb-4 text-sm font-semibold text-white">
                Follow Our Community
              </p>

              {/* <div className="flex items-center gap-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                  {
                    icon: Instagram,
                    href: "https://instagram.com",
                    label: "Instagram",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    icon: Github,
                    href: "https://github.com",
                    label: "GitHub",
                  },
                ].map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-green-100/20 bg-white/5 text-green-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#16A36A] hover:bg-[#16A36A] hover:text-white"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Quick Links
              <span className="mt-2 block h-1 w-10 rounded-full bg-[#16A36A]" />
            </h3>

            <ul className="space-y-4 text-sm text-green-100/70">
              {[
                { name: "Home", href: "/" },
                { name: "Upcoming Events", href: "/upcoming-events" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 transition-colors hover:text-[#4ADE80]"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Community
              <span className="mt-2 block h-1 w-10 rounded-full bg-[#16A36A]" />
            </h3>

            <ul className="space-y-4 text-sm text-green-100/70">
              {[
                { name: "Explore Events", href: "/upcoming-events" },
                { name: "Create an Event", href: "/create-event" },
                { name: "Volunteer", href: "/volunteer" },
                { name: "My Dashboard", href: "/dashboard" },
                { name: "My Profile", href: "/profile" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#4ADE80]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Get In Touch
              <span className="mt-2 block h-1 w-10 rounded-full bg-[#16A36A]" />
            </h3>

            <p className="mb-5 text-sm leading-6 text-green-100/70">
              Have a question or want to collaborate? We would love to
              hear from you.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:hello@eventconnect.com"
                className="group flex items-center gap-3 text-sm text-green-100/80 transition-colors hover:text-[#4ADE80]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#4ADE80]">
                  <Mail size={17} />
                </span>
                hello@eventconnect.com
              </a>

              <div className="flex items-center gap-3 text-sm text-green-100/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#4ADE80]">
                  <MapPin size={17} />
                </span>
                Building stronger communities
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/upcoming-events"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#16A36A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#128451]"
            >
              Explore Events
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-green-100/15 py-7">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <p className="text-sm text-green-100/60">
              © 2026 EventConnect. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-green-100/60">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-[#4ADE80]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-[#4ADE80]"
              >
                Terms & Conditions
              </Link>
            </div>

            <p className="flex items-center gap-1.5 text-sm text-green-100/60">
              Made with
              <Heart size={15} className="fill-red-400 text-red-400" />
              for communities
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
