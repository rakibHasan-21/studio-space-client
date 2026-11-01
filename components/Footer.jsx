
import Link from "next/link";
import {
  Aperture,
  ArrowRight,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
];

const categories = [
  { name: "Photo Studios", href: "/studios?category=photography" },
  { name: "Sound Stages", href: "/studios?category=sound-stage" },
  { name: "Podcast Rooms", href: "/studios?category=podcast" },
  { name: "Music Suites", href: "/studios?category=music" },
  { name: "Art Workshops", href: "/studios?category=art" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0b1020] text-white">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-20">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
                <Aperture size={27} className="text-white" />
              </div>

              <span className="text-2xl font-black tracking-tight">
                Studio<span className="text-violet-400">Space</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Your creative space, your next big idea. Discover unique studios,
              connect with talented hosts, and bring your creative vision to
              life with StudioSpace.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <Sparkles size={16} className="text-violet-400" />
              <span>Made for creators, built for creativity.</span>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-violet-400 hover:bg-violet-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.44L5.54 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.77L18.9 2Zm-1.1 18h1.73L7.27 3.9H5.4L17.8 20Z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400 hover:bg-violet-600 hover:text-white"
              >
                <FaInstagram size={19} />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400 hover:bg-violet-600 hover:text-white"
              >
                <FaLinkedinIn size={19} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-7 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-400"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="lg:col-span-3">
            <h3 className="mb-7 text-sm font-bold uppercase tracking-widest text-white">
              Popular Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-400"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Stay Inspired
            </h3>

            <p className="mb-6 text-sm leading-7 text-slate-400">
              Get creative inspiration, studio updates, and exclusive news
              delivered to your inbox.
            </p>

            <form className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-14 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

              <button
                type="button"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 flex h-9 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-500"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-500">
              No spam. Just creative inspiration.
            </p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-col gap-4 border-y border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail size={15} className="text-violet-400" />
              hello@studiospace.com
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={15} className="text-violet-400" />
              Creative Spaces Worldwide
            </div>
          </div>

          <span className="text-xs font-medium text-slate-500">
            Built for every creative mind.
          </span>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-slate-500">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-slate-500 transition hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
