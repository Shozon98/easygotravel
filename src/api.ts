import { AppData, Settings } from "./types";

const API_BASE = "/api";

export const api = {
  async getData(): Promise<AppData> {
    try {
      const res = await fetch(`${API_BASE}/data`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error("API Error (getData):", error);
      throw error;
    }
  },
  async getSettings(): Promise<Settings> {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },
  async createBooking(booking: Omit<AppData['bookings'][0], 'id' | 'status' | 'createdAt'>) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    if (!res.ok) throw new Error("Failed to create booking");
    return res.json();
  },
  async createInquiry(inquiry: Omit<AppData['inquiries'][0], 'id' | 'status' | 'createdAt'>) {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });
    if (!res.ok) throw new Error("Failed to create inquiry");
    return res.json();
  },
  async createSubscriber(email: string) {
    const res = await fetch(`${API_BASE}/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Failed to subscribe");
    return res.json();
  },
  async adminLogin(credentials: any) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },
  async adminUpdate(key: string, data: any) {
    const res = await fetch(`${API_BASE}/admin/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, data }),
    });
    return res.json();
  }
};
