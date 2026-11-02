
import { notFound } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";

import {
  MapPin,
  Star,
  Users,
  Clock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import BookingModal from "@/components/BookingModal";
import { auth } from "@/lib/auth";

const Page = async ({ params }) => {
  const { slug } = await params;

  // Get logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email || "";

  // Fetch studio details
  const res = await fetch(`http://localhost:5000/studios/${slug}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const studio = await res.json();

  const images = Array.isArray(studio.imageUrl)
    ? studio.imageUrl
    : studio.imageUrl
      ? [studio.imageUrl]
      : [];

  const title = studio.title || studio.studioName || "Creative Studio";
  const price = studio.hourlyRate || studio.pricePerHour;

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          href="/studios"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Image Gallery */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={images[0] || "/placeholder.png"}
              alt={title}
              className="h-[350px] w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${title} ${index + 2}`}
                className="h-[168px] w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">

          <div>
            {/* Category */}
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold capitalize text-green-700">
              {studio.category}
            </span>

            {/* Studio Name */}
            <h1 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">
              {title}
            </h1>

            {/* Specifications */}
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {studio.location || studio.address || "Location unavailable"}
              </span>

              <span className="flex items-center gap-2 text-yellow-500">
                <Star size={18} fill="currentColor" />
                {studio.rating || "New"}
              </span>

              <span className="flex items-center gap-2">
                <Users size={18} />
                {studio.maxCapacity || "N/A"} Guests
              </span>
            </div>

            <div className="my-8 border-t border-slate-200" />

            {/* About */}
            <h2 className="text-2xl font-bold text-slate-900">
              About This Studio
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              {studio.description || "No description available."}
            </p>

            {/* Amenities */}
            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Amenities & Facilities
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(studio.amenities || []).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <CheckCircle2 size={19} className="text-green-600" />
                  {amenity}
                </div>
              ))}
            </div>

            {/* Host Details */}
            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Host Information
            </h2>

            <div className="mt-5 rounded-2xl border bg-white p-6">
              <h3 className="font-bold text-slate-900">
                {studio.hostName || "Studio Host"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {studio.hostEmail || "Host information unavailable"}
              </p>
            </div>

            {/* Reviews */}
            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Reviews & Ratings
            </h2>

            <div className="mt-5 rounded-2xl border bg-white p-6">
              <div className="flex items-center gap-2">
                <Star
                  size={22}
                  fill="currentColor"
                  className="text-yellow-500"
                />

                <span className="text-xl font-bold">
                  {studio.rating || "New"}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {studio.reviews?.length || 0} Reviews
              </p>

              {(studio.reviews || []).map((review, index) => (
                <div key={index} className="mt-5 border-t pt-4">
                  <p className="font-semibold">
                    {review.name || "Guest"}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <p className="text-sm text-slate-500">
              Starting from
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              ${price || "N/A"}
              <span className="text-base font-normal text-slate-500">
                / hour
              </span>
            </h2>

            <div className="my-6 border-t" />

            <p className="mb-4 flex items-center gap-2 text-sm text-slate-600">
              <Clock size={18} />
              Flexible booking hours
            </p>

            {/* Booking Modal */}
            <BookingModal studio={studio} userEmail={userEmail}/>

            <p className="mt-4 text-center text-xs text-slate-400">
              Booking confirmation will be available after booking.
            </p>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default Page;
