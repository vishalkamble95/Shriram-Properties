import React, { useRef } from "react";
import { Building, ChevronDown, Factory, Home, Info, Landmark, Store, Warehouse } from "lucide-react";

const AboutBuilder = ({
  heading = "About Builder",
  htmlContent = "",
  maxHeight = "300px",
}) => {
  const contentRef = useRef(null);

  // Function to safely render HTML content
  const createMarkup = (content) => {
    return { __html: content };
  };

  const scrollDown = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({
        top: 100,
        behavior: "smooth",
      });
    }
  };

  return (
    htmlContent && (
      <div
        className="bg-slate-900 border border-slate-800 overflow-hidden"
        id="about-builder"
      >
        <div className="max-w-7xl mx-auto p-6">
          {/* Two-column layout for medium screens and up */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left content area */}
            <div className="md:w-1/2">
              {/* Section heading with badge */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <Info size={20} className="text-teal-300 mr-2" />
                  <span className="bg-teal-400/10 text-teal-300 text-xs px-3 py-1 rounded-full border border-teal-300/30">
                    Information
                  </span>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-white mb-4">{heading}</h2>

              {/* Content Container */}
              <div className="relative">
                <div
                  ref={contentRef}
                  className="text-slate-300 overflow-y-auto pr-4 custom-scrollbar"
                  style={{
                    maxHeight,
                  }}
                  dangerouslySetInnerHTML={createMarkup(htmlContent)}
                />

                {/* Gradient overlay for bottom fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none"></div>

                {/* Navigation dots */}
                <div className="flex items-center justify-center mt-6 space-x-2">
                  <div className="w-8 h-2 rounded-full bg-teal-400"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                </div>
              </div>
            </div>

            {/* Right action area */}
            <div className="md:w-1/2 bg-slate-800 rounded-lg p-6 relative overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900/90 z-10"></div>

              {/* Building icons pattern background */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-2 opacity-20">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Building size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>

              {/* Main content with building icons */}
              <div className="relative z-20 h-full flex flex-col">
                {/* Top section with large building icon */}
                {/* <div className="flex-1 flex items-center justify-center mb-8">
                  <div className="relative">
                    <Building
                      size={120}
                      className="text-teal-400/90"
                      strokeWidth={1}
                    />
                    <Home
                      size={48}
                      className="text-emerald-500/90 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      strokeWidth={1.5}
                    />
                  </div>
                </div> */}

                {/* Middle section with architectural pattern */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center border border-teal-400/20">
                    <Building
                      size={32}
                      className="text-teal-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <Home
                      size={32}
                      className="text-emerald-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center border border-teal-400/20">
                    <Warehouse
                      size={32}
                      className="text-teal-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <Factory
                      size={32}
                      className="text-emerald-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center border border-teal-400/20">
                    <Landmark
                      size={32}
                      className="text-teal-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <Store
                      size={32}
                      className="text-emerald-400"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Bottom section with horizontal building pattern */}
                <div className="flex justify-between items-end mb-6 h-12">
                  {[...Array(8)].map((_, i) => {
                    const height = 12 + Math.abs(Math.sin(i * 0.8) * 36);
                    return (
                      <div
                        key={i}
                        className="h-full flex items-end"
                        style={{ height: `${height}px` }}
                      >
                        <div
                          className={`w-5 bg-gradient-to-t ${
                            i % 2 === 0
                              ? "from-teal-500/40 to-teal-400/10"
                              : "from-emerald-500/40 to-emerald-400/10"
                          } rounded-t-sm`}
                          style={{ height: "100%" }}
                        ></div>
                      </div>
                    );
                  })}
                </div>

                {/* Button area */}
                <div className="mt-auto">
                  <button
                    onClick={scrollDown}
                    className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 rounded-lg flex items-center justify-center transition-all duration-200"
                  >
                    <span className="text-white">Learn More...</span>
                    <ChevronDown size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AboutBuilder;

// Add custom scrollbar styles
const addCustomScrollbarStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #0f172a;
      border-radius: 2px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #5eead4;
      border-radius: 2px;
    }
    
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #5eead4 #0f172a;
    }
  `;
  document.head.appendChild(style);
};

// Execute the function when the component is used
if (typeof document !== "undefined") {
  addCustomScrollbarStyles();
}
