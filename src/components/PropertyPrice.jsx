import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Building,
  Building2,
  ChevronDown,
  RefreshCw,
  Tag,
  MapPin,
  ChevronRight,
} from "lucide-react";
import config from "../../config";

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
        const response = await fetch(
          `${config.API_URL}/property-prices?website=${config.SLUG_URL}`
        );
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
        const response = await fetch(
          `${config.API_URL}/property-prices?website=${config.SLUG_URL}`
        );
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
      return <Building className="w-5 h-5 text-teal-300" />;
    if (type === "Showrooms")
      return <Building2 className="w-5 h-5 text-teal-300" />;
    return <Tag className="w-5 h-5 text-teal-300" />;
  };

  return (
    <div id="price" className="py-6 px-4 bg-[#F5EEDD] text-[#06202B]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12 items-center text-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight mb-6 leading-snug lg:leading-tight max-w-4xl text-[#06202B]">
              {heading || "Property Pricing Details"}
            </h2>

            <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] rounded-full mb-6 mx-auto"></div>

            <p className="text-base sm:text-lg lg:text-xl text-[#077A7D] leading-relaxed max-w-3xl mx-auto mb-2">
              Explore our extensive range of premium properties with competitive
              pricing. Find the perfect space that meets your requirements and
              budget.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            {error && (
              <div className="flex items-center justify-between bg-[#7AE2CF]/20 text-[#06202B] p-4 rounded-lg mb-6 border border-[#7AE2CF]">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <p>{error}</p>
                </div>
                <button
                  onClick={retryFetch}
                  className="flex items-center bg-[#077A7D] hover:bg-[#06696C] text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Retry
                </button>
              </div>
            )}

            <div className="bg-white rounded-lg p-6 shadow-lg border border-[#7AE2CF]">
              <div className="mb-6">
                <label className="block text-[#06202B] mb-2 text-sm font-medium">
                  Filter Properties
                </label>
                <div className="relative">
                  <div
                    className="flex items-center justify-between bg-[#F5EEDD] px-4 py-3 rounded-lg cursor-pointer border border-[#7AE2CF] hover:border-[#077A7D] shadow-sm hover:shadow-[#077A7D]/30 transition-all duration-300"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <div className="flex items-center gap-3 text-[#06202B] font-semibold">
                      <PropertyTypeIcon type={filterType} />
                      <span>{filterType}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isFilterOpen
                          ? "rotate-180 text-[#077A7D]"
                          : "text-[#06202B]"
                      }`}
                    />
                  </div>

                  {isFilterOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden z-10 border border-[#7AE2CF] shadow-2xl backdrop-blur-md animate-fadeIn">
                      {propertyTypes.map((type) => (
                        <div
                          key={type}
                          className={`px-5 py-3 transition-all duration-200 cursor-pointer flex items-center gap-3 text-sm text-[#06202B] hover:bg-[#F5EEDD] ${
                            filterType === type
                              ? "bg-gradient-to-r from-[#077A7D]/20 to-[#7AE2CF]/20 text-[#077A7D] font-medium"
                              : ""
                          }`}
                          onClick={() => {
                            setFilterType(type);
                            setIsFilterOpen(false);
                          }}
                        >
                          {type !== "All" ? (
                            <PropertyTypeIcon type={type} />
                          ) : (
                            <Tag className="w-5 h-5 text-[#077A7D]" />
                          )}
                          <span>{type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-[#06202B]">
                  {filteredProperties.length} properties found
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`h-2 rounded-full ${
                        dot === 1 ? "w-8 bg-[#077A7D]" : "w-2 bg-[#06202B]/30"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#077A7D]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-items-center">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((price, index) => (
                <div
                  key={price.id}
                  className="bg-gradient-to-br from-[#F5EEDD] via-white to-[#7AE2CF]/10 backdrop-blur-md rounded-2xl shadow-xl border border-[#7AE2CF]/40 hover:shadow-[#06202B]/20 transition-all duration-300 p-6 flex flex-col gap-6 w-full max-w-[320px] mx-auto hover:scale-[1.02]"
                >
                  {/* Row 1 – Property Type */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 flex items-center justify-center bg-[#077A7D]/10 border border-[#077A7D]/30 rounded-xl shadow-sm">
                      <PropertyTypeIcon type={price.property_type} />
                    </div>
                    <div className="text-[#06202B] text-base font-semibold capitalize text-center">
                      {price.property_type}
                    </div>
                  </div>

                  {/* Row 2 – Tower Info */}
                  <div className="text-center">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-[#7AE2CF]/20 text-[#06202B] border border-[#7AE2CF] shadow-sm">
                      Tower {price.property_tower}
                    </span>
                  </div>

                  {/* Row 3 – Carpet Area with two columns */}
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#077A7D] mb-2">
                      Carpet Area
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-[#06202B] font-medium">
                      <div className="bg-white/50 rounded-lg p-2 shadow-sm">
                        <p className="text-xs text-[#077A7D] mb-1">SQ.M</p>
                        <p>
                          {parseFloat(price.property_carpet_sqm).toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-white/50 rounded-lg p-2 shadow-sm">
                        <p className="text-xs text-[#077A7D] mb-1">SQ.FT</p>
                        <p>{price.property_carpet_sqft}</p>
                      </div>
                    </div>
                  </div>

                  {/* Row 4 – Price */}
                  <div className="text-center mt-2">
                    <p className="text-lg font-extrabold text-[#06202B]">
                      {price.property_price} {price.price_unit}*
                    </p>
                    <p className="text-xs text-[#077A7D] mt-1 italic">
                      {price.price_tag}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <AlertTriangle className="w-10 h-10 text-[#7AE2CF] mb-3 mx-auto" />
                <p className="text-[#077A7D]">
                  No properties found for the selected filter.
                </p>
                <button
                  onClick={() => setFilterType("All")}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#077A7D] to-[#06202B] text-white rounded-lg text-sm font-medium hover:from-[#06696C] hover:to-[#041518] transition"
                >
                  Show all properties
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="bg-gradient-to-r from-[#7AE2CF]/30 via-[#F5EEDD]/30 to-[#7AE2CF]/30 px-6 py-4 rounded-b-lg border-t border-[#7AE2CF] mt-10">
          <div className="text-xs text-[#06202B] italic tracking-wide text-center">
            * Prices are tentative and subject to change without notice
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPriceTable;
