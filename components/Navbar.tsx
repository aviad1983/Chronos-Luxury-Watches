
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-playfair font-bold tracking-widest text-white uppercase">Chronos</h1>
        <div className="hidden md:flex gap-6 text-sm font-light uppercase tracking-widest">
          <a href="#" className="hover:text-amber-500 transition-colors">קולקציה</a>
          <a href="#" className="hover:text-amber-500 transition-colors">מותגים</a>
          <a href="#" className="hover:text-amber-500 transition-colors">עלינו</a>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-white hover:text-amber-500 transition-colors">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button 
          onClick={onOpenCart}
          className="relative text-white hover:text-amber-500 transition-colors"
        >
          <i className="fa-solid fa-bag-shopping text-xl"></i>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
