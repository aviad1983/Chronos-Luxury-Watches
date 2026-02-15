
import React from 'react';
import { Watch } from '../types';

interface WatchCardProps {
  watch: Watch;
  onAddToCart: (watch: Watch) => void;
  onViewDetails: (watch: Watch) => void;
}

const WatchCard: React.FC<WatchCardProps> = ({ watch, onAddToCart, onViewDetails }) => {
  return (
    <div className="group relative bg-[#111] border border-white/5 overflow-hidden transition-all duration-500 hover:border-amber-500/30">
      <div className="aspect-[4/5] overflow-hidden bg-zinc-900">
        <img 
          src={watch.image} 
          alt={watch.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={() => onViewDetails(watch)}
            className="bg-white text-black px-4 py-2 text-xs uppercase font-bold tracking-widest hover:bg-amber-500 hover:text-white transition-colors"
          >
            פרטים נוספים
          </button>
          <button 
            onClick={() => onAddToCart(watch)}
            className="bg-amber-600 text-white p-2 hover:bg-amber-500 transition-colors"
          >
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-semibold">{watch.brand}</p>
          <p className="text-sm font-bold">${watch.price.toLocaleString()}</p>
        </div>
        <h3 className="text-lg font-playfair font-medium tracking-wide text-white group-hover:text-amber-500 transition-colors">
          {watch.name}
        </h3>
        <p className="text-xs text-zinc-500 mt-2 line-clamp-1">{watch.description}</p>
      </div>
    </div>
  );
};

export default WatchCard;
