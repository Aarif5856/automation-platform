import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FreeDemo = () => {
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    location: '',
    companySize: '',
    contactInfo: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you! We\'ll generate your 50 free leads within 24 hours!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              🎁 Get 50 Qualified Leads FREE
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              No strings attached. We'll generate 50 qualified leads for your industry 
              using our automation tools and deliver them within 24 hours.
            </p>
            <div className="bg-green-100 border border-green-300 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Value: $297</h2>
              <p className="text-green-700">Completely FREE - No credit card required</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Request Your Free Demo
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry/Niche *
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Technology, Real Estate, Healthcare"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., New York, NY or United States"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size Preference *
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information Needed *
                </label>
                <select
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select contact info needed</option>
                  <option value="email">Email addresses only</option>
                  <option value="email-phone">Email and phone numbers</option>
                  <option value="email-phone-linkedin">Email, phone, and LinkedIn</option>
                  <option value="all">All available contact information</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific requirements or preferences..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Get My 50 Free Leads Now!
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              We'll deliver your leads within 24 hours. No spam, no strings attached.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">You Provide Requirements</h3>
              <p className="text-gray-600">
                Tell us your target industry, location, and what contact information you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">We Generate Leads</h3>
              <p className="text-gray-600">
                Our automation tools find and extract 50 qualified leads for your industry.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">You Get Results</h3>
              <p className="text-gray-600">
                Receive your leads in CSV/Excel format within 24 hours, ready to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Mitchell</h4>
                  <p className="text-gray-600 text-sm">CEO, TechStart Inc.</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The free demo was incredible! We got 50 high-quality leads in just 24 hours. 
                The quality was so good that we immediately signed up for their full service."
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-semibold">MC</span>
                </div>
                <div>
                  <h4 className="font-semibold">Mike Chen</h4>
                  <p className="text-gray-600 text-sm">Marketing Director, GrowthCo</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was skeptical about the free demo, but the results exceeded my expectations. 
                The leads were exactly what we needed and the quality was outstanding."
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-semibold">ER</span>
                </div>
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Founder, E-commerce Plus</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The free demo convinced me to work with The Automation Solutions. 
                The leads were so good that we converted 20% of them into customers!"
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Your Free Leads?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join 500+ businesses who trust us with their lead generation needs.
          </p>
          <a 
            href="#form"
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get My 50 Free Leads Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default FreeDemo;
