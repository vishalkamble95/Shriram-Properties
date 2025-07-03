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

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

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
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [closeLightbox]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevious(e);
      else if (e.key === "ArrowRight") goToNext(e);
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, closeLightbox]);

  const lightboxContent = (
    <div className="fixed inset-0 w-full h-full bg-[#06202B]/95 z-[9999] flex items-center justify-center">
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#7AE2CF] hover:bg-[#F5EEDD] text-[#06202B] p-3 rounded-full shadow-lg z-50"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#7AE2CF] hover:bg-[#F5EEDD] text-[#06202B] p-3 rounded-full shadow-lg z-50"
      >
        <ChevronRight size={24} />
      </button>

      <div
        ref={lightboxContentRef}
        className="bg-[#077A7D] rounded-lg border border-[#7AE2CF] w-full max-w-2xl h-auto max-h-[90vh] flex flex-col"
      >
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={closeLightbox}
            className="bg-[#F5EEDD] hover:bg-[#7AE2CF] text-[#06202B] p-2 rounded-full shadow-md transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 relative flex items-center justify-center overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-[#077A7D] via-[#06202B] to-black rounded-b-lg">
          <img
            src={selectedImage.photo}
            alt="Enlarged view"
            className="max-h-[65vh] max-w-full object-contain transition-transform duration-300 rounded-md"
          />
        </div>

        <div className="text-[#F5EEDD] bg-[#06202B]/90 px-5 py-2 flex items-center justify-center text-sm font-medium tracking-wide border-t border-[#7AE2CF]">
          <Camera size={16} className="text-[#7AE2CF] mr-2" />
          <span>
            Image <span className="text-white">{currentIndex + 1}</span> of{" "}
            <span className="text-white">{images.length}</span>
          </span>
        </div>

        <div className="flex space-x-3 overflow-x-auto p-3 bg-gradient-to-r from-[#06202B] via-[#077A7D] to-[#06202B] rounded-b-lg scrollbar-thin scrollbar-thumb-[#7AE2CF] scrollbar-track-transparent">
          {images.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-14 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                idx === currentIndex
                  ? "border-[#F5EEDD] ring-2 ring-[#7AE2CF]/50 scale-105"
                  : "border-[#7AE2CF] hover:border-[#F5EEDD]"
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

  return ReactDOM.createPortal(lightboxContent, document.body);
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const imagesPerRow = 4;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/gallary?website=${config.SLUG_URL}`
        );
        if (!response.ok) throw new Error("Failed to fetch gallery data");
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + imagesPerRow) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const currentImages = images.slice(
    carouselIndex,
    carouselIndex + imagesPerRow
  );
  if (currentImages.length < imagesPerRow) {
    currentImages.push(...images.slice(0, imagesPerRow - currentImages.length));
  }

  return (
    <div
      className="bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] py-12 px-6 md:px-12 lg:px-20"
      id="gallery"
    >
      {/* Header Section */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center mb-4 relative">
          <div className="w-1 h-10 bg-gradient-to-b from-[#7AE2CF] to-[#F5EEDD] rounded-full mr-3 shadow-lg animate-pulse"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5EEDD] drop-shadow-md tracking-tight">
            {heading || "Property Gallery"}
          </h2>
        </div>
        <p className="text-[#7AE2CF] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore the stunning views of this premium property, designed to
          inspire and impress.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 px-6 sm:px-10 lg:px-10 py-10">
        {currentImages.map((img, index) => (
          <div
            key={img.id}
            onClick={() =>
              openLightbox(img, (carouselIndex + index) % images.length)
            }
            className="cursor-pointer aspect-square bg-gradient-to-br from-[#077A7D] via-[#06202B] to-[#7AE2CF] p-[8px] shadow-xl hover:shadow-[#7AE2CF]/40 transition-all duration-300"
            style={{
              borderTopRightRadius: "1.25rem",
              borderBottomLeftRadius: "1.25rem",
              borderTopLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
          >
            <div
              className="w-full h-full bg-[#F5EEDD] overflow-hidden flex items-center justify-center"
              style={{
                borderTopRightRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                borderTopLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              <img
                src={img.photo}
                alt={`Property image`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 hover:rotate-[0.3deg]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Component */}
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
