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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-300">Loading blog content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
          <h2 className="text-xl text-red-700 font-medium mb-2">
            Error Loading Content
          </h2>
          <p className="text-slate-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
          <h2 className="text-xl text-slate-800 font-medium mb-2">
            No Blog Found
          </h2>
          <p className="text-slate-600">
            The requested blog content could not be found.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-slate-300 hover:text-teal-400 hover:bg-white/20 transition-all duration-300 shadow-sm border border-white/10"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 text-teal-700 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/60 shadow-md">
                <Calendar size={14} />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3 sm:mt-4 tracking-tight leading-snug drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
                {blog.post_title}
              </h1>
            </div>
          </div>

          {/* Blog Short Description */}
          <div className="bg-slate-800 rounded-xl p-6 mb-6 shadow-md border border-slate-700/40">
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              {blog.post_content_short}
            </p>
          </div>

          {/* Blog Full Content */}
          <div className="bg-slate-800 rounded-xl p-6 mb-10 shadow-md border border-slate-700/40 relative">
            <div
              className="prose max-w-none text-slate-300 prose-p:leading-relaxed"
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
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
            )}

            {/* Read More / Less */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 active:scale-95 transition-all duration-300 shadow-md"
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
              className="flex-1 py-4 text-center rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg"
            >
              Check Pricing & Availability
            </button>
            <button
              onClick={openDialog}
              className="flex-1 py-4 text-center rounded-xl border-2 border-teal-600 bg-transparent text-teal-500 font-semibold hover:bg-teal-50/10 hover:text-teal-400 transition-all duration-300 shadow-sm"
            >
              Contact for Site Visit
            </button>
          </div>

          {/* Additional engagement section */}
          {/* 
    <div className="bg-slate-50 rounded-xl p-6 mb-8 shadow-md">
      <h3 className="text-slate-800 font-medium text-xl mb-4">
        Stay Updated
      </h3>
      <p className="text-slate-600 mb-4">
        Subscribe to our newsletter for the latest property updates and
        exclusive offers.
      </p>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500"
        />
        <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Subscribe
        </button>
      </div>
    </div> 
    */}
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default BlogContent;
