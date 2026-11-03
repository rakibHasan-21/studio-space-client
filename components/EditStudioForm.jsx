
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EditStudioForm = ({ studio }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: studio.title || studio.studioName || "",
    category: studio.category || "",
    location: studio.location || "",
    hourlyRate: studio.hourlyRate || studio.pricePerHour || "",
    description: studio.description || "",
    imageUrl: Array.isArray(studio.imageUrl)
      ? studio.imageUrl.join(", ")
      : studio.imageUrl || "",
    maxCapacity: studio.maxCapacity || "",
    amenities: Array.isArray(studio.amenities)
      ? studio.amenities.join(", ")
      : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const updatedData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      maxCapacity: Number(formData.maxCapacity),
      imageUrl: formData.imageUrl
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
      amenities: formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${studio._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update studio");
      }

      toast.success("Studio updated successfully!");

      setTimeout(() => {
        router.push("/my-listings");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-semibold">Studio Name</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        >
          <option value="">Select Category</option>
          <option value="photography">Photography Studio</option>
          <option value="filmStage">Film Stage</option>
          <option value="podcast">Podcast Lounge</option>
          <option value="music">Music Suite</option>
          <option value="art">Art Workshop</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-semibold">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Hourly Rate ($)</label>
        <input
          type="number"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Max Capacity</label>
        <input
          type="number"
          name="maxCapacity"
          value={formData.maxCapacity}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Image URLs (comma separated)
        </label>
        <textarea
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Amenities (comma separated)
        </label>
        <input
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
        />
      </div>

      {/* Read-only Host Information */}
      <div className="rounded-xl bg-gray-50 p-4">
        <h3 className="mb-3 font-bold">Host Information</h3>

        <label className="mb-2 block text-sm font-medium">
          Host Name
        </label>
        <input
          value={studio.ownerName || studio.hostName || ""}
          readOnly
          className="mb-4 w-full rounded-lg border bg-gray-100 p-3"
        />

        <label className="mb-2 block text-sm font-medium">
          Host Email
        </label>
        <input
          value={studio.ownerEmail || studio.hostEmail || ""}
          readOnly
          className="w-full rounded-lg border bg-gray-100 p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update Studio"}
      </button>
    </form>
  );
};

export default EditStudioForm;
