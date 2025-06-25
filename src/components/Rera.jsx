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
      <div className="bg-slate-900 min-h-[300px] py-12 px-4 flex items-center justify-center">
        <Loader size={30} className="text-teal-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-[300px] py-12 px-4">
        <div className="max-w-4xl mx-auto bg-red-900/20 p-6 rounded-lg flex items-center gap-4">
          <AlertTriangle size={24} className="text-red-400 flex-shrink-0" />
          <p className="text-red-300">
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
        className="relative bg-[#622569] py-16 px-4 overflow-hidden"
        id="about"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(98, 37, 105, 0.95), rgba(98, 37, 105, 0.85)), url("https://via.placeholder.com/1920x1080")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Accent elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5b9aa0]/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b8a9c9]/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        {displayed.map((reraData) => {
          return (
            <>
              <div className="max-w-6xl mx-auto relative z-10 mb-6">
                <div className="bg-[#5b9aa0]/10 rounded-xl overflow-hidden shadow-lg shadow-[#5b9aa0]/20 border border-[#d6d4e0]/10">
                  <div className="p-6 flex flex-col md:flex-wrap md:flex-row md:items-center md:justify-between gap-4 md:gap-y-2">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center md:text-left w-full md:w-auto">
                        {pageInfo?.heading || "RERA Information"}
                      </h2>
                      <h3 className="text-lg sm:text-xl font-semibold text-white text-center md:text-left w-full md:w-auto">
                        {reraData.phase_name}
                      </h3>
                    </div>

                    {pageInfo?.subheading && (
                      <p className="text-[#d6d4e0] text-center md:text-left w-full md:w-auto">
                        {pageInfo.subheading}
                      </p>
                    )}
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                      <div className="inline-flex items-center bg-[#5b9aa0]/10 border border-[#5b9aa0]/30 px-3 py-1 rounded-full text-sm">
                        <CheckCircle
                          size={14}
                          className="text-[#5b9aa0] mr-2"
                        />
                        <span className="text-[#5b9aa0]">
                          MahaRERA Registered Project
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-full flex justify-center flex-wrap gap-4">
                      <div className="mb-8 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-[#d6d4e0]/10 to-[#622569]/10 backdrop-blur-md border border-[#d6d4e0]/10 shadow-lg overflow-hidden">
                          <div className="w-full flex justify-center bg-gradient-to-b from-[#5b9aa0]/30 to-[#b8a9c9]/20 shadow-inner py-4">
                            <div className="w-10 h-10 rounded-full bg-[#5b9aa0]/20 flex items-center justify-center shadow-md">
                              <FileText size={22} className="text-[#d6d4e0]" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center px-5 py-4 text-left flex-grow">
                            <span className="block text-xs md:text-sm text-[#b8a9c9] tracking-wide mb-1">
                              MahaRERA ID
                            </span>
                            <p className="text-white font-semibold text-sm md:text-lg">
                              {reraData.rera_id}
                            </p>
                          </div>
                        </div>

                        <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-[#d6d4e0]/10 to-[#622569]/10 backdrop-blur-md border border-[#d6d4e0]/10 shadow-lg overflow-hidden">
                          <div className="w-full flex justify-center bg-gradient-to-b from-[#5b9aa0]/30 to-[#b8a9c9]/20 shadow-inner py-4">
                            <div className="w-10 h-10 rounded-full bg-[#5b9aa0]/20 flex items-center justify-center shadow-md">
                              <Calendar size={22} className="text-[#d6d4e0]" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center px-5 py-4 text-left">
                            <span className="block text-xs md:text-sm text-[#b8a9c9] tracking-wide mb-1">
                              Completion Date
                            </span>
                            <p className="text-white font-semibold text-sm md:text-lg">
                              {formatDate(reraData.completion_date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-[#d6d4e0]/10 to-[#622569]/10 backdrop-blur-md border border-[#d6d4e0]/10 shadow-lg overflow-hidden">
                          <div className="w-full flex justify-center bg-gradient-to-b from-[#5b9aa0]/30 to-[#b8a9c9]/20 shadow-inner py-4">
                            <div className="w-10 h-10 rounded-full bg-[#5b9aa0]/20 flex items-center justify-center shadow-md">
                              <MapPin size={22} className="text-[#d6d4e0]" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center px-5 py-4 text-left">
                            <span className="block text-xs md:text-sm text-[#b8a9c9] tracking-wide mb-1">
                              Project Area
                            </span>
                            <p className="text-white font-semibold text-sm md:text-lg">
                              {reraData.total_area.toLocaleString()} sq.m
                              <span className="text-[#d6d4e0] text-sm ml-1">
                                ({reraData.total_acre} Acre)
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-[#d6d4e0]/10 to-[#622569]/10 backdrop-blur-md border border-[#d6d4e0]/10 shadow-lg overflow-hidden">
                          <div className="w-full flex justify-center bg-gradient-to-b from-[#5b9aa0]/30 to-[#b8a9c9]/20 shadow-inner py-4">
                            <div className="w-10 h-10 rounded-full bg-[#5b9aa0]/20 flex items-center justify-center shadow-md">
                              <Building size={22} className="text-[#d6d4e0]" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center px-5 py-4 text-left">
                            <span className="block text-xs md:text-sm text-[#b8a9c9] tracking-wide mb-1">
                              Towers & Units
                            </span>
                            <p className="text-white font-semibold text-sm md:text-lg">
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
                <div className="bg-[#622569]/80 rounded-xl overflow-hidden shadow-lg shadow-[#5b9aa0]/20 border border-[#d6d4e0]/10">
                  {/* RERA Header Card */}
                  <div className="bg-gradient-to-r from-[#622569] to-[#5b9aa0] p-6 border-b border-[#d6d4e0]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag size={18} className="text-[#d6d4e0] mr-2" />
                        <h3 className="text-lg font-medium text-white">
                          MahaRERA Registration Details
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#b8a9c9]"></span>
                        <span className="inline-block w-6 h-2 rounded-full bg-[#5b9aa0]"></span>
                        <span className="inline-block w-2 h-2 rounded-full bg-[#b8a9c9]"></span>
                      </div>
                    </div>
                  </div>

                  {/* MahaRERA Info */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#b8a9c9]/10 to-[#622569]/10 backdrop-blur-md border border-[#d6d4e0]/10 shadow-lg">
                      <div className="w-full md:w-2/3">
                        <h4 className="text-white font-semibold mb-4 flex items-center">
                          <FileText size={18} className="text-[#5b9aa0] mr-2" />
                          MahaRera Compliance Information
                        </h4>
                        <div className="bg-[#5b9aa0]/10 p-5 rounded-xl border border-[#d6d4e0]/20 shadow-inner">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-[#5b9aa0] mt-1.5 mr-3"></div>
                              <span className="text-[#d6d4e0] text-sm">
                                This project is registered under Maharashtra
                                MahaRera
                              </span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-[#5b9aa0] mt-1.5 mr-3"></div>
                              <span className="text-[#d6d4e0] text-sm">
                                MahaRera Registration:{" "}
                                <span className="text-white font-medium">
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

                    <div className="mt-6 pt-4 border-t border-[#d6d4e0]/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#d6d4e0]/80">
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
              className="border border-[#5b9aa0] text-white font-medium px-6 py-2 rounded-md"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
        <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-[#5b9aa0]/90 to-[#622569]/80 rounded-2xl p-8 border border-[#d6d4e0]/10 shadow-xl shadow-black/20 text-center">
          <h4 className="text-white text-2xl font-semibold mb-2">
            Need More Information?
          </h4>
          <p className="text-[#d6d4e0] text-base mb-6 leading-relaxed">
            Request detailed property documents and specifications for this
            MahaRERA registered project.
          </p>
          <button
            onClick={openDialog}
            className="bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] hover:from-[#5b9aa0]/90 hover:to-[#b8a9c9]/90 active:from-[#5b9aa0]/80 active:to-[#b8a9c9]/80 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl shadow-[#5b9aa0]/30 mx-auto block"
          >
            Request Property Documents
          </button>
        </div>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default ReraInformation;
