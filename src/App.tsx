import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import ScrollToTop from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { Packages } from './pages/Packages';
import { PackageDetail } from './pages/PackageDetail';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Offers } from './pages/Offers';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { DestinationDetail } from './pages/DestinationDetail';
import { Loader2 } from 'lucide-react';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useApp();
  
  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );
  
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AppRoutes = () => {
  const { loading, error, refreshData } = useApp();

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-red-50 text-red-600 p-8 rounded-3xl max-w-md shadow-xl shadow-red-100">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="mb-8 leading-relaxed">{error}</p>
        <button 
          onClick={() => refreshData()}
          className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:slug" element={<DestinationDetail />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/packages/:slug" element={<PackageDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      
      {/* Fallback routes for other pages requested */}
      <Route path="/privacy" element={<div className="py-24 text-center">Privacy Policy Placeholder</div>} />
      <Route path="/terms" element={<div className="py-24 text-center">Terms & Conditions Placeholder</div>} />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
