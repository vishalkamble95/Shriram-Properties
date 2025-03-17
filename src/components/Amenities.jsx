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
  const getAmenityIcon = (amenityName) => {
    const iconMap = {
      "Swimming Pool": <Waves size={24} className="text-teal-400" />,
      "Parking Lot": <Car size={24} className="text-teal-400" />,
      Gym: <Dumbbell size={24} className="text-teal-400" />,
      "Cricket Pitch": <Volleyball size={24} className="text-teal-400" />,
      "Cover Parking Lot": (
        <ParkingCircle size={24} className="text-teal-400" />
      ),
      "Battery Backup": <Battery size={24} className="text-teal-400" />,
      CCTV: <Video size={24} className="text-teal-400" />,
      "Indoor Games": <GamepadIcon size={24} className="text-teal-400" />,
      Lift: <Forklift size={24} className="text-teal-400" />,
      "Security Gaurd": <Shield size={24} className="text-teal-400" />,
      "Solid Waste management": <Recycle size={24} className="text-teal-400" />,
      "Free Wifi": <Wifi size={24} className="text-teal-400" />,
      Amphitheater: <TentTree size={24} className="text-teal-400" />,
      "Electical Vehical Charging Point": (
        <Plug size={24} className="text-teal-400" />
      ),
      "Jogging Track": <Footprints size={24} className="text-teal-400" />,
      "Mini Theater": <Theater size={24} className="text-teal-400" />,
      Football: <Volleyball size={24} className="text-teal-400" />,
      "Pet Play Area": <Dog size={24} className="text-teal-400" />,
    };

    return (
      iconMap[amenityName] || <Shield size={24} className="text-teal-400" />
    );
  };

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
      <div>
        <div className="flex items-center mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-white">
            {heading || "Premium Amenities"}
          </h2>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden group hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 group-hover:bg-teal-900/30 transition-all duration-300">
                  {getAmenityIcon(amenity.amenity_name)}
                </div>
                <h3 className="text-white font-medium group-hover:text-teal-300 transition-colors duration-300">
                  {amenity.amenity_name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-4">
              Want to learn more about our amenities?
            </h3>
            <p className="text-slate-300 max-w-lg mx-auto mb-6">
              Discover how our premium amenities can enhance your living
              experience. Our team is ready to answer all your questions.
            </p>
            <button
              onClick={openDialog}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-teal-500/20"
            >
              Enquire About Amenities
            </button>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default Amenities;
