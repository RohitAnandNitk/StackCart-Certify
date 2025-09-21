import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Sparkles,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  User,
} from "lucide-react";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [signupAttempted, setSignupAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchedFields = watch();

  const onSubmit = async (data) => {
    try {
      setSignupAttempted(true);
      setLoading(true);
      const formattedData = {
        fullName: data.Name,
        email: data.Email,
        password: data.Password,
      };

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        alert("Sign up successful!");
        signup(formattedData);
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      setSignupAttempted(false);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formFields = [
    {
      name: "Name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: User,
      validation: {
        required: "Full name is required",
        minLength: {
          value: 2,
          message: "Name must be at least 2 characters",
        },
      },
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
          message: "Please enter a valid email address",
        },
      },
    },
    {
      name: "Password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      icon: Lock,
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl mb-6 group">
            <Shield
              className="text-blue-600 group-hover:scale-110 transition-transform duration-300"
              size={32}
            />
          </div>

          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Create Account
          </h1>
          <p className="text-gray-600 text-lg">Sign up to get started</p>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Note: All fields are mandatory
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20 animate-in fade-in slide-in-from-bottom duration-700 hover:shadow-3xl transition-shadow">
          <div className="space-y-6">
            {formFields.map((field, index) => {
              const IconComponent = field.icon;
              const hasError = errors[field.name];
              const isFilled = watchedFields[field.name];
              const isFocused = focusedField === field.name;

              return (
                <div
                  key={field.name}
                  className="space-y-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <label className="flex items-center gap-3 text-lg font-semibold text-gray-700">
                    <IconComponent
                      size={20}
                      className={`transition-colors duration-300 ${
                        isFilled && !hasError
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    {field.label}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative group">
                    <input
                      type={field.type}
                      {...register(field.name, field.validation)}
                      placeholder={field.placeholder}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField("")}
                      className={`w-full px-4 py-4 text-lg border-2 rounded-2xl transition-all duration-300 bg-white/70 backdrop-blur-sm pr-12 ${
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

                    {/* Password toggle button */}
                    {field.name === "Password" && (
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300 hover:scale-110 transform"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    )}

                    {/* Success indicator */}
                    {isFilled && !hasError && field.name !== "Password" && (
                      <CheckCircle
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in zoom-in duration-300"
                        size={20}
                      />
                    )}

                    {/* Error indicator */}
                    {hasError && (
                      <AlertCircle
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-in zoom-in duration-300"
                        size={20}
                      />
                    )}
                  </div>

                  {/* Error message */}
                  {hasError && (
                    <p className="text-red-500 text-sm animate-in slide-in-from-left duration-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {hasError.message}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className={`w-full group relative bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xl font-bold py-5 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden ${
                  loading ? "animate-pulse" : ""
                }`}
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span>Signing up...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus
                        className="group-hover:scale-110 transition-transform duration-300"
                        size={24}
                      />
                      <span>Sign Up</span>
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform duration-300"
                        size={20}
                      />
                    </>
                  )}
                </div>

                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </button>
            </div>

            {/* Additional Options */}
            <div className="pt-6 space-y-4">
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/SignIn")}
                  className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                >
                  <Sparkles className="group-hover:animate-spin" size={16} />
                  Sign in to your account
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    size={16}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Success animation overlay */}
          {signupAttempted && !loading && !Object.keys(errors).length && (
            <div className="absolute inset-0 bg-green-50/80 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-in fade-in duration-500">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="text-white" size={32} />
                </div>
                <p className="text-green-700 font-semibold text-lg">
                  Account created successfully!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="text-center mt-8 animate-in fade-in duration-700 delay-300">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Shield size={16} className="text-green-500" />
            Your data is secure and encrypted
          </p>
        </div>
      </div>

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
        .animate-blob {
          animation: blob 7s infinite;
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
        .duration-500 {
          animation-duration: 0.5s;
        }
        .duration-700 {
          animation-duration: 0.7s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}

export default SignUp;
