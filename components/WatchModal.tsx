
import React from 'react';
import { Watch } from '../types';

interface WatchModalProps {
  watch: Watch | null;
  onClose: () => void;
  onAddToCart: (watch: Watch) => void;
}

const WatchModal: React.FC<WatchModalProps> = ({ watch, onClose, onAddToCart }) => {
  if (!watch) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#111] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
        
        <div className="md:w-1/2 bg-zinc-900">
          <img src={watch.image} alt={watch.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <p className="text-amber-500 text-sm uppercase tracking-widest font-bold mb-2">{watch.brand}</p>
          <h2 className="text-4xl font-playfair font-bold text-white mb-4">{watch.name}</h2>
          <p className="text-3xl text-zinc-300 font-light mb-8">${watch.price.toLocaleString()}</p>
          
          <div className="space-y-6 mb-8">
            <p className="text-zinc-400 leading-relaxed text-sm">
              {watch.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="border border-white/10 p-3">
                <p className="text-zinc-500 uppercase mb-1">מנגנון</p>
                <p className="text-white font-medium">{watch.specs.movement}</p>
              </div>
              <div className="border border-white/10 p-3">
                <p className="text-zinc-500 uppercase mb-1">גודל גוף</p>
                <p className="text-white font-medium">{watch.specs.caseSize}</p>
              </div>
              <div className="border border-white/10 p-3">
                <p className="text-zinc-500 uppercase mb-1">עמידות למים</p>
                <p className="text-white font-medium">{watch.specs.waterResistance}</p>
              </div>
              <div className="border border-white/10 p-3">
                <p className="text-zinc-500 uppercase mb-1">חומר</p>
                <p className="text-white font-medium">{watch.specs.material}</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              onAddToCart(watch);
              onClose();
            }}
            className="mt-auto w-full bg-amber-600 hover:bg-amber-500 text-white py-4 uppercase font-bold tracking-widest transition-all"
          >
            הוספה לסל הקניות
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchModal;
