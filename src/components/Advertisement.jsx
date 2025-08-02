import React, { useState, useEffect } from "react";
import { Loader, AlertTriangle } from "lucide-react";
import { API } from "../../config";

const Advertisement = () => {
  const [ads, setAds] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(API.ADVERTISEMENT());
        if (!response.ok) throw new Error("Failed to fetch advertisement data");

        const data = await response.json();
        setPageInfo(data.page[0] || {});
        const contact = data.contact_us || {};

        // Collect only shown ads
        const items = [];
        if (contact.above_category_status === "Show") {
          if (contact.above_category_1 && contact.above_category_1_url) {
            items.push({
              id: "above_category_1",
              image: contact.above_category_1,
              url: contact.above_category_1_url,
            });
          }
          if (contact.above_category_2 && contact.above_category_2_url) {
            items.push({
              id: "above_category_2",
              image: contact.above_category_2,
              url: contact.above_category_2_url,
            });
          }
        }
        // Add other ad types similarly if needed...

        setAds(items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#06202B] min-h-[200px] py-12 px-4 flex items-center justify-center">
        <Loader size={30} className="text-[#7AE2CF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return null;
    // <div className="bg-white min-h-[200px] py-12 px-4">
    //   <div className="max-w-4xl mx-auto bg-red-100 p-6 rounded-lg flex items-center gap-4">
    //     <AlertTriangle size={24} className="text-red-500 flex-shrink-0" />
    //     <p className="text-red-500">Failed to load advertisements: {error}</p>
    //   </div>
    // </div>
  }

  if (!ads || !ads?.length) return null;

  return (
    <div id="advertisements" className="bg-[#F5EEDD] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#06202B]">
            {pageInfo.heading || "Featured Advertisements"}
          </h2>
          {pageInfo.subheading && (
            <p className="text-[#077A7D] mt-2 text-base sm:text-lg">
              {pageInfo.subheading}
            </p>
          )}
          <div className="w-24 h-1 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Ads Grid */}
        <div className="flex flex-col justify-center items-center gap-8">
          {ads.map((ad, index) => (
            <a
              key={ad.id}
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative group block overflow-hidden rounded-2xl border border-[#7AE2CF] shadow-md hover:shadow-[#06202B]/30 transition-all duration-500
          ${index === 0 ? "w-[95%] sm:w-[60%]" : "w-[95%] sm:w-[70%]"}
          bg-gradient-to-br from-white via-[#F5EEDD] to-[#7AE2CF]/10`}
            >
              <img
                src={ad.image}
                alt={pageInfo.heading}
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[#077A7D]/10 group-hover:bg-[#077A7D]/30 transition duration-300 rounded-2xl"></div>
              <div className="absolute inset-0 group-hover:ring-2 group-hover:ring-[#7AE2CF]/40 rounded-2xl transition-all duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
