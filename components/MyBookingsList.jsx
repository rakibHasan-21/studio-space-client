
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CalendarDays, MapPin, XCircle } from "lucide-react";

const MyBookingsList = ({ bookings: initialBookings, userEmail }) => {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [cancellingId, setCancellingId] = useState(null);

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const handleCancel = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully!");

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");

    } finally {
      setCancellingId(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border py-16 text-center">
        <h2 className="text-xl font-semibold">No Bookings Found</h2>

        <p className="mt-2 text-gray-500">
          You haven't booked any studios yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="overflow-hidden rounded-xl border bg-white shadow-sm"
        >
          <img
            src={
              Array.isArray(booking.studioImage)
                ? booking.studioImage[0]
                : booking.studioImage
            }
            alt={booking.studioTitle}
            className="h-52 w-full object-cover"
          />

          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-bold">
                {booking.studioTitle}
              </h2>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[booking.status] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <p className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              {booking.location}
            </p>

            <p className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={16} />
              {booking.selectedDate}
            </p>

            <p className="font-semibold">
              ${booking.hourlyRate} / hour
            </p>

            {booking.status === "Pending" && (
              <button
                onClick={() => handleCancel(booking._id)}
                disabled={cancellingId === booking._id}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
              >
                <XCircle size={17} />

                {cancellingId === booking._id
                  ? "Cancelling..."
                  : "Cancel Booking"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookingsList;
