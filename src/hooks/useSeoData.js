import { useState, useEffect } from "react";
import { API, WEBSITE_DOMAIN } from "../../config"; // adjust the path as needed

export function useSeoData() {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSeoData() {
      setLoading(true);
      try {
        const response = await fetch(API.SEO_DETAIL(WEBSITE_DOMAIN));
        const json = await response.json();

        if (json.success) {
          setSeoData(json.data);

          document.title = json.data.title || "SMP Amberwood";

          updateMetaTag("description", json.data.meta_description);
          updateMetaTag("keywords", json.data.keywords);
          updateMetaTag("og:title", json.data.og_title);
          updateMetaTag("og:description", json.data.og_description);
          updateMetaTag("og:image", json.data.og_image);
          updateMetaTag("og:type", json.data.og_type || "website");

          if (json.data.favicon) {
            const link =
              document.querySelector('link[rel="icon"]') ||
              document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "icon";
            link.href = json.data.favicon;
            if (!document.querySelector('link[rel="icon"]')) {
              document.head.appendChild(link);
            }
          }

          if (json.data.script_1) {
            addJsonLdScript(json.data.script_1, "seo-jsonld-1");
          }
          if (json.data.script_2) {
            addJsonLdScript(json.data.script_2, "seo-jsonld-2");
          }
        } else {
          throw new Error("Invalid SEO data format");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error loading SEO data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSeoData();
  }, []);

  const updateMetaTag = (name, content) => {
    if (!content) return;
    let metaTag =
      document.querySelector(`meta[name="${name}"]`) ||
      document.querySelector(`meta[property="${name}"]`);

    if (!metaTag) {
      metaTag = document.createElement("meta");
      if (name.startsWith("og:")) {
        metaTag.setAttribute("property", name);
      } else {
        metaTag.setAttribute("name", name);
      }
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", content);
  };

  const addJsonLdScript = (jsonContent, id) => {
    try {
      const existingScript = document.getElementById(id);
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.innerHTML = jsonContent;
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error adding JSON-LD script:", err);
    }
  };

  return { seoData, loading, error };
}
