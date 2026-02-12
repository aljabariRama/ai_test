import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

export function PlansPage() {
  const { t, language, formatPrice } = useLanguage();

  const planPrices = {
    free: 0,
    pro: 19,
    premium: 49,
  };

  const plans = [
    {
      id: 'free',
      icon: Zap,
      color: 'from-gray-500 to-gray-600',
      borderColor: 'border-gray-300',
      price: planPrices.free,
      features: [
        t('plans.free.feature1'),
        t('plans.free.feature2'),
        t('plans.free.feature3'),
        t('plans.free.feature4'),
      ],
      isCurrent: true,
    },
    {
      id: 'pro',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-600',
      borderColor: 'border-blue-500',
      price: planPrices.pro,
      features: [
        t('plans.pro.feature1'),
        t('plans.pro.feature2'),
        t('plans.pro.feature3'),
        t('plans.pro.feature4'),
        t('plans.pro.feature5'),
        t('plans.pro.feature6'),
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      icon: Crown,
      color: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-500',
      price: planPrices.premium,
      features: [
        t('plans.premium.feature1'),
        t('plans.premium.feature2'),
        t('plans.premium.feature3'),
        t('plans.premium.feature4'),
        t('plans.premium.feature5'),
        t('plans.premium.feature6'),
      ],
    },
  ];

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-8 sm:py-12 lg:py-16 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16`}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t('plans.title')}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('plans.subtitle')}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.isPopular
                    ? `border-2 ${plan.borderColor} shadow-xl`
                    : 'border-2 border-gray-200'
                } hover:shadow-2xl transition-all duration-300 ${
                  plan.isPopular ? 'transform scale-105' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 text-sm px-4 py-1">
                      {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">
                    {t(`plans.${plan.id}.name`)}
                  </CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                    <span className="text-gray-600">{t(`plans.${plan.id}.period`)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t(`plans.${plan.id}.description`)}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                          plan.isPopular ? 'text-blue-600' : 'text-green-600'
                        }`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full ${
                      plan.isCurrent
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : plan.isPopular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    }`}
                    disabled={plan.isCurrent}
                    size="lg"
                  >
                    {plan.isCurrent
                      ? t('plans.button.current')
                      : plan.isPopular
                      ? t('plans.button.choosePlan')
                      : t('plans.button.upgrade')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-gray-600 mb-4">
            {language === 'ar'
              ? 'جميع الخطط تأتي مع ضمان استرداد الأموال لمدة 30 يومًا'
              : 'All plans come with a 30-day money-back guarantee'}
          </p>
          <p className="text-sm text-gray-500">
            {language === 'ar'
              ? 'لديك أسئلة؟ اتصل بنا على support@mrkassel.com'
              : 'Have questions? Contact us at support@mrkassel.com'}
          </p>
        </div>
      </div>
    </div>
  );
}