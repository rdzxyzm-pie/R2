export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  timestamp: number;
}

export type Page = 'home' | 'menu' | 'checkout' | 'confirmation';
