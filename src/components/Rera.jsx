import React, { useState, useEffect } from "react";
import {
  Calendar,
  Building,
  FileText,
  ExternalLink,
  Layers,
  Map,
  Home,
  Loader,
  AlertTriangle,
  Clock,
  CheckCircle,
  Tag,
  MapPin,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import { API } from "../../config";
import { QRCodeCanvas } from "qrcode.react";

const ReraInformation = () => {
  const [reraData, setReraData] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API.MAHARERA());

        if (!response.ok) {
          throw new Error("Failed to fetch RERA data");
        }

        const data = await response.json();
        setPageInfo(data.page[0]);
        setReraData(data.rera);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching RERA data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReraData();
  }, []);

  // Function to format date in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-[#06202B] min-h-[300px] py-12 px-4 flex items-center justify-center">
        <Loader size={30} className="text-[#7AE2CF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#06202B] min-h-[300px] py-12 px-4">
        <div className="max-w-4xl mx-auto bg-red-800/20 border border-red-500/30 p-6 rounded-lg flex items-center gap-4">
          <AlertTriangle size={24} className="text-red-400 flex-shrink-0" />
          <p className="text-[#F5EEDD]">
            Failed to load RERA information: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!reraData || reraData.length === 0) return null;
  const displayed = showAll ? reraData : reraData.slice(0, 2);

  return (
    <>
      <div className="relative bg-[#0E1A24] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FACC15]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F766E]/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          {displayed.map((reraData, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 space-y-12"
            >
              {/* Header / Overview */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#FACC15]">
                    {pageInfo?.heading || "RERA Information"}
                  </h2>
                  <p className="text-lg text-slate-300">
                    {reraData.phase_name}
                  </p>
                  {pageInfo?.subheading && (
                    <p className="text-sm text-slate-400">
                      {pageInfo.subheading}
                    </p>
                  )}
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#0F766E] bg-[#0F766E]/10 text-[#0F766E] rounded-full text-sm font-medium">
                  <CheckCircle size={16} />
                  MahaRERA Registered Project
                </div>
              </div>

              {/* Stats and QR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1 */}
                  <div className="flex items-start gap-4 bg-[#CBD5E1]/5 p-5 rounded-2xl border border-white/10">
                    <FileText className="text-[#FACC15]" size={24} />
                    <div>
                      <p className="text-sm text-slate-300">MahaRERA ID</p>
                      <p className="font-semibold text-[#FACC15]">
                        {reraData.rera_id}
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex items-start gap-4 bg-[#CBD5E1]/5 p-5 rounded-2xl border border-white/10">
                    <Calendar className="text-[#FACC15]" size={24} />
                    <div>
                      <p className="text-sm text-slate-300">Completion Date</p>
                      <p className="font-semibold text-[#FACC15]">
                        {formatDate(reraData.completion_date)}
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex items-start gap-4 bg-[#CBD5E1]/5 p-5 rounded-2xl border border-white/10">
                    <MapPin className="text-[#FACC15]" size={24} />
                    <div>
                      <p className="text-sm text-slate-300">Project Area</p>
                      <p className="font-semibold text-[#FACC15]">
                        {reraData.total_area.toLocaleString()} sq.m
                        <span className="ml-1 text-slate-400 text-sm">
                          ({reraData.total_acre} Acre)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="flex items-start gap-4 bg-[#CBD5E1]/5 p-5 rounded-2xl border border-white/10">
                    <Building className="text-[#FACC15]" size={24} />
                    <div>
                      <p className="text-sm text-slate-300">Towers & Units</p>
                      <p className="font-semibold text-[#FACC15]">
                        {reraData.total_tower} Towers · {reraData.total_units}{" "}
                        Units
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR & Info */}
                <div className="flex flex-col items-center justify-center bg-[#0F766E]/10 border border-[#CBD5E1]/20 rounded-2xl p-6 text-center">
                  <QRCodeCanvas
                    value={reraData.rera_url}
                    height={120}
                    width={120}
                    className="mb-4 rounded-md"
                  />
                  <h4 className="text-[#FACC15] font-semibold text-base mb-1">
                    MahaRERA Compliance Info
                  </h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>This project is registered under MahaRERA</li>
                    <li>
                      Registration No:{" "}
                      <span className="text-[#FACC15]">{reraData.rera_id}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 border-t border-white/10 pt-4">
                <p>
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>Source: Maharashtra Real Estate Regulatory Authority</p>
              </div>
            </div>
          ))}

          {/* Show More Button */}
          {reraData.length > 2 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-[#FACC15] border border-[#FACC15] bg-transparent hover:bg-[#FACC15]/20 px-6 py-2 rounded-full font-medium transition"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12 bg-gradient-to-r from-[#FACC15] to-[#0F766E] rounded-3xl px-8 py-10 text-[#0E1A24] shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Need More Information?</h3>
            <p className="text-base text-[#0E1A24]/80 mb-6">
              Request detailed property documents and specifications for this
              MahaRERA registered project.
            </p>
            <a
              href="#contact"
              className="relative group inline-block bg-[#0E1A24] text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-[#0F766E] transition-all duration-300 zoom-pulse overflow-hidden"
            >
              <span className="relative z-10">Request Property Documents</span>
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
            </a>
          </div>
        </div>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default ReraInformation;
