import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, User, Settings as SettingsIcon, LogOut, ChevronRight, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingModal } from './BookingModal';
import { api } from '../api';

const Header = () => {
  const { data, isAdmin, setAdmin, setIsBookingModalOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(false);
  };

  const headerBg = isHome 
    ? (isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm' : 'bg-transparent') 
    : 'bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm';
  
  const textColor = isHome && !isScrolled ? 'text-white' : 'text-slate-900';
  const linkColor = isHome && !isScrolled ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-primary';
  const activeLinkColor = isHome && !isScrolled ? 'text-white after:bg-white' : 'text-primary after:bg-primary';

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${headerBg}`}>
      {/* Top Bar */}
      <div className={`hidden lg:block border-b transition-all duration-500 ${isHome && !isScrolled ? 'bg-black/10 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em]">
            <div className={`flex items-center gap-8 ${isHome && !isScrolled ? 'text-white/80' : 'text-slate-500'}`}>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-primary" />
                <span>{data?.settings.contactPhone || "+1 (555) 123-4567"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-primary" />
                <span>{data?.settings.contactEmail || "info@easygotravel.com"}</span>
              </div>
            </div>
            <div className={`flex items-center gap-6 ${isHome && !isScrolled ? 'text-white/80' : 'text-slate-500'}`}>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
              <a href="#" className="hover:text-primary transition-colors">FAQ</a>
              <div className="flex items-center gap-3 ml-4">
                <Facebook size={14} className="hover:text-primary cursor-pointer transition-colors" />
                <Instagram size={14} className="hover:text-primary cursor-pointer transition-colors" />
                <Twitter size={14} className="hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-20' : 'h-24'}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Plane size={26} />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors ${textColor}`}>
              {data?.settings.siteName || "EasyGo Travel"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[14px] uppercase font-black tracking-widest transition-all relative py-2 ${
                  location.pathname === link.path 
                    ? activeLinkColor + ' after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:rounded-full' 
                    : linkColor
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className={`flex items-center gap-2 border-r pr-6 mr-2 transition-colors ${isHome && !isScrolled ? 'border-white/20' : 'border-slate-200'}`}>
              {isAdmin ? (
                <>
                  <Link to="/admin" className={`p-2.5 rounded-xl transition-all ${isHome && !isScrolled ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`} title="Dashboard">
                    <SettingsIcon size={22} />
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className={`p-2.5 rounded-xl transition-all ${isHome && !isScrolled ? 'text-white/70 hover:text-red-400 hover:bg-white/10' : 'text-slate-500 hover:text-red-500 hover:bg-red-50'}`}
                    title="Logout"
                  >
                    <LogOut size={22} />
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  className={`p-2.5 rounded-xl transition-all ${isHome && !isScrolled ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}
                  title="Admin Login"
                >
                  <User size={22} />
                </Link>
              )}
            </div>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-7 py-3 rounded-2xl gradient-primary text-white text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${isHome && !isScrolled ? 'text-white bg-white/10' : 'text-slate-600 bg-slate-100'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-2 pb-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-4 text-base font-black uppercase tracking-widest rounded-xl transition-colors ${
                    location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 flex flex-col gap-3 px-4">
                <button
                  className="w-full py-4 rounded-2xl gradient-primary text-white text-center font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                >
                  Book Now
                </button>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="w-full py-4 rounded-2xl bg-slate-100 text-slate-900 text-center font-black uppercase tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/admin/login"
                    className="w-full py-4 rounded-2xl bg-slate-100 text-slate-900 text-center font-black uppercase tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  const { data } = useApp();
  const settings = data?.settings;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await api.createSubscriber(email);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Subscription failed:", error);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 text-white group">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <Plane size={26} />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                {settings?.siteName || "EasyGo Travel"}
              </span>
            </Link>
            <p className="text-base leading-relaxed text-slate-400">
              Curated luxury travel experiences, unbeatable prices, and unforgettable memories. We handle the details, you embrace the journey of a lifetime.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Quick Navigation</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/destinations" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Travel Packages</Link></li>
              <li><Link to="/offers" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Special Offers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Travel Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Contact Info</h4>
            <ul className="space-y-6 text-sm font-bold">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="leading-relaxed">123 Travel Lane, Adventure City, AC 45678</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <Phone size={18} />
                </div>
                <span>{settings?.contactPhone || "+1 (555) 123-4567"}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <span>{settings?.contactEmail || "info@easygotravel.com"}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Newsletter</h4>
            <p className="text-sm font-bold mb-6 leading-relaxed">Subscribe to get the latest travel deals and expert guides directly in your inbox.</p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm w-full focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all outline-none"
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-2xl gradient-primary text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe Now'}
              </button>
              {status === 'error' && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
          <p>© 2024 {settings?.siteName || "EasyGo Travel"}. All rights reserved.</p>
          <div className="flex gap-10">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BookingModal />
    </div>
  );
};
