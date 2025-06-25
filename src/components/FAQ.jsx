import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader,
  MessageCircle,
} from "lucide-react";
import config from "../../config";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/faq?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }

        const data = await response.json();
        setFaqs(data.faqs);
        setHeading(data.page[0]?.heading || "Frequently Asked Questions");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Helper function to strip HTML tags from content
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-[400px] p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader size={40} className="text-teal-400 animate-spin" />
          <p className="text-slate-300 mt-4">
            Loading frequently asked questions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#622569] min-h-[400px] p-8 flex items-center justify-center">
        <div className="bg-[#5b9aa0]/80 p-6 rounded-lg border-l-4 border-[#b8a9c9] max-w-2xl w-full">
          <div className="flex items-start gap-4">
            <AlertCircle
              size={24}
              className="text-[#d6d4e0] flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Error Loading FAQ
              </h3>
              <p className="text-[#d6d4e0]">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#b8a9c9] hover:bg-[#5b9aa0] rounded-lg text-white transition-colors duration-200 flex items-center gap-2"
              >
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const half = Math.ceil(faqs.length / 2);
  const leftFAQs = faqs.slice(0, half);
  const rightFAQs = faqs.slice(half);

  return (
    <div className="bg-[#712d79] relative py-16 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 bg-[#5b9aa0] w-64 h-64 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 bg-[#b8a9c9] w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#b8a9c9]/10 border border-[#b8a9c9]/20 text-[#d6d4e0] text-sm font-semibold mb-5 shadow-sm backdrop-blur-md">
            <HelpCircle size={16} className="mr-2" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {heading}
          </h2>
        </div>

        {/* Two-column layout for FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[leftFAQs, rightFAQs].map((column, colIndex) => (
            <div
              key={colIndex}
              className="bg-gradient-to-br from-[#5b9aa0]/30 to-[#b8a9c9]/10 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg"
            >
              {column.map((faq, index) => {
                const faqIndex = colIndex === 0 ? index : index + half;
                return (
                  <div
                    key={faq.id}
                    className="py-4 first:pt-1 last:pb-1 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(faqIndex)}
                      className="flex justify-between items-center w-full text-left focus:outline-none group"
                      aria-expanded={activeIndex === faqIndex}
                      aria-controls={`faq-content-${faqIndex}`}
                    >
                      <span
                        className={`text-lg font-medium flex items-center gap-2 transition-colors duration-200 ${
                          activeIndex === faqIndex
                            ? "text-[#d6d4e0]"
                            : "text-white"
                        }`}
                      >
                        <MessageCircle size={18} className="text-[#b8a9c9]" />
                        {faq.faq_title}
                      </span>
                      <span
                        className={`ml-4 flex-shrink-0 p-1 rounded-full transition-transform duration-300 bg-white/10 group-hover:bg-[#b8a9c9]/20 ${
                          activeIndex === faqIndex ? "rotate-180" : ""
                        }`}
                      >
                        {activeIndex === faqIndex ? (
                          <ChevronUp className="h-5 w-5 text-[#d6d4e0]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-white group-hover:text-[#d6d4e0]" />
                        )}
                      </span>
                    </button>
                    {activeIndex === faqIndex && (
                      <div
                        id={`faq-content-${faqIndex}`}
                        className="mt-3 animate-fadeIn"
                      >
                        <div className="text-[#d6d4e0] bg-[#5b9aa0]/90 p-5 rounded-lg border-l-2 border-[#b8a9c9]">
                          {stripHtml(faq.faq_content)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile "Still have questions" section */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-[#5b9aa0] to-[#b8a9c9]/40 p-6 rounded-lg border border-white/10">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-[#d6d4e0] mb-4">
                Our team is ready to assist you with any further queries
              </p>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white font-medium hover:from-[#5b9aa0]/90 hover:to-[#b8a9c9]/90 active:scale-[.98] transition-all duration-300 inline-flex items-center gap-2"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
