
import { Watch } from './types';

/**
 * 🛠️ לוח בקרה למנהל האתר (CHRONOS CONTROL PANEL)
 * --------------------------------------------
 * כאן אתה מנהל את העסק שלך. 
 */

export const STORE_CONFIG = {
  name: "Chronos Luxury",
  currency: "$",
  contactEmail: "support@chronos-luxury.com",
  
  // 💳 מערכת סליקה:
  // אחרי שתפתח חשבון ב-Stripe (stripe.com), צור "Payment Link" והדבק אותו כאן.
  // כרגע זה מקושר לדף סימולציה.
  checkoutLink: "https://buy.stripe.com/mock_checkout_link", 
  
  shippingDays: "7-14",
  instagramUrl: "https://instagram.com/your_store",
};

export const WATCHES: Watch[] = [
  {
    id: 'rolex-sub-1',
    name: 'Submariner Date',
    brand: 'Rolex',
    price: 18900, // המחיר ללקוח (כולל הרווח שלך)
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800',
    description: 'השעון האייקוני של עולם הצלילה. עמידות מושלמת ועיצוב נצחי.',
    specs: {
      movement: 'אוטומטי (Calibre 3235)',
      caseSize: '41mm',
      waterResistance: '300m',
      material: 'Oystersteel'
    }
  },
  {
    id: 'omega-speed-2',
    name: 'Speedmaster Moonwatch',
    brand: 'Omega',
    price: 9200,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
    description: 'השעון הראשון על הירח. כרונוגרף מקצועי עם היסטוריה מפוארת.',
    specs: {
      movement: 'מכני ידני (Calibre 3861)',
      caseSize: '42mm',
      waterResistance: '50m',
      material: 'פלדת אל-חלד'
    }
  },
  {
    id: 'ap-royal-3',
    name: 'Royal Oak Selfwinding',
    brand: 'Audemars Piguet',
    price: 62500,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    description: 'יצירת מופת גיאומטרית. אחד השעונים המבוקשים ביותר בעולם.',
    specs: {
      movement: 'אוטומטי (Calibre 4302)',
      caseSize: '41mm',
      waterResistance: '50m',
      material: 'פלדת אל-חלד / זהב'
    }
  },
  {
    id: 'patek-naut-4',
    name: 'Nautilus 5711',
    brand: 'Patek Philippe',
    price: 145000,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80&w=800',
    description: 'השעון הנדיר והמבוקש ביותר בעולם. סמל סטטוס אמיתי.',
    specs: {
      movement: 'אוטומטי',
      caseSize: '40mm',
      waterResistance: '120m',
      material: 'פלדת אל-חלד'
    }
  }
];

export const SYSTEM_PROMPT = `You are a world-class luxury watch consultant for "${STORE_CONFIG.name}".
Your goal: Professionalism, Elegance, and Sales.
Language: HEBREW.
Context: We offer ${WATCHES.length} exclusive models. 
Available Items: ${JSON.stringify(WATCHES.map(w => ({name: w.name, brand: w.brand, price: w.price})))}.
If a customer asks about authenticity, emphasize our 30-point inspection and global warranty.
Always mention that shipping is free and insured (VIP Shipping).`;
