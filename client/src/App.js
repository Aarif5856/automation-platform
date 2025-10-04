import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import DemoLogin from './pages/DemoLogin';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Support from './pages/Support';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FreeDemo from './pages/FreeDemo';
import ServicePackages from './pages/ServicePackages';
import WebScraping from './pages/WebScraping';
import ProtectedRoute from './components/ProtectedRoute';
import AIChatbot from './components/AIChatbot';
import LimitedTimeOffer from './components/LimitedTimeOffer';
import './utils/analytics';

function App() {
  // Check if we're in demo mode
  const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true';
  
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/login" 
                element={isDemoMode ? <DemoLogin /> : <Login />} 
              />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/support" element={<Support />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/free-demo" element={<FreeDemo />} />
              <Route path="/packages" element={<ServicePackages />} />
              <Route path="/web-scraping" element={<WebScraping />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <AIChatbot />
          <LimitedTimeOffer />
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
