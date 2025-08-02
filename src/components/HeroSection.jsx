import React, { useState, useEffect } from "react";
import {
  Home,
  Building,
  Download,
  Phone,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react";

function HeroSection({ propertyData, loading, error, openDialog }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate hero images every 5 seconds
  useEffect(() => {
    if (!loading && propertyData.hero_banner_img?.desktop?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prev) => (prev + 1) % propertyData.hero_banner_img.desktop.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, propertyData]);

  // Navigate to different images
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative bg-[#0E1A24]">
      {/* HERO IMAGE (unchanged layout, still full screen) */}
      <div className="h-screen w-full relative overflow-hidden">
        {loading ? (
          <div className="h-full w-full bg-[#CBD5E1]/10 animate-pulse"></div>
        ) : (
          <>
            {/* Desktop Images */}
            <div className="hidden md:block h-full w-full">
              {propertyData.hero_banner_img?.desktop?.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${propertyData.property_name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Images */}
            <div className="md:hidden w-full h-full relative overflow-hidden">
              {propertyData.hero_banner_img?.mobile?.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${propertyData.property_name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            {propertyData.hero_banner_img?.desktop?.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {propertyData.hero_banner_img.desktop.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-[#FACC15]"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* CONTENT SECTION (redesigned) */}
      <div className="bg-[#0E1A24] text-[#CBD5E1] px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        {/* Heading & Location */}
        {loading ? (
          <div className="text-center space-y-4 mb-12">
            <div className="h-8 w-60 mx-auto bg-[#CBD5E1]/20 rounded animate-pulse" />
            <div className="h-4 w-40 mx-auto bg-[#CBD5E1]/20 rounded animate-pulse" />
          </div>
        ) : (
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FACC15] mb-4">
              {propertyData.hero_banner_heading}
            </h1>
            <div className="flex justify-center items-center gap-2 text-[#0F766E] text-base sm:text-lg font-medium">
              <MapPin size={20} />
              <span>{propertyData.location}</span>
            </div>
          </div>
        )}

        {/* Property Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-12">
          {[
            {
              label: "Property Type",
              value: propertyData?.property_type_price_range_text,
            },
            {
              label: "Developer",
              value: propertyData?.builder_name,
            },
            {
              label: "Project Status",
              value: propertyData?.property_status ?? "Active",
            },
            {
              label: "Location",
              value: propertyData?.location ?? "Pune, Maharashtra",
            },
            {
              label: "Last Updated",
              value: propertyData?.property_last_updated,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#0F766E]/10 border border-[#0F766E]/30 rounded-xl p-5 text-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-sm text-[#0F766E] font-medium mb-2">
                {item.label}
              </div>
              <div className="text-[#CBD5E1] font-semibold text-base">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={openDialog}
            className="relative group flex items-center justify-center gap-2 bg-gradient-to-r from-[#0F766E] to-[#FACC15] text-[#0E1A24] px-6 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all duration-300 zoom-pulse overflow-hidden"
          >
            <Download size={18} className="relative z-10" />
            <span className="relative z-10">Download Brochure</span>
            <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
          </button>

          <a
            href="#contact"
            className="relative group flex items-center justify-center gap-2 border border-[#FACC15] text-[#FACC15] px-6 py-3 rounded-lg font-semibold hover:bg-[#FACC15] hover:text-[#0E1A24] shadow-md transition-all duration-300 zoom-pulse overflow-hidden"
          >
            <Phone size={18} className="relative z-10" />
            <span className="relative z-10">Contact</span>
            <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
