import React, { useRef } from "react";
import {
  Building,
  ChevronDown,
  Factory,
  Home,
  Info,
  Landmark,
  Store,
  Warehouse,
} from "lucide-react";

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

  // const scrollDown = () => {
  //   if (contentRef.current) {
  //     contentRef.current.scrollBy({
  //       top: 100,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    htmlContent && (
      <>
        {/* Two-column layout for medium screens and up */}
        {/* <h2 className="text-4xl flex justify-center font-bold text-white mb-8">
              {heading}
            </h2>
            <hr className="w-3/4 border-t-2 border-teal-500 mx-auto mb-8" /> */}
        {/* Left content area */}
        {/* Section heading with badge */}
        {/* <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <Info size={20} className="text-teal-300 mr-2" />
                    <span className="bg-teal-400/10 text-teal-300 text-xs px-3 py-1 rounded-full border border-teal-300/30">
                      Information
                    </span>
                  </div>
                </div> */}

        {/* <h2 className="text-4xl font-bold text-white mb-4">
                  {heading}
                </h2> */}

        {/* Content Container */}
        <div className="relative rounded-xl bg-[#06202B]/80 backdrop-blur-md border border-[#077A7D] shadow-lg p-6 overflow-hidden">
          {/* Scrollable Content Area */}
          <div
            ref={contentRef}
            className="text-[#F5EEDD] text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar about-builder scroll-smooth"
            style={{ maxHeight }}
            dangerouslySetInnerHTML={createMarkup(htmlContent)}
          />

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#06202B] via-[#06202B]/80 to-transparent pointer-events-none transition-opacity duration-500" />

          {/* Navigation Dots */}
          {/* <div className="flex items-center justify-center mt-6 space-x-2">
                    <span className="w-8 h-2 rounded-full bg-teal-400 shadow-md transition" />
                    <span className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition" />
                    <span className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition" />
                  </div> */}
        </div>

        {/* Right action area */}
        {/* <div className="md:w-1/2 bg-slate-800 rounded-lg p-6 relative overflow-hidden"> */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900/90 z-10"></div> */}

        {/* <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-2 opacity-20">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <Building size={16} className="text-slate-400" />
                    </div>
                  ))}
                </div> */}

        {/* Main content with building icons */}
        {/* <div className="relative z-20 h-full flex flex-col"> */}
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
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-teal-400/20 shadow-[0_4px_20px_rgba(0,255,255,0.1)] hover:shadow-[0_6px_24px_rgba(0,255,255,0.2)] transition-all duration-300 flex items-center justify-center group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-emerald-500/5 opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="z-10 w-14 h-14 rounded-full bg-teal-400/10 border border-teal-300/30 flex items-center justify-center shadow-inner shadow-teal-500/10 group-hover:bg-teal-300/10 transition">
                        <Building
                          size={30}
                          className="text-teal-300 group-hover:text-teal-200 transition"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-emerald-400/20 shadow-[0_4px_20px_rgba(0,255,127,0.1)] hover:shadow-[0_6px_24px_rgba(0,255,127,0.2)] transition-all duration-300 flex items-center justify-center group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-emerald-400/5 opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="z-10 w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-300/30 flex items-center justify-center shadow-inner shadow-emerald-500/10 group-hover:bg-emerald-300/10 transition">
                        <Home
                          size={30}
                          className="text-emerald-400 group-hover:text-emerald-200 transition"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-teal-400/20 shadow-[0_4px_20px_rgba(0,255,255,0.1)] hover:shadow-[0_6px_24px_rgba(0,255,255,0.2)] transition-all duration-300 flex items-center justify-center group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-teal-400/5 opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="z-10 w-14 h-14 rounded-full bg-teal-400/10 border border-teal-300/30 flex items-center justify-center shadow-inner shadow-teal-500/10 group-hover:bg-teal-300/10 transition">
                        <Warehouse
                          size={30}
                          className="text-teal-300 group-hover:text-teal-200 transition"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-emerald-400/20 shadow-[0_4px_20px_rgba(0,255,127,0.1)] hover:shadow-[0_6px_24px_rgba(0,255,127,0.2)] transition-all duration-300 flex items-center justify-center group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-emerald-400/5 opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="z-10 w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-300/30 flex items-center justify-center shadow-inner shadow-emerald-500/10 group-hover:bg-emerald-300/10 transition">
                        <Factory
                          size={30}
                          className="text-emerald-400 group-hover:text-emerald-200 transition"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-teal-400/20 shadow-[0_4px_20px_rgba(0,255,255,0.1)] hover:shadow-[0_6px_24px_rgba(0,255,255,0.2)] transition-all duration-300 flex items-center justify-center group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-teal-400/5 opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="z-10 w-14 h-14 rounded-full bg-teal-400/10 border border-teal-300/30 flex items-center justify-center shadow-inner shadow-teal-500/10 group-hover:bg-teal-300/10 transition">
                        <Landmark
                          size={30}
                          className="text-teal-300 group-hover:text-teal-200 transition"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/70 border border-emerald-400/20 shadow-[0_4px_20px_rgba(0,255,127,0.1)] hover:shadow-[0_6px_24px_rgba(0,255,127,0.2)] transition-all duration-300 flex items-center justify-center group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-emerald-400/5 opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="z-10 w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-300/30 flex items-center justify-center shadow-inner shadow-emerald-500/10 group-hover:bg-emerald-300/10 transition">
                        <Store
                          size={30}
                          className="text-emerald-400 group-hover:text-emerald-200 transition"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div> */}

        {/* Bottom section with horizontal building pattern */}
        {/* <div className="flex justify-between items-end mb-6 h-12">
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
                  </div> */}

        {/* Button area */}
        {/* <div className="mt-auto">
                    <button
                      onClick={scrollDown}
                      className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 rounded-lg flex items-center justify-center transition-all duration-200"
                    >
                      <span className="text-white">Learn More...</span>
                      <ChevronDown size={16} className="text-white" />
                    </button>
                  </div> */}
        {/* </div> */}
        {/* </div> */}

        <style jsx>{`
          .about-builder h1 {
            font-size: 1.5rem;
            margin-bottom: 16px;
            font-weight: bold;
          }
          .about-builder h2 {
            font-size: 1.3rem;
            margin-top: 20px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .about-builder h3 {
            font-size: 1.1rem;
            margin-top: 20px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .about-builder p {
            margin-bottom: 14px;
          }
          .about-builder strong {
            font-weight: bold;
          }
          .about-builder a {
            font-weight: bold;
            text-decoration: underline;
          }
        `}</style>
      </>
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
