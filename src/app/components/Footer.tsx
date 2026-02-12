import {
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Home,
  BookOpen,
  Radio,
  CreditCard,
  Award,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import logo from "../../assets/kassel_mobile_logo.png";
import { Link } from "react-router-dom";

interface FooterProps {
  // onNavigate: (page: string) => void;
  // currentPage: string;
  isLoggedIn: boolean;
}

export function Footer({ isLoggedIn }: FooterProps) {
  const { t } = useLanguage();

  // Mobile App Style Footer (when logged in)
  if (isLoggedIn) {
    const navItems = [
      {
        id: "home",
        label: "Home",
        icon: Home,
        page: "/",
      },
      {
        id: "ielts",
        label: "IELTS",
        icon: BookOpen,
        page: "ielts",
      },
      {
        id: "live",
        label: "Live",
        icon: Radio,
        page: "live",
      },
      {
        id: "plans",
        label: "Plans",
        icon: CreditCard,
        page: "plans",
      },
      {
        id: "smart",
        label: "Smart",
        icon: Sparkles,
        page: "my-dictionary",
      },
    ];

    return (
      <>
        {/* Spacer to prevent content from being hidden behind fixed footer */}
        <div className="h-20" />

        {/* Fixed Bottom Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-5 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                // const isActive = currentPage === item.page;
                const isActive ="";

                return (
                  <Link to={item.page}>
                    <button
                      key={item.id}
                      // onClick={() => onNavigate(item.page)}
                      className={`flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 
                        ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-500"
                      }
                      `}
                    >
                      <div
                        className={`relative ${isActive ? "transform scale-110" : ""}`}
                      >
                        <Icon
                          className={`h-6 w-6 mb-1 ${isActive ? "text-blue-600" : ""}`}
                        />
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isActive
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-t-full" />
                      )}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </footer>
      </>
    );
  }

  // Traditional Footer (when not logged in)
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-12 sm:mt-20">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={logo}
                alt="Mr Kassel"
                className="h-10 sm:h-12 w-auto  "
              />
              <div>
                <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Mr Kassel
                </h3>
                <p className="text-xs text-gray-400">AI English Learning</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Transform your English learning journey with AI-powered
              personalized education.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to={"/"}>
                  <button
                    // onClick={() => onNavigate("home")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"about"}>
                  <button
                    // onClick={() => onNavigate("about")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    About Us
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"ielts"}>
                  <button
                    // onClick={() => onNavigate("ielts")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    IELTS Preparation
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"live"}>
                  <button
                    // onClick={() => onNavigate("live")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Live Practice
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"placement"}>
                  <button
                    // onClick={() => onNavigate("placement")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Smart Test
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"blog"}>
                  <button
                    // onClick={() => onNavigate("blog")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Blog
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Support
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to={"support"}>
                  <button
                    // onClick={() => onNavigate("support")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Help & Support
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"contact"}>
                  <button
                    // onClick={() => onNavigate("contact")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Contact Us
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"plans"}>
                  <button
                    // onClick={() => onNavigate("plans")}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Pricing & Plans
                  </button>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Contact
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Email</p>
                  <a
                    href="mailto:support@mrkassel.com"
                    className="text-xs sm:text-sm hover:text-white transition-colors break-words"
                  >
                    support@mrkassel.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Address</p>
                  <p className="text-xs sm:text-sm">
                    123 Learning Street
                    <br />
                    Education City, EC 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-4 sm:pt-6 mt-4 sm:mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2026 Mr Kassel. All rights reserved. Powered by AI.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
