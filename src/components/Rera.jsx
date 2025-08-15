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
  console.log("RERA Data:", displayed);

  return (
    <>
      <div className="relative bg-[#222831] text-[#EEEEEE] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00ADB5]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#393E46]/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          {displayed.map((reraData, index) => (
            <div
              key={index}
              className="bg-[#393E46]/40 border border-[#EEEEEE]/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 space-y-12"
            >
              {/* Header / Overview */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#00ADB5]">
                    {pageInfo?.heading || "MAHARERA Information"}
                  </h2>
                  <p className="text-lg text-[#EEEEEE]/80">
                    {reraData.phase_name}
                  </p>
                  {pageInfo?.subheading && (
                    <p className="text-sm text-[#EEEEEE]/60">
                      {pageInfo.subheading}
                    </p>
                  )}
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#00ADB5] bg-[#00ADB5]/10 text-[#00ADB5] rounded-full text-sm font-medium">
                  <CheckCircle size={16} />
                  MahaRERA Registered Project
                </div>
              </div>

              {/* Stats and QR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1 */}
                  <div className="flex items-start gap-4 bg-[#222831]/50 p-5 rounded-2xl border border-[#EEEEEE]/10">
                    <FileText className="text-[#00ADB5]" size={24} />
                    <div>
                      <p className="text-sm text-[#EEEEEE]/70">MahaRERA ID</p>
                      <p className="font-semibold text-[#00ADB5]">
                        {reraData.rera_id}
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex items-start gap-4 bg-[#222831]/50 p-5 rounded-2xl border border-[#EEEEEE]/10">
                    <Calendar className="text-[#00ADB5]" size={24} />
                    <div>
                      <p className="text-sm text-[#EEEEEE]/70">
                        Completion Date
                      </p>
                      <p className="font-semibold text-[#00ADB5]">
                        {formatDate(reraData.completion_date)}
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex items-start gap-4 bg-[#222831]/50 p-5 rounded-2xl border border-[#EEEEEE]/10">
                    <MapPin className="text-[#00ADB5]" size={24} />
                    <div>
                      <p className="text-sm text-[#EEEEEE]/70">Project Area</p>
                      <p className="font-semibold text-[#00ADB5]">
                        {reraData.total_area.toLocaleString()} sq.m
                        <span className="ml-1 text-[#EEEEEE]/60 text-sm">
                          ({reraData.total_acre} Acre)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="flex items-start gap-4 bg-[#222831]/50 p-5 rounded-2xl border border-[#EEEEEE]/10">
                    <Building className="text-[#00ADB5]" size={24} />
                    <div>
                      <p className="text-sm text-[#EEEEEE]/70">
                        Towers & Units
                      </p>
                      <p className="font-semibold text-[#00ADB5]">
                        {reraData.total_tower} Towers · {reraData.total_units}{" "}
                        Units
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR & Info */}
                <div className="flex flex-col items-center justify-center bg-[#00ADB5]/10 border border-[#EEEEEE]/20 rounded-2xl p-6 text-center">
                  <QRCodeCanvas
                    value={reraData.rera_url}
                    height={120}
                    width={120}
                    className="mb-4 rounded-md"
                  />
                  <h4 className="text-[#00ADB5] font-semibold text-base mb-1">
                    MahaRERA Compliance Info
                  </h4>
                  <ul className="text-sm text-[#EEEEEE]/80 space-y-1">
                    <li>This project is registered under MahaRERA</li>
                    <li>
                      Registration No:{" "}
                      <span className="text-[#00ADB5]">{reraData.rera_id}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#EEEEEE]/60 border-t border-[#EEEEEE]/10 pt-4">
                <p>
                  Last updated:{" "}
                  {reraData?.updated_at
                    ? new Date(reraData.updated_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : "N/A"}
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
                className="text-[#00ADB5] border border-[#00ADB5] bg-transparent hover:bg-[#00ADB5]/20 px-6 py-2 rounded-full font-medium transition"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12 bg-gradient-to-r from-[#00ADB5] to-[#393E46] rounded-3xl px-8 py-10 text-[#EEEEEE] shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Need More Information?</h3>
            <p className="text-base text-[#EEEEEE]/80 mb-6">
              Request detailed property documents and specifications for this
              MahaRERA registered project.
            </p>
            <a
              href="#contact"
              className="relative group inline-block bg-[#222831] text-[#EEEEEE] px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-[#00ADB5] transition-all duration-300 zoom-pulse overflow-hidden"
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
