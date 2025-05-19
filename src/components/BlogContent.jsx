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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            className="mb-6 flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 text-slate-300 hover:text-teal-400 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            <span>Back to Articles</span>
          </button>

          {/* Blog Header with updated styling */}
          <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80 z-10"></div>
            <img
              src={blog.post_photo}
              alt={blog.post_title}
              className="w-full h-64 sm:h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full mb-4">
                <Calendar size={14} />
                <span className="text-sm font-medium">
                  {formatDate(blog.created_at)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                {blog.post_title}
              </h1>
            </div>
          </div>

          {/* Blog Short Content with updated styling */}
          <div className="bg-slate-800 rounded-xl p-6 mb-6 shadow-md">
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              {blog.post_content_short}
            </p>
          </div>

          {/* Blog Full Content with updated styling */}
          <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-md overflow-hidden relative">
            <div
              className="prose max-w-none text-slate-400"
              style={{
                maxHeight: expanded ? "none" : "16rem",
                overflow: "hidden",
                transition: "max-height 0.5s ease",
              }}
            >
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.post_content }} />
            </div>

            {/* Updated gradient overlay when collapsed */}
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
            )}

            {/* Read More/Less Button with updated styling */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center space-x-2 px-6 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-md"
              >
                <span>{expanded ? "Read Less" : "Read More"}</span>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>

          {/* CTAs with updated styling */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button
              onClick={openDialog}
              className="flex-1 py-4 text-center rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 active:bg-teal-800 transition-colors shadow-md"
            >
              Check Pricing & Availability
            </button>
            <button
              onClick={openDialog}
              className="flex-1 py-4 text-center rounded-lg border-2 border-teal-600 bg-transparent text-teal-500 font-medium hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              Contact for Site Visit
            </button>
          </div>

          {/* Additional engagement section */}
          {/* <div className="bg-slate-50 rounded-xl p-6 mb-8 shadow-md">
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
          </div> */}
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default BlogContent;
