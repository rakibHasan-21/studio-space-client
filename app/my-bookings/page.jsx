"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import MyBookingsList from "@/components/MyBookingsList";

const MyBookings = () => {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${encodeURIComponent(
            session.user.email,
          )}`,
          {
            cache: "no-store",
          },
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(result);
      } catch (error) {
        console.error("Bookings Error:", error);
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>

        <p className="mt-2 text-gray-500">Manage your studio reservations.</p>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>
      ) : (
        <MyBookingsList bookings={bookings} userEmail={session.user.email} />
      )}
    </div>
  );
};

export default MyBookings;
