import React from 'react';
import { useApp } from '../AppContext';
import { Layout } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, DollarSign, ArrowRight, Star, Search } from 'lucide-react';

export const Packages = () => {
  const { data } = useApp();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  
  const allPackages = data?.packages || [];
  const filteredPackages = searchQuery 
    ? allPackages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchQuery) || 
        data?.destinations.find(d => d.id === pkg.destinationId)?.name.toLowerCase().includes(searchQuery)
      )
    : allPackages;

  return (
    <Layout>
      <PageHeader 
        title={searchQuery ? `Search Results: ${searchQuery}` : "Travel Packages"} 
        subtitle={searchQuery ? `Found ${filteredPackages.length} packages matching your search.` : "Unbeatable deals on curated travel experiences. Choose your adventure and let us handle the rest."}
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 group">
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
                    <div className="flex items-center gap-1 text-secondary mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{pkg.title}</h3>
                    <div className="space-y-2 mb-8">
                      {pkg.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {h}
                        </div>
                      ))}
                    </div>
                    <Link
                      to={`/packages/${pkg.slug}`}
                      className="block w-full py-4 rounded-2xl gradient-primary text-white text-center font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No packages found</h3>
              <p className="text-slate-500 mb-8">We couldn't find any packages matching "{searchQuery}". Try a different search term.</p>
              <Link to="/packages" className="text-primary font-bold hover:underline">View all packages</Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
