import React, { useState, useEffect } from "react";
import { MapPin, MapIcon, Loader } from "lucide-react";
import config from "../../config";

const Location = () => {
  const [locationData, setLocationData] = useState({
    heading: "",
    subheading: null,
    map: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-map?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }

        const data = await response.json();
        setLocationData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  const renderMap = () => {
    return { __html: locationData.map };
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-[300px] p-6 flex items-center justify-center">
        <Loader size={30} className="text-teal-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-[300px] p-6">
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-900/30 text-red-400 flex items-center">
          <MapIcon size={20} className="mr-2" />
          <p>Failed to load location data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#b8a9c9] p-6 md:p-10" id="location">
  <div className="max-w-6xl mx-auto">
    {/* Section Heading */}
    <div className="flex items-center mb-6">
      <div className="w-1 h-8 bg-gradient-to-b from-[#622569] to-[#5b9aa0] rounded-full mr-3"></div>
      <h2 className="text-2xl font-bold text-[#622569] tracking-wide drop-shadow">
        {locationData.heading || "Prime Location"}
      </h2>
    </div>

    {/* Subheading */}
    {locationData.subheading && (
      <p className="text-[#5b9aa0] mb-6 text-base sm:text-lg leading-relaxed">
        {locationData.subheading}
      </p>
    )}

    {/* Map Display */}
    <div className="rounded-2xl overflow-hidden shadow-xl border border-[#622569]/20 w-full h-64 md:h-80 mb-6 bg-[#d6d4e0]/30 backdrop-blur-sm">
      {locationData.map ? (
        <div
          dangerouslySetInnerHTML={renderMap()}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#d6d4e0]/30 text-[#622569]">
          <MapIcon size={40} className="mb-2 text-[#5b9aa0]" />
          <p>Map not available</p>
        </div>
      )}
    </div>

    {/* CTA Button */}
    <a
      href="#contact"
      className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#5b9aa0] to-[#622569] text-white font-semibold hover:from-[#5b9aa0]/90 hover:to-[#622569]/90 active:scale-[.98] transition-all duration-300 flex items-center gap-2 justify-center max-w-sm mx-auto shadow-md"
    >
      <MapPin size={18} />
      <span>Get Directions</span>
    </a>
  </div>
</div>

  );
};

export default Location;
