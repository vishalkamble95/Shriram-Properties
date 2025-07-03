import React, { useState, useEffect } from "react";
import {
  Building,
  ArrowRight,
  Loader,
  AlertTriangle,
  CreditCard,
} from "lucide-react";
import config from "../../config";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(8);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/banks?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banks data");
        }

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

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(4);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(6);
      } else {
        setCardsPerPage(8);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const handlePrev = () => {
    setSlideIndex((prev) => Math.max(prev - cardsPerPage, 0));
  };

  const handleNext = () => {
    setSlideIndex((prev) => {
      const nextIndex = prev + cardsPerPage;
      return nextIndex < banks.length ? nextIndex : prev;
    });
  };

  if (loading) {
    return (
      <div className="bg-[#06202B] min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-[#7AE2CF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#06202B] min-h-[300px] p-8">
        <div className="bg-[#077A7D]/20 p-6 rounded-lg border border-[#7AE2CF]/30 text-[#7AE2CF] flex items-center gap-3">
          <AlertTriangle size={20} />
          <p>Failed to load banks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#06202B] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:justify-between md:items-start mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-block mb-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#7AE2CF]/10 to-[#F5EEDD]/10 border border-[#7AE2CF]/30 text-[#F5EEDD] text-sm font-semibold shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-[#7AE2CF]/30 tracking-wide uppercase">
              Financial Partners
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#F5EEDD] leading-tight tracking-tight mb-4">
              {heading || "Approved Home Loan Partners"}
            </h2>

            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[#7AE2CF] to-[#F5EEDD] rounded-full mb-6"></div>

            <p className="text-[#7AE2CF] text-base md:text-lg leading-relaxed">
              Choose from our trusted banking partners for quick, reliable home
              loan approvals with competitive interest rates and flexible
              repayment options.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {banks.slice(slideIndex, slideIndex + cardsPerPage).map((bank) => (
            <a
              href={bank.bank_slug}
              target="_blank"
              rel="noopener noreferrer"
              key={bank.id}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-[#077A7D]/20 via-[#7AE2CF]/10 to-[#F5EEDD]/5 border border-[#7AE2CF]/30 rounded-xl overflow-hidden shadow-md hover:shadow-[#7AE2CF]/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.005] h-full flex flex-col text-sm p-3">
                <div className="relative h-36 overflow-hidden bg-[#7AE2CF]/10">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5EEDD]/20 to-[#F5EEDD]/40 z-10" />

                  {bank.property_bank_photo ? (
                    <img
                      src={bank.property_bank_photo}
                      alt={bank.bank_name}
                      className="w-full h-full object-contain p-4 relative z-20 scale-100 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative z-20">
                      <Building size={48} className="text-[#7AE2CF]" />
                    </div>
                  )}

                  <div className="absolute top-1 right-1 z-30">
                    <span className="px-2.5 py-1 text-[10px] text-[#F5EEDD] font-semibold uppercase tracking-wide rounded-full bg-gradient-to-r from-[#7AE2CF]/30 to-[#F5EEDD]/30 border border-[#F5EEDD]/20 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-[#7AE2CF]/40">
                      Partner
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col flex-grow">
                  <h3 className="text-[#F5EEDD] font-semibold text-base mb-2 group-hover:text-[#7AE2CF] transition-colors duration-300">
                    {bank.bank_name}
                  </h3>

                  <div className="mt-auto pt-2 flex items-center justify-between text-[#F5EEDD]/80 group-hover:text-[#F5EEDD] transition-all duration-300">
                    <span className="text-xs flex items-center font-medium">
                      <CreditCard size={14} className="mr-1 text-[#7AE2CF]" />
                      Home Loan Provider
                    </span>

                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7AE2CF] to-[#077A7D] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            disabled={slideIndex === 0}
            className={`relative group overflow-hidden px-6 py-2.5 rounded-full text-[#06202B] font-semibold transition-all duration-300 w-[140px] text-center ${
              slideIndex === 0
                ? "bg-[#F5EEDD]/40 cursor-not-allowed"
                : "bg-gradient-to-r from-[#7AE2CF] to-[#F5EEDD] hover:scale-105"
            }`}
          >
            <span className="relative z-10">Previous</span>
            {/* Shine sweep effect */}
            {slideIndex !== 0 && (
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#077A7D]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={slideIndex + cardsPerPage >= banks.length}
            className={`relative group overflow-hidden px-6 py-2.5 rounded-full text-[#06202B] font-semibold transition-all duration-300 w-[140px] text-center ${
              slideIndex + cardsPerPage >= banks.length
                ? "bg-[#F5EEDD]/40 cursor-not-allowed"
                : "bg-gradient-to-r from-[#7AE2CF] to-[#F5EEDD] hover:scale-105"
            }`}
          >
            <span className="relative z-10">Next</span>
            {/* Shine sweep effect */}
            {slideIndex + cardsPerPage < banks.length && (
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#077A7D]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banks;
