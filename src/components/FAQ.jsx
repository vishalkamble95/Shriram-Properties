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
      <div className="bg-slate-900 min-h-[400px] p-8 flex items-center justify-center">
        <div className="bg-slate-800/80 p-6 rounded-lg border-l-4 border-red-500 max-w-2xl w-full">
          <div className="flex items-start gap-4">
            <AlertCircle
              size={24}
              className="text-red-400 flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Error Loading FAQ
              </h3>
              <p className="text-slate-300">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors duration-200 flex items-center gap-2"
              >
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 relative py-16 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 bg-teal-400 w-64 h-64 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 bg-emerald-400 w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="md:flex gap-8 lg:gap-16">
          {/* Left column - Header and intro */}
          <div className="md:w-5/12 mb-8 md:mb-0">
            <div className="sticky top-24">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-300 text-sm font-medium mb-4">
                <HelpCircle size={16} className="mr-2" />
                <span>Knowledge Base</span>
              </div>

              <h2 className="text-4xl font-bold text-white mb-6">{heading}</h2>

              {/* <p className="text-slate-300 mb-8 text-lg">
                Find answers to commonly asked questions about Ceratec Tower 1o8
                Balewadi. Can't find what you're looking for? Contact our
                support team.
              </p> */}

              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-slate-800 to-slate-800/60 p-6 rounded-lg border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Still have questions?
                      </h3>
                      <p className="text-slate-300 mb-4">
                        Our team is ready to assist you with any further queries
                      </p>
                      <a
                        href="#contact"
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 active:from-teal-700 active:to-emerald-700 transition-all duration-300 inline-flex items-center gap-2"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - FAQ Accordion */}
          <div className="md:w-7/12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="divide-y divide-slate-700/70">
                {faqs.map((faq, index) => (
                  <div key={faq.id} className="py-4 first:pt-1 last:pb-1">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center w-full text-left focus:outline-none group"
                      aria-expanded={activeIndex === index}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span
                        className={`text-lg font-medium ${
                          activeIndex === index ? "text-teal-300" : "text-white"
                        } group-hover:text-teal-300 transition-colors duration-200`}
                      >
                        {faq.faq_title}
                      </span>
                      <span className="ml-6 flex-shrink-0 p-1 rounded-full bg-slate-700/50 group-hover:bg-teal-400/20 transition-colors duration-200">
                        {activeIndex === index ? (
                          <ChevronUp className="h-5 w-5 text-teal-300" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400 group-hover:text-teal-300 transition-colors duration-200" />
                        )}
                      </span>
                    </button>
                    {activeIndex === index && (
                      <div
                        id={`faq-content-${index}`}
                        className="mt-3 animate-fadeIn"
                      >
                        <div className="text-slate-300 bg-slate-800/80 p-5 rounded-lg border-l-2 border-teal-500">
                          {stripHtml(faq.faq_content)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile "Still have questions" section */}
            <div className="md:hidden mt-8">
              <div className="bg-gradient-to-br from-slate-800 to-slate-800/60 p-6 rounded-lg border border-slate-700">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Our team is ready to assist you with any further queries
                  </p>
                  <a
                    href="#contact"
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 active:from-teal-700 active:to-emerald-700 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
