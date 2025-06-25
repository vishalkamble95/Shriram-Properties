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
        console.log(data);

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
    <div id="price" className="py-6 px-4 bg-[#d6d4e0] text-[#622569]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12 items-center text-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight mb-6 leading-snug lg:leading-tight max-w-4xl text-[#622569]">
              {heading || "Property Pricing Details"}
            </h2>

            <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] rounded-full mb-8 mx-auto"></div>

            <p className="text-base sm:text-lg lg:text-xl text-[#5b9aa0] leading-relaxed max-w-3xl mx-auto mb-10">
              Explore our extensive range of premium properties with competitive
              pricing. Find the perfect space that meets your requirements and
              budget.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            {error && (
              <div className="flex items-center justify-between bg-[#b8a9c9]/20 text-[#622569] p-4 rounded-lg mb-6 border border-[#b8a9c9]">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <p>{error}</p>
                </div>
                <button
                  onClick={retryFetch}
                  className="flex items-center bg-[#5b9aa0] hover:bg-[#4a8a8f] text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Retry
                </button>
              </div>
            )}

            <div className="bg-white rounded-lg p-6 shadow-lg border border-[#b8a9c9]">
              <div className="mb-6">
                <label className="block text-[#622569] mb-2 text-sm font-medium">
                  Filter Properties
                </label>
                <div className="relative">
                  <div
                    className="flex items-center justify-between bg-[#d6d4e0] px-4 py-3 rounded-lg cursor-pointer border border-[#b8a9c9] hover:border-[#5b9aa0] shadow-sm hover:shadow-[#5b9aa0]/30 transition-all duration-300"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <div className="flex items-center gap-3 text-[#622569] font-semibold">
                      <PropertyTypeIcon type={filterType} />
                      <span>{filterType}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isFilterOpen
                          ? "rotate-180 text-[#5b9aa0]"
                          : "text-[#622569]"
                      }`}
                    />
                  </div>

                  {isFilterOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden z-10 border border-[#b8a9c9] shadow-2xl backdrop-blur-md animate-fadeIn">
                      {propertyTypes.map((type) => (
                        <div
                          key={type}
                          className={`px-5 py-3 transition-all duration-200 cursor-pointer flex items-center gap-3 text-sm text-[#622569] hover:bg-[#d6d4e0] ${
                            filterType === type
                              ? "bg-gradient-to-r from-[#5b9aa0]/20 to-[#b8a9c9]/20 text-[#5b9aa0] font-medium"
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
                            <Tag className="w-5 h-5 text-[#5b9aa0]" />
                          )}
                          <span>{type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-[#622569]">
                  {filteredProperties.length} properties found
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`h-2 rounded-full ${
                        dot === 1 ? "w-8 bg-[#5b9aa0]" : "w-2 bg-[#622569]/30"
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5b9aa0]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden border border-[#b8a9c9] shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#b8a9c9]">
                <thead>
                  <tr className="bg-gradient-to-r from-[#5b9aa0]/20 via-[#b8a9c9]/30 to-[#d6d4e0]/20 text-[#622569]">
                    {[
                      "Property Type",
                      "Tower",
                      "Carpet Area (SQ.M)",
                      "Carpet Area (SQ.FT)",
                      "Price",
                    ].map((label) => (
                      <th
                        key={label}
                        className="px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b border-[#b8a9c9]"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d6d4e0]">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((price, index) => (
                      <tr
                        key={price.id}
                        className={`transition duration-200 ${
                          index % 2 === 0 ? "bg-[#f9f9fb]" : "bg-[#e9e7f1]"
                        } hover:bg-[#d6d4e0]/40`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center bg-[#5b9aa0]/10 border border-[#5b9aa0]/20 rounded-lg">
                              <PropertyTypeIcon type={price.property_type} />
                            </div>
                            <div className="text-[#622569] text-sm font-medium capitalize">
                              {price.property_type}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#b8a9c9]/30 text-[#622569] border border-[#b8a9c9]">
                            Tower {price.property_tower}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-[#5b9aa0]">
                          {parseFloat(price.property_carpet_sqm).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-[#5b9aa0]">
                          {price.property_carpet_sqft}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-[#622569] font-bold text-sm sm:text-base">
                              {price.property_price} {price.price_unit}*
                            </span>
                            <span className="text-xs text-[#5b9aa0] mt-0.5">
                              {price.price_tag}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-[#5b9aa0]"
                      >
                        <div className="flex flex-col items-center">
                          <AlertTriangle className="w-10 h-10 text-[#b8a9c9] mb-3" />
                          <p>No properties found for the selected filter.</p>
                          <button
                            onClick={() => setFilterType("All")}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5b9aa0] to-[#622569] text-white rounded-lg text-sm font-medium hover:from-[#4e8c91] hover:to-[#51194e] transition"
                          >
                            Show all properties
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gradient-to-r from-[#b8a9c9]/30 via-[#d6d4e0]/30 to-[#b8a9c9]/30 px-6 py-4 rounded-b-lg border-t border-[#b8a9c9]">
              <div className="text-xs text-[#622569] italic tracking-wide text-center">
                * Prices are tentative and subject to change without notice
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPriceTable;
