import React, { useState, useEffect } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { API, WEBSITE_DOMAIN } from "../../config";
import { useParams, useNavigate } from "react-router-dom";
import { ContactDialog } from "./Contact";

const BlogContent = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(API.BLOGS_DETAIL(id, WEBSITE_DOMAIN));
        if (!response.ok) throw new Error("Failed to fetch blog");
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
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#222831] text-[#EEEEEE]">
        <div className="animate-spin w-12 h-12 border-4 border-[#00ADB5] border-t-transparent rounded-full"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#222831] text-[#EEEEEE] p-6">
        <h2 className="text-2xl font-semibold text-red-500 mb-2">Error</h2>
        <p className="mb-4">{error || "No blog found."}</p>
        <button
          className="px-5 py-2 bg-[#393E46] text-[#EEEEEE] rounded hover:bg-[#00ADB5]/90 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#222831] min-h-screen text-[#EEEEEE] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center text-sm text-[#00ADB5] hover:text-[#393E46] hover:underline transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Articles
          </button>

          {/* Blog Header Image */}
          <div className="rounded-lg overflow-hidden shadow-md border border-[#EEEEEE]/10 mb-8">
            <img
              src={blog.post_photo}
              alt={blog.post_title}
              className="w-full h-72 sm:h-96 lg:h-[500px] object-cover"
            />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-[#222831] bg-[#00ADB5] px-3 py-1 rounded-full font-medium w-fit mb-4">
            <Calendar size={14} />
            {formatDate(blog.created_at)}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00ADB5] mb-4">
            {blog.post_title}
          </h1>

          {/* Short Description */}
          <p className="mb-6 text-[#EEEEEE]/90 leading-relaxed font-medium">
            {blog.post_content_short}
          </p>

          {/* Full Blog Content */}
          <div className="bg-[#393E46] p-6 rounded-lg border border-[#EEEEEE]/10 shadow-inner mb-12">
            <div
              className="prose prose-invert rich-content max-w-none prose-p:leading-relaxed prose-a:text-[#00ADB5] hover:prose-a:text-[#393E46]"
              dangerouslySetInnerHTML={{ __html: blog.post_content }}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={openDialog}
              className="flex-1 py-3 px-4 rounded bg-[#00ADB5] text-[#EEEEEE] font-semibold hover:bg-[#393E46] transition"
            >
              Check Pricing & Availability
            </button>
            <button
              onClick={openDialog}
              className="flex-1 py-3 px-4 rounded border border-[#00ADB5] text-[#00ADB5] font-semibold hover:bg-[#00ADB5]/20 hover:text-[#00ADB5] transition"
            >
              Contact for Site Visit
            </button>
          </div>
        </div>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default BlogContent;
