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
    <div className="bg-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:justify-between md:items-start mb-12">
          {/* Left content area */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-300 text-sm mb-4">
              <Tag className="w-4 h-4 mr-2" />
              <span>Financial Partners</span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-white">
              {heading || "Approved Home Loan Partners"}
            </h2>

            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mb-6"></div>

            {/* <p className="text-slate-300 mb-6">
              Choose from our network of trusted banking partners for
              hassle-free home loan approvals with competitive interest rates
              and flexible repayment options.
            </p>

            <div className="flex items-center text-slate-300 mb-3">
              <Check className="w-5 h-5 mr-3 text-teal-300" />
              <span>Pre-approved projects for faster loan processing</span>
            </div>

            <div className="flex items-center text-slate-300">
              <Check className="w-5 h-5 mr-3 text-teal-300" />
              <span>Special rates for our property buyers</span>
            </div> */}
          </div>

          {/* Right action area */}
          {/* <div className="md:w-1/2 md:pl-8">
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-teal-300 mr-3" />
                <h3 className="text-white font-medium">Loan Eligibility</h3>
              </div>

              <p className="text-slate-300 text-sm mb-4">
                Our banking partners offer competitive interest rates starting
                from 6.5% with loan tenures up to 30 years and up to 90%
                financing on property value.
              </p>

              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`h-2 rounded-full ${
                        dot === 1 ? "w-8 bg-teal-400" : "w-2 bg-white/30"
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  {banks.length} approved partners
                </span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banks.slice(0, visibleBanks).map((bank) => (
            <a
              href={bank.bank_slug}
              target="_blank"
              rel="noopener noreferrer"
              key={bank.id}
              className="group"
            >
              <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-600/10 h-full flex flex-col">
                <div className="relative h-40 bg-slate-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/40 to-slate-900/70"></div>
                  {bank.property_bank_photo ? (
                    <img
                      src={bank.property_bank_photo}
                      alt={bank.bank_name}
                      className="w-full h-full object-contain p-6"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building size={64} className="text-slate-500" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <div className="bg-teal-400/10 border border-teal-400/20 text-teal-300 text-xs px-2 py-1 rounded-full">
                      Partner
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-white font-medium text-lg mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {bank.bank_name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    <span className="text-sm flex items-center">
                      <CreditCard size={16} className="mr-2 text-teal-300" />
                      Home Loan Provider
                    </span>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {visibleBanks < banks.length && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 active:from-teal-700 active:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              Load More Partners
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banks;
