import React, { useState, useEffect } from "react";
import { Home, Building, Calendar, MapPin, Tag } from "lucide-react";

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
            <div className="md:hidden w-full relative">
              {propertyData.hero_banner_img?.mobile?.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-full transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${propertyData.property_name} - View ${index + 1}`}
                    className="w-full h-auto object-cover"
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

        {/* Cards Section */}
        <div className="w-full max-w-6xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 bg-[#7AE2CF]/10 p-6 sm:p-8 md:p-10 rounded-2xl">
            {/* Card 1 */}
            <div className="bg-white shadow-md hover:shadow-xl border border-[#7AE2CF]/30 p-5 md:p-6 rounded-2xl transition-transform hover:scale-[1.015] flex flex-col items-center justify-center text-center space-y-2">
              <Building className="text-[#077A7D]" size={24} />
              <p className="text-sm font-medium text-[#06202B]">
                {propertyData.builder_name}
              </p>
              <div className="flex items-center justify-center text-sm text-[#06202B]">
                <MapPin size={14} className="mr-1" />
                <span>{propertyData.location}</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-md hover:shadow-xl border border-[#7AE2CF]/30 p-5 md:p-6 rounded-2xl transition-transform hover:scale-[1.015] flex flex-col items-center justify-center text-center space-y-2">
              <Home className="text-[#077A7D]" size={24} />
              <p className="text-sm font-medium text-[#06202B]">
                {propertyData.property_type_price_range_text}
              </p>
              <span className="text-base font-semibold text-[#06202B]">
                {propertyData.property_area_min_max}
              </span>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-md hover:shadow-xl border border-[#7AE2CF]/30 p-5 md:p-6 rounded-2xl transition-transform hover:scale-[1.015] flex flex-col items-center justify-center text-center space-y-3">
              <h4 className="text-sm font-semibold text-[#06202B]">
                Project Highlights
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {["MahaRERA Approved", "Bank Approved", "Special Offer", "Prime Location", "Modern Design", "Future-Ready"].map(
                  (label, index) => (
                    <div
                      key={index}
                      className="bg-[#077A7D] backdrop-blur-sm px-3 py-1 rounded-full flex items-center border border-[#7AE2CF]/20 shadow-sm hover:scale-105 transition-transform"
                    >
                      <Tag size={12} className="text-white mr-2" />
                      <span className="text-xs font-medium text-white">
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white shadow-md hover:shadow-xl border border-[#7AE2CF]/30 p-5 md:p-6 rounded-2xl transition-transform hover:scale-[1.015] flex flex-col items-center justify-center text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-[#06202B]">
                <Calendar className="text-[#077A7D]" size={16} />
                <h3 className="text-sm font-medium">Last Updated:</h3>
              </div>
              <p className="text-sm text-[#06202B]">
                {new Date(
                  propertyData.property_last_updated
                ).toLocaleDateString()}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="col-span-full text-[#06202B] text-sm bg-[#7AE2CF]/40 p-4 rounded-md border border-[#077A7D]/30">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-4xl mt-2 mb-8 flex flex-col md:flex-row gap-4 px-4">
          {/* Book Site Visit Button */}
          <button
            onClick={openDialog}
            className="relative group w-full md:w-1/2 bg-gradient-to-r from-[#077A7D] via-[#7AE2CF] to-[#F5EEDD] text-[#06202B] font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center text-base shadow-md hover:shadow-lg hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <Calendar className="mr-2" size={18} />
              Book Site Visit
            </span>

            {/* Shine sweep effect */}
            <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/30 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
          </button>

          {/* View Details Link */}
          <a
            href="#price"
            className="relative group w-full md:w-1/2 border border-[#06202B]/20 bg-white/60 hover:bg-[#F5EEDD]/80 text-[#06202B] font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center text-base shadow-md hover:shadow-lg hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">View Details</span>

            {/* Shine sweep effect */}
            <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/20 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
