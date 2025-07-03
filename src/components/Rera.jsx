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
import config from "../../config";
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
        const response = await fetch(
          `${config.API_URL}/rera?website=${config.SLUG_URL}`
        );

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
      <div
        className="relative bg-[#F5EEDD] py-16 px-4 overflow-hidden"
        id="about"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(245, 238, 221, 0.9), rgba(245, 238, 221, 0.85)), url("https://via.placeholder.com/1920x1080")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Accent elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#077A7D]/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06202B]/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        {displayed.map((reraData) => {
          return (
            <>
              <div className="max-w-6xl mx-auto relative z-10 mb-6">
                <div className="bg-white/50 rounded-xl overflow-hidden shadow-lg shadow-[#06202B]/10 border border-[#06202B]/10">
                  <div className="p-6 flex flex-col md:flex-wrap md:flex-row md:items-center md:justify-between gap-4 md:gap-y-2">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#06202B] text-center md:text-left w-full md:w-auto">
                        {pageInfo?.heading || "RERA Information"}
                      </h2>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#077A7D] text-center md:text-left w-full md:w-auto">
                        {reraData.phase_name}
                      </h3>
                    </div>

                    {pageInfo?.subheading && (
                      <p className="text-[#06202B]/70 text-center md:text-left w-full md:w-auto">
                        {pageInfo.subheading}
                      </p>
                    )}
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                      <div className="inline-flex items-center bg-[#7AE2CF]/10 border border-[#7AE2CF]/40 px-3 py-1 rounded-full text-sm">
                        <CheckCircle
                          size={14}
                          className="text-[#077A7D] mr-2"
                        />
                        <span className="text-[#077A7D]">
                          MahaRERA Registered Project
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-full flex justify-center flex-wrap gap-4">
                      <div className="mb-8 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        {/* Card 1 - MahaRERA ID */}
                        <div className="flex h-full items-center rounded-2xl bg-white/70 backdrop-blur-md border border-[#06202B]/10 shadow-md overflow-hidden px-4 py-6">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-[#7AE2CF]/20 flex items-center justify-center shadow-md">
                              <FileText size={22} className="text-[#06202B]" />
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="block text-xs md:text-sm text-[#077A7D] tracking-wide mb-1">
                              MahaRERA ID
                            </span>
                            <p className="text-[#06202B] font-semibold text-sm md:text-lg">
                              {reraData.rera_id}
                            </p>
                          </div>
                        </div>

                        {/* Card 2 - Completion Date */}
                        <div className="flex h-full items-center rounded-2xl bg-white/70 backdrop-blur-md border border-[#06202B]/10 shadow-md overflow-hidden px-4 py-6">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-[#7AE2CF]/20 flex items-center justify-center shadow-md">
                              <Calendar size={22} className="text-[#06202B]" />
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="block text-xs md:text-sm text-[#077A7D] tracking-wide mb-1">
                              Completion Date
                            </span>
                            <p className="text-[#06202B] font-semibold text-sm md:text-lg">
                              {formatDate(reraData.completion_date)}
                            </p>
                          </div>
                        </div>

                        {/* Card 3 - Project Area */}
                        <div className="flex h-full items-center rounded-2xl bg-white/70 backdrop-blur-md border border-[#06202B]/10 shadow-md overflow-hidden px-4 py-6">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-[#7AE2CF]/20 flex items-center justify-center shadow-md">
                              <MapPin size={22} className="text-[#06202B]" />
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="block text-xs md:text-sm text-[#077A7D] tracking-wide mb-1">
                              Project Area
                            </span>
                            <p className="text-[#06202B] font-semibold text-sm md:text-lg">
                              {reraData.total_area.toLocaleString()} sq.m
                              <span className="text-[#06202B]/70 text-sm ml-1">
                                ({reraData.total_acre} Acre)
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Card 4 - Towers & Units */}
                        <div className="flex h-full items-center rounded-2xl bg-white/70 backdrop-blur-md border border-[#06202B]/10 shadow-md overflow-hidden px-4 py-6">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-[#7AE2CF]/20 flex items-center justify-center shadow-md">
                              <Building size={22} className="text-[#06202B]" />
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="block text-xs md:text-sm text-[#077A7D] tracking-wide mb-1">
                              Towers & Units
                            </span>
                            <p className="text-[#06202B] font-semibold text-sm md:text-lg">
                              {reraData.total_tower} Towers ·{" "}
                              {reraData.total_units} Units
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto relative z-10 mb-6">
                <div className="bg-[#077A7D]/10 rounded-xl overflow-hidden shadow-lg shadow-[#06202B]/10 border border-[#06202B]/10">
                  {/* RERA Header Card */}
                  <div className="bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] p-6 border-b border-[#06202B]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag size={18} className="text-[#06202B] mr-2" />
                        <h3 className="text-lg font-medium text-[#06202B]">
                          MahaRERA Registration Details
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#06202B]"></span>
                        <span className="inline-block w-6 h-2 rounded-full bg-[#077A7D]"></span>
                        <span className="inline-block w-2 h-2 rounded-full bg-[#06202B]"></span>
                      </div>
                    </div>
                  </div>

                  {/* MahaRERA Info */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-[#06202B]/10 shadow-lg">
                      <div className="w-full md:w-2/3">
                        <h4 className="text-[#06202B] font-semibold mb-4 flex items-center">
                          <FileText size={18} className="text-[#077A7D] mr-2" />
                          MahaRera Compliance Information
                        </h4>
                        <div className="bg-[#077A7D]/10 p-5 rounded-xl border border-[#06202B]/10 shadow-inner">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-[#7AE2CF] mt-1.5 mr-3"></div>
                              <span className="text-[#06202B] text-sm">
                                This project is registered under Maharashtra
                                MahaRera
                              </span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-[#7AE2CF] mt-1.5 mr-3"></div>
                              <span className="text-[#06202B] text-sm">
                                MahaRera Registration:{" "}
                                <span className="text-[#077A7D] font-medium">
                                  {reraData.rera_id}
                                </span>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="w-full md:w-auto flex justify-center md:justify-end">
                        <div className="bg-white p-3 rounded-xl shadow-md">
                          <QRCodeCanvas
                            value={reraData.rera_url}
                            height={120}
                            width={120}
                            className="rounded"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#06202B]/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#06202B]/60">
                      <p>
                        Last updated:{" "}
                        {new Date().toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p>
                        Source: Maharashtra Real Estate Regulatory Authority
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        {reraData.length > 2 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="border border-[#077A7D] text-[#06202B] font-medium px-6 py-2 rounded-md hover:bg-[#077A7D]/10"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
        <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-[#077A7D]/90 to-[#06202B]/90 rounded-2xl p-8 border border-[#06202B]/20 shadow-xl shadow-black/20 text-center">
          <h4 className="text-[#F5EEDD] text-2xl font-semibold mb-2">
            Need More Information?
          </h4>
          <p className="text-[#F5EEDD]/80 text-base mb-6 leading-relaxed">
            Request detailed property documents and specifications for this
            MahaRERA registered project.
          </p>
          <button
            onClick={openDialog}
            className="relative group bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] hover:from-[#077A7D]/80 hover:to-[#7AE2CF]/80 text-[#06202B] font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl shadow-[#7AE2CF]/30 mx-auto block overflow-hidden"
          >
            <span className="relative z-10">Request Property Documents</span>

            {/* Subtle glow overlay */}
            <span className="absolute inset-0 rounded-lg bg-[#06202B]/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm z-0"></span>

            {/* Shine sweep effect */}
            <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none z-0" />
          </button>
        </div>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default ReraInformation;
