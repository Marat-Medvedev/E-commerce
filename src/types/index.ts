// Shared TypeScript types for the e-commerce application

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}
