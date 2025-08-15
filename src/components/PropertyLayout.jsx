import React, { useState, useEffect } from "react";
import {
  Loader,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import { API } from "../../config";

const PropertyLayouts = () => {
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
  const [currentSlides, setCurrentSlides] = useState({
    unit: 0,
    floor: 0,
    master: 0,
  });
  const [expandedImage, setExpandedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const unitRes = await fetch(API.UNIT_LAYOUT());
        const unitData = await unitRes.json();
        setUnitLayouts(unitData.unit_layout);
        setPageHeadings((prev) => ({
          ...prev,
          unit: unitData.page[0].heading,
        }));

        const floorRes = await fetch(API.FLOOR_PLANS());
        const floorData = await floorRes.json();
        setFloorLayouts(floorData.Floor_plans);
        setPageHeadings((prev) => ({
          ...prev,
          floor: floorData.page[0].heading,
        }));

        const masterRes = await fetch(API.MASTER_LAYOUT());
        const masterData = await masterRes.json();
        setMasterLayouts(masterData.master_layout);
        setPageHeadings((prev) => ({
          ...prev,
          master: masterData.page[0].heading,
        }));

        setLoading(false);
      } catch {
        setError("Failed to fetch layouts data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSlide = (type, direction) => {
    const layouts = {
      unit: unitLayouts,
      floor: floorLayouts,
      master: masterLayouts,
    }[type];

    setCurrentSlides((prev) => {
      const newIndex =
        direction === "next"
          ? (prev[type] + 1) % layouts.length
          : (prev[type] - 1 + layouts.length) % layouts.length;
      return { ...prev, [type]: newIndex };
    });
  };

  const LayoutSection = ({ type, layouts, heading }) => {
    const current = currentSlides[type];
    const layout = layouts[current];

    if (layouts.length === 0) return null;

    // Updated bg colors based on palette:
    const bgColor =
      type === "unit"
        ? "bg-[#393E46]" // medium dark grayish blue
        : type === "floor"
        ? "bg-[#00ADB5]" // bright teal
        : "bg-[#EEEEEE]"; // off-white

    // Text colors matching backgrounds:
    const textColor =
      type === "floor"
        ? "text-[#222831]" // darkest for bright bg
        : type === "master"
        ? "text-[#222831]" // dark text on light bg
        : "text-[#EEEEEE]"; // light text on dark bg

    // Heading accent colors:
    const headingColor =
      type === "floor" ? "#EEEEEE" : type === "master" ? "#00ADB5" : "#00ADB5";

    // Button colors (background & text) per section type:
    const buttonBg =
      type === "floor" ? "#222831" : type === "master" ? "#00ADB5" : "#00ADB5";

    const buttonText = type === "floor" ? "#00ADB5" : "#222831";

    const buttonHoverBg = type === "floor" ? "#393E46" : "#008B99";

    return (
      <div className={`py-12 px-4 md:px-10 ${bgColor} rounded-2xl mb-10`}>
        <div className="text-center mb-10">
          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: headingColor }}
          >
            {heading}
          </h2>
          <p className={textColor}>
            {type === "unit" &&
              "Explore premium unit layouts with space efficiency and comfort."}
            {type === "floor" &&
              "View detailed floor plans for architectural clarity."}
            {type === "master" &&
              "Visualize the entire project with our master layout."}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div
            className={`aspect-video rounded-xl overflow-hidden border shadow-lg ${
              type === "master"
                ? "border-[#00ADB5]/40 bg-[#EEEEEE]"
                : "border-[#00ADB5]/40 bg-black/10"
            }`}
          >
            <img
              src={layout.layout_image}
              alt={layout.layout_name}
              className="object-cover w-full h-full"
            />
          </div>

          {layouts.length > 1 && (
            <>
              <button
                onClick={() => handleSlide(type, "prev")}
                style={{ backgroundColor: buttonBg, color: buttonText }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition hover:brightness-90"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => handleSlide(type, "next")}
                style={{ backgroundColor: buttonBg, color: buttonText }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition hover:brightness-90"
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}

          <button
            onClick={() => setExpandedImage(layout.layout_image)}
            style={{ backgroundColor: buttonBg, color: buttonText }}
            className="absolute top-3 right-3 p-2 rounded-lg transition hover:scale-105"
          >
            <Maximize2 size={20} />
          </button>
        </div>

        <div className="mt-6 text-center">
          <div className={`${textColor} text-sm space-y-1`}>
            {layout.unit_layout_carpet_area && (
              <p>Carpet Area: {layout.unit_layout_carpet_area}</p>
            )}
            {layout.unit_layout_price && (
              <p>Price: {layout.unit_layout_price}</p>
            )}
          </div>

          <button
            onClick={openDialog}
            style={{ backgroundColor: buttonBg, color: buttonText }}
            className="mt-5 inline-block px-6 py-2 font-semibold rounded-lg shadow transition hover:brightness-90 zoom-pulse"
          >
            Enquire Now
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#222831] min-h-[300px] flex items-center justify-center p-10">
        <div className="text-center">
          <Loader size={32} className="animate-spin text-[#00ADB5]" />
          <p className="text-[#00ADB5] mt-3">Loading layouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#222831] p-10 text-center text-red-400">
        <AlertTriangle size={24} className="inline mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#222831] py-14 px-4 md:px-10" id="layouts">
      <LayoutSection
        type="unit"
        layouts={unitLayouts}
        heading={pageHeadings.unit}
      />
      <LayoutSection
        type="floor"
        layouts={floorLayouts}
        heading={pageHeadings.floor}
      />
      <LayoutSection
        type="master"
        layouts={masterLayouts}
        heading={pageHeadings.master}
      />

      {expandedImage && (
        <div
          className="fixed inset-0 bg-[#222831]/90 flex items-center justify-center z-50"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-2 right-2 p-2 rounded-full"
              style={{ backgroundColor: "#00ADB5", color: "#222831" }}
            >
              <X size={20} />
            </button>
            <img
              src={expandedImage}
              alt="Expanded layout"
              className="max-w-full max-h-screen rounded-lg border border-[#00ADB5]/40 shadow-lg"
            />
          </div>
        </div>
      )}

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </div>
  );
};

export default PropertyLayouts;
