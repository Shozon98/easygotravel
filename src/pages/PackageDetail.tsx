import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Layout } from '../components/Layout';
import { api } from '../api';
import { 
  Clock, 
  DollarSign, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Users, 
  MessageSquare, 
  ArrowLeft,
  Loader2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PackageDetail = () => {
  const { slug } = useParams();
  const { data, refreshData } = useApp();
  const navigate = useNavigate();
  const [bookingStep, setBookingStep] = useState<'details' | 'form' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    travelDate: '',
    travelers: 1,
    specialRequests: ''
  });

  const pkg = data?.packages.find(p => p.slug === slug);
  if (!pkg) return null;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createBooking({
        ...formData,
        packageId: pkg.id
      });
      setBookingStep('success');
      refreshData();
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-24">
        {/* Hero Banner */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-0 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={20} /> Back to Packages
              </button>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{pkg.title}</h1>
              <div className="flex flex-wrap gap-6 text-white/90 font-medium">
                <div className="flex items-center gap-2"><Clock size={20} className="text-primary" /> {pkg.duration}</div>
                <div className="flex items-center gap-2"><DollarSign size={20} className="text-primary" /> From ${pkg.price}</div>
                <div className="flex items-center gap-2"><MapPin size={20} className="text-primary" /> Multiple Locations</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Package Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                      <CheckCircle2 className="text-primary" size={20} />
                      <span className="font-medium text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Itinerary</h2>
                <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {pkg.itinerary.map((item) => (
                    <div key={item.day} className="relative pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center text-xs font-bold z-10">
                        {item.day}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Day {item.day}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <AnimatePresence mode="wait">
                  {bookingStep === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
                    >
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <span className="text-slate-500 text-sm font-medium">Starting from</span>
                          <div className="text-4xl font-extrabold text-slate-900">${pkg.price}</div>
                        </div>
                        <div className="text-primary font-bold text-sm">per person</div>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <Clock size={20} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">Duration</span>
                          </div>
                          <span className="text-sm font-medium text-slate-500">{pkg.duration}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <Users size={20} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">Group Size</span>
                          </div>
                          <span className="text-sm font-medium text-slate-500">Up to 12</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setBookingStep('form')}
                        className="w-full py-5 rounded-2xl gradient-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all"
                      >
                        Book This Trip
                      </button>
                      <p className="text-center text-xs text-slate-400 mt-4">No payment required now</p>
                    </motion.div>
                  )}

                  {bookingStep === 'form' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Reservation Details</h3>
                      <form onSubmit={handleBooking} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                          <input 
                            type="text" 
                            required 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary"
                            value={formData.customerName}
                            onChange={e => setFormData({...formData, customerName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                          <input 
                            type="email" 
                            required 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary"
                            value={formData.customerEmail}
                            onChange={e => setFormData({...formData, customerEmail: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Date</label>
                            <input 
                              type="date" 
                              required 
                              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary"
                              value={formData.travelDate}
                              onChange={e => setFormData({...formData, travelDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Travelers</label>
                            <input 
                              type="number" 
                              min="1" 
                              required 
                              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary"
                              value={formData.travelers}
                              onChange={e => setFormData({...formData, travelers: parseInt(e.target.value)})}
                            />
                          </div>
                        </div>
                        <button 
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 rounded-2xl gradient-primary text-white font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                        >
                          {loading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Booking"}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setBookingStep('details')}
                          className="w-full py-2 text-slate-400 text-sm font-bold"
                        >
                          Cancel
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {bookingStep === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 text-center"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Booking Received!</h3>
                      <p className="text-slate-500 mb-8">
                        Thank you for choosing EasyGo Travel. Our team will contact you shortly to confirm your trip details.
                      </p>
                      <button 
                        onClick={() => setBookingStep('details')}
                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold"
                      >
                        Back to Package
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
