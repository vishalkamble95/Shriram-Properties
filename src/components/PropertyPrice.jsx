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
      className="py-16 px-6 sm:px-10 lg:px-20 bg-gradient-to-tr from-[#0E1A24] via-[#0F766E] to-[#CBD5E1] text-[#0E1A24]"
      id="price"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold leading-snug text-white">
            {heading || "Property Pricing Details"}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#FACC15] mt-4 max-w-2xl mx-auto">
            Premium commercial units tailored to your investment goals and
            square-foot dreams.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-6 mb-10">
          <div className="relative w-full sm:w-72">
            <div
              className="bg-white text-[#0E1A24] px-4 py-2 rounded-lg border border-[#CBD5E1] shadow-md flex items-center justify-between cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-2 font-semibold">
                <PropertyTypeIcon type={filterType} />
                {filterType}
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isFilterOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#CBD5E1] shadow-xl z-20 overflow-hidden">
                {propertyTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setFilterType(type);
                      setIsFilterOpen(false);
                    }}
                    className={`px-4 py-3 text-sm font-medium cursor-pointer hover:bg-[#FACC15]/10 flex items-center gap-2 ${
                      filterType === type
                        ? "bg-[#FACC15]/20 text-[#0F766E]"
                        : ""
                    }`}
                  >
                    <PropertyTypeIcon type={type} /> {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center justify-between bg-red-100 text-red-800 px-4 py-3 rounded-lg border border-red-300 w-full max-w-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span>{error}</span>
              </div>
              <button
                onClick={retryFetch}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700"
              >
                <RefreshCw className="w-4 h-4" /> Retry
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="h-12 w-12 border-4 border-[#FACC15] border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((price) => (
                <div
                  key={price.id}
                  className="bg-white p-6 rounded-3xl shadow-lg border border-[#CBD5E1] hover:shadow-xl transition-transform hover:scale-105 flex flex-col justify-between h-full"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <PropertyTypeIcon type={price.property_type} />
                        <span className="capitalize font-semibold text-[#0E1A24]">
                          {price.property_type}
                        </span>
                      </div>
                      <span className="text-xs px-3 py-1 bg-[#CBD5E1] text-[#0E1A24] rounded-full">
                        Tower {price.property_tower}
                      </span>
                    </div>
                    <div className="text-xs italic text-[#0F766E] mb-2 text-right">
                      {price.price_tag}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center bg-[#F8FAFC] p-3 rounded-lg">
                        <p className="text-xs text-[#0F766E] mb-1">SQ.M</p>
                        <p className="font-semibold">
                          {parseFloat(price.property_carpet_sqm).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-center bg-[#F8FAFC] p-3 rounded-lg">
                        <p className="text-xs text-[#0F766E] mb-1">SQ.FT</p>
                        <p className="font-semibold">
                          {price.property_carpet_sqft}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-lg font-extrabold text-[#0E1A24]">
                      {price.property_price} {price.price_unit}*
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <AlertTriangle className="w-10 h-10 text-[#FACC15] mb-4 mx-auto" />
                <p className="text-[#FACC15] text-base">
                  No properties found for the selected filter.
                </p>
                <button
                  onClick={() => setFilterType("All")}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-[#FACC15] text-[#0E1A24] rounded-md font-medium hover:bg-[#eab308] transition"
                >
                  Show all properties <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/70 italic">
            * Prices are subject to change without prior notice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyPriceTable;
