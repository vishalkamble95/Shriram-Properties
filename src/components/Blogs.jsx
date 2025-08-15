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
import { API, WEBSITE_DOMAIN } from "../../config";

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadingTime = (content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return minutes;
  };

  return (
    <div className="bg-[#222831] rounded-xl border border-[#EEEEEE]/20 shadow-lg hover:shadow-[#00ADB5]/30 transition-transform transform hover:-translate-y-2 overflow-hidden">
      <div className="grid grid-cols-1 h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.post_photo}
            alt={blog.post_title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3 px-3 py-1 text-xs bg-[#00ADB5]/80 text-white rounded-full flex items-center gap-1">
            <Clock size={12} />
            <span>{calculateReadingTime(blog.post_content)} min read</span>
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between h-full">
          <div className="mb-4">
            <div className="text-sm text-[#EEEEEE] flex items-center gap-2 mb-1">
              <Calendar size={14} />
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <h3 className="text-lg font-bold text-[#00ADB5] mb-2 line-clamp-2">
              {blog.post_title}
            </h3>
            <p className="text-sm text-[#EEEEEE]/90 line-clamp-3">
              {blog.post_content_short}
            </p>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]/10">
            <Link
              to={`/blogs/${blog.post_slug}`}
              className="inline-flex items-center gap-2 text-[#00ADB5] hover:text-[#EEEEEE] font-medium"
            >
              Read Article
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
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
        const response = await fetch(API.GET_BLOG(WEBSITE_DOMAIN));

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();

        // ✅ Sort blogs by created_at (latest first)
        const sortedBlogs = [...data.blogs].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setBlogs(sortedBlogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({
        top: document.getElementById("blogs-section").offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div
        id="blog"
        className="bg-[#222831] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px] flex items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <Loader size={36} className="text-[#00ADB5] animate-spin" />
          <p className="mt-4 text-[#EEEEEE] text-sm sm:text-base">
            Loading articles...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="blog"
        className="bg-[#222831] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="bg-red-100/10 border border-red-500/20 p-4 rounded-lg text-red-400 max-w-4xl mx-auto flex items-center">
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
        id="blog"
        className="bg-[#222831] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="bg-[#EEEEEE]/10 p-8 rounded-lg shadow max-w-4xl mx-auto text-center border border-[#EEEEEE]/20">
          <BookOpen size={48} className="mx-auto mb-4 text-[#00ADB5]" />
          <h3 className="text-xl font-semibold text-[#EEEEEE] mb-2">
            No articles available yet
          </h3>
          <p className="text-[#EEEEEE]/80 text-sm sm:text-base">
            Check back later for updates and new content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="blog" className="bg-[#222831] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#00ADB5] mb-3">
            Featured Blogs
          </h2>
          <p className="max-w-xl mx-auto text-[#EEEEEE]">
            Explore trends, tips, and insights curated for curious readers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full mx-1 text-sm font-semibold transition-colors ${
                currentPage === 1
                  ? "text-[#EEEEEE]/30 cursor-not-allowed"
                  : "bg-[#00ADB5] text-white hover:bg-[#393E46]"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-8 h-8 mx-1 rounded-full text-sm font-semibold flex items-center justify-center ${
                  currentPage === index + 1
                    ? "bg-[#00ADB5] text-[#222831]"
                    : "bg-[#EEEEEE] text-[#222831] hover:bg-[#00ADB5]/60"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full mx-1 text-sm font-semibold transition-colors ${
                currentPage === totalPages
                  ? "text-[#EEEEEE]/30 cursor-not-allowed"
                  : "bg-[#00ADB5] text-white hover:bg-[#393E46]"
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
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-[#EEEEEE] font-semibold text-base shadow hover:shadow-lg transition-all duration-300 zoom-pulse group"
          >
            <span className="flex items-center gap-2">
              Get in Touch
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
