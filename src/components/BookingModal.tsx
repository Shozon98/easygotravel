import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { useApp } from '../AppContext';
import { api } from '../api';

export const BookingModal = () => {
  const { isBookingModalOpen, setIsBookingModalOpen, selectedPackageId, setSelectedPackageId, data } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    message: ''
  });

  const selectedPackage = data?.packages.find(p => p.id === selectedPackageId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackageId) return;
    
    setLoading(true);
    try {
      await api.createBooking({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        travelDate: formData.date,
        travelers: formData.guests,
        specialRequests: formData.message,
        packageId: selectedPackageId || ''
      });
      setSuccess(true);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsBookingModalOpen(false);
    setSelectedPackageId(null);
    setSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: 1,
      message: ''
    });
  };

  return (
    <AnimatePresence>
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blur Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {success ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Booking Request Sent!</h3>
                <p className="text-slate-500 mb-10 leading-relaxed">
                  We've received your booking request for <span className="font-bold text-slate-900">{selectedPackage?.title}</span>. Our experts will contact you shortly to finalize the details.
                </p>
                <button
                  onClick={closeModal}
                  className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Package Info */}
                <div className="md:w-2/5 bg-slate-50 p-8 md:p-10 border-r border-slate-100">
                  <span className="text-primary font-black uppercase tracking-widest text-[10px] mb-2 block">Booking Details</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    {selectedPackage ? selectedPackage.title : 'Book Your Journey'}
                  </h3>
                  
                  {selectedPackage && (
                    <div className="space-y-6">
                      <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                        <img src={selectedPackage.image} alt={selectedPackage.title} className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                          <Calendar size={16} />
                        </div>
                        <span className="text-sm font-bold">{selectedPackage.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                          <MapPin size={16} />
                        </div>
                        <span className="text-sm font-bold">Guided Tour</span>
                      </div>
                      <div className="pt-6 border-t border-slate-200">
                        <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Starting From</div>
                        <div className="text-3xl font-black text-primary">${selectedPackage.price}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Form */}
                <div className="md:w-3/5 p-8 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          required
                          className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-bold text-slate-900"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="email"
                            required
                            className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-bold text-slate-900"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="tel"
                            required
                            className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-bold text-slate-900"
                            placeholder="+1 (555) 000"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Travel Date</label>
                        <input
                          type="date"
                          required
                          className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-bold text-slate-900"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Guests</label>
                        <input
                          type="number"
                          min="1"
                          required
                          className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-bold text-slate-900"
                          value={formData.guests}
                          onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 rounded-2xl gradient-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Booking"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
