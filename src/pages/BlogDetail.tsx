import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Layout } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { Calendar, User, ArrowLeft, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, setIsBookingModalOpen } = useApp();
  
  const blog = data?.blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Blog post not found</h2>
          <Link to="/blog" className="text-primary mt-4 inline-block">Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader 
        title={blog.title}
        subtitle={`Published on ${blog.date} by Travel Expert`}
        image={blog.image}
      />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 font-medium transition-colors">
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          <article className="prose prose-slate lg:prose-xl max-w-none">
            <div className="flex items-center gap-6 mb-12 pb-8 border-bottom border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <Calendar size={16} /> {blog.date}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <User size={16} /> Admin
              </div>
            </div>

            <div className="text-slate-600 leading-relaxed space-y-8 text-lg">
              <p className="font-medium text-xl text-slate-900 leading-relaxed italic border-l-4 border-primary pl-8 py-2">
                {blog.excerpt}
              </p>
              
              <p>
                Traveling is not just about visiting new places; it's about experiencing different cultures, meeting new people, and creating memories that last a lifetime. In this guide, we explore the hidden gems and must-see attractions of {blog.title.split(' ').slice(-1)[0]}.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Why This Destination is Special</h3>
              <p>
                Whether you're an adventure seeker, a history buff, or someone looking to relax and unwind, this destination has something for everyone. The unique blend of traditional charm and modern convenience makes it a perfect choice for any traveler.
              </p>

              <div className="my-12 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Expert Travel Tips</h3>
              <ul className="list-disc pl-6 space-y-4">
                <li>Plan your visit during the shoulder season to avoid crowds and save on costs.</li>
                <li>Learn a few basic phrases in the local language to enhance your cultural experience.</li>
                <li>Always carry a reusable water bottle and stay hydrated throughout your journey.</li>
                <li>Respect local customs and traditions to ensure a positive impact on the community.</li>
              </ul>

              <p>
                We hope this guide inspires you to embark on your next adventure. Remember, the world is full of beautiful places waiting to be discovered. Happy travels!
              </p>
            </div>

            <div className="mt-20 pt-12 border-t border-slate-100 flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-900">Share this post:</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all">
                    <Share2 size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all">
                    <Bookmark size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all">
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-8 py-4 rounded-2xl gradient-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  Book a Trip
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
};
