import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, Settings } from './types';
import { api } from './api';

interface AppContextType {
  data: AppData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  isAdmin: boolean;
  setAdmin: (val: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (val: boolean) => void;
  selectedPackageId: string | null;
  setSelectedPackageId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      setError(null);
      const appData = await api.getData();
      setData(appData);
      
      // Update CSS variables based on settings
      if (appData.settings) {
        document.documentElement.style.setProperty('--primary-color', appData.settings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', appData.settings.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', appData.settings.accentColor);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load travel data. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    const token = localStorage.getItem('adminToken');
    if (token) setIsAdmin(true);
  }, []);

  return (
    <AppContext.Provider value={{ 
      data, 
      loading, 
      error,
      refreshData, 
      isAdmin, 
      setAdmin: setIsAdmin,
      isBookingModalOpen,
      setIsBookingModalOpen,
      selectedPackageId,
      setSelectedPackageId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
