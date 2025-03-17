import React, { useState, useEffect, useRef } from "react";
import {
  Loader,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Image as ImageIcon,
  Maximize,
  ImagePlus,
} from "lucide-react";
import config from "../../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightboxContentRef = useRef(null);

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

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Handle global click event to close lightbox when clicking outside
  useEffect(() => {
    if (!selectedImage) return; // Only attach listeners when lightbox is open

    const handleGlobalClick = (e) => {
      // Check if lightbox is open and click is outside content
      if (
        selectedImage &&
        lightboxContentRef.current &&
        !lightboxContentRef.current.contains(e.target) &&
        // Prevent closing when clicking navigation buttons or close button (which are outside the content ref)
        !e.target.closest('.lightbox-control')
      ) {
        closeLightbox();
      }
    };

    // Add a slight delay to avoid the click that opened the lightbox from also closing it
    setTimeout(() => {
      window.addEventListener('click', handleGlobalClick);
    }, 100);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [selectedImage]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

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
  }, [selectedImage, currentIndex]);

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
    <div className="bg-slate-800" id="gallery">
      <div className="mb-10">
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-slate-900/95 z-50 flex flex-col justify-center items-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-teal-400 p-2 rounded-full bg-slate-800 border border-slate-700 lightbox-control"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          <div ref={lightboxContentRef} className="relative w-full max-w-4xl max-h-[80vh] flex justify-center items-center">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full text-white hover:bg-teal-500 transition-colors duration-300 z-10 border border-slate-700 lightbox-control"
              onClick={goToPrevious}
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={selectedImage.photo}
              alt="Enlarged view"
              className="max-h-[80vh] max-w-full object-contain rounded-lg border border-slate-700"
            />

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full text-white hover:bg-teal-500 transition-colors duration-300 z-10 border border-slate-700 lightbox-control"
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-slate-300 mt-4 bg-slate-800 px-4 py-2 rounded-lg flex items-center border border-slate-700">
            <Camera size={16} className="text-teal-400 mr-2" />
            <span>
              Image {currentIndex + 1} of {images.length}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 max-w-4xl">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                  idx === currentIndex ? "border-teal-500" : "border-slate-700"
                } hover:border-emerald-500 transition-colors duration-200`}
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentIndex(idx);
                }}
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
      )}
    </div>
  );
};

export default Gallery;