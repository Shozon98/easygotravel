import React from 'react';
import { useApp } from '../AppContext';
import { Layout } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export const Destinations = () => {
  const { data } = useApp();
  const destinations = data?.destinations || [];

  return (
    <Layout>
      <PageHeader 
        title="Explore Destinations" 
        subtitle="From tropical beaches to snowy mountains, find your perfect getaway among our curated list of world-class destinations."
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug}`}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
                    <MapPin size={20} className="text-primary" />
                    <span className="text-xl font-bold">{dest.name}</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                    {dest.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                    Explore Packages <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
