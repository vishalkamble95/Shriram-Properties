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
        className="bg-slate-900 relative py-16 px-6 md:px-10 overflow-hidden"
        id="layouts"
      >
        {/* Background gradient effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 font-medium text-sm mb-4">
              <Map size={16} />
              <span>Property Layouts</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {getCurrentHeading()}
            </h2>
            <p className="text-slate-300">
              Explore detailed layouts and floor plans to visualize your future
              living space
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-10 ">
            <div className="inline-flex bg-slate-800/80 p-1.5 rounded-xl backdrop-blur-sm border border-slate-700/30 shadow-lg">
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition mx-0.5 ${
                  activeTab === "unit"
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => {
                  setActiveTab("unit");
                  setCurrentSlide(0);
                }}
              >
                <Building size={18} />
                <span>Unit Layouts</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition mx-0.5 ${
                  activeTab === "floor"
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => {
                  setActiveTab("floor");
                  setCurrentSlide(0);
                }}
              >
                <LayoutGrid size={18} />
                <span>Floor Plans</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition mx-0.5 ${
                  activeTab === "master"
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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

          {/* Content Area */}
          <div className="relative max-w-6xl mx-auto">
            {activeLayouts.length === 0 ? (
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 p-10 rounded-2xl text-center shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/60 flex items-center justify-center">
                  <AlertTriangle size={24} className="text-teal-300" />
                </div>
                <p className="text-slate-300 text-lg mb-2">
                  No layouts available
                </p>
                <p className="text-slate-400">
                  There are currently no layouts available in this category.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Layout Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Image Side */}
                  <div className="relative group order-2 md:order-1">
                    {/* Adjusted image container with a responsive aspect ratio */}
                    <div className="aspect-video bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/40 shadow-lg">
                      <img
                        src={activeLayouts[currentSlide]?.layout_image}
                        alt={activeLayouts[currentSlide]?.layout_name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
                    </div>

                    <button
                      className="absolute top-3 right-3 p-2 bg-slate-800/80 backdrop-blur-sm rounded-lg text-white shadow-lg border border-slate-700/40 opacity-90 hover:opacity-100 transition transform hover:scale-105"
                      onClick={() =>
                        setExpandedImage(
                          activeLayouts[currentSlide]?.layout_image
                        )
                      }
                    >
                      <Maximize2 size={20} />
                    </button>

                    {activeLayouts.length > 1 && (
                      <>
                        <button
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm text-white flex items-center justify-center border border-slate-700/40 shadow-lg hover:bg-teal-600 transition-all"
                          onClick={handlePrev}
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <button
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm text-white flex items-center justify-center border border-slate-700/40 shadow-lg hover:bg-teal-600 transition-all"
                          onClick={handleNext}
                        >
                          <ArrowRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Image Source Badge */}
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-slate-800/80 backdrop-blur-sm rounded-full text-xs text-slate-300 border border-slate-700/40">
                      Layout {currentSlide + 1} of {activeLayouts.length}
                    </div>
                  </div>

                  {/* Details Side */}
                  <div className="flex flex-col order-1 md:order-2">
                    {activeTab === "unit" && (
                      <>
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-3">
                            <Tag size={12} />
                            <span>Unit Details</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            {activeLayouts[currentSlide]?.unit_layout_heading ||
                              activeLayouts[currentSlide]?.layout_name}
                          </h3>
                          <p className="text-slate-300">
                            Premium apartment design with optimal space
                            utilization and modern amenities.
                          </p>
                        </div>

                        <div className="space-y-6 mt-2">
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/30">
                            <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400">
                              <PenSquare size={22} />
                            </div>
                            <div>
                              <p className="text-slate-400 text-sm">
                                Layout Type
                              </p>
                              <p className="text-white font-medium text-lg">
                                {activeLayouts[currentSlide]?.layout_name}
                              </p>
                            </div>
                          </div>

                          {activeLayouts[currentSlide]
                            ?.unit_layout_carpet_area && (
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/30">
                              <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400">
                                <Ruler size={22} />
                              </div>
                              <div>
                                <p className="text-slate-400 text-sm">
                                  Carpet Area
                                </p>
                                <p className="text-white font-medium text-lg">
                                  {
                                    activeLayouts[currentSlide]
                                      ?.unit_layout_carpet_area
                                  }
                                </p>
                              </div>
                            </div>
                          )}

                          {activeLayouts[currentSlide]?.unit_layout_price && (
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/30">
                              <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400">
                                <Tag size={22} />
                              </div>
                              <div>
                                <p className="text-slate-400 text-sm">Price</p>
                                <p className="text-white font-medium text-lg">
                                  {
                                    activeLayouts[currentSlide]
                                      ?.unit_layout_price
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-8">
                          <button
                            onClick={openDialog}
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
                          >
                            Enquire Now
                          </button>
                        </div>
                      </>
                    )}

                    {activeTab === "floor" && (
                      <>
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-3">
                            <Calendar size={12} />
                            <span>Floor Details</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            {activeLayouts[currentSlide]
                              ?.floor_layout_heading ||
                              activeLayouts[currentSlide]?.layout_name}
                          </h3>
                          <p className="text-slate-300">
                            Detailed floor plan with comprehensive layout
                            information.
                          </p>
                        </div>
                        <div className="mt-8">
                          <button
                            onClick={openDialog}
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
                          >
                            Enquire Now
                          </button>
                        </div>
                      </>
                    )}

                    {activeTab === "master" && (
                      <>
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-3">
                            <Tag size={12} />
                            <span>Master Layout Details</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            {activeLayouts[currentSlide]
                              ?.master_layout_heading ||
                              activeLayouts[currentSlide]?.layout_name}
                          </h3>
                          <p className="text-slate-300">
                            Overview of the master layout offering a complete
                            view of the property.
                          </p>
                        </div>
                        <div className="mt-8">
                          <button
                            onClick={openDialog}
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
                          >
                            Enquire Now
                          </button>
                        </div>
                      </>
                    )}
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
              <X size={24} className="text-teal-600"/>
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
      {isOpen && <ContactDialog closeDialog={closeDialog} />}
    </>
  );
};

export default PropertyLayouts;
