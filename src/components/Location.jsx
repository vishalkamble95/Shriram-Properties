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
    <div className="bg-slate-800 p-5 md:p-6" id="location">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full mr-3"></div>
          <h2 className="text-xl font-bold text-white">
            {locationData.heading || "Prime Location"}
          </h2>
        </div>

        {locationData.subheading && (
          <p className="text-slate-300 mb-4">{locationData.subheading}</p>
        )}

        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-700 w-full h-64 md:h-80 mb-4">
          {locationData.map ? (
            <div
              dangerouslySetInnerHTML={renderMap()}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
              <MapIcon size={40} className="mb-2 text-teal-400/50" />
              <p>Map not available</p>
            </div>
          )}
        </div>

        <a
          href="#contact"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 justify-center max-w-sm mx-auto"
        >
          <MapPin size={16} />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
};

export default Location;
