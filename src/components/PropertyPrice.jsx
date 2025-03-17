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
    <div id="price" className="py-16 px-4 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:justify-between md:items-start mb-12">
          {/* Left content area */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-300 text-sm mb-4">
              <Tag className="w-4 h-4 mr-2" />
              <span>Property Listing</span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-white">
              {heading || "Property Pricing Details"}
            </h2>

            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mb-6"></div>

            <p className="text-slate-300 mb-6">
              Explore our extensive range of premium properties with competitive
              pricing. Find the perfect space that meets your requirements and
              budget.
            </p>

            <div className="flex items-center text-slate-300 mb-3">
              <MapPin className="w-5 h-5 mr-3 text-teal-300" />
              <span>Prime locations with excellent connectivity</span>
            </div>

            <div className="flex items-center text-slate-300">
              <Building className="w-5 h-5 mr-3 text-teal-300" />
              <span>Premium construction with modern amenities</span>
            </div>
          </div>

          {/* Right action area */}
          <div className="md:w-1/2 md:pl-8">
            {error && (
              <div className="flex items-center justify-between bg-slate-800/80 text-amber-300 p-4 rounded-lg mb-6 border border-slate-700">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <p>{error}</p>
                </div>
                <button
                  onClick={retryFetch}
                  className="flex items-center bg-slate-700 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Retry
                </button>
              </div>
            )}

            <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
              <div className="mb-6">
                <label className="block text-slate-300 mb-2 text-sm">
                  Filter Properties
                </label>
                <div className="relative">
                  <div
                    className="flex items-center justify-between bg-slate-700 p-3 rounded-lg cursor-pointer border border-slate-600"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <div className="flex items-center">
                      <PropertyTypeIcon type={filterType} />
                      <span className="ml-3 font-medium">{filterType}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isFilterOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {isFilterOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 rounded-lg overflow-hidden z-10 border border-slate-600 shadow-xl">
                      {propertyTypes.map((type) => (
                        <div
                          key={type}
                          className={`px-4 py-3 hover:bg-slate-600 cursor-pointer flex items-center ${
                            filterType === type
                              ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-300"
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
                            <Tag className="w-5 h-5 text-teal-300" />
                          )}
                          <span className="ml-3">{type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-slate-300">
                  {filteredProperties.length} properties found
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`h-2 rounded-full ${
                        dot === 1 ? "w-8 bg-teal-400" : "w-2 bg-white/30"
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Property Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Tower
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Carpet Area (SQ.M)
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Carpet Area (SQ.FT)
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredProperties.length > 0 ? (
                    filteredProperties?.map((price, index) => (
                      <tr
                        key={price.id}
                        className={`hover:bg-slate-700 transition duration-150 ${
                          index % 2 === 0 ? "bg-slate-800" : "bg-slate-700/50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-teal-400/10 rounded-lg">
                              <PropertyTypeIcon type={price.property_type} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">
                                {price.property_type}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-700 text-teal-300 text-xs">
                            Tower {price.property_tower}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-300">
                          {parseFloat(price.property_carpet_sqm).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-300">
                          {price.property_carpet_sqft}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-white font-bold">
                              {price.property_price} {price.price_unit}*
                            </span>
                            <span className="text-xs text-teal-300">
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
                        className="px-6 py-10 text-center text-slate-400"
                      >
                        <div className="flex flex-col items-center">
                          <AlertTriangle className="w-10 h-10 text-slate-500 mb-3" />
                          <p>No properties found for the selected filter.</p>
                          <button
                            onClick={() => setFilterType("All")}
                            className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg text-sm"
                          >
                            Show all properties
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-700/50 px-6 py-4">
              <div className="text-xs text-slate-300 italic">
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
