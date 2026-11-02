import React from "react";
import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";

const page = async ({ searchParams }) => {
  const { category } = await searchParams;

  const url = category
    ? `${process.env.NEXT_PUBLIC_API_URL}/studios?category=${encodeURIComponent(category)}`
    : `${process.env.NEXT_PUBLIC_API_URL}/studios`;

  const res = await fetch(url, {
    cache: "no-store",
  }); 

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios = await res.json();

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            {category ? category.replace(/([A-Z])/g, " $1") : "Explore Studios"}
          </h1>

          <p className="mt-3 text-gray-500">
            Discover the perfect creative space for your next project.
          </p>

          {category && (
            <Link
              href="/studios"
              className="mt-4 inline-block font-semibold text-green-600 hover:underline"
            >
              View All Studios
            </Link>
          )}
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={
                  Array.isArray(studio.imageUrl)
                    ? studio.imageUrl[0]
                    : studio.imageUrl
                }
                alt={studio.title || studio.studioName || "Studio"}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {studio.category}
                </span>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {studio.title || studio.studioName}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  {studio.location || studio.address}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    {studio.rating || "New"}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users size={16} />
                    {studio.maxCapacity || "N/A"} Guests
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <p className="text-lg font-bold text-green-600">
                    ${studio.hourlyRate || studio.pricePerHour}
                    <span className="text-sm font-normal text-gray-500">
                      / hr
                    </span>
                  </p>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {studios.length === 0 && (
          <p className="py-20 text-center text-gray-500">
            No studios found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default page;