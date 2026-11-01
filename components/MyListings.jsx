"use client";

import Link from "next/link";
import { MapPin, Pencil, Trash2 } from "lucide-react";

const MyListings = ({ studios }) => {

  if (studios.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">
          No Studio Found!
        </h2>

        <p className="mt-2 text-gray-500">
          You haven't added any studios yet.
        </p>

        <Link
          href="/add-studio"
          className="mt-5 inline-block rounded-lg bg-green-600 px-6 py-3 text-white"
          >
          Add New Studio
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {studios.map((studio) => (

        <div
          key={studio._id}
          className="overflow-hidden rounded-xl border shadow-sm"
        >

          <img
            src={Array.isArray(studio.imageUrl) ? studio.imageUrl[0] : studio.imageUrl}
            alt={studio.title}
            className="h-52 w-full object-cover"
          />

          <div className="space-y-3 p-5">

            <h2 className="text-xl font-bold">
              {studio.title}
            </h2>

            <p className="text-sm text-gray-500">
              {studio.category}
            </p>

            <p className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              {studio.location}
            </p>

            <p className="font-semibold text-green-600">
              ${studio.hourlyRate} / hour
            </p>

            <div className="flex gap-3 pt-3">

              <Link
                href={`/update-studio/${studio._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white"
              >
                <Pencil size={16} />
                Update
              </Link>

              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-white"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>
          </div>
        </div>

      ))}

    </div>
  );
};
export default MyListings;