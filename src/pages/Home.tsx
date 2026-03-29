import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, DollarSign, Star, ShieldCheck, Clock, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data, setIsBookingModalOpen } = useApp();
  const navigate = useNavigate();

  const suggestions = data ? [
    ...data.destinations.map(d => ({ type: 'destination', name: d.name, slug: d.slug })),
    ...data.packages.map(p => ({ type: 'package', name: p.title, slug: p.slug }))
  ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) : [];

  const handleSearch = (type: 'trips' | 'tips') => {
    if (!searchQuery) return;
    const path = type === 'trips' ? '/packages' : '/blog';
    navigate(`${path}?search=${searchQuery}`);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Travel Adventure" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
      </div>

      {/* Floating Elements for visual interest */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col items-center text-center">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Start Your Journey Today
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              Explore The<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Unseen World.</span>
            </h1>
            <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl font-medium mx-auto">
              Discover hidden gems and curated travel experiences designed for the modern adventurer. Your next great story starts here.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-white/20 shadow-2xl w-full max-w-7xl">
              <div className="bg-white rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row items-center gap-4">
                <div className="flex-[2] w-full relative">
                  <div className="flex items-center gap-4 px-4">
                    <MapPin className="text-primary shrink-0" size={24} />
                    <div className="flex-1">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Where to?</label>
                      <input 
                        type="text" 
                        placeholder="Search destination..." 
                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 font-bold placeholder:text-slate-300 text-lg"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                      />
                    </div>
                  </div>
                  
                  {/* Search Suggestions */}
                  <AnimatePresence>
                    {showSuggestions && searchQuery.length > 1 && suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                      >
                        <div className="p-2">
                          {suggestions.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.type === 'destination' ? `/destinations/${item.slug}` : `/packages?search=${item.name}`}
                              onClick={() => setShowSuggestions(false)}
                              className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                {item.type === 'destination' ? <MapPin size={18} /> : <Star size={18} />}
                              </div>
                              <div>
                                <div className="text-sm font-black text-slate-900">{item.name}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden lg:block w-px h-12 bg-slate-100" />

                <div className="flex-1 w-full flex items-center gap-4 px-4 text-left">
                  <Calendar className="text-primary shrink-0" size={24} />
                  <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">When?</label>
                    <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 font-bold appearance-none text-lg">
                      <option>Anytime</option>
                      <option>Summer 2024</option>
                      <option>Winter 2024</option>
                    </select>
                  </div>
                </div>

                <div className="hidden lg:block w-px h-12 bg-slate-100" />

                <div className="flex-1 w-full flex items-center gap-4 px-4 text-left">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="text-xs font-black">$</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Budget</label>
                    <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 font-bold appearance-none text-lg">
                      <option>Any Budget</option>
                      <option>$500 - $1000</option>
                      <option>$1000 - $5000</option>
                      <option>$5000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <button 
                    onClick={() => handleSearch('trips')}
                    className="px-10 py-5 rounded-2xl gradient-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Find Trips
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    className="w-12 h-12 rounded-full border-4 border-slate-950 object-cover"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-slate-950 bg-primary flex items-center justify-center text-white text-xs font-black">
                  +2k
                </div>
              </div>
              <div className="text-white/60 text-sm font-bold">
                <span className="text-white font-black">2,500+</span> Happy Travelers<br />
                Trust EasyGo Travel
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustIndicators = () => {
  const stats = [
    { label: "Happy Travelers", value: "10,000+", icon: Heart },
    { label: "Destinations", value: "50+", icon: MapPin },
    { label: "Customer Rating", value: "4.8/5", icon: Star },
    { label: "Years Experience", value: "12+", icon: Clock },
  ];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-4">
                <stat.icon size={24} />
              </div>
              <span className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</span>
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PopularDestinations = () => {
  const { data } = useApp();
  const destinations = data?.destinations || [];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Top Picks</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Popular Destinations</h2>
          </div>
          <Link to="/destinations" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 6).map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.slug}`}
              className="group relative h-96 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-slate-200 text-sm line-clamp-1">{dest.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedPackages = () => {
  const { data, setIsBookingModalOpen, setSelectedPackageId } = useApp();
  const packages = data?.packages?.filter(p => p.featured) || [];

  const handleBookNow = (id: string) => {
    setSelectedPackageId(id);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">Best Value</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">Featured Travel Packages</h2>
          <p className="text-slate-500 mt-4">Handpicked experiences designed for maximum comfort and adventure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-bold text-primary shadow-sm">
                  ${pkg.price}
                </div>
                <div className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-white flex items-center gap-1">
                  <Clock size={14} /> {pkg.duration}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{pkg.title}</h3>
                <div className="space-y-2 mb-6">
                  {pkg.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {h}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="py-4 rounded-2xl bg-slate-100 text-slate-900 text-center font-bold hover:bg-slate-200 transition-all text-sm"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleBookNow(pkg.id)}
                    className="py-4 rounded-2xl gradient-primary text-white text-center font-bold hover:scale-[1.02] transition-all text-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const benefits = [
    { title: "Affordable Pricing", desc: "We negotiate the best rates directly with local partners to save you money.", icon: DollarSign },
    { title: "Expert Planning", desc: "Our travel experts have personally visited every destination we offer.", icon: MapPin },
    { title: "24/7 Support", desc: "We're always here for you, no matter where you are in the world.", icon: ShieldCheck },
    { title: "Custom Itineraries", desc: "Every trip is tailored to your specific interests and travel style.", icon: Heart },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Benefits</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">Why Choose EasyGo Travel?</h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed">
              We believe travel should be accessible, inspiring, and stress-free. Our mission is to provide high-quality, curated experiences that create lifelong memories.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <b.icon size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900">{b.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000"
                alt="Traveler"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=sarah" alt="User" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Sarah Jenkins</h5>
                  <p className="text-xs text-slate-500">Solo Traveler</p>
                </div>
              </div>
              <p className="text-sm italic text-slate-600">"The best decision I made was booking through EasyGo. Everything was seamless!"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { data } = useApp();
  const testimonials = data?.testimonials || [];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="text-center mb-16">
        <span className="text-primary font-bold uppercase tracking-widest text-sm">Testimonials</span>
        <h2 className="text-4xl font-bold mt-2">What Our Travelers Say</h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-8 py-4"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="inline-block w-[400px] bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 whitespace-normal">
              <div className="flex gap-1 text-secondary mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-300 mb-8 italic leading-relaxed">"{t.feedback}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="font-bold">{t.name}</h5>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Verified Traveler</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BlogPreview = () => {
  const { data } = useApp();
  const blogs = data?.blogs || [];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Travel Guides</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Latest from Our Blog</h2>
          </div>
          <Link to="/blog" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Read All Guides <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="group">
              <div className="h-64 rounded-3xl overflow-hidden mb-6 shadow-lg">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">{blog.date}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 group-hover:text-primary transition-colors">{blog.title}</h3>
              <p className="text-slate-500 mt-3 text-sm line-clamp-2">{blog.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const { setIsBookingModalOpen } = useApp();

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto gradient-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="Pattern" className="w-full h-full object-repeat" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Ready to Start Your Next Journey?</h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Join thousands of happy travelers and discover the world's most beautiful destinations with EasyGo Travel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-10 py-5 rounded-full bg-white text-primary font-bold text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Book a Package
            </button>
            <Link
              to="/contact"
              className="px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <Layout>
      <Hero />
      <TrustIndicators />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </Layout>
  );
};


