import React, { useState, useEffect } from "react";
import {
  Building,
  ExternalLink,
  ArrowRight,
  Loader,
  AlertTriangle,
  CreditCard,
  Tag,
  MapPin,
  Check,
} from "lucide-react";
import config from "../../config";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleBanks, setVisibleBanks] = useState(6);

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

  const loadMore = () => {
    setVisibleBanks((prev) => Math.min(prev + 6, banks.length));
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-teal-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-[300px] p-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-teal-300 flex items-center gap-3">
          <AlertTriangle size={20} />
          <p>Failed to load banks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#d6d4e0] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:justify-between md:items-start mb-12">
          {/* Left content area */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-block mb-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#b8a9c9]/20 to-[#5b9aa0]/20 border border-[#5b9aa0]/30 text-[#622569] text-sm font-semibold shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-[#5b9aa0]/30 tracking-wide uppercase">
              Financial Partners
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#622569] leading-tight tracking-tight mb-4">
              {heading || "Approved Home Loan Partners"}
            </h2>

            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] rounded-full mb-6"></div>

            <p className="text-[#5b9aa0] text-base md:text-lg leading-relaxed">
              Choose from our trusted banking partners for quick, reliable home
              loan approvals with competitive interest rates and flexible
              repayment options.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {banks.slice(0, visibleBanks).map((bank) => (
            <a
              href={bank.bank_slug}
              target="_blank"
              rel="noopener noreferrer"
              key={bank.id}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-[#d6d4e0] via-[#b8a9c9]/50 to-[#5b9aa0]/20 border border-[#b8a9c9] rounded-3xl overflow-hidden shadow-lg hover:shadow-[#5b9aa0]/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-[#b8a9c9]/10">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#622569]/20 to-[#622569]/40 z-10" />

                  {bank.property_bank_photo ? (
                    <img
                      src={bank.property_bank_photo}
                      alt={bank.bank_name}
                      className="w-full h-full object-contain p-6 relative z-20 scale-100 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative z-20">
                      <Building size={64} className="text-[#5b9aa0]" />
                    </div>
                  )}

                  {/* Partner Badge */}
                  <div className="absolute top-4 right-4 z-30">
                    <span className="px-3 py-1.5 text-xs text-[#622569] font-semibold uppercase tracking-wide rounded-full bg-gradient-to-r from-[#b8a9c9]/30 to-[#5b9aa0]/30 border border-[#622569]/20 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-[#5b9aa0]/40">
                      Partner
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-[#622569] font-semibold text-xl mb-3 group-hover:text-[#5b9aa0] transition-colors duration-300">
                    {bank.bank_name}
                  </h3>

                  <div className="mt-auto pt-4 flex items-center justify-between text-[#622569]/80 group-hover:text-[#622569] transition-all duration-300">
                    <span className="text-sm flex items-center font-medium">
                      <CreditCard size={16} className="mr-2 text-[#5b9aa0]" />
                      Home Loan Provider
                    </span>

                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#5b9aa0] to-[#622569] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {visibleBanks < banks.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#5b9aa0] to-[#622569] text-white font-semibold hover:from-[#4c868c] hover:to-[#501753] active:from-[#3d6f74] active:to-[#401244] transition-all duration-300 transform hover:scale-105 flex items-center mx-auto shadow-md"
            >
              Load More Partners
              <ArrowRight size={18} className="ml-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banks;
