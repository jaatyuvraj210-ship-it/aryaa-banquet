/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Star, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  ArrowRight,
  Utensils,
  Wind,
  Lightbulb,
  Armchair,
  Award,
  Lock,
  LogOut,
  Trash2,
  Download
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---

interface Booking {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  timestamp: number;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12",
      isScrolled ? "bg-rich-black/90 backdrop-blur-md border-b border-gold/20 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl md:text-3xl font-serif font-bold tracking-tighter text-gold">
          ARYAA<span className="text-white">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#booking"
            className="bg-gold hover:bg-gold-dark text-rich-black px-6 py-2.5 text-sm font-bold uppercase tracking-widest transition-all"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-rich-black border-b border-gold/20 p-8 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif tracking-wide hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-gold text-rich-black py-4 text-center font-bold uppercase tracking-widest"
            >
              Check Availability
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-16 text-center">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={cn(
        "text-4xl md:text-5xl font-serif font-bold",
        light ? "text-white" : "text-rich-black"
      )}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="h-1 bg-gold mx-auto mt-6"
    />
  </div>
);

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    eventType: 'Wedding',
    date: '',
    guests: ''
  });

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('aryaa_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      ...bookingForm,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('aryaa_bookings', JSON.stringify(updatedBookings));

    alert("Thank you for your interest! We will check availability for your date and get back to you shortly.");
    setBookingForm({
      name: '',
      phone: '',
      eventType: 'Wedding',
      date: '',
      guests: ''
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'aryaa' && loginForm.password === '8368330992') {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const deleteBooking = (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('aryaa_bookings', JSON.stringify(updated));
    }
  };

  const exportBookings = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "aryaa_bookings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-rich-black text-white font-sans selection:bg-gold selection:text-rich-black">
        <nav className="border-b border-gold/20 p-6 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="text-2xl font-serif font-bold tracking-tighter text-gold">
            ARYAA <span className="text-white text-sm uppercase tracking-widest font-sans ml-2">Admin Panel</span>
          </div>
          <button 
            onClick={() => setIsAdminMode(false)}
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold"
          >
            <ArrowRight className="rotate-180" size={18} /> Back to Site
          </button>
        </nav>

        {!isLoggedIn ? (
          <div className="max-w-md mx-auto mt-24 px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 border border-gold/20 p-10 shadow-2xl"
            >
              <div className="text-center mb-8">
                <Lock className="text-gold mx-auto mb-4" size={40} />
                <h2 className="text-3xl font-serif font-bold">Admin Login</h2>
                <p className="text-zinc-500 text-sm mt-2">Enter credentials to access booking data</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Username</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-rich-black border border-white/10 text-white p-4 focus:border-gold focus:ring-0 outline-none transition-colors"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Password</label>
                  <input 
                    type="password" 
                    required
                    className="w-full bg-rich-black border border-white/10 text-white p-4 focus:border-gold focus:ring-0 outline-none transition-colors"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-rich-black py-4 font-bold uppercase tracking-widest transition-all"
                >
                  Login
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-2">Booking Dashboard</h2>
                <p className="text-zinc-500">Manage all event inquiries and customer data</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={exportBookings}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                  <Download size={18} /> Export JSON
                </button>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900 p-8 border border-white/5">
                <span className="text-zinc-500 text-xs uppercase tracking-widest block mb-2">Total Bookings</span>
                <span className="text-5xl font-serif font-bold text-gold">{bookings.length}</span>
              </div>
              <div className="bg-zinc-900 p-8 border border-white/5">
                <span className="text-zinc-500 text-xs uppercase tracking-widest block mb-2">Recent (24h)</span>
                <span className="text-5xl font-serif font-bold text-gold">
                  {bookings.filter(b => Date.now() - b.timestamp < 86400000).length}
                </span>
              </div>
              <div className="bg-zinc-900 p-8 border border-white/5">
                <span className="text-zinc-500 text-xs uppercase tracking-widest block mb-2">Weddings</span>
                <span className="text-5xl font-serif font-bold text-gold">
                  {bookings.filter(b => b.eventType === 'Wedding').length}
                </span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-rich-black border-b border-white/10">
                    <th className="p-6 text-xs uppercase tracking-widest text-zinc-500 font-bold">Customer</th>
                    <th className="p-6 text-xs uppercase tracking-widest text-zinc-500 font-bold">Event Details</th>
                    <th className="p-6 text-xs uppercase tracking-widest text-zinc-500 font-bold">Date & Guests</th>
                    <th className="p-6 text-xs uppercase tracking-widest text-zinc-500 font-bold">Submitted</th>
                    <th className="p-6 text-xs uppercase tracking-widest text-zinc-500 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-zinc-500 italic">No bookings found yet.</td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="p-6">
                          <div className="font-bold text-white">{booking.name}</div>
                          <div className="text-zinc-500 text-sm">{booking.phone}</div>
                        </td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full">
                            {booking.eventType}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="text-white">{booking.date}</div>
                          <div className="text-zinc-500 text-sm">{booking.guests} Guests</div>
                        </td>
                        <td className="p-6 text-zinc-500 text-sm">
                          {new Date(booking.timestamp).toLocaleDateString()}
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            onClick={() => deleteBooking(booking.id)}
                            className="text-zinc-500 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Banquet Hall" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-rich-black" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-6 block">
              Where Elegance Meets Celebration
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight">
              Aryaa Banquet Hall
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 font-light tracking-wide">
              Premium Venue for Weddings, Parties & Grand Events in Delhi. 
              Creating memories that last a lifetime in the heart of the city.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="#booking" 
                className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-rich-black px-10 py-4 font-bold uppercase tracking-widest transition-all transform hover:scale-105"
              >
                Check Availability
              </a>
              <a 
                href="tel:09810252028" 
                className="w-full sm:w-auto border border-white/30 hover:border-gold hover:text-gold px-10 py-4 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
              >
                <Phone size={18} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white text-rich-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" 
                  alt="Banquet Interior" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden lg:block w-64 h-64 border-8 border-gold bg-rich-black p-4">
                <div className="h-full w-full flex flex-col items-center justify-center text-center">
                  <Award className="text-gold mb-2" size={40} />
                  <span className="text-gold font-serif text-2xl font-bold">15+ Years</span>
                  <span className="text-zinc-400 text-xs uppercase tracking-widest">Of Excellence</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                Luxury Redefined Near DTU, Delhi
              </h2>
              <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                Aryaa Banquet Hall stands as a beacon of sophistication in North Delhi. Conveniently located near DTU, we offer a seamless blend of traditional hospitality and modern luxury. 
              </p>
              <p className="text-zinc-600 text-lg mb-10 leading-relaxed">
                Whether it's a grand wedding or an intimate corporate gathering, our dedicated team ensures every detail is meticulously curated to reflect your personal style and vision.
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  "Prime location with ample parking",
                  "Exquisite interior design and lighting",
                  "World-class catering services",
                  "Dedicated event planning support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-800 font-medium">
                    <CheckCircle2 className="text-gold" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-2 text-rich-black font-bold uppercase tracking-widest group">
                Learn More <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-rich-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="A Glimpse of Grandeur" subtitle="Gallery" light />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=600"
            ].map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden aspect-square"
              >
                <img 
                  src={src} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Unmatched Amenities" subtitle="Features" light />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Wind, title: "Fully Air-Conditioned", desc: "Maintain the perfect temperature for your guests regardless of the season." },
              { icon: Lightbulb, title: "Elegant Lighting", desc: "Customizable ambient lighting to set the perfect mood for your celebration." },
              { icon: Utensils, title: "Premium Catering", desc: "A wide array of cuisines prepared by world-class chefs for a gourmet experience." },
              { icon: Armchair, title: "Spacious Seating", desc: "Flexible seating arrangements that can accommodate hundreds of guests comfortably." },
              { icon: MapPin, title: "Prime Location", desc: "Easily accessible venue near DTU with excellent connectivity across Delhi." },
              { icon: Users, title: "Professional Staff", desc: "Highly trained hospitality professionals dedicated to making your event flawless." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-rich-black border border-white/5 hover:border-gold/50 transition-colors group"
              >
                <feature.icon className="text-gold mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-serif font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="services" className="py-24 bg-white text-rich-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Events We Host" subtitle="Celebrations" />
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Weddings", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" },
              { title: "Birthday Parties", img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=400" },
              { title: "Corporate Events", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400" },
              { title: "Engagement & Reception", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400" }
            ].map((event, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="relative h-[400px] overflow-hidden group cursor-pointer"
              >
                <img 
                  src={event.img} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h3 className="text-white text-2xl font-serif font-bold">{event.title}</h3>
                  <div className="w-12 h-1 bg-gold mt-4 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-rich-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Our Premium Packages" subtitle="Pricing" light />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Intimate Gathering", price: "50,000", features: ["Up to 100 Guests", "Standard Decor", "Buffet Menu", "4 Hours Venue"] },
              { name: "Grand Celebration", price: "80,000", features: ["Up to 250 Guests", "Premium Decor", "Multi-cuisine Menu", "6 Hours Venue", "Basic AV Setup"], popular: true },
              { name: "Royal Wedding", price: "1,50,000", features: ["Up to 500 Guests", "Luxury Decor", "Signature Menu", "Full Day Venue", "Advanced AV & Lighting", "Valet Parking"] }
            ].map((pkg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "p-10 border flex flex-col",
                  pkg.popular ? "bg-zinc-900 border-gold scale-105 z-10" : "bg-transparent border-white/10"
                )}
              >
                {pkg.popular && <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Most Popular</span>}
                <h3 className="text-2xl font-serif font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-gold text-sm font-bold">₹</span>
                  <span className="text-4xl font-serif font-bold text-gold">{pkg.price}</span>
                  <span className="text-zinc-500 text-sm ml-2">Starting</span>
                </div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-zinc-400 text-sm">
                      <CheckCircle2 className="text-gold" size={16} /> {f}
                    </li>
                  ))}
                </ul>
                <a 
                  href="#booking"
                  className={cn(
                    "w-full py-4 text-center font-bold uppercase tracking-widest transition-all",
                    pkg.popular ? "bg-gold text-rich-black" : "border border-white/20 hover:border-gold hover:text-gold"
                  )}
                >
                  Enquire Now
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-zinc-500 mt-12 italic">Note: Custom packages available based on your specific requirements.</p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-serif font-bold mb-4">What Our Guests Say</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} />)}
                <span className="text-white font-bold ml-2">4.8 / 5</span>
                <span className="text-zinc-500 text-sm ml-2">(200+ Reviews)</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-rich-black p-4 border border-white/5">
                <span className="text-gold text-2xl font-bold block">20+</span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest">Happy Clients</span>
              </div>
              <div className="bg-rich-black p-4 border border-white/5">
                <span className="text-gold text-2xl font-bold block">500+</span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest">Events Hosted</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", text: "Hosted my sister's wedding here. The decor was beyond expectations and the food was delicious. Highly recommended!", event: "Wedding" },
              { name: "Priya Gupta", text: "Beautiful venue with very professional staff. They handled everything so smoothly that we could actually enjoy the party.", event: "Birthday Party" },
              { name: "Amit Verma", text: "Excellent location and great service. The air conditioning was perfect even in the peak Delhi summer.", event: "Corporate Event" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 bg-rich-black border border-white/5 relative"
              >
                <Star className="text-gold mb-6" size={24} fill="currentColor" />
                <p className="text-zinc-400 mb-8 italic leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <span className="text-gold text-xs uppercase tracking-widest">{review.event}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-white text-rich-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block">Reservation</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                Check Availability
              </h2>
              <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                Planning a grand event? Fill out the form and our event specialists will get back to you with a customized quote and availability details.
              </p>
              <div className="bg-gold/10 p-6 border-l-4 border-gold mb-8">
                <p className="text-gold font-bold flex items-center gap-2">
                  <Calendar size={20} /> Limited dates available for 2026 weddings!
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 p-3 text-gold">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Call for Instant Booking</h4>
                    <p className="text-zinc-600">+91 98102 52028</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 p-3 text-gold">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Visit Our Venue</h4>
                    <p className="text-zinc-600">Aryaa Banquet Hall, Vishal Palace, near DTU, Shahbad Daulatpur Village, Delhi – 110042</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-rich-black p-10 shadow-2xl"
            >
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name"
                      className="w-full bg-zinc-900 border-white/10 text-white p-4 focus:border-gold focus:ring-0 outline-none transition-colors"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Your Number"
                      className="w-full bg-zinc-900 border-white/10 text-white p-4 focus:border-gold focus:ring-0 outline-none transition-colors"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Event Type</label>
                    <select 
                      className="w-full bg-zinc-900 border-white/10 text-white p-4 focus:border-gold focus:ring-0 outline-none transition-colors"
                      value={bookingForm.eventType}
                      onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                    >
                      <option>Wedding</option>
                      <option>Birthday Party</option>
                      <option>Corporate Event</option>
                      <option>Engagement</option>
                      <option>Reception</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Event Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-zinc-900 border-white/10 text-white p-4 focus:border-gold focus:ring-0 outline-none transition-colors"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Guest Count</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input 
                      type="number" 
                      required
                      placeholder="Expected Guests"
                      className="w-full bg-zinc-900 border-white/10 text-white p-4 pl-12 focus:border-gold focus:ring-0 outline-none transition-colors"
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-rich-black py-5 font-bold uppercase tracking-widest transition-all mt-4"
                >
                  Check Availability
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-6 text-gold">Contact Details</h3>
                <div className="space-y-6">
                  <a href="tel:09810252028" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold transition-colors">
                      <Phone size={20} className="group-hover:text-rich-black" />
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs uppercase tracking-widest block">Phone</span>
                      <span className="font-bold">09810252028</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <div className="flex-grow">
                      <span className="text-zinc-500 text-xs uppercase tracking-widest block">Address</span>
                      <span className="font-bold text-sm block mb-2">Vishal Palace, near DTU, Shahbad Daulatpur Village, Delhi – 110042</span>
                      <a 
                        href="https://maps.app.goo.gl/et2BhA5WkEKi6Krj8" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1 relative z-30 cursor-pointer"
                        onClick={(e) => {
                          // Fallback for iframe environments
                          window.open("https://maps.app.goo.gl/et2BhA5WkEKi6Krj8", "_blank");
                          e.preventDefault();
                        }}
                      >
                        Get Directions <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold mb-6 text-gold">Connect with Us</h3>
                <a 
                  href="https://wa.me/919810252028?text=Hello,%20I%20want%20to%20book%20Aryaa%20Banquet%20Hall.%20Please%20share%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-8 py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={20} /> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 h-[500px] bg-rich-black border border-white/5 overflow-hidden relative group">
              {/* Google Maps Embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.028637494511!2d77.11651527550508!3d28.748574975599813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d011985955555%3A0x6900056900056900!2sAryaa%20Banquet%20Hall!5e0!3m2!1sen!2sin!4v1711600000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              <div className="absolute bottom-6 right-6 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  href="https://maps.app.goo.gl/et2BhA5WkEKi6Krj8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gold text-rich-black px-6 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl hover:bg-white transition-colors cursor-pointer"
                  onClick={(e) => {
                    // Fallback for iframe environments
                    window.open("https://maps.app.goo.gl/et2BhA5WkEKi6Krj8", "_blank");
                    e.preventDefault();
                  }}
                >
                  <MapPin size={16} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-rich-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-gold mb-4 block">
              ARYAA<span className="text-white">.</span>
            </a>
            <p className="text-zinc-500 text-sm">Now accepting bookings for 2026 weddings & events.</p>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors"><Star size={20} /></a>
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors"><Star size={20} /></a>
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors"><Star size={20} /></a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-zinc-600 text-xs uppercase tracking-widest">
              © 2026 Aryaa Banquet Hall. All Rights Reserved.
            </p>
            <button 
              onClick={() => setIsAdminMode(true)}
              className="text-zinc-800 hover:text-gold text-[10px] uppercase tracking-[0.2em] font-bold transition-colors flex items-center gap-2"
            >
              <Lock size={10} /> Admin Login
            </button>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        href="https://wa.me/919810252028?text=Hello,%20I%20want%20to%20book%20Aryaa%20Banquet%20Hall.%20Please%20share%20details."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
      >
        <MessageCircle size={32} />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
        </span>
      </motion.a>
    </div>
  );
}
