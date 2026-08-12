import React, { useState } from "react";
import { MapPin, X } from "lucide-react";

const LocationDetector = () => {
  const [location, setLocation] = useState({
    city: "New Delhi",
    pincode: "110001",
  });

  const [showBox, setShowBox] = useState(false);
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkPincode = async () => {
    if (pincode.length !== 6) {
      setError("Please enter a valid 6-digit PIN code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      const data = await response.json();

      if (
        !data ||
        data[0].Status !== "Success" ||
        !data[0].PostOffice ||
        data[0].PostOffice.length === 0
      ) {
        setError("Invalid PIN code");
        return;
      }

      const postOffice = data[0].PostOffice[0];

      setLocation({
        city: postOffice.District,
        pincode: pincode,
      });

      setShowBox(false);
      setPincode("");
    } catch (error) {
      console.error(error);
      setError("Unable to find this PIN code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative ">

      {/* Location Button */}
      <button
        onClick={() => setShowBox(!showBox)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <MapPin
          size={22}
          strokeWidth={1.1}
          className="text-[#5a1b1b]"
        />

        <div className="text-left leading-tight">
          <p className="text-sm font-semibold text-[#5a1b1b]">
            {location.city}
          </p>

          <p className="text-xs text-[#5a1b1b]">
            {location.pincode}
          </p>
        </div>
      </button>

      {/* Popup */}
      {showBox && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-xl bg-white p-5 shadow-xl border border-gray-200">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Select Location
            </h3>

            <button
              onClick={() => setShowBox(false)}
              className="text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Enter your PIN code to find your location.
          </p>

          {/* Input */}
          <div className="flex gap-2">

            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                setPincode(value);
                setError("");
              }}
              placeholder="Enter PIN code"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
            />

            <button
              onClick={checkPincode}
              disabled={loading}
              className="bg-[#5a1b1b] text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "..." : "Check"}
            </button>

          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

          {/* Current Location */}
          <div className="mt-5 border-t pt-4">

            <p className="text-xs text-gray-500">
              Current location
            </p>

            <div className="flex items-center gap-2 mt-2">

              <MapPin size={18} />

              <div>
                <p className="font-medium text-sm">
                  {location.city}
                </p>

                <p className="text-xs text-gray-500">
                  {location.pincode}
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default LocationDetector;