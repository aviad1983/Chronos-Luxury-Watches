
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WatchCard from './components/WatchCard';
import WatchModal from './components/WatchModal';
import CartDrawer from './components/CartDrawer';
import AIConcierge from './components/AIConcierge';
import { WATCHES } from './constants';
import { Watch, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  const addToCart = (watch: Watch) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === watch.id);
      if (existing) {
        return prev.map(item => item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...watch, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredWatches = filter === 'All' 
    ? WATCHES 
    : WATCHES.filter(w => w.category === filter);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500/30">
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 scale-105 animate-[pulse_10s_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-amber-500 uppercase tracking-[0.4em] text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">The Art of Time</p>
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Chronos Boutique
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-light max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            אוצרות של זמן, יופי והנדסה מדויקת. גלו את הקולקציה הייחודית של השעונים המבוקשים ביותר בעולם.
          </p>
          <button 
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent border border-white/30 hover:border-amber-500 px-10 py-4 uppercase text-sm font-bold tracking-[0.2em] transition-all hover:bg-amber-600 hover:text-white"
          >
            גלו את הקולקציה
          </button>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <i className="fa-solid fa-chevron-down text-2xl"></i>
        </div>
      </header>

      {/* Filter Section */}
      <section id="collection" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-playfair font-bold mb-4">הקולקציה שלנו</h2>
            <div className="h-1 w-20 bg-amber-600"></div>
          </div>
          <div className="flex flex-wrap gap-4 uppercase text-[10px] tracking-widest font-bold">
            {['All', 'Classic', 'Sport', 'Luxury', 'Vintage'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 border ${filter === f ? 'bg-amber-600 border-amber-600 text-white' : 'border-white/10 text-zinc-500 hover:border-white/30 transition-all'}`}
              >
                {f === 'All' ? 'הכל' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map(watch => (
            <WatchCard 
              key={watch.id} 
              watch={watch} 
              onAddToCart={addToCart} 
              onViewDetails={setSelectedWatch} 
            />
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-zinc-900 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-6">היו הראשונים לדעת</h2>
          <p className="text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
            הירשמו למועדון הלקוחות שלנו לקבלת עדכונים על דגמים נדירים, אירועי מכירה והטבות בלעדיות.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="כתובת אימייל" 
              className="flex-1 bg-black border border-white/10 px-6 py-4 outline-none focus:border-amber-500 transition-colors"
            />
            <button className="bg-white text-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-amber-500 hover:text-white transition-all">
              הרשמה
            </button>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-playfair font-bold tracking-widest mb-6">CHRONOS</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              היעד המוביל לשעוני יוקרה מקוריים. אנחנו מאמינים ששעון הוא לא רק מכשיר למדידת זמן, אלא הצהרה על סגנון ומורשת.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">שירות לקוחות</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-amber-500 transition-colors">משלוחים והחזרות</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">אחריות ותיקונים</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">שאלות נפוצות</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">צור קשר</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">החברה שלנו</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-amber-500 transition-colors">עלינו</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">חנויות בוטיק</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">קריירה</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">מדיניות פרטיות</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">עקבו אחרינו</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-zinc-600 uppercase tracking-widest">
          &copy; 2024 Chronos Luxury Boutique. כל הזכויות שמורות.
        </div>
      </footer>

      {/* Overlays */}
      <WatchModal 
        watch={selectedWatch} 
        onClose={() => setSelectedWatch(null)} 
        onAddToCart={addToCart} 
      />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
        onUpdateQuantity={updateQuantity} 
      />
      <AIConcierge />
    </div>
  );
};

export default App;
