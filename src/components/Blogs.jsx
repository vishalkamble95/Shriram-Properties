import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  BookOpen,
  Clock,
  Loader,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import config from "../../config";

const BlogCard = ({ blog }) => {
  // Format date from "2024-11-25 16:42:02" to "Nov 25, 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Estimate reading time based on content length
  const calculateReadingTime = (content) => {
    // Strip HTML tags to count only text
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return minutes;
  };

  return (
    <div className="bg-gradient-to-br from-[#06202B] via-[#077A7D] to-[#06202B] rounded-2xl overflow-hidden border border-[#7AE2CF]/30 shadow-xl hover:shadow-[#7AE2CF]/20 transform transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      {/* Blog Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={blog.post_photo}
          alt={blog.post_title}
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />

        {/* Read Time */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full text-xs font-semibold text-[#7AE2CF] bg-[#077A7D]/10 border border-[#7AE2CF]/30 backdrop-blur-md shadow-sm flex items-center space-x-1 transition-all duration-300">
          <Clock size={12} className="text-[#7AE2CF]" />
          <span>{calculateReadingTime(blog.post_content)} min read</span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-2 text-[#F5EEDD]/80 text-sm mb-2">
          <Calendar size={14} />
          <span>{formatDate(blog.created_at)}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#F5EEDD] leading-snug mb-2 line-clamp-2 group-hover:text-[#7AE2CF] transition-colors duration-300">
          {blog.post_title}
        </h3>

        {/* Summary */}
        <p className="text-[#F5EEDD]/80 text-sm mb-4 line-clamp-3 flex-grow">
          {blog.post_content_short}
        </p>

        {/* Read More */}
        <div className="mt-auto pt-4 border-t border-[#7AE2CF]/20">
          <Link
            to={`/blogs/${blog.post_slug}`}
            className="inline-flex items-center text-[#7AE2CF] hover:text-[#F5EEDD] transition-colors font-medium group"
          >
            <span className="mr-2">Read Article</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/blogs?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of blogs section
      window.scrollTo({
        top: document.getElementById("blogs-section").offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div
        id="blogs-section"
        className="bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px] flex items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <Loader size={36} className="text-[#7AE2CF] animate-spin" />
          <p className="mt-4 text-[#F5EEDD]/90 text-sm sm:text-base">
            Loading articles...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="blogs-section"
        className="bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="bg-[#FF4D4D]/10 border border-red-500/20 p-4 rounded-lg text-red-500 max-w-4xl mx-auto flex items-center shadow-md backdrop-blur-sm">
          <AlertTriangle size={24} className="mr-3 flex-shrink-0" />
          <p className="text-sm sm:text-base">
            Failed to load articles: {error}
          </p>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div
        id="blogs-section"
        className="bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#06202B] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="bg-[#F5EEDD]/10 p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-center border border-[#7AE2CF]/20 backdrop-blur-sm">
          <BookOpen size={48} className="mx-auto mb-4 text-[#7AE2CF]" />
          <h3 className="text-xl font-semibold text-[#F5EEDD] mb-2">
            No articles available yet
          </h3>
          <p className="text-[#F5EEDD]/80 text-sm sm:text-base">
            Check back later for updates and new content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="blogs-section"
      className="bg-gradient-to-b from-[#06202B] via-[#077A7D] to-[#7AE2CF] py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5EEDD] tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#7AE2CF] to-[#F5EEDD] bg-clip-text text-transparent">
              Latest Insights
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] rounded-full mb-4 shadow-md shadow-[#077A7D]/40"></div>
          <p className="max-w-xl mx-auto text-[#F5EEDD]/90 text-base sm:text-lg">
            Stay updated with our latest news, articles, and real estate market
            trends crafted for you.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-[#7AE2CF]/30 cursor-not-allowed"
                  : "bg-[#F5EEDD] text-[#06202B] hover:bg-[#7AE2CF]/20 shadow-sm"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="px-4 flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                    currentPage === index + 1
                      ? "bg-[#077A7D] text-white"
                      : "bg-[#F5EEDD] text-[#06202B] hover:bg-[#7AE2CF]/30"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "text-[#7AE2CF]/30 cursor-not-allowed"
                  : "bg-[#F5EEDD] text-[#06202B] hover:bg-[#7AE2CF]/20 shadow-sm"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="relative group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white font-semibold text-base shadow-md hover:shadow-[#7AE2CF]/40 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Us
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            {/* Shine sweep effect */}
            <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
