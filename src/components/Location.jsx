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
      <div className="bg-[#06202B] min-h-[300px] p-6 flex items-center justify-center">
        <Loader size={30} className="text-[#7AE2CF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#06202B] min-h-[300px] p-6">
        <div className="bg-red-800/20 p-4 rounded-lg border border-red-500/30 text-red-300 flex items-center">
          <MapIcon size={20} className="mr-2" />
          <p>Failed to load location data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EEDD] p-6 md:p-10" id="location">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-[#077A7D] to-[#06202B] rounded-full mr-3"></div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#06202B] tracking-wide drop-shadow">
            {locationData.heading || "Prime Location"}
          </h2>
        </div>

        {/* Subheading */}
        {locationData.subheading && (
          <p className="text-[#077A7D] mb-6 text-base sm:text-lg leading-relaxed">
            {locationData.subheading}
          </p>
        )}

        {/* Map Display */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-[#077A7D]/30 w-full h-64 md:h-80 mb-6 bg-[#7AE2CF]/10 backdrop-blur-sm">
          <div className="w-full h-full scale-[0.84] md:scale-100 origin-top-left">
            {locationData.map ? (
              <div
                dangerouslySetInnerHTML={renderMap()}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#7AE2CF]/10 text-[#06202B]">
                <MapIcon size={40} className="mb-2 text-[#077A7D]" />
                <p>Map not available</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="relative group px-6 py-3 rounded-lg bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-[#06202B] font-semibold hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 active:scale-[.98] transition-all duration-300 flex items-center gap-2 justify-center max-w-sm mx-auto shadow-md overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <MapPin size={18} />
            <span>Get Directions</span>
          </span>

          {/* Shine sweep effect */}
          <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
        </a>
      </div>
    </div>
  );
};

export default Location;
