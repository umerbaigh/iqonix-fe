"use client";
import { useState, useEffect } from "react";

const Cookie = ({ data }) => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if the cookie "userConsent" exists
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userConsent="));
    if (!consent) {
      setShowCookieBanner(true); // Show the banner if no cookie found
    }
  }, []);

  const handleAccept = () => {
    // Add a cookie with an expiration of 365 days
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // Set cookie to expire in 1 year
    document.cookie = `userConsent=true; expires=${expires.toUTCString()}; path=/`;
    setShowCookieBanner(false); // Hide the banner
  };

  if (!showCookieBanner) {
    return null; // Do not render the banner if the cookie exists
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-between items-center gap-8 p-4 z-50">
      <p className="text-sm text-gray-600">
        {data?.text}{" "}
        <a href={data?.page_link?.link} className="text-third">
          {data?.page_link?.text}
        </a>
      </p>
      <button
        onClick={handleAccept}
        className="bg-[#536162] hover:bg-third text-white font-semibold font-lato text-base py-2 px-4 rounded"
      >
        {data?.btn_txt}
      </button>
    </div>
  );
};

export default Cookie;
