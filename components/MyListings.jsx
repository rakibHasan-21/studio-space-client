"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  MapPin,
  Pencil,
  Trash2,
  X,
  Plus,
  Music,
  ShieldCheck,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const MyListings = ({ studios, userEmail }) => {
  const router = useRouter();

  const [listings, setListings] = useState(
    studios.filter((studio) => studio.ownerEmail === userEmail),
  );

  const [selectedStudio, setSelectedStudio] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedStudio) return;

    setDeleting(true);

    const { data, error } = await authClient.token();
    const token = data?.token;
    console.log(token);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete studio");
      }

      setListings((prev) =>
        prev.filter((studio) => studio._id !== selectedStudio._id),
      );

      toast.success("Studio deleted successfully!");

      setSelectedStudio(null);
      router.refresh();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {listings.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white px-6 py-20 text-center">
          <Music className="mx-auto mb-4 text-gray-400" size={45} />

          <h2 className="text-2xl font-bold text-gray-800">No Studios Yet!</h2>

          <p className="mt-2 text-gray-500">
            You haven't listed any creative spaces yet.
          </p>

          <Link
            href="/add-studio"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-purple-700"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((studio) => {
            const image = Array.isArray(studio.imageUrl)
              ? studio.imageUrl.flat(Infinity)[0]
              : studio.imageUrl;

            return (
              <div
                key={studio._id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 w-full bg-gray-100">
                  {image && (
                    <Image
                      src={image}
                      alt={studio.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-700 shadow">
                    {studio.category}
                  </span>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {studio.title}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} />
                      {studio.location}
                    </p>
                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                    {studio.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Hourly Rate</p>
                      <p className="mt-1 text-lg font-bold">
                        ${studio.hourlyRate}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Security Deposit</p>
                      <p className="mt-1 text-lg font-bold">
                        ${studio.securityDeposit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {studio.maxCapacity} People
                    </span>

                    <span className="flex items-center gap-1">
                      <ShieldCheck size={16} />
                      Owner Listing
                    </span>
                  </div>

                  {studio.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {studio.amenities.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 border-t pt-4">
                    <Link
                      // href={'/update-studio'}
                      href={`/update-studio/${studio._id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                    >
                      <Pencil size={16} />
                      Update
                    </Link>

                    <button
                      onClick={() => setSelectedStudio(studio)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
      )}

      {/* Delete Confirmation Modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setSelectedStudio(null)}
              disabled={deleting}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={27} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">Delete Studio?</h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {selectedStudio.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="flex-1 rounded-lg border px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
