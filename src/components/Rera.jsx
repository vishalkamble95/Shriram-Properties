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
        className="relative bg-slate-900 py-16 px-4 overflow-hidden"
        id="about"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85)), url("https://via.placeholder.com/1920x1080")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Accent elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        {displayed.map((reraData) => {
          return (
            <>
              <div className="max-w-6xl mx-auto relative z-10 mb-6">
                {/* Status Badge - Top Right */}
                <div className="flex justify-end mb-6">
                  <div className="inline-flex items-center bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full text-sm">
                    <CheckCircle size={14} className="text-teal-400 mr-2" />
                    <span className="text-teal-300">
                      MahaRERA Registered Project
                    </span>
                  </div>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left column - Content */}
                  <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {pageInfo?.heading || "RERA Information"}
                    </h2>

                    <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4"></div>

                    {pageInfo?.subheading && (
                      <p className="text-slate-300 mb-6">
                        {pageInfo.subheading}
                      </p>
                    )}

                    {/* Project Information */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {reraData.phase_name}
                      </h3>

                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mr-3">
                          <FileText size={20} className="text-teal-400" />
                        </div>
                        <div>
                          <span className="text-slate-300 text-sm">
                            MahaRERA ID
                          </span>
                          <p className="text-white font-medium">
                            {reraData.rera_id}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mr-3">
                          <Calendar size={20} className="text-teal-400" />
                        </div>
                        <div>
                          <span className="text-slate-300 text-sm">
                            Completion Date
                          </span>
                          <p className="text-white font-medium">
                            {formatDate(reraData.completion_date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mr-3">
                          <MapPin size={20} className="text-teal-400" />
                        </div>
                        <div>
                          <span className="text-slate-300 text-sm">
                            Project Area
                          </span>
                          <p className="text-white font-medium">
                            {reraData.total_area.toLocaleString()} sq.m
                            <span className="text-slate-400 text-sm ml-1">
                              ({reraData.total_acre} Acre)
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mr-3">
                          <Building size={20} className="text-teal-400" />
                        </div>
                        <div>
                          <span className="text-slate-300 text-sm">
                            Towers & Units
                          </span>
                          <p className="text-white font-medium">
                            {reraData.total_tower} Towers ·{" "}
                            {reraData.total_units} Units
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Clock size={18} className="text-teal-400 mr-2" />
                        Project Timeline
                      </h4>
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-emerald-500"></div>

                        <div className="relative">
                          <div className="absolute left-0 top-0.5 w-3 h-3 rounded-full bg-teal-400 -ml-1.5"></div>
                          <div className="bg-slate-800/60 p-3 rounded-lg">
                            <p className="text-slate-300 text-sm">
                              Expected Completion
                            </p>
                            <p className="text-white text-sm font-medium">
                              {formatDate(reraData.completion_date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column - Cards & Action */}
                  <div className="md:w-1/2">
                    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg shadow-teal-900/10 border border-slate-700">
                      {/* RERA Header Card */}
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Tag size={18} className="text-teal-400 mr-2" />
                            <h3 className="text-lg font-medium text-white">
                              MahaRERA Registration Details
                            </h3>
                          </div>
                          <div className="flex space-x-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-slate-600"></span>
                            <span className="inline-block w-6 h-2 rounded-full bg-teal-500"></span>
                            <span className="inline-block w-2 h-2 rounded-full bg-slate-600"></span>
                          </div>
                        </div>
                      </div>

                      {/* MahaRERA Info */}
                      <div className="p-6">
                        <div className="mb-6">
                          <h4 className="text-white font-semibold mb-4 flex items-center">
                            <FileText
                              size={18}
                              className="text-teal-400 mr-2"
                            />
                            MahaRERA Compliance Information
                          </h4>
                          <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-700">
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 mr-2"></div>
                                <span className="text-slate-300 text-sm">
                                  This project is registered under Maharashtra
                                  RERA
                                </span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 mr-2"></div>
                                <span className="text-slate-300 text-sm">
                                  MahaRERA Registration: {reraData.rera_id}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="inline-flex w-full items-center justify-center">
                          <QRCodeCanvas
                            value={reraData.rera_url}
                            height={120}
                            width={120}
                            className="p-3 bg-[#ffffff] rounded-xl"
                          />
                        </div>

                        {/* Source Footer */}
                        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400">
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
                </div>
              </div>
            </>
          );
        })}
        {/* Show more / less toggle */}
        {reraData.length > 2 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="border border-teal-500 text-white font-medium px-6 py-2 rounded-md"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
        {/* CTA Card */}
        <div className=" max-w-6xl mx-auto mt-6 bg-slate-800/80 rounded-xl p-6 border border-slate-700">
          <h4 className="text-white font-medium mb-2">
            Need More Information?
          </h4>
          <p className="text-slate-300 text-sm mb-4">
            Request detailed property documents and specifications for this RERA
            registered project.
          </p>
          <button
            onClick={openDialog}
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 active:from-teal-700 active:to-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-teal-900/20"
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
