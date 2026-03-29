import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Ensure data directory and db file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const INITIAL_DATA = {
  destinations: [
    { id: "1", name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", description: "Tropical paradise with beautiful beaches and vibrant culture.", slug: "bali-indonesia", places: ["Uluwatu Temple", "Tegalalang Rice Terrace", "Nusa Penida", "Ubud Monkey Forest", "Mount Batur", "Seminyak Beach"] },
    { id: "2", name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800", description: "Stunning sunsets and iconic white-washed buildings.", slug: "santorini-greece", places: ["Oia Village", "Fira Town", "Red Beach", "Akrotiri Ruins", "Perissa Beach", "Imerovigli"] },
    { id: "3", name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800", description: "Traditional temples, gardens, and cherry blossoms.", slug: "kyoto-japan", places: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kinkaku-ji", "Gion District", "Kiyomizu-dera", "Nishiki Market"] },
    { id: "4", name: "Swiss Alps, Switzerland", image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800", description: "Breathtaking mountain scenery and world-class skiing.", slug: "swiss-alps", places: ["Jungfraujoch", "Zermatt", "Lake Lucerne", "Interlaken", "Grindelwald", "St. Moritz"] },
    { id: "5", name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", description: "Luxury overwater bungalows and crystal clear waters.", slug: "maldives", places: ["Male City", "Maafushi Island", "Baa Atoll", "Ari Atoll", "Vaadhoo Island", "Banana Reef"] },
    { id: "6", name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", description: "The city of light, art, and romance.", slug: "paris-france", places: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre", "Champs-Élysées", "Seine River"] },
    { id: "7", name: "Amalfi Coast, Italy", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800", description: "Dramatic coastline and charming seaside towns.", slug: "amalfi-coast", places: ["Positano", "Amalfi Town", "Ravello", "Capri Island", "Sorrento", "Praiano"] },
    { id: "8", name: "Reykjavik, Iceland", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800", description: "Land of fire and ice with stunning natural wonders.", slug: "reykjavik-iceland", places: ["Blue Lagoon", "Golden Circle", "Hallgrimskirkja", "Skogafoss", "Vik Village", "Diamond Beach"] },
    { id: "9", name: "Cairo, Egypt", image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800", description: "Ancient pyramids and rich historical heritage.", slug: "cairo-egypt", places: ["Giza Pyramids", "Egyptian Museum", "Khan el-Khalili", "Saladin Citadel", "Al-Azhar Mosque", "Nile River"] },
    { id: "10", name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800", description: "The city that never sleeps, full of energy and landmarks.", slug: "new-york-usa", places: ["Times Square", "Central Park", "Statue of Liberty", "Empire State Building", "Brooklyn Bridge", "High Line"] }
  ],
  packages: [
    { 
      id: "1", 
      title: "Bali Adventure", 
      destinationId: "1", 
      price: 1299, 
      duration: "7 Days", 
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Uluwatu Temple", "Tegalalang Rice Terrace", "Scuba Diving"],
      itinerary: [
        { day: 1, activity: "Arrival and check-in at Seminyak" },
        { day: 2, activity: "Uluwatu Temple and Kecak Dance" },
        { day: 3, activity: "Ubud cultural tour" },
        { day: 4, activity: "Rice terrace trekking" },
        { day: 5, activity: "Water sports in Nusa Dua" },
        { day: 6, activity: "Free day for shopping" },
        { day: 7, activity: "Departure" }
      ],
      featured: true,
      slug: "bali-adventure"
    },
    { 
      id: "11", 
      title: "Bali Luxury Retreat", 
      destinationId: "1", 
      price: 2499, 
      duration: "5 Days", 
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Private Villa", "Spa Treatment", "Fine Dining"],
      itinerary: [
        { day: 1, activity: "Arrival and private transfer" },
        { day: 2, activity: "Luxury spa and wellness" },
        { day: 3, activity: "Private yacht tour" },
        { day: 4, activity: "Romantic dinner" },
        { day: 5, activity: "Departure" }
      ],
      featured: false,
      slug: "bali-luxury"
    },
    { 
      id: "2", 
      title: "Santorini Escape", 
      destinationId: "2", 
      price: 1899, 
      duration: "5 Days", 
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Oia Sunset", "Volcano Boat Trip", "Wine Tasting"],
      itinerary: [
        { day: 1, activity: "Arrival in Fira" },
        { day: 2, activity: "Oia village exploration" },
        { day: 3, activity: "Caldera boat tour" },
        { day: 4, activity: "Wine tasting and Akrotiri" },
        { day: 5, activity: "Departure" }
      ],
      featured: true,
      slug: "santorini-escape"
    },
    { 
      id: "22", 
      title: "Santorini Honeymoon", 
      destinationId: "2", 
      price: 2999, 
      duration: "7 Days", 
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Sunset Dinner", "Private Pool", "Island Hopping"],
      itinerary: [
        { day: 1, activity: "Arrival and welcome drink" },
        { day: 2, activity: "Private island tour" },
        { day: 3, activity: "Sunset dinner cruise" },
        { day: 4, activity: "Beach relaxation" },
        { day: 5, activity: "Spa day" },
        { day: 6, activity: "Shopping in Fira" },
        { day: 7, activity: "Departure" }
      ],
      featured: false,
      slug: "santorini-honeymoon"
    },
    { 
      id: "3", 
      title: "Japan Highlights", 
      destinationId: "3", 
      price: 2499, 
      duration: "10 Days", 
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Fushimi Inari", "Arashiyama Bamboo Grove", "Gion District"],
      itinerary: [
        { day: 1, activity: "Arrival in Kyoto" },
        { day: 2, activity: "Kinkaku-ji and Ryoan-ji" },
        { day: 3, activity: "Fushimi Inari Shrine" },
        { day: 4, activity: "Arashiyama Bamboo Grove" },
        { day: 5, activity: "Gion District tour" },
        { day: 6, activity: "Nara day trip" },
        { day: 7, activity: "Tea ceremony experience" },
        { day: 8, activity: "Free day" },
        { day: 9, activity: "Farewell dinner" },
        { day: 10, activity: "Departure" }
      ],
      featured: true,
      slug: "japan-highlights"
    },
    { 
      id: "33", 
      title: "Kyoto Zen Experience", 
      destinationId: "3", 
      price: 1599, 
      duration: "4 Days", 
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Meditation", "Temple Stay", "Tea Ceremony"],
      itinerary: [
        { day: 1, activity: "Arrival and temple check-in" },
        { day: 2, activity: "Zen meditation and gardens" },
        { day: 3, activity: "Traditional tea ceremony" },
        { day: 4, activity: "Departure" }
      ],
      featured: false,
      slug: "kyoto-zen"
    },
    { 
      id: "4", 
      title: "Swiss Alpine Magic", 
      destinationId: "4", 
      price: 2199, 
      duration: "6 Days", 
      image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Jungfraujoch", "Lucerne Lake", "Zermatt Village"],
      itinerary: [
        { day: 1, activity: "Arrival in Zurich" },
        { day: 2, activity: "Lucerne exploration" },
        { day: 3, activity: "Jungfraujoch - Top of Europe" },
        { day: 4, activity: "Interlaken activities" },
        { day: 5, activity: "Zermatt and Matterhorn views" },
        { day: 6, activity: "Departure" }
      ],
      featured: true,
      slug: "swiss-alpine-magic"
    },
    { 
      id: "5", 
      title: "Maldives Luxury Retreat", 
      destinationId: "5", 
      price: 3499, 
      duration: "5 Days", 
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Overwater Villa", "Snorkeling", "Sunset Cruise"],
      itinerary: [
        { day: 1, activity: "Arrival and speedboat transfer" },
        { day: 2, activity: "Snorkeling and coral reef tour" },
        { day: 3, activity: "Spa and wellness day" },
        { day: 4, activity: "Private beach dinner" },
        { day: 5, activity: "Departure" }
      ],
      featured: false,
      slug: "maldives-luxury"
    },
    { 
      id: "6", 
      title: "Paris Romance", 
      destinationId: "6", 
      price: 1599, 
      duration: "4 Days", 
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
      itinerary: [
        { day: 1, activity: "Arrival and hotel check-in" },
        { day: 2, activity: "Eiffel Tower and Louvre" },
        { day: 3, activity: "Seine River Cruise and Montmartre" },
        { day: 4, activity: "Departure" }
      ],
      featured: true,
      slug: "paris-romance"
    },
    { 
      id: "7", 
      title: "Amalfi Coast Explorer", 
      destinationId: "7", 
      price: 1799, 
      duration: "6 Days", 
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Positano", "Ravello", "Capri Island"],
      itinerary: [
        { day: 1, activity: "Arrival in Naples" },
        { day: 2, activity: "Positano exploration" },
        { day: 3, activity: "Amalfi town and Ravello" },
        { day: 4, activity: "Capri Island day trip" },
        { day: 5, activity: "Path of the Gods hike" },
        { day: 6, activity: "Departure" }
      ],
      featured: false,
      slug: "amalfi-explorer"
    },
    { 
      id: "8", 
      title: "Icelandic Wonders", 
      destinationId: "8", 
      price: 2299, 
      duration: "7 Days", 
      image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Blue Lagoon", "Golden Circle", "Northern Lights"],
      itinerary: [
        { day: 1, activity: "Arrival and Blue Lagoon" },
        { day: 2, activity: "Golden Circle tour" },
        { day: 3, activity: "South Coast waterfalls" },
        { day: 4, activity: "Jokulsarlon Glacier Lagoon" },
        { day: 5, activity: "Reykjavik city tour" },
        { day: 6, activity: "Northern Lights hunt" },
        { day: 7, activity: "Departure" }
      ],
      featured: true,
      slug: "icelandic-wonders"
    },
    { 
      id: "9", 
      title: "Egyptian Odyssey", 
      destinationId: "9", 
      price: 1499, 
      duration: "8 Days", 
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Pyramids of Giza", "Nile Cruise", "Luxor Temples"],
      itinerary: [
        { day: 1, activity: "Arrival in Cairo" },
        { day: 2, activity: "Giza Pyramids and Sphinx" },
        { day: 3, activity: "Egyptian Museum" },
        { day: 4, activity: "Fly to Luxor, board Nile cruise" },
        { day: 5, activity: "Valley of the Kings" },
        { day: 6, activity: "Edfu and Kom Ombo temples" },
        { day: 7, activity: "Aswan and Philae Temple" },
        { day: 8, activity: "Departure" }
      ],
      featured: false,
      slug: "egyptian-odyssey"
    },
    { 
      id: "10", 
      title: "NYC City Break", 
      destinationId: "10", 
      price: 1199, 
      duration: "4 Days", 
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800", 
      highlights: ["Times Square", "Central Park", "Empire State Building"],
      itinerary: [
        { day: 1, activity: "Arrival and Times Square" },
        { day: 2, activity: "Central Park and Museums" },
        { day: 3, activity: "Statue of Liberty and 9/11 Memorial" },
        { day: 4, activity: "Departure" }
      ],
      featured: false,
      slug: "nyc-city-break"
    }
  ],
  blogs: [
    { id: "1", title: "Top 10 Things to do in Bali", excerpt: "Discover the best activities and hidden gems in Bali.", content: "Full content here...", image: "https://picsum.photos/seed/bali-blog/800/600", date: "2024-03-20", slug: "top-10-bali" },
    { id: "2", title: "A Guide to Santorini Sunsets", excerpt: "Where to find the most breathtaking views in Santorini.", content: "Full content here...", image: "https://picsum.photos/seed/santorini-blog/800/600", date: "2024-03-15", slug: "santorini-sunsets" },
    { id: "3", title: "Traveling Japan on a Budget", excerpt: "How to experience the best of Japan without breaking the bank.", content: "Full content here...", image: "https://picsum.photos/seed/japan-blog/800/600", date: "2024-03-10", slug: "japan-budget" }
  ],
  testimonials: [
    { id: "1", name: "John Doe", feedback: "EasyGo Travel made our honeymoon unforgettable! Everything was perfectly planned.", image: "https://i.pravatar.cc/150?u=john", rating: 5 },
    { id: "2", name: "Jane Smith", feedback: "The best travel agency I've ever used. Great prices and amazing support.", image: "https://i.pravatar.cc/150?u=jane", rating: 5 },
    { id: "3", name: "Mike Johnson", feedback: "Loved the curated experience in Japan. Highly recommend their packages.", image: "https://i.pravatar.cc/150?u=mike", rating: 4 },
    { id: "4", name: "Sarah Williams", feedback: "Breathtaking views and seamless logistics. Will definitely book again!", image: "https://i.pravatar.cc/150?u=sarah", rating: 5 },
    { id: "5", name: "David Brown", feedback: "Excellent service from start to finish. The local guides were fantastic.", image: "https://i.pravatar.cc/150?u=david", rating: 5 },
    { id: "6", name: "Emily Davis", feedback: "A truly magical experience in Santorini. Thank you for the memories!", image: "https://i.pravatar.cc/150?u=emily", rating: 5 },
    { id: "7", name: "Chris Wilson", feedback: "Well-organized and very professional. Highly recommended for families.", image: "https://i.pravatar.cc/150?u=chris", rating: 4 },
    { id: "8", name: "Jessica Taylor", feedback: "The attention to detail was impressive. Every day was a new adventure.", image: "https://i.pravatar.cc/150?u=jessica", rating: 5 },
    { id: "9", name: "Mark Anderson", feedback: "Great value for money. The accommodations were top-notch.", image: "https://i.pravatar.cc/150?u=mark", rating: 5 },
    { id: "10", name: "Laura Martinez", feedback: "I felt safe and well-cared for throughout my solo trip to Bali.", image: "https://i.pravatar.cc/150?u=laura", rating: 5 },
    { id: "11", name: "Robert Garcia", feedback: "The best way to see the Swiss Alps. Everything was taken care of.", image: "https://i.pravatar.cc/150?u=robert", rating: 5 },
    { id: "12", name: "Sophia Lee", feedback: "Incredible cultural immersion in Kyoto. A life-changing trip.", image: "https://i.pravatar.cc/150?u=sophia", rating: 5 }
  ],
  offers: [
    { id: "1", title: "Early Bird Special", description: "Book 3 months in advance and get 15% off!", code: "EARLY15", expiry: "2024-12-31" },
    { id: "2", title: "Summer Sale", description: "Up to 20% off on all beach destinations.", code: "SUMMER20", expiry: "2024-08-31" }
  ],
  bookings: [
    { id: "b1", customerName: "Alice Cooper", customerEmail: "alice@example.com", customerPhone: "123-456-7890", packageId: "1", travelDate: "2024-06-15", travelers: 2, specialRequests: "Vegetarian meals please.", status: "confirmed", createdAt: new Date().toISOString() },
    { id: "b2", customerName: "Bob Marley", customerEmail: "bob@example.com", customerPhone: "098-765-4321", packageId: "2", travelDate: "2024-07-20", travelers: 1, specialRequests: "Late check-in.", status: "pending", createdAt: new Date().toISOString() }
  ],
  inquiries: [
    { id: "i1", name: "Tom Hardy", email: "tom@example.com", message: "Do you offer group discounts for 10+ people?", status: "new", createdAt: new Date().toISOString() },
    { id: "i2", name: "Emma Stone", email: "emma@example.com", message: "Is the Bali tour suitable for children under 5?", status: "read", createdAt: new Date().toISOString() }
  ],
  subscribers: [
    { id: "s1", email: "subscriber1@example.com", createdAt: new Date().toISOString() }
  ],
  settings: {
    siteName: "EasyGo Travel",
    primaryColor: "#0ea5e9", // sky-500
    secondaryColor: "#f97316", // orange-500
    accentColor: "#14b8a6", // teal-500
    fontFamily: "Inter",
    logo: "",
    contactEmail: "info@easygotravel.com",
    contactPhone: "+1 (555) 123-4567",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com"
    }
  }
};

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2));
}

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/data", (req, res) => {
    res.json(readDB());
  });

  app.get("/api/destinations", (req, res) => {
    res.json(readDB().destinations);
  });

  app.get("/api/packages", (req, res) => {
    res.json(readDB().packages);
  });

  app.get("/api/blogs", (req, res) => {
    res.json(readDB().blogs);
  });

  app.get("/api/testimonials", (req, res) => {
    res.json(readDB().testimonials);
  });

  app.get("/api/offers", (req, res) => {
    res.json(readDB().offers);
  });

  app.get("/api/settings", (req, res) => {
    res.json(readDB().settings);
  });

  app.post("/api/bookings", (req, res) => {
    const db = readDB();
    const newBooking = { id: Date.now().toString(), ...req.body, status: "pending", createdAt: new Date().toISOString() };
    db.bookings.push(newBooking);
    writeDB(db);
    res.status(201).json(newBooking);
  });

  app.post("/api/inquiries", (req, res) => {
    const db = readDB();
    const newInquiry = { id: Date.now().toString(), ...req.body, status: "new", createdAt: new Date().toISOString() };
    db.inquiries.push(newInquiry);
    writeDB(db);
    res.status(201).json(newInquiry);
  });

  app.post("/api/subscribers", (req, res) => {
    const db = readDB();
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!db.subscribers) db.subscribers = [];
    const newSubscriber = { id: Date.now().toString(), email, createdAt: new Date().toISOString() };
    db.subscribers.push(newSubscriber);
    writeDB(db);
    res.status(201).json(newSubscriber);
  });

  // Admin CRUD (Simplified for demo)
  app.post("/api/admin/update", (req, res) => {
    const { key, data } = req.body;
    const db = readDB();
    if (db[key]) {
      db[key] = data;
      writeDB(db);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid key" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
      res.json({ success: true, token: "mock-jwt-token" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicit SPA fallback for development just in case
    app.get("*", async (req, res, next) => {
      if (req.url.startsWith('/api')) return next();
      try {
        const template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        const html = await vite.transformIndexHtml(req.url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
