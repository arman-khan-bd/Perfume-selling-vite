
export interface ScentNote {
  name: string;
  type: 'top' | 'middle' | 'base';
  icon?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  images: string[];
  notes: ScentNote[];
  stock: number;
  isNew?: boolean;
  rating: number;
  reviews: Review[];
  size: string; // e.g., "50ml", "100ml", "12ml (Attar)"
}

export interface CartItem extends Perfume {
  quantity: number;
}
