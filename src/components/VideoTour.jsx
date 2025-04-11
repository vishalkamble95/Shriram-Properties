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
    <div className="bg-slate-900 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-slate-900/80 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 px-4 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="md:flex gap-8 items-start">
          {/* Left content area */}
          <div className="md:w-2/5 mb-10 md:mb-0">
            <div className="flex items-center justify-start gap-2 mb-4">
              <div className="bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                <Film size={14} className="text-teal-300" />
                <span className="text-teal-300 text-sm font-medium">
                  Virtual Experience
                </span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {heading || "Immersive Property Tour"}
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6"></div>

            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Experience our premium property from anywhere in the world. Our
              virtual tour puts you in control, allowing you to explore every
              detail and envision your future home.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-teal-400" />
                <span className="text-white">
                  Available 24/7 for your convenience
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Tag size={20} className="text-teal-400" />
                <span className="text-white">
                  High-definition quality visuals
                </span>
              </div>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${videos[0]?.youtube_video_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 active:from-teal-700 active:to-emerald-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <span>View All Tours on YouTube</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Right action area */}
          <div className="md:w-3/5">
            <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/50 border border-slate-700/40">
              <div className="relative aspect-video overflow-hidden group">
                <img
                  src={`https://img.youtube.com/vi/${activeVideo?.youtube_video_id}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-slate-900/50 flex items-center justify-center">
                  <button
                    onClick={() => openModal(activeVideo, activeIndex)}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white h-20 w-20 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/30 group"
                  >
                    <Play size={36} className="ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Youtube size={20} className="text-teal-400" />
                    <span className="text-white font-medium">
                      Featured Tour
                    </span>
                  </div>
                  <button
                    onClick={() => openModal(activeVideo, activeIndex)}
                    className="px-4 py-2 text-white flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-teal-600 transition-colors duration-300"
                  >
                    <span>Watch Now</span>
                    <Play size={16} />
                  </button>
                </div>

                {/* Navigation dots for multiple videos */}
                {videos.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {videos.map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() => {
                          setActiveVideo(video);
                          setActiveIndex(index);
                        }}
                        className={`h-2 transition-all duration-300 rounded-full ${
                          activeVideo?.id === video.id
                            ? "w-8 bg-teal-400"
                            : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`View video ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Video thumbnails - only show if multiple videos */}
            {videos.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      setActiveVideo(video);
                      setActiveIndex(index);
                    }}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      activeVideo?.id === video.id
                        ? "border-teal-400 shadow-md shadow-teal-400/20"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`}
                      alt={`Tour thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-4xl border border-slate-700/40 shadow-2xl">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtube_video_id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            <div className="p-4 bg-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Youtube size={18} className="text-teal-400" />
                <span className="text-white">
                  Tour {activeIndex + 1} of {videos.length}
                </span>
              </div>

              <button
                onClick={closeModal}
                className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-700 transition-colors"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTour;
