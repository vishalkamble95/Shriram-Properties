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
import { API } from "../../config";

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
        const response = await fetch(API.VIDEO());

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
      <div className="bg-[#06202B] min-h-[400px] p-8 flex items-center justify-center">
        <Loader size={32} className="text-[#7AE2CF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#06202B] min-h-[400px] p-8 flex items-center justify-center">
        <div className="bg-[#077A7D]/20 border border-red-500/40 p-6 rounded-lg max-w-lg">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle size={24} className="text-red-400" />
            <h3 className="text-lg font-medium text-red-300">
              Error Loading Tours
            </h3>
          </div>
          <p className="text-[#F5EEDD]">
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
    <div className="bg-[#222831] relative overflow-hidden">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/40 to-[#222831]/95 z-0" />

      {/* Main Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-16 lg:py-20 space-y-16">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00ADB5] drop-shadow-sm">
            {heading || "Immersive Property Tour"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00ADB5] to-[#393E46] mx-auto rounded-full" />
          <p className="text-[#EEEEEE]/90 text-base sm:text-lg leading-relaxed">
            Experience our premium property from anywhere in the world. Our
            virtual tour puts you in control, allowing you to explore every
            detail and envision your future home.
          </p>
        </div>

        {/* Horizontal Separator */}
        <div className="mb-8 border-t border-[#EEEEEE]/20 w-full max-w-5xl mx-auto"></div>

        {/* Feature + CTA Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mb-8 max-w-5xl mx-auto text-center sm:text-left">
          {/* Features */}
          <div className="space-y-4 sm:w-2/3 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#00ADB5]" />
              <span className="text-[#EEEEEE] text-sm sm:text-base">
                Available 24/7 for your convenience
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Tag size={20} className="text-[#00ADB5]" />
              <span className="text-[#EEEEEE] text-sm sm:text-base">
                High-definition quality visuals
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="sm:w-auto flex justify-center sm:justify-end">
            <a
              href={`https://www.youtube.com/watch?v=${videos[0]?.youtube_video_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-[#EEEEEE] font-bold text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#00ADB5]/40 overflow-hidden zoom-pulse"
            >
              <span className="relative z-10">View All Tours on YouTube</span>
              <ExternalLink size={16} className="relative z-10" />
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 z-0" />
            </a>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-[#EEEEEE]/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-[#00ADB5]/20 p-4 sm:p-8 lg:p-10">
          {/* Active Video */}
          <button
            onClick={() => openModal(activeVideo, activeIndex)}
            className="relative aspect-video group overflow-hidden rounded-xl w-full"
          >
            <img
              src={`https://img.youtube.com/vi/${activeVideo?.youtube_video_id}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-[#00ADB5] to-[#393E46] text-[#EEEEEE] shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Play size={32} fill="currentColor" className="ml-1" />
              </div>
            </div>
          </button>

          {/* Video Info */}
          <div className="mt-8 text-center sm:text-left space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[#EEEEEE]">
                <Youtube size={20} className="text-[#00ADB5]" />
                <span className="font-semibold tracking-wide text-sm sm:text-base">
                  Featured Tour
                </span>
              </div>
              <button
                onClick={() => openModal(activeVideo, activeIndex)}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-[#EEEEEE] font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 zoom-pulse"
              >
                <span>Watch Now</span>
                <Play size={16} />
              </button>
            </div>

            {/* Thumbnails */}
            {videos.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      setActiveVideo(video);
                      setActiveIndex(index);
                    }}
                    className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 group ${
                      activeVideo?.id === video.id
                        ? "border-2 border-[#00ADB5] shadow-md scale-105"
                        : "opacity-80 hover:opacity-100 border border-[#EEEEEE]/20 hover:scale-105"
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

        {/* Video Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-10">
            <div className="relative bg-[#222831] rounded-2xl overflow-hidden w-full max-w-4xl border border-[#00ADB5]/20 shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-[#00ADB5]/20 text-[#EEEEEE] rounded-full hover:text-red-400 hover:bg-[#00ADB5]/40 transition-colors z-50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtube_video_id}?autoplay=1`}
                  title="Virtual Tour"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-t-2xl"
                />
              </div>
              <div className="p-4 bg-[#00ADB5]/10 border-t border-[#00ADB5]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#EEEEEE] text-sm sm:text-base">
                  <Youtube size={18} className="text-[#00ADB5]" />
                  <span>
                    Tour{" "}
                    <span className="font-semibold">{activeIndex + 1}</span> of{" "}
                    <span className="font-semibold">{videos.length}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shine Animation */}
      <style>
        {`
      @keyframes shine {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }
      .animate-shine {
        animation: shine 2s infinite linear;
      }
    `}
      </style>
    </div>
  );
};

export default VideoTour;
