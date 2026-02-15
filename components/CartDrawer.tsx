
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleStartCheckout = () => {
    setStep('checkout');
  };

  const handleFinalPayment = () => {
    setIsRedirecting(true);
    
    // סימולציה של הצפנת נתונים ומעבר לסליקה ממותגת
    setTimeout(() => {
      // כאן עובר רק המחיר הסופי שלך! 
      // בשלב הייצור: כאן תחליף ללינק ה-Checkout האמיתי של Stripe/PayPal
      // const paymentUrl = "https://buy.stripe.com/your_id"; 
      // window.location.href = paymentUrl;

      // לצורך הדגמה, אנחנו מראים "הצלחה"
      setStep('success');
      setIsRedirecting(false);
    }, 2500);
  };

  const resetAndClose = () => {
    setStep('cart');
    onClose();
  };

  if (step === 'success') {
    return (
      <>
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm" onClick={resetAndClose}></div>
        <div className="fixed top-0 right-0 h-full w-full max-w-md z-[200] bg-[#0a0a0a] shadow-2xl flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <i className="fa-solid fa-check text-4xl text-green-500"></i>
          </div>
          <h2 className="text-3xl font-playfair font-bold mb-4">תודה על רכישתך!</h2>
          <p className="text-zinc-400 mb-8">ההזמנה שלך התקבלה בהצלחה ומעובדת כעת על ידי צוות המומחים שלנו. אישור הזמנה נשלח לאימייל שלך.</p>
          <button 
            onClick={resetAndClose}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 uppercase font-bold tracking-widest transition-all"
          >
            חזרה לחנות
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div 
        className={`fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={resetAndClose}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-full max-w-md z-[200] bg-[#0a0a0a] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
            <h2 className="text-xl font-playfair font-bold uppercase tracking-widest">
              {step === 'cart' ? 'סל הקניות' : 'סיכום הזמנה מאובטח'}
            </h2>
            <button onClick={resetAndClose} className="text-white/50 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                <i className="fa-solid fa-bag-shopping text-4xl opacity-20"></i>
                <p>הסל שלך ריק כרגע</p>
              </div>
            ) : step === 'cart' ? (
              items.map(item => (
                <div key={item.id} className="flex gap-4 group animate-in fade-in slide-in-from-right-4">
                  <div className="w-20 h-24 bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-amber-500 uppercase tracking-widest mb-1 font-bold">{item.brand}</p>
                    <h4 className="text-sm font-bold text-white mb-1 truncate">{item.name}</h4>
                    <p className="text-sm text-zinc-400 mb-2">${item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/10 text-xs bg-black">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-white/5 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 border-x border-white/10">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-white/5"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-xs text-zinc-500 hover:text-red-500 transition-colors"
                      >
                        הסר
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95">
                <div className="bg-zinc-900/50 p-4 border border-white/5 rounded-sm">
                  <h3 className="text-xs uppercase text-zinc-500 mb-4 tracking-widest">פרטי משלוח מאובטח</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="שם מלא" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-amber-500 outline-none" />
                    <input type="email" placeholder="אימייל למשלוח קבלה" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-amber-500 outline-none" />
                    <input type="text" placeholder="כתובת למשלוח" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-amber-500 outline-none" />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400 bg-amber-600/5 p-3 border border-amber-600/20">
                  <i className="fa-solid fa-shield-halved text-amber-600 text-lg"></i>
                  <p>התשלום מבוצע במערכת סליקה מוצפנת. הפרטים שלך מוגנים בסטנדרט PCI-DSS.</p>
                </div>
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="p-6 bg-zinc-900 border-t border-white/10">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-zinc-500 text-xs uppercase tracking-widest">
                  <span>סיכום ביניים</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 text-xs uppercase tracking-widest">
                  <span>משלוח VIP (מבוטח)</span>
                  <span className="text-green-500 font-bold tracking-tighter">חינם</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-white uppercase tracking-widest text-sm font-bold">סה"כ לתשלום</span>
                  <span className="text-2xl font-bold font-playfair text-amber-500">${total.toLocaleString()}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button 
                  onClick={handleStartCheckout}
                  className="group w-full bg-white text-black py-4 uppercase font-bold tracking-widest transition-all hover:bg-amber-600 hover:text-white flex items-center justify-center gap-3"
                >
                  <span>המשך לפרטי תשלום</span>
                  <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
                </button>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={handleFinalPayment}
                    disabled={isRedirecting}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isRedirecting ? (
                      <>
                        <i className="fa-solid fa-spinner animate-spin"></i>
                        <span>מכין דף תשלום מאובטח...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-lock text-sm"></i>
                        <span>בצע תשלום מאובטח</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => setStep('cart')}
                    disabled={isRedirecting}
                    className="w-full text-zinc-500 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                  >
                    חזרה לסל הקניות
                  </button>
                </div>
              )}
              
              <div className="flex justify-center gap-4 mt-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
                <i className="fa-brands fa-cc-visa text-2xl"></i>
                <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                <i className="fa-brands fa-cc-apple-pay text-2xl"></i>
                <i className="fa-brands fa-cc-paypal text-2xl"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
