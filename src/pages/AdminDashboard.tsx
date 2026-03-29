import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { api } from '../api';
import { AppData, Booking, Inquiry, Subscriber } from '../types';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package as PackageIcon, 
  MapPin, 
  BookOpen, 
  MessageSquare, 
  Settings as SettingsIcon,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Save,
  Image as ImageIcon,
  ArrowRight,
  Users,
  Eye,
  RotateCcw,
  Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminDashboard = () => {
  const { data, refreshData } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [isEditing, setIsEditing] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);

  if (!data) return null;

  const tabs = [
    { id: 'bookings', name: 'Bookings', icon: LayoutDashboard },
    { id: 'packages', name: 'Packages', icon: PackageIcon },
    { id: 'destinations', name: 'Destinations', icon: MapPin },
    { id: 'blogs', name: 'Blog Posts', icon: BookOpen },
    { id: 'inquiries', name: 'Inquiries', icon: MessageSquare },
    { id: 'subscribers', name: 'Subscribers', icon: Users },
    { id: 'settings', name: 'Site Settings', icon: SettingsIcon },
  ];

  const handleUpdate = async (key: string, updatedList: any[]) => {
    await api.adminUpdate(key, updatedList);
    await refreshData();
    setIsEditing(null);
    setSelectedItems([]);
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async (action: 'delete' | 'restore' | 'permanent-delete') => {
    if (selectedItems.length === 0) return;
    
    const key = activeTab as keyof AppData;
    const currentList = [...(data[key] as any[])];
    
    let updatedList;
    if (action === 'delete') {
      updatedList = currentList.map(item => 
        selectedItems.includes(item.id) ? { ...item, deleted: true } : item
      );
    } else if (action === 'restore') {
      updatedList = currentList.map(item => 
        selectedItems.includes(item.id) ? { ...item, deleted: false } : item
      );
    } else {
      updatedList = currentList.filter(item => !selectedItems.includes(item.id));
    }

    await handleUpdate(key as string, updatedList);
  };

  const handleStatusUpdate = async (bookingId: string, status: 'confirmed' | 'canceled') => {
    const updatedBookings = data.bookings.map(b => 
      b.id === bookingId ? { ...b, status } : b
    );
    await handleUpdate('bookings', updatedBookings);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        const filteredBookings = data.bookings.filter(b => !!b.deleted === showDeleted);
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  {showDeleted ? 'Recycle Bin - Bookings' : 'Manage Bookings'}
                </h3>
                <button 
                  onClick={() => { setShowDeleted(!showDeleted); setSelectedItems([]); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    showDeleted ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {showDeleted ? 'Back to Active' : 'View Recycle Bin'}
                </button>
              </div>
              {selectedItems.length > 0 && (
                <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
                  {showDeleted ? (
                    <>
                      <button 
                        onClick={() => handleBulkAction('restore')}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <RotateCcw size={14} /> Restore Selected
                      </button>
                      <button 
                        onClick={() => handleBulkAction('permanent-delete')}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <Trash size={14} /> Delete Permanently
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleBulkAction('delete')}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <Trash2 size={14} /> Delete Selected
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 w-10">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                        checked={selectedItems.length === filteredBookings.length && filteredBookings.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedItems(filteredBookings.map(b => b.id));
                          else setSelectedItems([]);
                        }}
                      />
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Package</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No bookings found.</td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className={`hover:bg-slate-50 transition-colors ${selectedItems.includes(booking.id) ? 'bg-primary/5' : ''}`}>
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-slate-300 text-primary focus:ring-primary"
                            checked={selectedItems.includes(booking.id)}
                            onChange={() => toggleItemSelection(booking.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{booking.customerName || booking.name || 'N/A'}</div>
                          <div className="text-xs text-slate-500">{booking.customerEmail || booking.email || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-700">
                            {data.packages.find(p => p.id === booking.packageId)?.title || "Unknown"}
                          </div>
                          <div className="text-xs text-slate-500">{booking.travelDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                            booking.status === 'canceled' ? 'bg-red-100 text-red-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setViewingItem({ type: 'booking', data: booking })}
                              className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors" 
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            {!showDeleted && (
                              <>
                                <button 
                                  onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                  className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-green-100 transition-colors" 
                                  title="Confirm"
                                >
                                  Accept
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(booking.id, 'canceled')}
                                  className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors" 
                                  title="Cancel"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'inquiries':
        const filteredInquiries = data.inquiries.filter(i => !!i.deleted === showDeleted);
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  {showDeleted ? 'Recycle Bin - Inquiries' : 'User Messages'}
                </h3>
                <button 
                  onClick={() => { setShowDeleted(!showDeleted); setSelectedItems([]); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    showDeleted ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {showDeleted ? 'Back to Active' : 'View Recycle Bin'}
                </button>
              </div>
              {selectedItems.length > 0 && (
                <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
                  {showDeleted ? (
                    <>
                      <button 
                        onClick={() => handleBulkAction('restore')}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <RotateCcw size={14} /> Restore Selected
                      </button>
                      <button 
                        onClick={() => handleBulkAction('permanent-delete')}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <Trash size={14} /> Delete Permanently
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleBulkAction('delete')}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <Trash2 size={14} /> Delete Selected
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 w-10">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                        checked={selectedItems.length === filteredInquiries.length && filteredInquiries.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedItems(filteredInquiries.map(i => i.id));
                          else setSelectedItems([]);
                        }}
                      />
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">From</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No messages found.</td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className={`hover:bg-slate-50 transition-colors ${selectedItems.includes(inquiry.id) ? 'bg-primary/5' : ''}`}>
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-slate-300 text-primary focus:ring-primary"
                            checked={selectedItems.includes(inquiry.id)}
                            onChange={() => toggleItemSelection(inquiry.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{inquiry.name}</div>
                          <div className="text-xs text-slate-500">{inquiry.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600 max-w-md truncate">{inquiry.subject || inquiry.message}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            inquiry.status === 'read' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setViewingItem({ type: 'inquiry', data: inquiry })}
                            className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors" 
                            title="View Message"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'subscribers':
        const filteredSubscribers = (data.subscribers || []).filter(s => !!s.deleted === showDeleted);
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  {showDeleted ? 'Recycle Bin - Subscribers' : 'Newsletter Subscribers'}
                </h3>
                <button 
                  onClick={() => { setShowDeleted(!showDeleted); setSelectedItems([]); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    showDeleted ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {showDeleted ? 'Back to Active' : 'View Recycle Bin'}
                </button>
              </div>
              {selectedItems.length > 0 && (
                <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
                  {showDeleted ? (
                    <>
                      <button 
                        onClick={() => handleBulkAction('restore')}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <RotateCcw size={14} /> Restore Selected
                      </button>
                      <button 
                        onClick={() => handleBulkAction('permanent-delete')}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <Trash size={14} /> Delete Permanently
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleBulkAction('delete')}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <Trash2 size={14} /> Delete Selected
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 w-10">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                        checked={selectedItems.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedItems(filteredSubscribers.map(s => s.id));
                          else setSelectedItems([]);
                        }}
                      />
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400">No subscribers found.</td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <tr key={sub.id} className={`hover:bg-slate-50 transition-colors ${selectedItems.includes(sub.id) ? 'bg-primary/5' : ''}`}>
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-slate-300 text-primary focus:ring-primary"
                            checked={selectedItems.includes(sub.id)}
                            onChange={() => toggleItemSelection(sub.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{sub.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900">Site Customization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <h4 className="font-bold text-slate-900 flex items-center gap-2"><SettingsIcon size={20} className="text-primary" /> General</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Site Name</label>
                    <input 
                      type="text" 
                      defaultValue={data.settings.siteName}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue={data.settings.contactEmail}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <h4 className="font-bold text-slate-900 flex items-center gap-2"><ImageIcon size={20} className="text-primary" /> Branding & Colors</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary</label>
                    <input type="color" defaultValue={data.settings.primaryColor} className="w-full h-12 rounded-xl cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Secondary</label>
                    <input type="color" defaultValue={data.settings.secondaryColor} className="w-full h-12 rounded-xl cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Accent</label>
                    <input type="color" defaultValue={data.settings.accentColor} className="w-full h-12 rounded-xl cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-8 py-4 rounded-2xl gradient-primary text-white font-bold flex items-center gap-2 shadow-lg shadow-primary/30">
                <Save size={20} /> Save Changes
              </button>
            </div>
          </div>
        );
      default:
        return <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">Management for {activeTab} is coming soon.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
              <SettingsIcon size={18} />
            </div>
            <span className="font-bold text-slate-900">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <tab.icon size={20} />
              {tab.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <ArrowRight className="rotate-180" size={20} />
            Go Back
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <XCircle size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Welcome back, Admin</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              View Site
            </button>
            <button className="px-6 py-3 rounded-xl gradient-primary text-white font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2">
              <Plus size={18} /> New Package
            </button>
          </div>
        </header>

        {renderContent()}

      {/* Detail View Modal */}
      <AnimatePresence>
        {viewingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingItem(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {viewingItem.type === 'booking' ? 'Booking Details' : 'Inquiry Details'}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {viewingItem.data.id}</p>
                  </div>
                  <button 
                    onClick={() => setViewingItem(null)}
                    className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {viewingItem.type === 'booking' ? (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer Name</label>
                          <p className="font-bold text-slate-900">{viewingItem.data.customerName || viewingItem.data.name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
                          <p className="font-bold text-slate-900">{viewingItem.data.customerEmail || viewingItem.data.email || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone Number</label>
                          <p className="font-bold text-slate-900">{viewingItem.data.customerPhone || viewingItem.data.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Travel Date</label>
                          <p className="font-bold text-slate-900">{viewingItem.data.travelDate || viewingItem.data.date || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Travelers</label>
                          <p className="font-bold text-slate-900">{viewingItem.data.travelers}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</label>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            viewingItem.data.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                            viewingItem.data.status === 'canceled' ? 'bg-red-100 text-red-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>
                            {viewingItem.data.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package</label>
                        <p className="font-bold text-slate-900">
                          {data.packages.find(p => p.id === viewingItem.data.packageId)?.title || "Unknown Package"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Special Requests</label>
                        <div className="p-4 bg-slate-50 rounded-2xl text-sm text-slate-600 italic">
                          {viewingItem.data.specialRequests || "No special requests."}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Name</label>
                          <p className="font-bold text-slate-900">{viewingItem.data.name}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</label>
                          <p className="font-bold text-slate-900">{viewingItem.data.email}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Received</label>
                          <p className="font-bold text-slate-900">{new Date(viewingItem.data.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</label>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            viewingItem.data.status === 'read' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {viewingItem.data.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Message</label>
                        <div className="p-6 bg-slate-50 rounded-3xl text-sm text-slate-600 leading-relaxed">
                          {viewingItem.data.message}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-10">
                  <button 
                    onClick={() => setViewingItem(null)}
                    className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
    </div>
  );
};
