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
import config from "../../config";

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
        const response = await fetch(
          `${config.API_URL}/amenities?website=${config.SLUG_URL}`
        );

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
      if (width < 640) setItemsPerSlide(2); // mobile
      else if (width < 1024) setItemsPerSlide(6); // tablet
      else setItemsPerSlide(8); // large screen
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
    }, 2000);

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
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-16 py-16 bg-gradient-to-b from-[#06202B] via-[#06202B]/95 to-[#077A7D]/90">
        <div className="flex items-center mb-8 px-2 sm:px-0">
          <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-[#077A7D] to-[#7AE2CF] rounded-full mr-4 shadow-md"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#F5EEDD] tracking-tight leading-snug drop-shadow-sm">
            {heading || "Premium Amenities"}
          </h2>
        </div>

        {/* Amenities Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-gradient-to-br from-[#7AE2CF]/10 via-[#077A7D]/10 to-[#F5EEDD]/10 border border-[#7AE2CF]/30 rounded-3xl group hover:border-[#7AE2CF] hover:shadow-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col items-center text-center"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#077A7D]/10 rounded-full flex items-center justify-center overflow-hidden mb-4 shadow group-hover:shadow-[#7AE2CF]/30 transition-shadow duration-300">
                <img
                  src={amenity.property_amenities_photo}
                  alt={amenity.amenity_name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-[#F5EEDD] text-sm sm:text-base font-semibold group-hover:text-[#7AE2CF] transition-colors duration-300">
                {amenity.amenity_name}
              </h3>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                index === activeSlide
                  ? "bg-[#077A7D] scale-110"
                  : "bg-[#7AE2CF]/40"
              } transition-all duration-300`}
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
        <div className="mt-16 text-center px-6 py-12 sm:px-10 md:px-16 bg-gradient-to-br from-[#06202B] via-[#077A7D] to-[#7AE2CF] rounded-3xl border border-[#F5EEDD]/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Radial glow shimmer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,226,207,0.12)_0%,transparent_75%)] opacity-80 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5EEDD] tracking-tight mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Want to learn more about our amenities?
            </h3>
            <p className="text-[#F5EEDD]/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Discover how our premium amenities can elevate your lifestyle. Our
              team is ready to assist you at every step.
            </p>
            <button
              onClick={openDialog}
              className="relative group overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-[#06202B] font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
            >
              <span className="relative z-10">Enquire About Amenities</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 h-5 w-5"
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

              {/* Shine sweep effect */}
              <span className="absolute left-[-75%] top-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            </button>
          </div>
        </div>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default Amenities;
