import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'support@mrkassel.com',
      description: 'Send us an email anytime',
      action: 'mailto:support@mrkassel.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+1 (234) 567-890',
      description: 'Mon-Fri from 8am to 6pm',
      action: 'tel:+1234567890'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      detail: 'Chat with us',
      description: 'Available 24/7',
      action: '#'
    }
  ];

  const offices = [
    {
      city: 'New York',
      address: '123 Learning Street, NY 10001',
      phone: '+1 (234) 567-890',
      email: 'ny@mrkassel.com'
    },
    {
      city: 'London',
      address: '456 Education Road, London EC1A',
      phone: '+44 20 1234 5678',
      email: 'london@mrkassel.com'
    },
    {
      city: 'Dubai',
      address: '789 Knowledge Ave, Dubai',
      phone: '+971 4 123 4567',
      email: 'dubai@mrkassel.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 px-4">
              We're here to help with any questions you have
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all hover:transform hover:scale-105 text-center"
                >
                  <div className="inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-3 sm:mb-4">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{method.title}</h3>
                  <p className="text-blue-600 font-semibold mb-2 text-sm sm:text-base break-words">{method.detail}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{method.description}</p>
                </a>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 px-2">
            {/* Contact Form */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none text-sm sm:text-base"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                >
                  <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              {/* Business Hours */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Business Hours</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-gray-700">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="font-medium">Saturday</span>
                    <span className="text-gray-700">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-700">Closed</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300">
                    * All times in EST. Live chat available 24/7
                  </p>
                </div>
              </div>

              {/* Office Locations */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Our Offices</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className={`${index !== offices.length - 1 ? 'pb-4 sm:pb-6 border-b border-gray-200' : ''}`}>
                      <h4 className="font-bold text-base sm:text-lg mb-2 text-blue-600">{office.city}</h4>
                      <p className="text-gray-700 text-xs sm:text-sm mb-2">{office.address}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">📞 {office.phone}</p>
                      <p className="text-gray-600 text-xs sm:text-sm break-words">✉️ {office.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl mx-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Have Questions?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100">
              Check out our FAQ section or contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full sm:w-auto"
              >
                View FAQ
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold w-full sm:w-auto"
              >
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}