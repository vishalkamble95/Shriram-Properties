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
    <div className="fixed inset-0 w-full h-full bg-slate-900/95 z-[9999] flex items-center justify-center">
      <div
        ref={lightboxContentRef}
        className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-2xl h-auto max-h-[90vh] flex flex-col"
      >
        {/* Close button */}
        <div className="absolute top-2 right-2 z-10">
          <button
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full lightbox-control flex items-center justify-center"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>
        </div>

        {/* Image viewer with navigation */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden p-4">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-700 p-2 rounded-full text-white hover:bg-teal-500 transition-colors duration-300 z-10 border border-slate-600 lightbox-control"
            onClick={goToPrevious}
          >
            <ChevronLeft size={20} />
          </button>

          <img
            src={selectedImage.photo}
            alt="Enlarged view"
            className="max-h-[60vh] max-w-full object-contain"
          />

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-700 p-2 rounded-full text-white hover:bg-teal-500 transition-colors duration-300 z-10 border border-slate-600 lightbox-control"
            onClick={goToNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Image counter */}
        <div className="text-slate-300 bg-slate-700 px-4 py-2 flex items-center justify-center">
          <Camera size={16} className="text-teal-400 mr-2" />
          <span>
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-2 overflow-x-auto p-2 bg-slate-900">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`w-12 h-12 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                idx === currentIndex ? "border-teal-500" : "border-slate-700"
              } hover:border-emerald-500 transition-colors duration-200`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img
                src={img.photo}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
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
    <div className="bg-slate-800 p-6" id="gallery">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-white">
            {heading || "Property Gallery"}
          </h2>
        </div>
        <p className="text-slate-400 text-center">
          Explore the stunning views of this premium property
        </p>
      </div>

      {/* Gallery Grid - Fixed Height with Scroll */}
      <div className=" pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer border border-slate-700 hover:border-teal-500 transition-colors duration-200"
              onClick={() => openLightbox(image, index)}
            >
              <img
                src={image.photo}
                alt={`Property image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-teal-500/20 p-3 rounded-full border border-teal-500/40">
                  <Maximize size={24} className="text-teal-300" />
                </div>
              </div>
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
