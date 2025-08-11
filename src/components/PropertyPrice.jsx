import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Building,
  Building2,
  ChevronDown,
  RefreshCw,
  Tag,
  ChevronRight,
} from "lucide-react";
import { API } from "../../config";

const PropertyPriceTable = () => {
  const [propertyPrices, setPropertyPrices] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchPropertyPrices = async () => {
      setLoading(true);
      try {
        const response = await fetch(API.PROPERTY_PRICES());
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPropertyPrices(data.property_prices);
        if (data.page && data.page.length > 0) {
          setHeading(data.page[0].heading);
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property prices");
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyPrices();
  }, []);

  const filteredProperties =
    filterType === "All"
      ? propertyPrices
      : propertyPrices.filter((price) => price.property_type === filterType);

  const propertyTypes = [
    "All",
    ...new Set(propertyPrices.map((price) => price.property_type)),
  ];

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(API.PROPERTY_PRICES());
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPropertyPrices(data.property_prices);
        if (data.page && data.page.length > 0) {
          setHeading(data.page[0].heading);
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property prices");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  const PropertyTypeIcon = ({ type }) => {
    if (type === "Office")
      return <Building className="w-5 h-5 text-[#FACC15]" />;
    if (type === "Showrooms")
      return <Building2 className="w-5 h-5 text-[#FACC15]" />;
    return <Tag className="w-5 h-5 text-[#FACC15]" />;
  };

  return (
    <section
      className="py-16 px-6 sm:px-10 lg:px-20 bg-gradient-to-tr from-[#222831] via-[#393E46] to-[#00ADB5] text-[#EEEEEE]"
      id="price"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold leading-snug text-[#EEEEEE]">
            {heading || "Property Pricing Details"}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#00ADB5] mt-4 max-w-2xl mx-auto">
            Premium properties tailored to your investment goals and square-foot
            dreams.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-6 mb-10">
          <div className="relative w-full sm:w-72">
            <div
              className="bg-[#EEEEEE] text-[#222831] px-4 py-2 rounded-lg border border-[#393E46] shadow-md flex items-center justify-between cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-2 font-semibold">
                {/* <PropertyTypeIcon type={filterType} /> */}
                {filterType}
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
                stroke="#222831"
              />
            </div>
            {isFilterOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#EEEEEE] rounded-xl border border-[#393E46] shadow-xl z-20 overflow-hidden">
                {propertyTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setFilterType(type);
                      setIsFilterOpen(false);
                    }}
                    className={`px-4 py-3 text-sm font-medium cursor-pointer hover:bg-[#00ADB5]/20 flex items-center gap-2 ${
                      filterType === type
                        ? "bg-[#00ADB5]/30 text-[#222831]"
                        : "text-[#222831]"
                    }`}
                  >
                    <PropertyTypeIcon type={type} /> {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center justify-between bg-[#ffeded] text-[#d32f2f] px-4 py-3 rounded-lg border border-[#d32f2f] w-full max-w-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" stroke="#d32f2f" />
                <span>{error}</span>
              </div>
              <button
                onClick={retryFetch}
                className="inline-flex items-center gap-2 bg-[#d32f2f] text-[#EEEEEE] px-3 py-1.5 rounded-md hover:bg-[#b71c1c]"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="h-12 w-12 border-4 border-[#00ADB5] border-t-[#222831] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((price) => (
                <div
                  key={price.id}
                  className="bg-[#EEEEEE] p-6 rounded-3xl shadow-lg border border-[#393E46] hover:shadow-xl transition-transform hover:scale-105 flex flex-col justify-between h-full"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {/* <PropertyTypeIcon type={price.property_type} /> */}
                        <span className="capitalize font-semibold text-[#222831]">
                          {price.property_type}
                        </span>
                      </div>
                      <span className="text-xs px-3 py-1 bg-[#393E46] text-[#EEEEEE] rounded-full">
                        Tower {price.property_tower}
                      </span>
                    </div>
                    <div className="text-xs italic text-[#00ADB5] mb-2 text-right">
                      {price.price_tag}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center bg-[#f3f3f3] p-3 rounded-lg border border-[#393E46]">
                        <p className="text-xs text-[#00ADB5] mb-1">SQ.M</p>
                        <p className="font-semibold text-[#222831]">
                          {parseFloat(price.property_carpet_sqm).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-center bg-[#f3f3f3] p-3 rounded-lg border border-[#393E46]">
                        <p className="text-xs text-[#00ADB5] mb-1">SQ.FT</p>
                        <p className="font-semibold text-[#222831]">
                          {price.property_carpet_sqft}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-lg font-extrabold text-[#222831]">
                      {price.property_price} {price.price_unit}*
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <AlertTriangle className="w-10 h-10 text-[#00ADB5] mb-4 mx-auto" />
                <p className="text-[#00ADB5] text-base">
                  No properties found for the selected filter.
                </p>
                <button
                  onClick={() => setFilterType("All")}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-[#00ADB5] text-[#222831] rounded-md font-medium hover:bg-[#007a85] transition"
                >
                  Show all properties <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-[#EEEEEE]/30 text-center">
          <p className="text-sm text-[#EEEEEE]/70 italic">
            * Prices are subject to change without prior notice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyPriceTable;
