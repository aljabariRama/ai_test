import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';
export type Currency = 'USD' | 'SAR' | 'AED' | 'JD';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (usdPrice: number) => string;
}

const currencyRates: Record<Currency, number> = {
  USD: 1,
  SAR: 3.75,
  AED: 3.67,
  JD: 0.71,
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  SAR: 'ر.س',
  AED: 'د.إ',
  JD: 'د.ا',
};

const translations = {
  en: {
    // Header
    'header.title': 'Mr Kassel',
    'header.subtitle': 'Master IELTS with AI',
    'header.banner': 'Limited Offer: Get 50% off Premium Plan - 3 Days Left!',
    'header.upgrade': 'Upgrade Now',
    'nav.home': 'Home',
    'nav.ielts': 'IELTS',
    'nav.learnPlay': 'Learn & Play',
    'nav.live': 'Live',
    'nav.plans': 'Plans',
    
    // Home Page
    'home.hero.title1': 'Master English with AI',
    'home.hero.title2': 'Learn, Play & Succeed',
    'home.hero.subtitle': 'Mr Kassel is your AI-powered English learning platform, combining interactive lessons, game-based challenges, and personalized exam preparation.',
    'home.hero.startLearning': 'Start Learning Now',
    'home.hero.takeTest': 'Take the Smart Test',
    
    'home.feature1.title': 'AI-Powered Practice',
    'home.feature1.description': 'Get instant feedback on speaking, writing, reading, and listening exercises with advanced AI technology',
    
    'home.feature2.title': 'Personalized Learning',
    'home.feature2.description': 'Adaptive content based on your level, interests, and learning goals with custom vocabulary building',
    
    'home.feature3.title': 'Track Progress',
    'home.feature3.description': 'Comprehensive analytics, band score predictions, and personalized recommendations for improvement',
    
    'home.stats.title': 'Trusted by Thousands of Learners',
    'home.stats.learners': 'Active Learners',
    'home.stats.rating': 'Average Rating',
    'home.stats.countries': 'Countries',
    'home.stats.success': 'Success Rate',
    
    // Plans Page
    'plans.title': 'Choose Your Learning Plan',
    'plans.subtitle': 'Unlock your full potential with our premium features',
    
    'plans.free.name': 'Free',
    'plans.free.price': '$0',
    'plans.free.period': '/month',
    'plans.free.description': 'Perfect for beginners',
    'plans.free.feature1': '5 practice sessions per day',
    'plans.free.feature2': 'Basic AI feedback',
    'plans.free.feature3': 'Progress tracking',
    'plans.free.feature4': 'Community support',
    
    'plans.pro.name': 'Pro',
    'plans.pro.price': '$19',
    'plans.pro.period': '/month',
    'plans.pro.description': 'Most popular choice',
    'plans.pro.feature1': 'Unlimited practice sessions',
    'plans.pro.feature2': 'Advanced AI feedback',
    'plans.pro.feature3': 'Detailed analytics',
    'plans.pro.feature4': 'Priority support',
    'plans.pro.feature5': 'Vocabulary builder',
    'plans.pro.feature6': 'Speaking practice with AI',
    
    'plans.premium.name': 'Premium',
    'plans.premium.price': '$49',
    'plans.premium.period': '/month',
    'plans.premium.description': 'For serious learners',
    'plans.premium.feature1': 'Everything in Pro',
    'plans.premium.feature2': 'Personal AI tutor',
    'plans.premium.feature3': 'Live tutoring sessions',
    'plans.premium.feature4': 'Exam simulation',
    'plans.premium.feature5': 'Certificate of completion',
    'plans.premium.feature6': 'Lifetime access to materials',
    
    'plans.button.current': 'Current Plan',
    'plans.button.choosePlan': 'Choose Plan',
    'plans.button.upgrade': 'Upgrade Now',
  },
  ar: {
    // Header
    'header.title': 'مستر كassel',
    'header.subtitle': 'أتقن IELTS مع الذكاء الاصطناعي',
    'header.banner': 'عرض محدود: احصل على خصم 50٪ على الخطة المميزة - 3 أيام متبقية!',
    'header.upgrade': 'الترقية الآن',
    'nav.home': 'الرئيسية',
    'nav.ielts': 'IELTS',
    'nav.learnPlay': 'التعلم واللعب',
    'nav.live': 'مباشر',
    'nav.plans': 'الخطط',
    
    // Home Page
    'home.hero.title1': 'أتقن الإنجليزية مع الذكاء الاصطناعي',
    'home.hero.title2': 'تعلم، العب وانجح',
    'home.hero.subtitle': 'مستر كassel هو منصة تعلم الإنجليزية بالذكاء الاصطناعي، تجمع بين الدروس التفاعلية والتحديات القائمة على الألعاب والإعداد الشخصي للامتحانات.',
    'home.hero.startLearning': 'ابدأ التعلم الآن',
    'home.hero.takeTest': 'خذ الاختبار الذكي',
    
    'home.feature1.title': 'تمرين مدعوم بالذكاء الاصطناعي',
    'home.feature1.description': 'احصل على تعليقات فورية على تمارين التحدث والكتابة والقراءة والاستماع بتقنية الذكاء الاصطناعي المتقدمة',
    
    'home.feature2.title': 'تعلم شخصي',
    'home.feature2.description': 'محتوى متكيف بناءً على مستواك واهتماماتك وأهدافك التعليمية مع بناء مفردات مخصص',
    
    'home.feature3.title': 'تتبع التقدم',
    'home.feature3.description': 'تحليلات شاملة وتوقعات درجات النطاق وتوصيات شخصية للتحسين',
    
    'home.stats.title': 'موثوق به من قبل آلاف المتعلمين',
    'home.stats.learners': 'متعلم نشط',
    'home.stats.rating': 'متوسط التقييم',
    'home.stats.countries': 'دولة',
    'home.stats.success': 'معدل النجاح',
    
    // Plans Page
    'plans.title': 'اختر خطة التعلم الخاصة بك',
    'plans.subtitle': 'أطلق العنان لإمكاناتك الكاملة مع ميزاتنا المميزة',
    
    'plans.free.name': 'مجاني',
    'plans.free.price': '$0',
    'plans.free.period': '/شهر',
    'plans.free.description': 'مثالي للمبتدئين',
    'plans.free.feature1': '5 جلسات تدريب يومياً',
    'plans.free.feature2': 'ملاحظات أساسية من الذكاء الاصطناعي',
    'plans.free.feature3': 'تتبع التقدم',
    'plans.free.feature4': 'دعم المجتمع',
    
    'plans.pro.name': 'محترف',
    'plans.pro.price': '$19',
    'plans.pro.period': '/شهر',
    'plans.pro.description': 'الخيار الأكثر شعبية',
    'plans.pro.feature1': 'جلسات تدريب غير محدودة',
    'plans.pro.feature2': 'ملاحظات متقدمة من الذكاء الاصطناعي',
    'plans.pro.feature3': 'تحليلات مفصلة',
    'plans.pro.feature4': 'دعم ذو أولوية',
    'plans.pro.feature5': 'بناء المفردات',
    'plans.pro.feature6': 'ممارسة التحدث مع الذكاء الاصطناعي',
    
    'plans.premium.name': 'مميز',
    'plans.premium.price': '$49',
    'plans.premium.period': '/شهر',
    'plans.premium.description': 'للمتعلمين الجادين',
    'plans.premium.feature1': 'كل شيء في المحترف',
    'plans.premium.feature2': 'مدرس ذكاء اصطناعي شخصي',
    'plans.premium.feature3': 'جلسات تدريس مباشرة',
    'plans.premium.feature4': 'محاكاة الامتحانات',
    'plans.premium.feature5': 'شهادة إتمام',
    'plans.premium.feature6': 'وصول مدى الحياة للمواد',
    
    'plans.button.current': 'الخطة الحالية',
    'plans.button.choosePlan': 'اختر الخطة',
    'plans.button.upgrade': 'الترقية الآن',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const formatPrice = (usdPrice: number): string => {
    const rate = currencyRates[currency];
    const priceInCurrency = usdPrice * rate;
    const symbol = currencySymbols[currency];
    
    // Format with proper symbol placement
    if (currency === 'USD') {
      return `${symbol}${priceInCurrency.toFixed(2)}`;
    }
    return `${priceInCurrency.toFixed(2)} ${symbol}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}