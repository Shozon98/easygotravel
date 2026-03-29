import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Layout } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { MapPin, Clock, DollarSign, ArrowRight, Star, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, setIsBookingModalOpen, setSelectedPackageId } = useApp();
  
  const destination = data?.destinations.find(d => d.slug === slug);
  const relatedPackages = data?.packages.filter(p => p.destinationId === destination?.id) || [];

  const handleBookNow = (packageId: string) => {
    setSelectedPackageId(packageId);
    setIsBookingModalOpen(true);
  };

  if (!destination) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Destination not found</h2>
          <Link to="/destinations" className="text-primary mt-4 inline-block">Back to Destinations</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader 
        title={destination.name}
        subtitle={destination.description}
        image={destination.image}
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">About {destination.name}</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {destination.description} Experience the unique blend of culture, nature, and adventure that makes {destination.name} one of the most sought-after destinations in the world. From breathtaking landscapes to world-class cuisine, every moment here is designed to be unforgettable.
                </p>
                
                {destination.places && destination.places.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Must-Visit Places</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {destination.places.map((place, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-lg transition-all group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <MapPin size={20} />
                          </div>
                          <span className="font-bold text-slate-800">{place}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Available Packages in {destination.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPackages.map((pkg) => (
                    <motion.div 
                      key={pkg.id}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 group border border-slate-100"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-bold text-primary shadow-sm">
                          ${pkg.price}
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                          <Clock size={14} /> {pkg.duration}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors">{pkg.title}</h4>
                        <div className="flex items-center justify-between gap-4">
                          <Link
                            to={`/packages/${pkg.slug}`}
                            className="text-primary font-bold hover:underline text-sm"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleBookNow(pkg.id)}
                            className="px-6 py-3 rounded-xl gradient-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {relatedPackages.length === 0 && (
                    <div className="col-span-full p-12 bg-slate-50 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200">
                      <p className="text-slate-500 font-medium">No specific packages available for this destination yet. Contact us for a custom itinerary!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />
                <h3 className="text-2xl font-bold mb-6 relative z-10">Why visit {destination.name}?</h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                      <Star size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Top Rated</h5>
                      <p className="text-xs text-slate-400 mt-1">Consistently ranked as a top global destination.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Safe & Secure</h5>
                      <p className="text-xs text-slate-400 mt-1">World-class safety standards for travelers.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                      <Heart size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Unforgettable</h5>
                      <p className="text-xs text-slate-400 mt-1">Create memories that will last a lifetime.</p>
                    </div>
                  </li>
                </ul>
                <button 
                  onClick={() => {
                    if (relatedPackages.length > 0) {
                      handleBookNow(relatedPackages[0].id);
                    } else {
                      setIsBookingModalOpen(true);
                    }
                  }}
                  className="mt-10 block w-full py-4 rounded-2xl gradient-primary text-white text-center font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  Plan Your Trip
                </button>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                <h4 className="font-bold text-slate-900 mb-6">Need Help?</h4>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">Our travel experts are available 24/7 to help you plan the perfect trip to {destination.name}.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary">
                      <MapPin size={16} />
                    </div>
                    Local Guides
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary">
                      <DollarSign size={16} />
                    </div>
                    Best Price Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
