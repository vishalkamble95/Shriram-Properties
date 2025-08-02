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
import { API } from "../../config";

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

  const useImagesToShow = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
      const updateCount = () => {
        const width = window.innerWidth;
        if (width >= 1024) setCount(3); // Desktop
        else if (width >= 640) setCount(2); // Tablet
        else setCount(1); // Mobile
      };

      updateCount(); // Initial run
      window.addEventListener("resize", updateCount);
      return () => window.removeEventListener("resize", updateCount);
    }, []);

    return count;
  };

  const imagesToShow = useImagesToShow(); // Responsive count

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(API.GALLERY());
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

  // Auto-slide every 4 seconds ONLY if Lightbox is not open
  useEffect(() => {
    if (!images.length || selectedImage) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images, selectedImage]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Display only a sliding window of images
  const getVisibleImages = () => {
    if (!images || images.length === 0) return [];
    const visible = [];
    for (let i = 0; i < imagesToShow; i++) {
      visible.push(images[(currentIndex + i) % images.length]);
    }
    return visible.filter(Boolean); // Filters out undefined values
  };

  const visibleImages = getVisibleImages();

  return (
  <div
    className="relative bg-gradient-to-b from-[#0E1A24] via-[#0F766E] to-[#0E1A24] py-16 px-4 sm:px-10 lg:px-20"
    id="gallery"
  >
    {/* Header */}
    <div className="mb-12 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="w-1 h-10 bg-gradient-to-b from-[#FACC15] to-[#CBD5E1] rounded-full mr-3 animate-pulse shadow-lg"></div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#CBD5E1] tracking-tight drop-shadow-md">
          {heading || "Property Gallery"}
        </h2>
      </div>
      <p className="text-[#FACC15] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        Explore the stunning views of this premium property, designed to
        inspire and impress.
      </p>
    </div>

    {/* Carousel */}
    <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
      {/* Left Arrow */}
      <button
        onClick={slideLeft}
        className="absolute z-10 p-2 sm:p-3 lg:p-4 rounded-full bg-gradient-to-b from-[#FACC15] to-[#CBD5E1]
        text-[#0E1A24] shadow-lg hover:shadow-[#FACC15]/40 transition duration-300
        top-1/2 -translate-y-1/2
        left-0 sm:left-[-2rem] lg:left-[-3rem]"
      >
        <ChevronLeft />
      </button>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 sm:px-6 lg:px-8">
        {visibleImages.map((img, index) => (
          <div
            key={img.id}
            className="cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-tr from-[#0F766E] via-[#0E1A24] to-[#FACC15] 
            p-[6px] shadow-2xl hover:shadow-[#FACC15]/40 transition-transform duration-300"
            onClick={() =>
              openLightbox(img, (currentIndex + index) % images.length)
            }
          >
            <div className="bg-[#CBD5E1] rounded-2xl overflow-hidden">
              <img
                src={img.photo}
                alt="Property"
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={slideRight}
        className="absolute z-10 p-2 sm:p-3 lg:p-4 rounded-full bg-gradient-to-b from-[#FACC15] to-[#CBD5E1]
        text-[#0E1A24] shadow-lg hover:shadow-[#FACC15]/40 transition duration-300
        top-1/2 -translate-y-1/2
        right-0 sm:right-[-2rem] lg:right-[-3rem]"
      >
        <ChevronRight />
      </button>
    </div>

    {/* Lightbox */}
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
