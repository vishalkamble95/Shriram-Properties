import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  Loader,
  Maximize,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
} from "lucide-react";
import config from "../../config";

// Lightbox component that renders into a portal
const Lightbox = ({ images, currentIndex, setCurrentIndex, closeLightbox }) => {
  const lightboxContentRef = useRef(null);
  const selectedImage = images[currentIndex];

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  // Handle global click event to close lightbox when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (
        lightboxContentRef.current &&
        !lightboxContentRef.current.contains(e.target) &&
        !e.target.closest(".lightbox-control")
      ) {
        closeLightbox();
      }
    };

    setTimeout(() => {
      window.addEventListener("click", handleGlobalClick);
    }, 100);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [closeLightbox]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, closeLightbox]);

  // Create the lightbox content
  const lightboxContent = (
    <div className="fixed inset-0 w-full h-full bg-[#622569]/95 z-[9999] flex items-center justify-center">
      <div
        ref={lightboxContentRef}
        className="bg-[#5b9aa0] rounded-lg border border-[#b8a9c9] w-full max-w-2xl h-auto max-h-[90vh] flex flex-col"
      >
        {/* Close button */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={closeLightbox}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image viewer with navigation */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-[#5b9aa0] via-[#622569] to-black rounded-b-lg">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#b8a9c9] hover:bg-[#d6d4e0] text-white p-3 rounded-full border border-[#d6d4e0] hover:shadow-lg transition-all duration-300 z-10"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Enlarged Image */}
          <img
            src={selectedImage.photo}
            alt="Enlarged view"
            className="max-h-[65vh] max-w-full object-contain transition-transform duration-500 group-hover:scale-105 rounded-md"
          />

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#b8a9c9] hover:bg-[#d6d4e0] text-white p-3 rounded-full border border-[#d6d4e0] hover:shadow-lg transition-all duration-300 z-10"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Image counter */}
        <div className="text-[#d6d4e0] bg-[#622569]/90 px-5 py-2 flex items-center justify-center text-sm font-medium tracking-wide border-t border-[#b8a9c9]">
          <Camera size={16} className="text-[#b8a9c9] mr-2" />
          <span>
            Image <span className="text-white">{currentIndex + 1}</span> of{" "}
            <span className="text-white">{images.length}</span>
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-3 overflow-x-auto p-3 bg-gradient-to-r from-[#622569] via-[#5b9aa0] to-[#622569] rounded-b-lg scrollbar-thin scrollbar-thumb-[#b8a9c9] scrollbar-track-transparent">
          {images.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-14 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                idx === currentIndex
                  ? "border-[#d6d4e0] ring-2 ring-[#5b9aa0]/50 scale-105"
                  : "border-[#b8a9c9] hover:border-[#5b9aa0]"
              }`}
            >
              <img
                src={img.photo}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Use React Portal to render the lightbox at the document body level
  return ReactDOM.createPortal(lightboxContent, document.body);
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/gallary?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }

        const data = await response.json();
        setImages(data.property_photos);
        setHeading(data.page[0].heading);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-teal-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-[300px] p-8">
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-red-400">
          <p>Failed to load gallery: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#622569] p-6" id="gallery">
      {/* Header Section */}
      <div className="mb-10 text-center px-4 sm:px-6">
        <div className="flex items-center justify-center mb-4 relative">
          <div className="w-1 h-10 bg-gradient-to-b from-[#b8a9c9] to-[#d6d4e0] rounded-full mr-3 shadow-lg animate-pulse"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md tracking-tight">
            {heading || "Property Gallery"}
          </h2>
        </div>
        <p className="text-[#d6d4e0] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore the stunning views of this premium property, designed to
          inspire and impress.
        </p>
      </div>

      {/* Gallery Grid Section */}
      <div className="pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-3xl aspect-square cursor-pointer border border-[#5b9aa0] hover:border-[#d6d4e0] transition-all duration-300 shadow-lg hover:shadow-[#5b9aa0]/30 bg-gradient-to-tr from-[#5b9aa0]/60 to-[#b8a9c9]/60"
              onClick={() => openLightbox(image, index)}
            >
              <img
                src={image.photo}
                alt={`Property image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-[0.3deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-[#d6d4e0]/10 p-3 rounded-full border border-[#b8a9c9]/30 shadow-lg backdrop-blur-md transform scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out">
                  <Maximize
                    size={28}
                    className="text-[#5b9aa0] drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Glow Border Effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[#5b9aa0]/0 group-hover:ring-[#b8a9c9]/30 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Component rendered via Portal */}
      {selectedImage && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          closeLightbox={closeLightbox}
        />
      )}
    </div>
  );
};

export default Gallery;
