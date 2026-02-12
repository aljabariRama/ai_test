import { useState } from 'react';
import { Menu, X, User, Settings, Home, BookOpen, Target, BarChart3, BookMarked, Award, Languages, ChevronDown, LogOut, Brain, Phone, FileText, Info, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { useLanguage } from '../context/LanguageContext';
import logo from '../../assets/kassel_mobile_logo.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  // currentPage: string;
  // onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isAdmin?: boolean;
  setIsAdmin?: (value: boolean) => void;
}

export function Header({  isLoggedIn, setIsLoggedIn, isAdmin = false, setIsAdmin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();
  const navigate=useNavigate();

  const navItems = [
    { name: t('nav.home'), id: '/', icon: Home },
    { name: 'About', id: 'about', icon: Info },
    { name: 'Blog', id: 'blog', icon: FileText },
    { name: 'Contact Us', id: 'contact', icon: Phone },
    { name: 'Help & Support', id: 'support', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar - Currency, Language, Profile */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Left side - Welcome message */}
            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <span className="text-xs">Welcome to Mr Kassel</span>
            </div>

            {/* Right side - Currency, Language, Profile */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Currency Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded text-gray-700 transition-colors">
                    <span className="text-xs font-medium">{currency}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => setCurrency('USD')}
                    className={`cursor-pointer ${currency === 'USD' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <span className="mr-2">🇺🇸</span>
                    <span className="flex-1">USD</span>
                    {currency === 'USD' && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrency('SAR')}
                    className={`cursor-pointer ${currency === 'SAR' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <span className="mr-2">🇸🇦</span>
                    <span className="flex-1">SAR</span>
                    {currency === 'SAR' && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrency('AED')}
                    className={`cursor-pointer ${currency === 'AED' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <span className="mr-2">🇦🇪</span>
                    <span className="flex-1">AED</span>
                    {currency === 'AED' && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrency('JD')}
                    className={`cursor-pointer ${currency === 'JD' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <span className="mr-2">🇯🇴</span>
                    <span className="flex-1">JD</span>
                    {currency === 'JD' && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="w-px h-4 bg-gray-300"></div>

              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded text-gray-700 transition-colors">
                    <Languages className="h-3 w-3" />
                    <span className="text-xs font-medium">{language === 'en' ? 'EN' : 'AR'}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem 
                    onClick={() => setLanguage('en')}
                    className={`cursor-pointer ${language === 'en' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <span className="mr-2">🇬🇧</span>
                    <span>English</span>
                    {language === 'en' && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage('ar')}
                    className={`cursor-pointer ${language === 'ar' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <span className="mr-2">🇸🇦</span>
                    <span>العربية</span>
                    {language === 'ar' && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="w-px h-4 bg-gray-300"></div>

              {/* Conditional: Profile or Sign In/Sign Up */}
              {isLoggedIn ? (
                /* User Profile Dropdown */
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-100 rounded text-gray-700 transition-colors">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-medium hidden sm:inline">Ahmed</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2 border-b">
                      <p className="font-semibold text-sm">Ahmed Khan</p>
                      <p className="text-xs text-gray-500">ahmed@example.com</p>
                      <Badge className="mt-1 text-xs bg-gradient-to-r from-blue-500 to-purple-600">Free Plan</Badge>
                    </div>
                    <DropdownMenuItem onClick={() => navigate('my-dictionary')} className="cursor-pointer">
                      <BookMarked className="mr-2 h-4 w-4" />
                      <span>My Dictionary</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('progress')} className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Progress</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('plans')} className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Upgrade Plan</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => navigate('admin')} 
                          className="cursor-pointer bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 font-semibold"
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    {setIsAdmin && !isAdmin && (
                      <DropdownMenuItem 
                        onClick={() => setIsAdmin(true)} 
                        className="cursor-pointer text-xs text-gray-500 italic"
                      >
                        🔑 Enable Admin Mode
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => setIsLoggedIn(false)}
                      className="cursor-pointer text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* Sign In / Start Free Trial Buttons */
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="text-xs font-medium px-3 py-1 hover:bg-gray-100 rounded transition-colors text-gray-700"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('plans')}
                    className="text-xs font-medium px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm"
                  >
                    Start Free Trial
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Logo and Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer flex-shrink-0 group" onClick={() => navigate('/')}>
              <img src={logo} alt="Mr Kassel" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('header.title')}
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5">AI English Learning</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                // const isActive = currentPage === item.id;
                const isActive ="";

                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA - Only show Start Free Trial when NOT logged in */}
            <div className="hidden lg:flex items-center gap-3">
              {!isLoggedIn && (
                <Button
                  onClick={() =>navigate('plans')}
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  Subscribe Now
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">
            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              // const isActive = currentPage === item.id;
                const isActive =""

              return (
                <button
                  key={item.id}
                  onClick={() => {
                  navigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}

            {/* Show Start Free Trial in mobile only when NOT logged in */}
            {!isLoggedIn && (
              <div className="pt-2 border-t space-y-2">
                <Button
                  onClick={() => {
                 navigate('plans');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Start Free Trial
                </Button>
                <Button
                  onClick={() => {
                 navigate('plans');
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  Subscribe Now
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}