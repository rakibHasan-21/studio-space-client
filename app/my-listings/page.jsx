
"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import MyListings from "@/components/MyListings";

const MyListingsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-listings?email=${encodeURIComponent(
            session.user.email
          )}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch listings");
        }

        setStudios(data);
      } catch (error) {
        console.error("My Listings Error:", error);
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Loading your studios...</p>
      </div>
    );
  }

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600">
              Studio Management
            </p>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage and organize your creative spaces.
            </p>
          </div>

          <div className="rounded-xl border bg-white px-5 py-3 shadow-sm">
            <p className="text-sm text-gray-500">Total Studios</p>
            <p className="text-2xl font-bold">{studios.length}</p>
          </div>
        </div>

        {error ? (
          <p className="rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        ) : (
          <MyListings
            studios={studios}
            userEmail={session.user.email}
          />
        )}
      </div>
    </main>
  );
};

export default MyListingsPage;
