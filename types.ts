
export interface Watch {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: 'Classic' | 'Sport' | 'Luxury' | 'Vintage';
  image: string;
  specs: {
    movement: string;
    caseSize: string;
    waterResistance: string;
    material: string;
  };
}

export interface CartItem extends Watch {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
