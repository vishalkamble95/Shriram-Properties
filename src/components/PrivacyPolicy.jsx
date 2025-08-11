import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] p-6">
      <div className="max-w-3xl mx-auto bg-[#393E46] text-[#EEEEEE] rounded-2xl p-8 shadow-2xl border border-[#00ADB5]/40 backdrop-blur-lg">
        <h1 className="text-4xl font-bold mb-6 tracking-tight border-b border-[#00ADB5]/40 pb-2">
          Privacy Policy & Terms of Use
        </h1>

        <p className="mb-4 leading-relaxed">
          Buy India Homes Digital Pvt Ltd ("Buy India Homes Digital" or "We") is
          a registered agent under the Real Estate Regulatory Authority
          (MAHARERA) with RERA No: A52100019166. Your privacy is our priority...
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Interpretations and Definitions
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-[#EEEEEE]">
          <li>
            <strong>Data:</strong> Refers to personal information...
          </li>
          <li>
            <strong>Data Protection Laws:</strong> Any laws currently in
            force...
          </li>
          <li>
            <strong>Service Providers:</strong> Entities that provide
            services...
          </li>
          <li>
            <strong>Buy India Homes Digital/We:</strong> Refers to Buy India
            Homes Digital Pvt Ltd...
          </li>
          <li>
            <strong>User or You:</strong> Refers to the natural person who
            accesses our website/pages...
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Website Content Overview
        </h2>
        <p className="mb-6 text-[#EEEEEE]">
          The contents of this landing page, containing details of properties...
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Types of Data Collected
        </h2>
        <h3 className="text-xl font-semibold mb-2 text-[#EEEEEE]">
          Personal Data
        </h3>
        <p className="mb-6 text-[#EEEEEE]">
          While visiting this website, we may ask you to provide certain
          personally identifiable information...
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-[#EEEEEE]">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Uses of Personal Data
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-[#EEEEEE]">
          <li>To provide and maintain our Service...</li>
          <li>To contact you via email, phone, SMS...</li>
          <li>To provide information related to property sales...</li>
          <li>To manage your requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Retention of Your Personal Data
        </h2>
        <p className="mb-6 text-[#EEEEEE]">
          We shall retain your Personal Data only as long as necessary...
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Disclosure of Your Personal Data
        </h2>
        <p className="mb-6 text-[#EEEEEE]">
          By using this website, you consent to the collection and use...
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Security of Your Personal Data
        </h2>
        <p className="mb-6 text-[#EEEEEE]">
          The security of your Personal Data is important to us...
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Children's Privacy
        </h2>
        <p className="mb-6 text-[#EEEEEE]">
          Our service does not address anyone under the age of 18...
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-6 text-[#EEEEEE]">
          We may update our Privacy Policy from time to time...
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 border-l-4 border-[#00ADB5] pl-3">
          Contact Us
        </h2>
        <p className="mb-6 text-[#EEEEEE]">
          To review, update, or delete your personal information, please contact
          us at{" "}
          <a
            href="mailto:info@buyindiahomes.com"
            className="text-[#00ADB5] hover:text-[#EEEEEE] underline transition-colors duration-300"
          >
            info@buyindiahomes.com
          </a>
          .
        </p>

        <div className="text-center text-[#EEEEEE]/70 mt-8">
          &copy; {new Date().getFullYear()} Buy India Homes Digital Pvt Ltd
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
