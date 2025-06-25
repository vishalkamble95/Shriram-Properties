import React, { useState, useEffect } from "react";
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
        <Loader size={36} className="text-teal-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="bg-slate-800 border border-red-900/30 p-6 rounded-xl max-w-md w-full text-center">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Amenities
          </h2>
          <p className="text-slate-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mx-auto px-8 sm:px-8 lg:px-16 py-16 bg-[#622569]">
        <div className="flex items-center mb-8 px-2 sm:px-0">
          <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-[#5b9aa0] to-[#b8a9c9] rounded-full mr-4 shadow-md"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#d6d4e0] tracking-tight leading-snug drop-shadow-sm">
            {heading || "Premium Amenities"}
          </h2>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-[#5b9aa0]/20 border border-[#b8a9c9]/30 rounded-2xl group hover:border-[#5b9aa0] hover:shadow-[#5b9aa0]/10 shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 sm:w-36 sm:h-36 bg-[#5b9aa0]/20 rounded-full flex items-center justify-center overflow-hidden mb-4 shadow-md group-hover:shadow-[#5b9aa0]/20 transition-shadow duration-300">
                <img
                  src={amenity.property_amenities_photo}
                  alt={amenity.amenity_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[#d6d4e0] text-sm sm:text-base font-semibold group-hover:text-[#b8a9c9] transition-colors duration-300">
                {amenity.amenity_name}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center px-6 py-12 sm:px-10 md:px-16 bg-gradient-to-br from-[#622569] via-[#5b9aa0] to-[#b8a9c9] rounded-2xl border border-[#d6d4e0]/30 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,211,224,0.15)_0%,transparent_70%)] opacity-80 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
              Want to learn more about our amenities?
            </h3>
            <p className="text-[#d6d4e0] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Discover how our premium amenities can elevate your lifestyle. Our
              team is ready to assist you at every step.
            </p>
            <button
              onClick={openDialog}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white font-semibold text-sm sm:text-base hover:from-[#4c8a90] hover:to-[#a892b5] transition-all duration-300 shadow-lg shadow-[#5b9aa0]/20 hover:scale-105 active:scale-100"
            >
              <span>Enquire About Amenities</span>
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
