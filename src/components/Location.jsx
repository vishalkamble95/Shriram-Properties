import React, { useState, useEffect } from "react";
import { MapPin, MapIcon, Loader } from "lucide-react";
import { API } from "../../config";

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
        const response = await fetch(API.LOCATION_MAP());

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
      <div className="bg-[#0E1A24] min-h-[250px] p-4 flex items-center justify-center">
        <Loader size={26} className="text-[#FACC15] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0E1A24] min-h-[250px] p-4">
        <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30 text-red-300 flex items-center">
          <MapIcon size={18} className="mr-2" />
          <p>Failed to load location data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#CBD5E1] py-8 px-4 md:py-10 md:px-8" id="location">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FACC15] to-[#0E1A24] rounded-full mr-3"></div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1A24] tracking-wide drop-shadow">
            {locationData.heading || "Prime Location"}
          </h2>
        </div>

        {/* Subheading */}
        {locationData.subheading && (
          <p className="text-[#0F766E] mb-4 text-sm sm:text-base leading-relaxed">
            {locationData.subheading}
          </p>
        )}

        {/* Map Display */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-[#0F766E]/30 w-full h-56 md:h-72 mb-5 bg-[#0F766E]/5 backdrop-blur-md">
          <div className="w-full h-full scale-[0.9] md:scale-100 origin-top-left">
            {locationData.map ? (
              <div
                dangerouslySetInnerHTML={renderMap()}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#0E1A24]">
                <MapIcon size={36} className="mb-2 text-[#0F766E]" />
                <p>Map not available</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="relative group px-5 py-2.5 rounded-md bg-gradient-to-r from-[#0F766E] to-[#FACC15] text-[#0E1A24] font-medium active:scale-95 transition-all duration-300 flex items-center gap-2 justify-center max-w-xs mx-auto shadow overflow-hidden zoom-pulse"
        >
          {/* Shine sweep effect */}
          <span className="absolute inset-0 z-0 overflow-hidden">
            <span className="absolute top-0 left-[-150%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#0E1A24]/20 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
          </span>

          {/* Button content */}
          <span className="relative z-10 flex items-center gap-2">
            <MapPin size={16} />
            <span>Get Directions</span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Location;
