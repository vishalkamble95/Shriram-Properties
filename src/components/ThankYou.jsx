import { CheckCircle, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06202B] px-4 py-12">
      <div className="bg-[#F5EEDD] text-[#06202B] p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <CheckCircle size={48} className="mx-auto text-[#077A7D]" />
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Thank you!</h2>
        <p className="text-sm sm:text-base mt-2">
          We have received your message. Our team will contact you shortly!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#077A7D] text-white rounded-full hover:bg-[#06686a] transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7AE2CF] text-[#06202B] rounded-full hover:bg-[#64c9b9] transition"
          >
            <Home size={16} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
