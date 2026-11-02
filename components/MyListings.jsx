
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

const MyListings = ({ studios = [] }) => {
  const [studioList, setStudioList] = useState(studios);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedStudio) return;

    setDeleting(true);

    try {
      const res = await fetch(
        `http://localhost:5000/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setStudioList((prev) =>
        prev.filter((studio) => studio._id !== selectedStudio._id)
      );

      toast.success("Studio deleted successfully!");

      setSelectedStudio(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (studioList.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-dashed bg-white p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Studio Listings Found
        </h2>

        <p className="mt-2 text-gray-500">
          You haven't added any studio yet.
        </p>

        <Link
          href="/add-studio"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          <Plus size={18} />
          Add Studio
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studioList.map((studio) => {
          const image = Array.isArray(studio.imageUrl)
            ? studio.imageUrl[0]
            : studio.imageUrl;

          return (
            <div
              key={studio._id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              {image && (
                <img
                  src={image}
                  alt={studio.studioName || studio.title || "Studio"}
                  className="h-52 w-full object-cover"
                />
              )}

              <div className="p-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                  {studio.category}
                </span>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {studio.studioName || studio.title}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={17} />
                  {studio.location}
                </p>

                <p className="mt-3 text-lg font-bold text-green-600">
                  ${studio.pricePerHour} / hour
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href={`/studios/edit/${studio._id}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                  >
                    <Pencil size={16} />
                    Update
                  </Link>

                  <button
                    onClick={() => setSelectedStudio(studio)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">
              Delete Studio?
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <strong>
                {selectedStudio.studioName || selectedStudio.title}
              </strong>
              ?
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="flex-1 rounded-lg border px-4 py-3 font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyListings;
