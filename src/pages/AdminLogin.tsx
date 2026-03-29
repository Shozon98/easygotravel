import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAdmin } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.adminLogin({ username, password });
      if (res.success) {
        localStorage.setItem('adminToken', res.token);
        setAdmin(true);
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Admin Login</h2>
            <p className="text-slate-500 mt-2">Access the EasyGo Travel dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl gradient-primary text-white font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Demo Credentials: <span className="font-bold">admin / admin123</span>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
