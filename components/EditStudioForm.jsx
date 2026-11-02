"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Update = ({ studio }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: studio?.title || "",
    category: studio?.category || "",
    hourlyRate: studio?.hourlyRate || "",
    securityDeposit: studio?.securityDeposit || "",
    maxCapacity: studio?.maxCapacity || "",
    location: studio?.location || "",
    overview: studio?.overview || "",
  });

  const [imageUrl, setImageUrl] = useState(
    Array.isArray(studio?.imageUrl)
      ? studio.imageUrl.join(", ")
      : studio?.imageUrl || ""
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedData = {
        ...formData,
        hourlyRate: Number(formData.hourlyRate),
        securityDeposit: Number(formData.securityDeposit),
        maxCapacity: Number(formData.maxCapacity),
        imageUrl: imageUrl.split(",").map((url) => url.trim()).filter(Boolean),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${studio._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success("Studio updated successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-medium">Studio Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Hourly Rate</label>
        <input
          type="number"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Security Deposit</label>
        <input
          type="number"
          name="securityDeposit"
          value={formData.securityDeposit}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Maximum Capacity</label>
        <input
          type="number"
          name="maxCapacity"
          value={formData.maxCapacity}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Image URLs</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Overview</label>
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Studio"}
      </button>
    </form>
  );
};

export default Update;