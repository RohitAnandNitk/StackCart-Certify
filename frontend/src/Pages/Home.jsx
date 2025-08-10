import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import { useCertificateStore } from "../store/useCertificateIdStore";
import toast from "react-hot-toast";
import companyLogo from "../assets/company-logo.jpg";
import {
  Shield,
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  GraduationCap,
  Building,
  IdCard,
  Sparkles,
  ArrowLeft,
  Award,
  FileText,
} from "lucide-react";

function Home() {
  const {
    getInfo,
    certificateInformation,
    loading,
    setCertificateInformation,
  } = useCertificateStore();

  const [inputValue, setInputValue] = useState("");
  const [currentView, setCurrentView] = useState("input");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [animationState, setAnimationState] = useState("idle");
  const inputRef = useRef(null);

  useEffect(() => {
    if (loading) {
      setCurrentView("loading");
      setAnimationState("validating");
    } else if (certificateInformation) {
      setCurrentView("info");
      setAnimationState("success");
    } else if (
      currentView === "loading" &&
      !certificateInformation &&
      !loading
    ) {
      setCurrentView("noRecord");
      setAnimationState("error");
    }
  }, [certificateInformation, loading, currentView]);

  const handleValidate = () => {
    if (!inputValue.trim()) {
      toast.error("Please enter a Certificate ID.");
      inputRef.current?.focus();
      return;
    }
    setCurrentView("loading");
    setAnimationState("validating");
    getInfo({ certificateId: inputValue });
  };

  const handleGoBack = () => {
    setCertificateInformation(null);
    setInputValue("");
    setCurrentView("input");
    setAnimationState("idle");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleValidate();
    }
  };

  const certificateFields = [
    {
      icon: IdCard,
      label: "Certificate ID",
      value: certificateInformation?.certificateId,
      color: "blue",
    },
    {
      icon: User,
      label: "Name",
      value: certificateInformation?.fullName,
      color: "green",
    },
    {
      icon: Calendar,
      label: "Issue Date",
      value: certificateInformation?.issueDate
        ? new Date(certificateInformation.issueDate).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
        : "",
      color: "purple",
    },
    {
      icon: GraduationCap,
      label: "Program",
      value: certificateInformation?.program,
      color: "orange",
    },
    {
      icon: Building,
      label: "Issued By",
      value: certificateInformation?.issueBy,
      color: "red",
    },
    {
      icon: Calendar,
      label: "Program Start Date",
      value: certificateInformation?.startDate
        ? new Date(certificateInformation.startDate).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
        : "",
      color: "teal",
    },
    {
      icon: Calendar,
      label: "Program End Date",
      value: certificateInformation?.endDate
        ? new Date(certificateInformation.endDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "",
      color: "pink",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 text-slate-800 font-inter relative overflow-hidden">
      {/* Enhanced Background Design */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] animate-pulse opacity-50"></div>

        {/* Floating elements */}
        <div className="absolute left-10 top-20 w-72 h-72 rounded-full bg-gradient-to-r from-blue-200 to-green-200 opacity-20 blur-3xl animate-blob"></div>
        <div className="absolute right-10 bottom-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/2 top-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-green-200 to-blue-200 opacity-15 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* INPUT VIEW */}
      {currentView === "input" && (
        <div className="flex flex-col items-center justify-center p-6 max-w-2xl w-full animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex flex-col gap-8 justify-center items-center text-center w-full">
            {/* Hero Section */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
                  <Shield className="text-green-600 animate-pulse" size={32} />
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight">
                <span className="text-green-500 text-6xl">&lt;</span>
                Validate
                <span className="text-green-500 text-6xl">
                  Certificate/&gt;
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                Enter your certificate ID below to verify its authenticity and
                view detailed information
              </p>
            </div>

            {/* Enhanced Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 w-full max-w-lg hover:shadow-3xl transition-all duration-500">
              <div className="space-y-6">
                <div className="text-center">
                  <label
                    className="flex items-center justify-center gap-3 text-2xl font-bold text-gray-700 mb-6"
                    htmlFor="certificateId"
                  >
                    <FileText className="text-blue-500" size={24} />
                    Certificate ID
                  </label>
                </div>

                <div className="relative group">
                  <input
                    ref={inputRef}
                    id="certificateId"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={`w-full h-16 text-xl bg-white/70 backdrop-blur-sm placeholder:text-slate-400 text-slate-700 border-2 rounded-2xl px-6 py-4 transition-all duration-300 ${
                      isInputFocused
                        ? "border-blue-500 shadow-xl shadow-blue-100 transform scale-105"
                        : "border-slate-200 hover:border-blue-300 shadow-lg"
                    }`}
                    placeholder="Enter your Certificate ID..."
                  />

                  {/* Search icon */}
                  <div
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isInputFocused
                        ? "text-blue-500 scale-110"
                        : "text-gray-400"
                    }`}
                  >
                    <Search size={24} />
                  </div>

                  {/* Input glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 opacity-0 blur-xl transition-opacity duration-300 -z-10 ${
                      isInputFocused ? "opacity-20" : ""
                    }`}
                  ></div>
                </div>

                {/* Enhanced Button */}
                <div className="pt-4">
                  <button
                    onClick={handleValidate}
                    className="group w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl font-bold py-5 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <Shield
                        className="group-hover:animate-spin transition-transform duration-300"
                        size={24}
                      />
                      Validate Certificate
                      <Sparkles
                        className="group-hover:animate-pulse"
                        size={20}
                      />
                    </div>

                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 text-sm text-gray-500 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Secure Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-blue-500" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-purple-500" />
                <span>Official Certificates</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOADING VIEW */}
      {currentView === "loading" && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 animate-in fade-in duration-500">
          {/* Enhanced loading animation */}
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-transparent border-t-green-500 border-r-blue-500"></div>

            {/* Inner pulsing ring */}
            <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-b-purple-500 border-l-orange-500 animate-reverse-spin"></div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full animate-pulse">
                <Search className="text-white animate-bounce" size={24} />
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-20 blur-xl animate-pulse"></div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Validating Certificate...
            </p>
            <p className="text-lg text-gray-600">
              Please wait while we verify your certificate
            </p>
          </div>

          {/* Loading dots */}
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* INFO VIEW */}
      {currentView === "info" && certificateInformation && (
        <div className="flex flex-col gap-8 items-center justify-center min-h-screen px-4 py-30 w-full max-w-6xl animate-in fade-in slide-in-from-right duration-700">
          {/* Header section */}
          <div className="text-center space-y-6 mb-8">
            <div className="relative inline-block">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-24 w-24 object-cover rounded-full shadow-xl border-4 border-white animate-in zoom-in duration-500"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Certificate Verified
              </h2>
              <p className="text-xl text-gray-600">
                Certificate information retrieved successfully
              </p>
            </div>
          </div>

          {/* Certificate Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {certificateFields.map((field, index) => {
              const IconComponent = field.icon;
              return (
                <div
                  key={field.label}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 group ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 bg-${field.color}-100 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent
                        className={`text-${field.color}-600`}
                        size={24}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">
                        {field.label}
                      </h3>
                      <p className="text-gray-600 break-words text-base leading-relaxed">
                        {field.value}
                      </p>
                    </div>
                  </div>

                  {/* Card glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${field.color}-400/10 to-${field.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={handleGoBack}
              className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-xl font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3"
            >
              <ArrowLeft
                className="group-hover:-translate-x-1 transition-transform duration-300"
                size={20}
              />
              Validate Another Certificate
            </button>
          </div>
        </div>
      )}

      {/* NO RECORD VIEW */}
      {currentView === "noRecord" && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-6 text-center animate-in fade-in slide-in-from-bottom duration-700">
          {/* Error animation */}
          <div className="relative">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
              <XCircle className="text-red-500" size={48} />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-red-200 rounded-full animate-ping opacity-75"></div>
          </div>

          <div className="space-y-4 max-w-md">
            <h2 className="text-4xl font-black text-red-600 mb-4">
              Certificate Not Found
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              We couldn't find a certificate with the provided ID. Please check
              the ID and try again.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md">
            <h3 className="font-bold text-red-800 mb-3">Please verify:</h3>
            <ul className="text-red-700 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Certificate ID is entered correctly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                No extra spaces or characters
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Certificate has been issued
              </li>
            </ul>
          </div>

          <button
            onClick={handleGoBack}
            className="group bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xl font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3"
          >
            <ArrowLeft
              className="group-hover:-translate-x-1 transition-transform duration-300"
              size={20}
            />
            Try Again
          </button>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 1s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in-from-bottom {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-from-right {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
          animation-duration: 0.7s;
        }
        .slide-in-from-bottom {
          animation-name: slide-in-from-bottom;
        }
        .slide-in-from-right {
          animation-name: slide-in-from-right;
        }
        .zoom-in {
          animation-name: zoom-in;
        }
        .duration-500 {
          animation-duration: 0.5s;
        }
        .duration-700 {
          animation-duration: 0.7s;
        }
      `}</style>
    </div>
  );
}

export default Home;
