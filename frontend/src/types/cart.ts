export interface CartItemProduct {
  id: string;
  name: string;
  price: string;
  image_url?: string;
  stock_quantity: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: CartItemProduct;
  quantity: number;
  unit_price: string;
  line_total: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  item_count: number;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export interface CartItemAdd {
  product_id: string;
  quantity: number;
}

export interface CartItemUpdate {
  quantity: number;
}