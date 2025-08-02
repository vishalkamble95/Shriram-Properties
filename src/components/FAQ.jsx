import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Loader,
  AlertCircle,
  MessageCircle,
  LifeBuoy,
} from "lucide-react";
import { API } from "../../config";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(API.FAQ(API.WEBSITE_DOMAIN));
        if (!response.ok) throw new Error("Failed to fetch FAQ data");

        const data = await response.json();
        setFaqs(data.faqs);
        setHeading(data.page[0]?.heading || "Frequently Asked Questions");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="bg-[#0E1A24] min-h-[400px] p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader
            className="animate-spin text-[#FACC15] mx-auto mb-4"
            size={40}
          />
          <p className="text-[#CBD5E1]">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0E1A24] min-h-[400px] p-8 flex items-center justify-center">
        <div className="bg-[#0F766E]/30 border-l-4 border-[#FACC15] p-6 rounded-lg max-w-lg text-[#CBD5E1]">
          <div className="flex gap-3 items-start">
            <AlertCircle className="text-[#FACC15] mt-1" />
            <div>
              <h2 className="text-lg font-semibold mb-2">Error Loading FAQ</h2>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#FACC15] text-[#0E1A24] font-semibold rounded hover:bg-[#eab308]"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-[#0E1A24] py-16 px-4 sm:px-8 md:px-16">
      {/* Top shadow divider to separate from previous section */}
      <div className="absolute top-0 left-0 w-full h-6 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)] z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 text-[#FACC15] text-sm font-medium mb-3 uppercase tracking-wide">
          <LifeBuoy size={18} />
          Help Center
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#CBD5E1]">
          {heading}
        </h2>
      </div>

      <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-[#0F766E]/40 rounded-xl p-5 bg-[#0F766E]/10 hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left"
              aria-expanded={activeIndex === index}
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#FACC15]" />
                <h3 className="text-lg font-semibold text-[#CBD5E1]">
                  {faq.faq_title}
                </h3>
              </div>
              <div className="ml-4 p-1 rounded-full bg-[#FACC15]/10">
                {activeIndex === index ? (
                  <ChevronUp className="text-[#FACC15]" />
                ) : (
                  <ChevronDown className="text-[#FACC15]" />
                )}
              </div>
            </button>

            {activeIndex === index && (
              <div className="mt-4 border-t border-[#CBD5E1]/20 pt-4 text-[#CBD5E1] leading-relaxed animate-fadeIn">
                {stripHtml(faq.faq_content)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center relative z-10">
        <p className="text-[#CBD5E1] mb-4">Still have questions?</p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FACC15] text-[#0E1A24] font-semibold hover:bg-[#eab308] transition zoom-pulse"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
};

export default FAQ;
