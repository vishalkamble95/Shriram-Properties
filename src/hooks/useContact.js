// src/hooks/useContact.js
import { useState, useEffect } from "react";
import { API } from "../../config";

export default function useContact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API.CONTACT_US());

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data = await response.json();

        setContact(data?.contact_us);
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return { contact, loading, error };
}
