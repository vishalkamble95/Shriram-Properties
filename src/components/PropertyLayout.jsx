import React, { useState, useEffect } from "react";
import {
  Building,
  LayoutGrid,
  Map,
  Loader,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  PenSquare,
  Ruler,
  Tag,
  Calendar,
  X,
  ChevronRight,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const PropertyLayouts = () => {
  const [activeTab, setActiveTab] = useState("unit");
  const [unitLayouts, setUnitLayouts] = useState([]);
  const [floorLayouts, setFloorLayouts] = useState([]);
  const [masterLayouts, setMasterLayouts] = useState([]);
  const [pageHeadings, setPageHeadings] = useState({
    unit: "",
    floor: "",
    master: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch unit layouts
        const unitRes = await fetch(
          `${config.API_URL}/unit-layout?website=${config.SLUG_URL}`
        );
        const unitData = await unitRes.json();
        setUnitLayouts(unitData.unit_layout);
        setPageHeadings((prevHeadings) => ({
          ...prevHeadings,
          unit: unitData.page[0].heading,
        }));

        // Fetch floor layouts
        const floorRes = await fetch(
          `${config.API_URL}/floor-layout?website=${config.SLUG_URL}`
        );
        const floorData = await floorRes.json();
        setFloorLayouts(floorData.Floor_plans);
        setPageHeadings((prevHeadings) => ({
          ...prevHeadings,
          floor: floorData.page[0].heading,
        }));

        // Fetch master layouts
        const masterRes = await fetch(
          `${config.API_URL}/master-layout?website=${config.SLUG_URL}`
        );
        const masterData = await masterRes.json();
        setMasterLayouts(masterData.master_layout);
        setPageHeadings((prevHeadings) => ({
          ...prevHeadings,
          master: masterData.page[0].heading,
        }));

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch layouts data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    const layouts = getActiveLayouts();
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? layouts.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    const layouts = getActiveLayouts();
    setCurrentSlide((prevSlide) =>
      prevSlide === layouts.length - 1 ? 0 : prevSlide + 1
    );
  };

  const getActiveLayouts = () => {
    switch (activeTab) {
      case "unit":
        return unitLayouts;
      case "floor":
        return floorLayouts;
      case "master":
        return masterLayouts;
      default:
        return [];
    }
  };

  const getCurrentHeading = () => {
    return pageHeadings[activeTab] || "Property Layouts";
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-[400px] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader size={36} className="text-teal-400 animate-spin" />
          <p className="text-slate-300">Loading property layouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 p-8">
        <div className="bg-red-900/20 p-6 rounded-lg flex items-center gap-4 border border-red-900/30">
          <AlertTriangle size={24} className="text-red-400" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  const activeLayouts = getActiveLayouts();

  return (
    <>
      <div
        className="relative bg-[#622569] py-16 px-6 md:px-10 overflow-hidden"
        id="layouts"
      >
        {/* Background gradient effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b8a9c9]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5b9aa0]/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div>
            {/* Section Header */}
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {getCurrentHeading()}
              </h2>
              <p className="text-[#d6d4e0]">
                Explore detailed layouts and floor plans to visualize your
                future living space
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex flex-col sm:flex-row justify-center sm:justify-center items-stretch sm:items-center bg-[#d6d4e0]/80 p-1.5 rounded-2xl backdrop-blur-sm border border-[#b8a9c9] shadow-xl w-full max-w-2xl mx-auto gap-2 sm:gap-2">
                {/* Unit Layout Tab */}
                <button
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all mx-0.5 font-medium text-sm sm:text-base ${
                    activeTab === "unit"
                      ? "bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white shadow-md shadow-[#5b9aa0]/30"
                      : "text-[#622569] hover:text-white hover:bg-[#b8a9c9]/50"
                  }`}
                  onClick={() => {
                    setActiveTab("unit");
                    setCurrentSlide(0);
                  }}
                >
                  <Building size={18} />
                  <span>Unit Layouts</span>
                </button>

                {/* Floor Plans Tab */}
                <button
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all mx-0.5 font-medium text-sm sm:text-base ${
                    activeTab === "floor"
                      ? "bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white shadow-md shadow-[#5b9aa0]/30"
                      : "text-[#622569] hover:text-white hover:bg-[#b8a9c9]/50"
                  }`}
                  onClick={() => {
                    setActiveTab("floor");
                    setCurrentSlide(0);
                  }}
                >
                  <LayoutGrid size={18} />
                  <span>Floor Plans</span>
                </button>

                {/* Master Layout Tab */}
                <button
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all mx-0.5 font-medium text-sm sm:text-base ${
                    activeTab === "master"
                      ? "bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white shadow-md shadow-[#5b9aa0]/30"
                      : "text-[#622569] hover:text-white hover:bg-[#b8a9c9]/50"
                  }`}
                  onClick={() => {
                    setActiveTab("master");
                    setCurrentSlide(0);
                  }}
                >
                  <Map size={18} />
                  <span>Master Layout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative max-w-6xl mx-auto">
            {activeLayouts.length === 0 ? (
              <div className="bg-[#d6d4e0]/30 backdrop-blur-sm border border-[#b8a9c9] p-10 rounded-2xl text-center shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b8a9c9]/60 flex items-center justify-center">
                  <AlertTriangle size={24} className="text-[#5b9aa0]" />
                </div>
                <p className="text-[#622569] text-lg mb-2 font-semibold">
                  No layouts available
                </p>
                <p className="text-[#622569]/80">
                  There are currently no layouts available in this category.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Layout Display */}
                <div className="flex flex-col gap-12 items-center">
                  {/* Details Side */}
                  <div className="w-full flex flex-col items-center">
                    <div>
                      {activeTab === "unit" && (
                        <>
                          <div className="mb-8 text-center">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                              {activeLayouts[currentSlide]
                                ?.unit_layout_heading ||
                                activeLayouts[currentSlide]?.layout_name}
                            </h3>
                            <p className="text-[#d6d4e0] max-w-2xl mx-auto sm:mx-0">
                              Premium apartment design with optimal space
                              utilization and modern amenities.
                            </p>
                          </div>

                          {/* Info Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Layout Type */}
                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-[#d6d4e0] to-[#b8a9c9] border border-[#b8a9c9] shadow-md hover:shadow-[#5b9aa0]/40 transition-all">
                              <div className="p-3 rounded-lg bg-[#5b9aa0]/20 text-[#622569]">
                                <PenSquare size={22} />
                              </div>
                              <div>
                                <p className="text-sm text-[#622569]/70 mb-1">
                                  Layout Type
                                </p>
                                <p className="text-lg font-semibold text-[#622569]">
                                  {activeLayouts[currentSlide]?.layout_name}
                                </p>
                              </div>
                            </div>

                            {/* Carpet Area */}
                            {activeLayouts[currentSlide]
                              ?.unit_layout_carpet_area && (
                              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-[#d6d4e0] to-[#b8a9c9] border border-[#b8a9c9] shadow-md hover:shadow-[#5b9aa0]/40 transition-all">
                                <div className="p-3 rounded-lg bg-[#5b9aa0]/20 text-[#622569]">
                                  <Ruler size={22} />
                                </div>
                                <div>
                                  <p className="text-sm text-[#622569]/70 mb-1">
                                    Carpet Area
                                  </p>
                                  <p className="text-lg font-semibold text-[#622569]">
                                    {
                                      activeLayouts[currentSlide]
                                        ?.unit_layout_carpet_area
                                    }
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Price */}
                            {activeLayouts[currentSlide]?.unit_layout_price && (
                              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-[#d6d4e0] to-[#b8a9c9] border border-[#b8a9c9] shadow-md hover:shadow-[#5b9aa0]/40 transition-all">
                                <div className="p-3 rounded-lg bg-[#5b9aa0]/20 text-[#622569]">
                                  <Tag size={22} />
                                </div>
                                <div>
                                  <p className="text-sm text-[#622569]/70 mb-1">
                                    Price
                                  </p>
                                  <p className="text-lg font-semibold text-[#622569]">
                                    {
                                      activeLayouts[currentSlide]
                                        ?.unit_layout_price
                                    }
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Enquire Button */}
                          <div className="mt-8 text-center">
                            <button
                              onClick={openDialog}
                              className="relative inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-[#5b9aa0] to-[#622569] text-white font-semibold text-base transition-all duration-300 ease-in-out shadow-xl shadow-[#5b9aa0]/30 hover:from-[#4e8c91] hover:to-[#51194e] hover:shadow-[#5b9aa0]/50 active:scale-95 group overflow-hidden"
                            >
                              <span className="z-10">Enquire Now</span>
                              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></span>
                              <span className="absolute left-[-40%] top-0 w-2/3 h-full bg-white/10 rotate-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-out blur-lg" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {activeTab === "floor" && (
                      <>
                        <div className="mb-2 text-center">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            {activeLayouts[currentSlide]
                              ?.floor_layout_heading ||
                              activeLayouts[currentSlide]?.layout_name}
                          </h3>
                          <p className="text-[#d6d4e0]">
                            Detailed floor plan with comprehensive layout
                            information.
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={openDialog}
                            className="relative inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-[#5b9aa0] to-[#622569] text-white font-semibold text-base transition-all duration-300 ease-in-out shadow-xl shadow-[#5b9aa0]/30 hover:from-[#4e8c91] hover:to-[#51194e] hover:shadow-[#5b9aa0]/50 active:scale-95 group overflow-hidden"
                          >
                            <span className="z-10">Enquire Now</span>
                            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></span>
                            <span className="absolute left-[-40%] top-0 w-2/3 h-full bg-white/10 rotate-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-out blur-lg" />
                          </button>
                        </div>
                      </>
                    )}

                    {activeTab === "master" && (
                      <>
                        <div className="mb-2 text-center">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            {activeLayouts[currentSlide]
                              ?.master_layout_heading ||
                              activeLayouts[currentSlide]?.layout_name}
                          </h3>
                          <p className="text-[#d6d4e0]">
                            Overview of the master layout offering a complete
                            view of the property.
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={openDialog}
                            className="relative inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-[#5b9aa0] to-[#622569] text-white font-semibold text-base transition-all duration-300 ease-in-out shadow-xl shadow-[#5b9aa0]/30 hover:from-[#4e8c91] hover:to-[#51194e] hover:shadow-[#5b9aa0]/50 active:scale-95 group overflow-hidden"
                          >
                            <span className="z-10">Enquire Now</span>
                            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></span>
                            <span className="absolute left-[-40%] top-0 w-2/3 h-full bg-white/10 rotate-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-out blur-lg" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Image Side */}
                  <div className="w-full relative group">
                    <div className="aspect-video bg-[#d6d4e0]/40 backdrop-blur-md rounded-2xl overflow-hidden border border-[#b8a9c9] shadow-2xl shadow-[#622569]/30 transition-all duration-300">
                      <img
                        src={activeLayouts[currentSlide]?.layout_image}
                        alt={activeLayouts[currentSlide]?.layout_name}
                        className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#622569]/60 via-[#622569]/10 to-transparent pointer-events-none" />
                    </div>
                    <button
                      onClick={() =>
                        setExpandedImage(
                          activeLayouts[currentSlide]?.layout_image
                        )
                      }
                      className="absolute top-3 right-3 p-2 rounded-lg bg-[#b8a9c9]/80 backdrop-blur-sm border border-[#622569]/40 text-[#622569] shadow-md hover:bg-[#5b9aa0] hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <Maximize2 size={20} />
                    </button>
                    {activeLayouts.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#b8a9c9]/80 backdrop-blur-sm border border-[#622569]/40 text-[#622569] flex items-center justify-center shadow-md hover:bg-[#5b9aa0] hover:text-white hover:scale-110 transition-all duration-300"
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#b8a9c9]/80 backdrop-blur-sm border border-[#622569]/40 text-[#622569] flex items-center justify-center shadow-md hover:bg-[#5b9aa0] hover:text-white hover:scale-110 transition-all duration-300"
                        >
                          <ArrowRight size={20} />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#b8a9c9]/70 to-[#d6d4e0]/70 backdrop-blur-sm text-xs text-[#622569] border border-[#622569]/30 shadow-inner shadow-black/10">
                      Layout {currentSlide + 1} of {activeLayouts.length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Image Modal with backdrop closing functionality */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 p-2 text-red rounded-full bg-slate-800/80 backdrop-blur-sm shadow-lg hover:bg-red-500 transition-colors duration-300"
              onClick={() => setExpandedImage(null)}
            >
              <X size={24} className="text-teal-600" />
            </button>
            <img
              src={expandedImage}
              alt="Expanded Layout"
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default PropertyLayouts;
