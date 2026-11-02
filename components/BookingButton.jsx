"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BookingButton = ({ studio }) => {
  const { data: session, isPending } = authClient.useSession();
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    const user = session?.user;

    if (isPending) {
      toast.error("Please wait...");
      return;
    }

    if (!user?.email) {
      toast.error("Please login first!");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a booking date!");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        studioId: studio._id,
        studioTitle: studio.title,
        studioImage: Array.isArray(studio.imageUrl)
          ? studio.imageUrl[0]
          : studio.imageUrl,
        location: studio.location,
        hourlyRate: Number(studio.hourlyRate),
        userName: user.name,
        userEmail: user.email,
        selectedDate,
      };

      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed!");
      }

      toast.success("Booking successful!");
      setSelectedDate("");
      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block font-medium">
          Select Booking Date
        </label>

        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <button
        onClick={handleBooking}
        disabled={loading || isPending}
        className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookingButton;