// Keep all imports as they are
import React, { useState, useEffect, useMemo } from "react";
import {
  Waves,
  Car,
  Dumbbell,
  ParkingCircle,
  Battery,
  Video,
  GamepadIcon,
  Forklift,
  Shield,
  Recycle,
  Loader,
  Volleyball,
  AlertCircle,
  Wifi,
  TentTree,
  Plug,
  Footprints,
  Theater,
  Dog,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import { API } from "../../config";

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        const response = await fetch(API.AMENITIES());

        if (!response.ok) {
          throw new Error("Failed to fetch amenities data");
        }

        const data = await response.json();
        setAmenities(data.amenities.amenities);
        setHeading(data.amenities.page.heading);
        setLoading(false);
      } catch (err) {
        console.log("something went wrong in fetch amenities ", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640)
        setItemsPerSlide(2); // mobile: 2 items = 1 per row × 2 rows
      else if (width < 1024) setItemsPerSlide(3); // tablet
      else setItemsPerSlide(4); // desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(amenities.length / itemsPerSlide);

  useEffect(() => {
    if (amenities.length === 0) return;

    const totalSlides = Math.ceil(amenities.length / itemsPerSlide);
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [amenities, itemsPerSlide]);

  const currentItems = useMemo(() => {
    return amenities.slice(
      activeSlide * itemsPerSlide,
      activeSlide * itemsPerSlide + itemsPerSlide
    );
  }, [amenities, activeSlide, itemsPerSlide]);

  // Map amenity names to corresponding icons with teal color
  // const getAmenityIcon = (amenityName) => {
  //   const iconMap = {
  //     "Swimming Pool": <Waves size={24} className="text-teal-400" />,
  //     "Parking Lot": <Car size={24} className="text-teal-400" />,
  //     Gym: <Dumbbell size={24} className="text-teal-400" />,
  //     "Cricket Pitch": <Volleyball size={24} className="text-teal-400" />,
  //     "Cover Parking Lot": (
  //       <ParkingCircle size={24} className="text-teal-400" />
  //     ),
  //     "Battery Backup": <Battery size={24} className="text-teal-400" />,
  //     CCTV: <Video size={24} className="text-teal-400" />,
  //     "Indoor Games": <GamepadIcon size={24} className="text-teal-400" />,
  //     Lift: <Forklift size={24} className="text-teal-400" />,
  //     "Security Gaurd": <Shield size={24} className="text-teal-400" />,
  //     "Solid Waste management": <Recycle size={24} className="text-teal-400" />,
  //     "Free Wifi": <Wifi size={24} className="text-teal-400" />,
  //     Amphitheater: <TentTree size={24} className="text-teal-400" />,
  //     "Electical Vehical Charging Point": (
  //       <Plug size={24} className="text-teal-400" />
  //     ),
  //     "Jogging Track": <Footprints size={24} className="text-teal-400" />,
  //     "Mini Theater": <Theater size={24} className="text-teal-400" />,
  //     Football: <Volleyball size={24} className="text-teal-400" />,
  //     "Pet Play Area": <Dog size={24} className="text-teal-400" />,
  //   };
  //   return (
  //     iconMap[amenityName] || <Shield size={24} className="text-teal-400" />
  //   );
  // };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader size={36} className="text-[#7AE2CF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="bg-[#06202B] border border-red-500/30 p-6 rounded-xl max-w-md w-full text-center">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#F5EEDD] mb-2">
            Error Loading Amenities
          </h2>
          <p className="text-[#F5EEDD] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-[#077A7D] to-[#06202B] text-[#F5EEDD] rounded-lg hover:from-[#06686a] hover:to-[#04161f] transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-16 py-16 bg-[#0E1A24]">
        <div className="flex items-center mb-8 px-2 sm:px-0">
          <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-[#FACC15] to-[#0F766E] rounded-full mr-4 shadow-md"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#CBD5E1] tracking-tight leading-snug drop-shadow-sm">
            {heading || "Premium Amenities"}
          </h2>
        </div>

        {/* Amenities Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-[#13212E] border border-[#CBD5E1]/10 group hover:border-[#FACC15] hover:shadow-[0_4px_20px_rgba(250,204,21,0.1)] shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col items-center text-center rounded-2xl"
            >
              <div className="w-full aspect-square bg-[#CBD5E1]/5 border border-[#CBD5E1]/10 shadow-inner overflow-hidden mb-4 rounded-xl">
                <img
                  src={amenity.property_amenities_photo}
                  alt={amenity.amenity_name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-[#CBD5E1] text-sm sm:text-base font-semibold group-hover:text-[#FACC15] transition-colors duration-300">
                {amenity.amenity_name}
              </h3>
            </div>
          ))}
        </div>

        {/* Updated Dots Style */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "w-8 bg-gradient-to-r from-[#FACC15] to-[#0F766E] shadow-[0_0_6px_#FACC15]"
                  : "w-4 bg-[#CBD5E1]/30"
              }`}
            ></div>
          ))}
        </div>

        <style>
          {`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-shine {
          animation: shine 2s infinite linear;
        }
      `}
        </style>

        {/* CTA Section */}
        <div className="mt-16 text-center px-6 py-8 sm:px-10 md:px-16 bg-[#0E1A24]/60 rounded-2xl border border-[#FACC15]/20 shadow-[0_0_30px_rgba(250,204,21,0.1)] relative overflow-hidden backdrop-blur-md">
          {/* Decorative Glow Orbs */}
          <div className="absolute top-[-2rem] left-[-2rem] w-52 h-52 bg-[#FACC15]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-2rem] right-[-2rem] w-52 h-52 bg-[#0F766E]/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="relative text-2xl sm:text-3xl font-extrabold text-[#CBD5E1] tracking-tight mb-8 inline-block">
              <span className="relative z-10">Discover Premium Amenities</span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-1/2 h-1 bg-gradient-to-r from-[#0F766E] to-[#FACC15] rounded-full"></span>
            </h3>
            <p className="text-[#CBD5E1]/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 px-4">
              Elevate your lifestyle with thoughtfully designed amenities,
              blending modern aesthetics and functionality. Our team is here to
              guide you.
            </p>
            <button
              onClick={openDialog}
              className="relative zoom-pulse inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#FACC15] to-[#FFE87A] text-[#0E1A24] font-bold text-sm sm:text-base shadow-lg hover:shadow-[0_0_20px_#FACC15] transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Explore Amenities</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default Amenities;
