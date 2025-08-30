import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Users,
  MapPin,
  Calendar,
  Star,
  Mail,
  Phone,
  Building2,
  Code,
  ShoppingCart,
  Zap,
  ArrowRight,
} from "lucide-react";

function About() {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const observerRef = useRef();

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const companyDetails = [
    {
      icon: Globe,
      label: "Website",
      value: "https://www.stackcart.info",
      link: "https://www.stackcart.info",
      color: "blue",
    },
    {
      icon: Building2,
      label: "Industry",
      value: "IT Services and IT Consulting",
      color: "purple",
    },
    {
      icon: Users,
      label: "Company Size",
      value: "11–50 employees",
      color: "green",
    },
    {
      icon: MapPin,
      label: "Headquarters",
      value: "Delhi, 110085",
      color: "red",
    },
    {
      icon: Calendar,
      label: "Founded",
      value: "2024",
      color: "orange",
    },
  ];

  const specialties = [
    { name: "Code to Cart", icon: Code },
    { name: "Web Development", icon: Globe },
    { name: "IT Services", icon: Building2 },
    { name: "Digital Marketing", icon: Zap },
    { name: "Corporate Gift", icon: Star },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "A-21 The Greenview Apartment Sector-5, Rohini, New Delhi-110085",
      color: "red",
    },
    {
      icon: Mail,
      label: "Support Email",
      value: "support@stackcart.in",
      link: "mailto:support@stackcart.in",
      color: "blue",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "9289916169",
      link: "tel:9289916169",
      color: "green",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center max-w-6xl mx-auto px-6 py-16 min-h-screen mt-20">
        {/* Hero Section */}
        <div
          data-id="hero"
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.hero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              About StackCart
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-lg blur opacity-20 animate-pulse"></div>
          </div>

          <div className="flex items-center justify-center gap-4 text-2xl font-bold text-gray-600 mb-8">
            <Code className="animate-pulse" />
            <ArrowRight className="animate-bounce" />
            <ShoppingCart className="animate-pulse" />
          </div>
        </div>

        {/* Vision Statement */}
        <div
          data-id="vision"
          className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl border border-white/20 transition-all duration-1000 hover:shadow-2xl hover:scale-105 ${
            isVisible.vision
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 px-6 py-2 rounded-full mb-6">
              <Zap className="text-yellow-500 animate-pulse" size={20} />
              <span className="font-semibold text-gray-700">Our Vision</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
              <strong className="font-semibold">Overview:</strong> StackCart is
              a Delhi-based, government-registered technology and e-commerce
              company dedicated to building end-to-end digital solutions for
              modern businesses. Founded in 2024, StackCart operates under the
              unique vision of{" "}
              <em className="text-purple-600 font-semibold">"Code to Cart"</em>{" "}
              — transforming raw ideas into fully developed online platforms
              that enable seamless product discovery, purchase, and growth.
            </p>
          </div>
        </div>

        {/* Company Details Grid */}
        <div
          data-id="details"
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full transition-all duration-1000 ${
            isVisible.details
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {companyDetails.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <div
                key={detail.label}
                className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-2 cursor-pointer group`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(detail.label)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`inline-flex p-3 rounded-full bg-${detail.color}-100 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent
                    className={`text-${detail.color}-600`}
                    size={24}
                  />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {detail.label}
                </h3>
                {detail.link ? (
                  <a
                    href={detail.link}
                    className={`text-${detail.color}-600 hover:text-${detail.color}-800 underline transition-colors duration-200`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{detail.value}</p>
                )}
                {hoveredCard === detail.label && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Specialties Section */}
        <div
          data-id="specialties"
          className={`w-full mb-12 transition-all duration-1000 ${
            isVisible.specialties
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Specialties
            </h2>
            <p className="text-gray-600">Expertise that drives innovation</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {specialties.map((specialty, index) => {
              const IconComponent = specialty.icon;
              return (
                <div
                  key={specialty.name}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent
                      size={18}
                      className="group-hover:animate-spin"
                    />
                    <span className="font-medium">{specialty.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div
          data-id="contact"
          className={`w-full transition-all duration-1000 ${
            isVisible.contact
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600">
              Ready to transform your ideas into reality?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div
                  key={contact.label}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-2 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`inline-flex p-3 rounded-full bg-${contact.color}-100 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`text-${contact.color}-600`}
                      size={24}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {contact.label}
                  </h3>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      className={`text-${contact.color}-600 hover:text-${contact.color}-800 transition-colors duration-200 hover:underline`}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{contact.value}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div
          data-id="cta"
          className={`mt-16 text-center transition-all duration-1000 ${
            isVisible.cta
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://www.stackcart.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform cursor-pointer inline-block group">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">
                  Ready to start your journey?
                </span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </a>
        </div>
      </div>

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
      `}</style>
    </div>
  );
}

export default About;
