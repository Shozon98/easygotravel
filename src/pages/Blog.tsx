import React from 'react';
import { Layout } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { useApp } from '../AppContext';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, User, Search } from 'lucide-react';

export const Blog = () => {
  const { data } = useApp();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  
  const allBlogs = data?.blogs || [];
  const filteredBlogs = searchQuery 
    ? allBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery) || 
        blog.excerpt.toLowerCase().includes(searchQuery)
      )
    : allBlogs;

  return (
    <Layout>
      <PageHeader 
        title={searchQuery ? `Search Results: ${searchQuery}` : "Travel Guides & Stories"} 
        subtitle={searchQuery ? `Found ${filteredBlogs.length} articles matching your search.` : "Get inspired for your next trip with our expert travel guides, tips, and stories from around the globe."}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 group flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</div>
                      <div className="flex items-center gap-1"><User size={14} /> Admin</div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                      {blog.excerpt}
                    </p>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500 mb-8">We couldn't find any articles matching "{searchQuery}". Try a different search term.</p>
              <Link to="/blog" className="text-primary font-bold hover:underline">View all articles</Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
