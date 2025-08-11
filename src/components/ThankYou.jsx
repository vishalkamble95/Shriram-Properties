import { CheckCircle, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222831] px-4 py-12">
      <div className="bg-[#393E46] text-[#EEEEEE] p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <CheckCircle size={48} className="mx-auto text-[#00ADB5]" />
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Thank you!</h2>
        <p className="text-sm sm:text-base mt-2">
          We have received your message. Our team will contact you shortly!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00ADB5] text-[#222831] rounded-full hover:bg-[#00949a] transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#EEEEEE] text-[#222831] rounded-full hover:bg-[#d4d4d4] transition"
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
