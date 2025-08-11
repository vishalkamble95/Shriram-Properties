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
      <div className="bg-[#222831] min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-[#00ADB5] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#222831] min-h-[300px] p-8">
        <div className="bg-[#393E46]/20 p-6 rounded-lg border border-[#EEEEEE]/20 text-[#EEEEEE] flex items-center gap-3">
          <AlertTriangle size={20} />
          <p>Failed to load banks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#222831] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#00ADB5] mb-3">
          {heading || "Our Trusted Loan Partners"}
        </h2>
        <p className="text-[#EEEEEE] text-base">
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
            className="bg-[#393E46] rounded-xl border border-[#EEEEEE]/20 overflow-hidden shadow-lg hover:shadow-[#00ADB5]/40 transition-transform transform hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch">
              <div className="w-full sm:w-1/3 bg-[#00ADB5]/10 flex items-center justify-center p-6">
                {bank.property_bank_photo ? (
                  <img
                    src={bank.property_bank_photo}
                    alt={bank.bank_name}
                    className="w-full h-28 object-contain"
                  />
                ) : (
                  <Building size={48} className="text-[#00ADB5]" />
                )}
              </div>

              <div className="w-full sm:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#00ADB5] mb-2">
                    {bank.bank_name}
                  </h3>
                  <p className="text-sm text-[#EEEEEE]">
                    Trusted partner offering flexible home loans and fast
                    approvals.
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs font-medium text-[#00ADB5] bg-[#EEEEEE]/10 px-2 py-1 rounded-full border border-[#00ADB5]/20">
                    Home Loan Partner
                  </span>

                  <span className="w-8 h-8 flex items-center justify-center bg-[#00ADB5] text-[#222831] rounded-full hover:bg-[#EEEEEE] hover:text-[#222831] transition">
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
              ? "bg-[#EEEEEE]/30 text-[#EEEEEE] cursor-not-allowed"
              : "bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] text-[#222831] hover:scale-105"
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
              ? "bg-[#EEEEEE]/30 text-[#EEEEEE] cursor-not-allowed"
              : "bg-gradient-to-r from-[#EEEEEE] to-[#00ADB5] text-[#222831] hover:scale-105"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Banks;
