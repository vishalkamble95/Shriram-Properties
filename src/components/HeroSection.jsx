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
    <section className="relative bg-[#06202B]">
      {/* Hero Image Container - Significantly reduced height on mobile */}
      <div className="h-auto md:h-screen w-full relative overflow-hidden">
        {loading ? (
          <div className="h-full w-full bg-[#5b9aa0]/10 animate-pulse"></div>
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
            <div className="md:hidden w-full h-screen relative overflow-hidden">
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

            {/* Image navigation dots - Smaller on mobile */}
            {propertyData.hero_banner_img?.desktop?.length > 1 && (
              <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center space-x-1 md:space-x-2 z-20">
                {propertyData.hero_banner_img.desktop.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`h-1 md:h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-[#5b9aa0] w-6 md:w-8"
                        : "bg-white/50 w-1 md:w-2 hover:bg-white/80"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Content Overlay - Reduced margins for compact and professional spacing */}
      <div className="flex flex-col justify-center items-center text-[#06202B] pt-12 pb-12 px-4 sm:px-6 md:px-10 bg-[#F5EEDD]">
        {/* Content */}
        <div className="text-center md:text-left w-full max-w-6xl mb-8">
          {loading ? (
            <>
              <div className="h-6 md:h-12 w-36 md:w-64 bg-[#7AE2CF]/30 animate-pulse rounded mb-4 mx-auto md:mx-0"></div>
              <div className="h-3 md:h-6 w-24 md:w-48 bg-[#7AE2CF]/30 animate-pulse rounded mb-6 mx-auto md:mx-0"></div>
            </>
          ) : (
            <>
              <div className="bg-[#06202B]/10 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg w-full max-w-3xl mx-auto text-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#06202B] drop-shadow-md">
                  {propertyData.hero_banner_heading}
                </h1>
                <div className="flex items-center justify-center text-[#077A7D] drop-shadow-sm">
                  <MapPin size={16} className="mr-2" />
                  <p className="text-sm md:text-lg font-medium">
                    {propertyData.location}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Specifications Section */}
        <div className="w-full space-y-8 px-4 sm:px-6 lg:px-12 py-10 bg-gradient-to-br from-[#F5EEDD] to-[#7AE2CF]/10 rounded-2xl shadow-xl border border-[#5b9aa0]/10 backdrop-blur-md transition-all duration-300 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#06202B] mb-10 flex items-center space-x-3 justify-center">
            <Building size={26} className="text-[#077A7D]" />
            <span className="bg-[#7AE2CF]/10 text-[#077A7D] px-5 py-2 text-base rounded-full border border-[#7AE2CF]/30 shadow-sm">
              Property Specifications
            </span>
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
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
                badge: true,
              },
              {
                label: "Location",
                value:
                  propertyData?.location || "Pune, Maharashtra",
                badge: true,
              },
              {
                label: "Last Updated",
                value: propertyData?.property_last_updated,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="w-[90%] sm:w-[45%] md:w-[30%] xl:w-[18%] max-w-[300px] bg-white/90 border border-[#5b9aa0]/20 rounded-2xl p-6 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <span className="text-sm font-medium text-[#077A7D] mb-1 block">
                  {item.label}
                </span>
                {item.badge ? (
                  <span className="inline-block px-3 py-1 bg-[#7AE2CF]/20 text-[#06202B] border border-[#7AE2CF]/30 text-xs font-semibold rounded-md">
                    {item.value}
                  </span>
                ) : (
                  <span className="text-[#06202B] font-semibold text-base">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4">
            <button
              onClick={openDialog}
              className="relative group w-full sm:w-60 py-3 px-6 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] hover:from-[#066568] hover:to-[#64c9b9] active:from-[#044e50] active:to-[#4db0a0] rounded-lg text-white font-semibold flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#077A7D]/20 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Download size={18} className="mr-2" />
                Download Brochure
              </span>
              {/* Shine sweep effect */}
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            </button>

            <a
              href="#contact"
              className="relative group w-full sm:w-60 py-3 px-6 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] hover:from-[#066568] hover:to-[#64c9b9] active:from-[#044e50] active:to-[#4db0a0] rounded-lg text-white font-semibold flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#077A7D]/20 overflow-hidden text-center"
            >
              <span className="relative z-10 flex items-center">
                <Phone size={18} className="mr-2 text-white" />
                Contact
              </span>

              {/* Shine sweep effect */}
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
