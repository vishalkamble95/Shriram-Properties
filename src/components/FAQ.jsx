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
      <div className="bg-[#06202B] min-h-[400px] p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader size={40} className="text-[#077A7D] animate-spin" />
          <p className="text-[#F5EEDD]/80 mt-4">
            Loading frequently asked questions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#06202B] min-h-[400px] p-8 flex items-center justify-center">
        <div className="bg-[#077A7D]/80 p-6 rounded-lg border-l-4 border-[#7AE2CF] max-w-2xl w-full">
          <div className="flex items-start gap-4">
            <AlertCircle
              size={24}
              className="text-[#F5EEDD] flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="text-lg font-medium text-[#F5EEDD] mb-2">
                Error Loading FAQ
              </h3>
              <p className="text-[#F5EEDD]/90">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#7AE2CF] hover:bg-[#077A7D] rounded-lg text-[#06202B] font-medium transition-colors duration-200 flex items-center gap-2"
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
    <div className="bg-[#06202B] relative py-16 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 bg-[#077A7D] w-64 h-64 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 bg-[#7AE2CF] w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#077A7D]/10 border border-[#7AE2CF]/20 text-[#F5EEDD] text-sm font-semibold mb-5 shadow-sm backdrop-blur-md">
            <HelpCircle size={16} className="mr-2" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5EEDD] leading-tight tracking-tight">
            {heading}
          </h2>
        </div>

        {/* Two-column layout for FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[leftFAQs, rightFAQs].map((column, colIndex) => (
            <div
              key={colIndex}
              className="bg-gradient-to-br from-[#077A7D]/30 to-[#7AE2CF]/10 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg"
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
                            ? "text-[#F5EEDD]"
                            : "text-white"
                        }`}
                      >
                        <MessageCircle size={18} className="text-[#7AE2CF]" />
                        {faq.faq_title}
                      </span>
                      <span
                        className={`ml-4 flex-shrink-0 p-1 rounded-full transition-transform duration-300 bg-white/10 group-hover:bg-[#7AE2CF]/20 ${
                          activeIndex === faqIndex ? "rotate-180" : ""
                        }`}
                      >
                        {activeIndex === faqIndex ? (
                          <ChevronUp className="h-5 w-5 text-[#F5EEDD]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-white group-hover:text-[#F5EEDD]" />
                        )}
                      </span>
                    </button>
                    {activeIndex === faqIndex && (
                      <div
                        id={`faq-content-${faqIndex}`}
                        className="mt-3 animate-fadeIn"
                      >
                        <div className="text-[#F5EEDD] bg-[#077A7D]/90 p-5 rounded-lg border-l-2 border-[#7AE2CF]">
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
          <div className="bg-gradient-to-br from-[#077A7D] to-[#7AE2CF]/40 p-6 rounded-lg border border-white/10">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#F5EEDD] mb-2">
                Still have questions?
              </h3>
              <p className="text-[#F5EEDD]/90 mb-4">
                Our team is ready to assist you with any further queries
              </p>
              <a
                href="#contact"
                className="relative group px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white font-medium hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 active:scale-[.98] transition-all duration-300 inline-flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Contact Us</span>

                {/* Shine sweep effect */}
                <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#F5EEDD]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
