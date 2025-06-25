import React, { useState, useEffect } from "react";
import {
  Play,
  Youtube,
  Loader,
  AlertCircle,
  Video,
  ExternalLink,
  Film,
  Clock,
  Tag,
  X,
} from "lucide-react";
import config from "../../config";

const VideoTour = () => {
  const [videos, setVideos] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/video?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }

        const data = await response.json();
        setVideos(data.property_videos);
        setHeading(data.page.heading);

        // Set the first video as active if available
        if (data.property_videos && data.property_videos.length > 0) {
          setActiveVideo(data.property_videos[0]);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openModal = (video, index) => {
    setActiveVideo(video);
    setActiveIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-[400px] p-8 flex items-center justify-center">
        <Loader size={32} className="text-teal-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-[400px] p-8 flex items-center justify-center">
        <div className="bg-slate-800 border border-red-900/30 p-6 rounded-lg max-w-lg">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle size={24} className="text-red-400" />
            <h3 className="text-lg font-medium text-red-300">
              Error Loading Tours
            </h3>
          </div>
          <p className="text-slate-300">
            We couldn't load the virtual tours: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#622569] relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5b9aa0]/30 to-[#622569]/90 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16">
          {/* ✅ Left Content Area */}
          <div className="w-full lg:w-2/5 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
            {/* <div className="flex items-center justify-center lg:justify-start gap-2">
          <div className="bg-[#5b9aa0]/10 border border-[#5b9aa0]/30 px-3 py-1 rounded-full flex items-center gap-1">
            <Film size={14} className="text-[#5b9aa0]" />
            <span className="text-[#5b9aa0] text-sm font-medium">
              Virtual Experience
            </span>
          </div>
        </div> */}

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d6d4e0] leading-tight">
              {heading || "Immersive Property Tour"}
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] rounded-full"></div>

            <p className="text-[#d6d4e0]/90 text-base sm:text-lg leading-relaxed max-w-xl">
              Experience our premium property from anywhere in the world. Our
              virtual tour puts you in control, allowing you to explore every
              detail and envision your future home.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Clock size={20} className="text-[#5b9aa0]" />
                <span className="text-[#d6d4e0] text-sm sm:text-base">
                  Available 24/7 for your convenience
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Tag size={20} className="text-[#5b9aa0]" />
                <span className="text-[#d6d4e0] text-sm sm:text-base">
                  High-definition quality visuals
                </span>
              </div>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${videos[0]?.youtube_video_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white font-medium text-sm sm:text-base hover:from-[#5b9aa0]/90 hover:to-[#b8a9c9]/90 active:from-[#5b9aa0]/80 active:to-[#b8a9c9]/80 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#5b9aa0]/30"
            >
              <span>View All Tours on YouTube</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* ✅ Right Video Player Area */}
          <div className="w-full lg:w-3/5">
            <div className="bg-[#b8a9c9]/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-[#d6d4e0]/20">
              {/* Video Thumbnail */}
              <div className="relative aspect-video group overflow-hidden rounded-xl">
                {/* Thumbnail Image */}
                <img
                  src={`https://img.youtube.com/vi/${activeVideo?.youtube_video_id}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay + Button */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="w-full h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                flex items-center justify-center pointer-events-auto"
                  >
                    <button
                      onClick={() => openModal(activeVideo, activeIndex)}
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-full 
                  bg-gradient-to-br from-[#5b9aa0] to-[#b8a9c9] 
                  text-white shadow-xl 
                  hover:scale-110 hover:shadow-[#5b9aa0]/40 
                  transition-transform duration-300 
                  flex items-center justify-center"
                      aria-label="Play video"
                    >
                      <Play size={32} fill="currentColor" className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between text-center sm:text-left mb-4 gap-4 sm:gap-0">
                  <div className="flex items-center gap-2 text-[#d6d4e0]">
                    <Youtube size={20} className="text-[#5b9aa0]" />
                    <span className="font-medium tracking-wide text-sm sm:text-base">
                      Featured Tour
                    </span>
                  </div>
                  <button
                    onClick={() => openModal(activeVideo, activeIndex)}
                    className="px-4 py-2 bg-[#622569]/80 hover:bg-[#5b9aa0] text-white rounded-lg transition-colors duration-300 flex items-center gap-2 text-sm sm:text-base shadow-sm hover:shadow-md"
                  >
                    <span>Watch Now</span>
                    <Play size={16} />
                  </button>
                </div>

                {/* Thumbnails if multiple videos */}
                {videos.length > 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {videos.map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() => {
                          setActiveVideo(video);
                          setActiveIndex(index);
                        }}
                        className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 group ${
                          activeVideo?.id === video.id
                            ? "border-2 border-[#5b9aa0] shadow-lg shadow-[#5b9aa0]/30 scale-105"
                            : "opacity-80 hover:opacity-100 border border-[#d6d4e0]/20 hover:scale-105"
                        }`}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {activeVideo?.id === video.id && (
                          <div className="absolute inset-0 bg-black/30" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-10">
          <div className="relative bg-[#622569] rounded-2xl overflow-hidden w-full max-w-4xl border border-[#d6d4e0]/20 shadow-2xl shadow-black/70">
            {/* Close Button in Top-Right */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-[#b8a9c9]/30 text-white rounded-full hover:text-red-400 hover:bg-[#b8a9c9]/50 transition-colors z-50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Video */}
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtube_video_id}?autoplay=1`}
                title="Virtual Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-t-2xl"
              />
            </div>

            {/* Footer Metadata */}
            <div className="p-4 bg-[#b8a9c9]/10 border-t border-[#d6d4e0]/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                <Youtube size={18} className="text-[#5b9aa0]" />
                <span>
                  Tour <span className="font-semibold">{activeIndex + 1}</span>{" "}
                  of <span className="font-semibold">{videos.length}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTour;
