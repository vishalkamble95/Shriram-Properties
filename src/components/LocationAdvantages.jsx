import React, { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Loader,
  LocateFixed,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Train,
  Building,
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Landmark,
  TrainFront,
  Plane,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const LocationAdvantages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-advantages?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const locationAdvantages = data?.location_advantages || [];
  const heading = data?.page?.[0]?.heading || "Location Highlights";

  const getChunkSize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 3;
      return 4;
    }
    return 4;
  };

  const [chunkSize, setChunkSize] = useState(getChunkSize());

  useEffect(() => {
    const updateChunkSize = () => {
      setChunkSize(getChunkSize());
    };
    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  const slides = useMemo(() => {
    const chunk = [];
    const itemsPerSlide = chunkSize * 2;
    for (let i = 0; i < locationAdvantages.length; i += itemsPerSlide) {
      chunk.push(locationAdvantages.slice(i, i + itemsPerSlide));
    }
    return chunk;
  }, [locationAdvantages, chunkSize]);

  const getLocationIcon = (locationName) => {
    const iconMap = {
      "PUNE - BANGALORE": <LocateFixed size={24} className="text-[#077A7D]" />,
      "Metro Station": <Train size={24} className="text-[#077A7D]" />,
      "Balewadi Stadium": <Building size={24} className="text-[#077A7D]" />,
      "Phoenix Market City": (
        <ShoppingBag size={24} className="text-[#077A7D]" />
      ),
      Hinjewadi: <Briefcase size={24} className="text-[#077A7D]" />,
      "Pune University": <GraduationCap size={24} className="text-[#077A7D]" />,
      Shivajinagar: <Landmark size={24} className="text-[#077A7D]" />,
      "Pune Station": <TrainFront size={24} className="text-[#077A7D]" />,
      "Pune Airport": <Plane size={24} className="text-[#077A7D]" />,
    };
    return (
      iconMap[locationName] || <MapPin size={24} className="text-[#077A7D]" />
    );
  };

  return (
    <>
      {loading ? (
        <div className="bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#7AE2CF] min-h-[400px] flex items-center justify-center">
          <Loader size={30} className="text-white animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-gradient-to-b from-[#06202B] to-[#077A7D] p-8 rounded-lg">
          <div className="bg-red-700/10 p-4 rounded-lg text-red-500 border border-red-500/20 shadow-md">
            <p>Failed to load location data: {error}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#06202B] via-[#077A7D] to-[#7AE2CF] p-10 sm:p-14">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F5EEDD] mb-3 tracking-tight">
                {heading}
              </h2>
              <div className="w-28 h-1 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] mx-auto rounded-full shadow-md"></div>
            </div>

            <div
              className={`grid gap-6 ${
                chunkSize === 1
                  ? "grid-cols-1"
                  : chunkSize === 3
                  ? "grid-cols-3"
                  : "grid-cols-4"
              }`}
            >
              {slides[currentSlide].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden h-full border border-[#7AE2CF]/30 group hover:border-[#077A7D] transition-colors duration-300 shadow-lg hover:shadow-[#7AE2CF]/20"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#077A7D] to-[#7AE2CF] text-white flex items-center justify-center mr-4 shadow-md">
                        {getLocationIcon(item.location)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-[#7AE2CF] transition-colors duration-300">
                          {item.location}
                        </h4>
                        <p className="text-[#F5EEDD] text-sm flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {item.distance}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#F5EEDD]/90 mb-6 flex-grow text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-auto">
                      <a
                        href="#"
                        className="inline-flex items-center text-[#7AE2CF] hover:text-white text-sm font-medium transition-colors"
                      >
                        View on map <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 sm:mt-12">
              <div className="flex gap-3 order-1 sm:order-none">
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev - 1 + slides.length) % slides.length
                    )
                  }
                  className="p-3 rounded-full bg-white/10 hover:bg-[#077A7D]/60 text-white border border-[#7AE2CF]/30 hover:border-[#077A7D] transition-all duration-300 shadow-md"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % slides.length)
                  }
                  className="p-3 rounded-full bg-white/10 hover:bg-[#077A7D]/60 text-white border border-[#7AE2CF]/30 hover:border-[#077A7D] transition-all duration-300 shadow-md"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <a
                href="#contact"
                className="relative group px-8 py-3 rounded-full bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white font-semibold text-base hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-[#077A7D]/30 order-2 sm:order-none overflow-hidden text-center inline-block"
              >
                <span className="relative z-10">
                  Enquiry About All Locations
                </span>

                {/* Shine sweep effect */}
                <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
              </a>
            </div>
          </div>
        </div>
      )}
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default LocationAdvantages;
