"use client";

import Link from "next/link";
import {
  Aperture,
  ArrowLeft,
  Home,
  Camera,
  Mic2,
  Clapperboard,
} from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-[#f8faf9] px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">

        {/* Creative Illustration */}
        <div className="relative mx-auto mb-8 flex h-64 w-64 items-center justify-center">

          <div className="absolute inset-0 rounded-full bg-green-100/70" />

          <div className="relative flex h-44 w-44 items-center justify-center rounded-3xl border-4 border-green-200 bg-white shadow-xl">
            <Aperture size={90} className="text-green-600" strokeWidth={1.5} />

            <div className="absolute -right-5 -top-5 rounded-xl bg-green-600 p-3 text-white shadow-lg">
              <Camera size={25} />
            </div>

            <div className="absolute -bottom-4 -left-5 rounded-xl bg-white p-3 text-green-600 shadow-lg">
              <Mic2 size={25} />
            </div>

            <div className="absolute -bottom-5 -right-5 rounded-xl bg-white p-3 text-green-600 shadow-lg">
              <Clapperboard size={25} />
            </div>
          </div>

          <span className="absolute -top-3 right-4 text-5xl font-black text-green-600">
            404
          </span>
        </div>

        {/* Content */}
        <p className="mb-3 font-semibold uppercase tracking-[4px] text-green-600">
          Page Not Found
        </p>

        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Oops! Lost in the Studio?
        </h1>

        <p className="mx-auto mb-8 max-w-lg leading-7 text-gray-500">
          Looks like this creative space doesn't exist.
          The page you are looking for may have been moved
          or doesn't exist anymore.
        </p>

        {/* Return Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-green-700"
        >
          <ArrowLeft size={19} />
          <Home size={19} />
          Return to Home
        </Link>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Aperture size={16} />
          StudioSpace — Create Something Amazing
        </p>

      </div>
    </div>
  );
};

export default NotFound;