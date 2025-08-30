import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useCertificateStore } from "../store/useCertificateIdStore";
import {
  Copy,
  User,
  Mail,
  IdCard,
  Calendar,
  GraduationCap,
  Building,
  CheckCircle,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

function CreateId() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { createId, loading, certificateId, setCertificateId } =
    useCertificateStore();
  const [currentView, setCurrentView] = useState("input");
  const [copySuccess, setCopySuccess] = useState(false);
  const [copySuccess2, setCopySuccess2] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [focusedField, setFocusedField] = useState("");
  const formRef = useRef();

  // Watch form values for progress calculation
  const watchedFields = watch();

  useEffect(() => {
    if (loading) {
      setCurrentView("loading");
    } else if (certificateId) {
      setCurrentView("generatedIdView");
    } else {
      setCurrentView("input");
    }
  }, [certificateId, loading]);

  // Calculate form progress
  useEffect(() => {
    const fields = [
      "Name",
      "Email",
      "employeeId",
      "StartDate",
      "endDate",
      "Program",
      "Issue_By",
    ];
    const filledFields = fields.filter(
      (field) => watchedFields[field] && watchedFields[field].trim() !== ""
    );
    setFormProgress((filledFields.length / fields.length) * 100);
  }, [watchedFields]);

  const onSubmit = async (data) => {
    const formattedData = {
      email: data.Email,
      fullName: data.Name,
      employeeId: data.employeeId,
      startDate: data.StartDate,
      endDate: data.endDate,
      program: data.Program,
      issueBy: data.Issue_By,
    };
    await createId(formattedData);
  };

  // const copyToClipboard = async (copyText) => {
  //   try {
  //     await navigator.clipboard.writeText(copyText);
  //      if(copyText.startWith("ST")) {
  //        setCopySuccess(true) ; 
  //      }
  //      else setCopySuccess2(true) ;
      
  //     setTimeout(() => setCopySuccess(false), 2000);
  //     setTimeout(() => setCopySuccess2(false), 2000);
  //   } catch (err) {
  //     alert("Failed to copy. Please try again.");
  //   }
  // };
  const copyToClipboard = async (copyText) => {
  try {
    await navigator.clipboard.writeText(copyText);

    if (copyText.startsWith("ST")) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      setCopySuccess2(true);
      setTimeout(() => setCopySuccess2(false), 2000);
    }

  } catch (err) {
    alert("Failed to copy. Please try again.");
  }
};


  const formFields = [
    {
      name: "Name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: User,
      validation: { required: "Name is required" },
    },
    {
      name: "Email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      icon: Mail,
      validation: {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email format",
        },
      },
    },
    {
      name: "employeeId",
      label: "Employee ID",
      type: "text",
      placeholder: "Enter employee ID",
      icon: IdCard,
      validation: { required: "Employee ID is required" },
    },
    {
      name: "StartDate",
      label: "Start Date",
      type: "date",
      placeholder: "",
      icon: Calendar,
      validation: { required: "Start date is required" },
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      placeholder: "",
      icon: Calendar,
      validation: { required: "End date is required" },
    },
    {
      name: "Program",
      label: "Program",
      type: "text",
      placeholder: "Enter program name",
      icon: GraduationCap,
      validation: { required: "Program is required" },
    },
    {
      name: "Issue_By",
      label: "Issued By",
      type: "text",
      placeholder: "Enter issuer name",
      icon: Building,
      validation: { required: "Issuer name is required" },
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="relative">
              {/* Outer rotating ring */}
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-500 border-r-green-500"></div>
              {/* Inner pulsing circle */}
              <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse opacity-20"></div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-blue-600 animate-bounce" size={24} />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Validating Certificate...
              </p>
              <p className="text-gray-600 animate-pulse">
                Please wait while we process your request
              </p>
            </div>

            {/* Loading progress dots */}
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        );

      case "generatedIdView":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-30">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-2xl w-full text-center transform animate-in fade-in slide-in-from-bottom-10 duration-700">
              {/* Success animation */}
              <div className="relative mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="text-white" size={48} />
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-200 rounded-full animate-ping opacity-75"></div>
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Certificate Created Successfully! 🎉
              </h2>

              <p className="text-gray-600 mb-8">
                Your new certificate ID has been generated
              </p>

              {/* Certificate ID display */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors duration-300">
                <p className="text-lg font-semibold text-gray-700 mb-3">
                  Certificate ID:
                </p>
                <div className="flex items-center justify-center gap-4 bg-white rounded-xl p-4 shadow-inner">
                  <span className="text-2xl font-mono font-bold text-gray-800 select-all">
                    {certificateId}
                  </span>
                  <button
                    onClick={() => {
                      copyToClipboard(`${certificateId}`);
                    }}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      copySuccess
                        ? "bg-green-500 text-white scale-110"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-110"
                    }`}
                    aria-label="Copy certificate ID"
                  >
                    {copySuccess ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-green-600 text-sm mt-2 animate-fade-in">
                    Copied to clipboard! ✨
                  </p>
                )}
              </div>

               {/* Certificate URL display */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors duration-300">
                <p className="text-lg font-semibold text-gray-700 mb-3">
                  Certificate URL:
                </p>
                <div className="flex items-center justify-center gap-4 bg-white rounded-xl p-4 shadow-inner">
                  <span className="text-2xl font-mono font-bold text-gray-800 select-all">
                    {`${window.location.host}/getInfo/${certificateId}`}
                  </span>
                  <button
                    onClick={() => {
                      copyToClipboard(`${window.location.host}/getInfo/${certificateId}`);
                    }}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      copySuccess2
                        ? "bg-green-500 text-white scale-110"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-110"
                    }`}
                    aria-label="Copy certificate ID"
                  >
                    {copySuccess ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </div>
                {copySuccess2 && (
                  <p className="text-green-600 text-sm mt-2 animate-fade-in">
                    Copied to clipboard! ✨
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  setCertificateId(null);
                }}
                disabled={loading}
                className="group bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
              >
                <ArrowLeft
                  className="group-hover:-translate-x-1 transition-transform duration-300"
                  size={20}
                />
                Create Another Certificate
              </button>
            </div>
          </div>
        );

      case "input":
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-30">
            {/* Header */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 rounded-full mb-6">
                <IdCard className="text-blue-600" size={24} />
                <span className="font-semibold text-gray-700">
                  Certificate Generator
                </span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                Create New Certificate
              </h1>
              <p className="text-gray-600 text-lg">
                Fill in the details to generate your certificate ID
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-3xl border border-white/20 animate-in fade-in slide-in-from-bottom duration-700">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Form Progress
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round(formProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${formProgress}%` }}
                  ></div>
                </div>
              </div>

              <form
                ref={formRef}
                className="space-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field, index) => {
                    const IconComponent = field.icon;
                    const hasError = errors[field.name];
                    const isFilled = watchedFields[field.name];
                    const isFocused = focusedField === field.name;

                    return (
                      <div
                        key={field.name}
                        className={`relative group ${
                          field.name === "Program" || field.name === "Issue_By"
                            ? "md:col-span-2"
                            : ""
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                          <IconComponent
                            size={20}
                            className={`transition-colors duration-300 ${
                              isFilled ? "text-green-500" : "text-gray-400"
                            }`}
                          />
                          {field.label}
                          <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                          <input
                            type={field.type}
                            {...register(field.name, field.validation)}
                            placeholder={field.placeholder}
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField("")}
                            className={`w-full px-4 py-4 text-lg border-2 rounded-2xl transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                              hasError
                                ? "border-red-400 shadow-red-100 focus:shadow-red-200"
                                : isFilled
                                ? "border-green-400 shadow-green-100 focus:shadow-green-200"
                                : "border-gray-200 hover:border-blue-300 focus:border-blue-500"
                            } ${
                              isFocused
                                ? "transform scale-105 shadow-xl"
                                : "shadow-md hover:shadow-lg"
                            }`}
                          />

                          {/* Floating success indicator */}
                          {isFilled && !hasError && (
                            <CheckCircle
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in zoom-in duration-300"
                              size={20}
                            />
                          )}
                        </div>

                        {/* Error message */}
                        {hasError && (
                          <p className="text-red-500 text-sm mt-2 animate-in slide-in-from-left duration-300 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {hasError.message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <button
                    disabled={loading}
                    type="submit"
                    className={`w-full group relative bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xl font-bold py-5 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                      formProgress === 100 ? "animate-pulse" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                          Creating Certificate...
                        </>
                      ) : (
                        <>
                          <Sparkles
                            className="group-hover:animate-spin transition-transform duration-300"
                            size={24}
                          />
                          Generate Certificate ID
                          <Sparkles
                            className="group-hover:animate-spin transition-transform duration-300"
                            size={24}
                          />
                        </>
                      )}
                    </div>

                    {/* Button glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  </button>
                </div>

                {/* Form note */}
                <p className="text-center text-gray-500 text-sm">
                  All fields are mandatory • Secure processing • Instant
                  generation
                </p>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderContent()}

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in-from-top {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
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
        @keyframes slide-in-from-left {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            transform: scale(0.8);
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
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .fade-in {
          animation-name: fade-in;
          animation-duration: 0.7s;
        }
        .slide-in-from-top {
          animation-name: slide-in-from-top;
        }
        .slide-in-from-bottom {
          animation-name: slide-in-from-bottom;
        }
        .slide-in-from-left {
          animation-name: slide-in-from-left;
        }
        .zoom-in {
          animation-name: zoom-in;
        }
        .duration-300 {
          animation-duration: 0.3s;
        }
        .duration-700 {
          animation-duration: 0.7s;
        }
      `}</style>
    </>
  );
}

export default CreateId;
