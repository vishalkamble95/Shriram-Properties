import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  MessageSquare,
  Eye,
  Heart,
  ArrowLeft,
} from "lucide-react";
import config from "../../config";
import { useParams, useNavigate } from "react-router-dom";
import { ContactDialog } from "./Contact";

const BlogContent = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/blogs/${id}?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();
        setBlog(data.blogs[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] p-4">
        <div className="w-16 h-16 border-4 border-[#7AE2CF] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#F5EEDD]/80">Loading blog content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] p-4">
        <div className="bg-[#F5EEDD]/10 rounded-lg shadow-lg max-w-2xl w-full p-6 border border-[#7AE2CF]/20 backdrop-blur-md">
          <h2 className="text-xl text-red-500 font-medium mb-2">
            Error Loading Content
          </h2>
          <p className="text-[#F5EEDD]/80">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white rounded-md hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 transition-colors shadow-md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] p-4">
        <div className="bg-[#F5EEDD]/10 rounded-lg shadow-lg max-w-2xl w-full p-6 border border-[#7AE2CF]/20 backdrop-blur-md">
          <h2 className="text-xl text-[#F5EEDD] font-medium mb-2">
            No Blog Found
          </h2>
          <p className="text-[#F5EEDD]/80">
            The requested blog content could not be found.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white rounded-md hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 transition-colors shadow-md"
            onClick={() => navigate(-1)}
          >
            Return to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#F5EEDD]/80 hover:text-[#7AE2CF] hover:bg-white/20 transition-all duration-300 shadow-sm border border-white/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            <span>Back to Articles</span>
          </button>

          {/* Blog Header with Background Image */}
          <div className="relative rounded-2xl overflow-hidden mb-10 shadow-xl group">
            <img
              src={blog.post_photo}
              alt={blog.post_title}
              className="w-full h-64 sm:h-96 object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5EEDD]/90 text-[#06202B] rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/60 shadow-md">
                <Calendar size={14} />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3 sm:mt-4 tracking-tight leading-snug drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
                {blog.post_title}
              </h1>
            </div>
          </div>

          {/* Blog Short Description */}
          <div className="bg-[#06202B]/60 rounded-xl p-6 mb-6 shadow-md border border-[#7AE2CF]/20">
            <p className="text-[#F5EEDD]/90 text-lg leading-relaxed font-medium">
              {blog.post_content_short}
            </p>
          </div>

          {/* Blog Full Content */}
          <div className="bg-[#06202B]/60 rounded-xl p-6 mb-10 shadow-md border border-[#7AE2CF]/20 relative">
            <div
              className="prose max-w-none text-[#F5EEDD]/90 prose-p:leading-relaxed rich-content"
              style={{
                maxHeight: expanded ? "none" : "18rem",
                overflow: "hidden",
                transition: "max-height 0.5s ease",
              }}
            >
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.post_content }}
              />
            </div>

            {/* Gradient overlay */}
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06202B] to-transparent pointer-events-none"></div>
            )}

            {/* Read More / Less */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white font-medium hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 active:scale-95 transition-all duration-300 shadow-md"
              >
                <span>{expanded ? "Read Less" : "Read More"}</span>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <button
              onClick={openDialog}
              className="relative group flex-1 py-4 text-center rounded-xl bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white font-semibold hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <span className="relative z-10">
                Check Pricing & Availability
              </span>
              {/* Shine sweep effect */}
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            </button>

            <button
              onClick={openDialog}
              className="relative group flex-1 py-4 text-center rounded-xl border-2 border-[#7AE2CF] bg-transparent text-[#7AE2CF] font-semibold hover:bg-[#7AE2CF]/10 hover:text-white transition-all duration-300 shadow-sm overflow-hidden"
            >
              <span className="relative z-10">Contact for Site Visit</span>
              {/* Shine sweep effect */}
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            </button>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default BlogContent;
