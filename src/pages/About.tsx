import React from 'react';
import { Layout } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { CheckCircle2, Users, Globe, Award } from 'lucide-react';

export const About = () => {
  return (
    <Layout>
      <PageHeader 
        title="About EasyGo Travel" 
        subtitle="Making travel simple, accessible, and unforgettable for everyone around the world."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Story</span>
              <h2 className="text-5xl font-extrabold text-slate-900 mt-2 mb-8">Making Travel Simple & Unforgettable</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                EasyGo Travel started with a simple mission: to help people discover the world without the stress of planning. We believe that travel is the best way to broaden horizons and create lasting connections.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                Our team of passionate travelers and experts work tirelessly to curate the best experiences, negotiate unbeatable prices, and provide 24/7 support to our community.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span className="font-bold text-slate-900">Expert Guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span className="font-bold text-slate-900">Safe Travels</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span className="font-bold text-slate-900">Best Prices</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span className="font-bold text-slate-900">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                alt="Our Team"
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-500 text-sm leading-relaxed">To provide accessible and inspiring travel experiences for everyone, regardless of their budget or travel style.</p>
            </div>
            <div className="bg-slate-50 p-10 rounded-[2.5rem] text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-500 text-sm leading-relaxed">To become the world's most trusted travel platform, known for our curated quality and exceptional customer care.</p>
            </div>
            <div className="bg-slate-50 p-10 rounded-[2.5rem] text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Our Values</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Integrity, passion, and customer-centricity are at the heart of everything we do at EasyGo Travel.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
