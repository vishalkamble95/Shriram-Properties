import React, { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Loader,
  LocateFixed,
  Train,
  Building,
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Landmark,
  TrainFront,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import { API } from "../../config";

const LocationAdvantages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        if (!response.ok) throw new Error("Failed to fetch location data");
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
  const heading = data?.page?.[0]?.heading || "Highlights Nearby";

  const getLocationIcon = (locationName) => {
    const iconMap = {
      "PUNE - BANGALORE": <LocateFixed size={20} />,
      "Metro Station": <Train size={20} />,
      "Balewadi Stadium": <Building size={20} />,
      "Phoenix Market City": <ShoppingBag size={20} />,
      Hinjewadi: <Briefcase size={20} />,
      "Pune University": <GraduationCap size={20} />,
      Shivajinagar: <Landmark size={20} />,
      "Pune Station": <TrainFront size={20} />,
      "Pune Airport": <Plane size={20} />,
    };
    return iconMap[locationName] || <MapPin size={20} />;
  };

  const getChunkSize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      return 3;
    }
    return 3;
  };

  const [chunkSize, setChunkSize] = useState(getChunkSize());

  useEffect(() => {
    const updateSize = () => setChunkSize(getChunkSize());
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const slides = useMemo(() => {
    const itemsPerSlide = chunkSize * 2;
    const chunks = [];
    for (let i = 0; i < locationAdvantages.length; i += itemsPerSlide) {
      chunks.push(locationAdvantages.slice(i, i + itemsPerSlide));
    }
    return chunks;
  }, [locationAdvantages, chunkSize]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  const showArrows = locationAdvantages.length > 6 || chunkSize === 1;

  return (
    <>
      {loading ? (
        <div className="min-h-[400px] bg-[#F8FAFC] flex items-center justify-center">
          <Loader size={28} className="text-[#0F766E] animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-[#F8FAFC] p-6">
          <p className="text-red-500 bg-red-100 p-4 rounded-md">
            Error: {error}
          </p>
        </div>
      ) : (
        <section className="bg-[#F8FAFC] py-16 px-4 sm:px-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F766E] mb-2">
              {heading}
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base mb-10">
              Key destinations and connectivity around the project
            </p>
          </div>

          {slides.length > 0 && slides[currentSlide] && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {slides[currentSlide].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-[#E0F2F1] text-[#0F766E] rounded-full p-2">
                      {getLocationIcon(item.location)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#1E293B]">
                        {item.location}
                      </h4>
                      <p className="text-xs text-[#475569]">{item.distance}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <button
                    onClick={openDialog}
                    className="text-[#0F766E] text-sm font-medium underline hover:text-[#FACC15]"
                  >
                    View on map
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Arrows + Button */}
          {showArrows ? (
            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev - 1 + slides.length) % slides.length
                    )
                  }
                  className="p-3 rounded-full bg-white border border-[#CBD5E1] hover:bg-[#FACC15]/30 text-[#0F766E] shadow"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % slides.length)
                  }
                  className="p-3 rounded-full bg-white border border-[#CBD5E1] hover:bg-[#FACC15]/30 text-[#0F766E] shadow"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <button
                onClick={openDialog}
                className="mt-2 px-8 py-3 rounded-full bg-[#FACC15] text-[#1E293B] font-semibold hover:bg-[#eab308] shadow zoom-pulse"
              >
                Enquire About All Locations
              </button>
            </div>
          ) : (
            <div className="mt-10 flex justify-center">
              <button
                onClick={openDialog}
                className="px-8 py-3 rounded-full bg-[#FACC15] text-[#1E293B] font-semibold hover:bg-[#eab308] shadow zoom-pulse"
              >
                Enquire About All Locations
              </button>
            </div>
          )}
        </section>
      )}
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default LocationAdvantages;
