"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Upload, Plus, X, Building2, MapPin, DollarSign } from "lucide-react";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Other",
];

const availableAmenities = [
  "WiFi",
  "Air Conditioning",
  "Parking",
  "Lighting Equipment",
  "Sound System",
  "Projector",
  "Makeup Room",
  "Kitchen",
  "Restroom",
  "Furniture",
];

const AddStudio = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [customAmenity, setCustomAmenity] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    overview: "",
  });

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Amenities Select
  const handleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  // Custom Amenity
  const addCustomAmenity = () => {
    const value = customAmenity.trim();

    if (!value) return;

    if (!amenities.includes(value)) {
      setAmenities((prev) => [...prev, value]);
    }

    setCustomAmenity("");
  };

  // Image URL
  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  // Form Submit (Client Side Only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first!");
      return;
    }

    if (!amenities.length) {
      alert("Please select at least one amenity!");
      return;
    }

    if (!imageUrl) {
      alert("Please provide an image URL!");
      return;
    }

    const studioData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      imageUrl,
      amenities,
      userName: user.name,
      userEmail: user.email,
    };
    try {
      setLoading(true);

      const res = await fetch('http://localhost:5000/studioForm', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      });

      const result = await res.json();

      console.log("Studio Data:", result);

      if (res.ok) {
        toast.success("Studio added successfully!");
      } else {
        toast.error(result.message || "Failed to add studio!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
      alert("Client side form submitted successfully!");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-green-600">
          <Building2 size={20} />
          <span className="text-sm font-semibold uppercase tracking-widest">
            Host Your Space
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Add New Studio
        </h1>

        <p className="mt-2 text-gray-500">
          Share your creative space and start receiving bookings.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8"
      >
        {/* Studio Title */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Studio Title *
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Creative Photography Studio"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Category *
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-500"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Rate / Deposit / Capacity */}
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Hourly Rate ($) *
            </label>

            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              min="1"
              placeholder="45"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Security Deposit ($) *
            </label>

            <input
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              min="0"
              placeholder="100"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Max Capacity *
            </label>

            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              min="1"
              placeholder="10"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Location / Address *
          </label>

          <div className="relative">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Banani, Dhaka, Bangladesh"
              required
              className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Studio Image URL *
          </label>

          <div className="relative">
            <Upload
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />

            <input
              type="url"
              value={imageUrl}
              onChange={handleImageChange}
              placeholder="https://example.com/studio.jpg"
              required
              className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-green-500"
            />
          </div>

          {imageUrl && (
            <div className="mt-4">
              <img
                src={imageUrl}
                alt="Studio Preview"
                className="h-52 w-full rounded-xl border object-cover"
              />
            </div>
          )}

          <p className="mt-2 text-xs text-gray-400">
            Image upload integration will be added with the backend.
          </p>
        </div>

        {/* Amenities */}
        <div>
          <label className="mb-3 block font-medium text-gray-700">
            Amenities *
          </label>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {availableAmenities.map((amenity) => (
              <label
                key={amenity}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm transition hover:border-green-500"
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() => handleAmenity(amenity)}
                  className="h-4 w-4 accent-green-600"
                />

                {amenity}
              </label>
            ))}
          </div>

          {/* Custom Amenities */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              placeholder="Add custom amenity"
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />

            <button
              type="button"
              onClick={addCustomAmenity}
              className="rounded-lg bg-gray-900 px-4 text-white hover:bg-gray-700"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Selected Amenities */}
          {amenities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-sm text-green-700"
                >
                  {amenity}

                  <button type="button" onClick={() => handleAmenity(amenity)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Overview */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Detailed Overview *
          </label>

          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            rows={5}
            placeholder="Describe your studio, facilities, equipment and what makes it special..."
            required
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
          />
        </div>

        {/* User Information */}
        <div className="grid gap-5 rounded-xl bg-gray-50 p-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              User Name
            </label>

            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              User Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !user}
          className="w-full rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Add New Studio"}
        </button>
      </form>
    </div>
  );
};

export default AddStudio;
