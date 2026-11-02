
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const BookingModal = ({ studio }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

const { data: session } = authClient.useSession();
  const user = session?.user;

  const today = new Date().toISOString().split("T")[0];

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first!");
      return;
    }

    if (!bookingDate) {
      alert("Please select a booking date!");
      return;
    }

    const bookingData = {
      studioId: studio._id,
      studioName: studio.title || studio.studioName,
      userEmail: user.email,
      bookingDate,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      alert("Booking successful!");
      setBookingDate("");

    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking}>
      <div className="flex flex-col gap-4">

        <input
          type="date"
          min={today}
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="rounded-lg border p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-600 p-3 text-white"
        >
          {loading ? "Booking..." : "Book Your Workspace"}
        </button>

      </div>
    </form>
  );
};

export default BookingModal;
