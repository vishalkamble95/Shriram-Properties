import React, { useState, useEffect } from "react";
import { Building, Loader, AlertTriangle, ArrowRight } from "lucide-react";
import { API } from "../../config";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const cardsPerPage = 6; // always 6 cards shown at a time

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API.BANKS());

        if (!response.ok) throw new Error("Failed to fetch banks data");

        const data = await response.json();
        setBanks(data.bank.banks);
        setHeading(data.bank.page.heading);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0E1A24] min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-[#FACC15] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0E1A24] min-h-[300px] p-8">
        <div className="bg-[#0F766E]/20 p-6 rounded-lg border border-[#CBD5E1]/20 text-[#CBD5E1] flex items-center gap-3">
          <AlertTriangle size={20} />
          <p>Failed to load banks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0E1A24] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#FACC15] mb-3">
          {heading || "Our Trusted Loan Partners"}
        </h2>
        <p className="text-[#CBD5E1] text-base">
          Explore our curated selection of banking partners offering competitive
          home loan options.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {banks.slice(slideIndex, slideIndex + cardsPerPage).map((bank) => (
          <a
            href={bank.bank_slug}
            target="_blank"
            rel="noopener noreferrer"
            key={bank.id}
            className="bg-[#13222D] rounded-xl border border-[#CBD5E1]/20 overflow-hidden shadow-lg hover:shadow-[#0F766E]/40 transition-transform transform hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch">
              <div className="w-full sm:w-1/3 bg-[#0F766E]/10 flex items-center justify-center p-6">
                {bank.property_bank_photo ? (
                  <img
                    src={bank.property_bank_photo}
                    alt={bank.bank_name}
                    className="w-full h-28 object-contain"
                  />
                ) : (
                  <Building size={48} className="text-[#FACC15]" />
                )}
              </div>

              <div className="w-full sm:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#FACC15] mb-2">
                    {bank.bank_name}
                  </h3>
                  <p className="text-sm text-[#CBD5E1]">
                    Trusted partner offering flexible home loans and fast
                    approvals.
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs font-medium text-[#0F766E] bg-[#FACC15]/10 px-2 py-1 rounded-full border border-[#FACC15]/20">
                    Home Loan Partner
                  </span>

                  <span className="w-8 h-8 flex items-center justify-center bg-[#0F766E] text-white rounded-full hover:bg-[#FACC15] hover:text-[#0E1A24] transition">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={() => setSlideIndex(Math.max(slideIndex - cardsPerPage, 0))}
          disabled={slideIndex === 0}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            slideIndex === 0
              ? "bg-[#CBD5E1]/30 text-[#CBD5E1] cursor-not-allowed"
              : "bg-gradient-to-r from-[#0F766E] to-[#FACC15] text-[#0E1A24] hover:scale-105"
          }`}
        >
          Previous
        </button>

        <button
          onClick={() =>
            setSlideIndex((prev) =>
              prev + cardsPerPage < banks.length ? prev + cardsPerPage : prev
            )
          }
          disabled={slideIndex + cardsPerPage >= banks.length}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            slideIndex + cardsPerPage >= banks.length
              ? "bg-[#CBD5E1]/30 text-[#CBD5E1] cursor-not-allowed"
              : "bg-gradient-to-r from-[#FACC15] to-[#0F766E] text-[#0E1A24] hover:scale-105"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Banks;
