import React from 'react';
import { Layout } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { useApp } from '../AppContext';
import { Tag, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Offers = () => {
  const { data } = useApp();
  const offers = data?.offers || [];

  return (
    <Layout>
      <PageHeader 
        title="Special Offers & Deals" 
        subtitle="Grab these limited-time discounts and make your dream vacation a reality for less."
        image="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Tag size={28} />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Clock size={14} /> Expires: {offer.expiry}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-slate-900 mb-4">{offer.title}</h3>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">{offer.description}</p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="px-6 py-3 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 font-mono font-bold text-xl text-slate-700">
                    {offer.code}
                  </div>
                  <Link
                    to="/packages"
                    className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    View Packages <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
