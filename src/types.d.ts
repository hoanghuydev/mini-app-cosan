export interface Product {
  id: number;
  name: string;
  short_name?: string;
  official_name?: string;
  product_line: string;
  sku: string;
  price: number;
  original_price?: number;
  weight?: string;
  short_description?: string;
  description?: string;
  ingredients?: string;
  usage_instructions?: string;
  thumbnail_url: string;
  images: Array<{
    image_id: number;
    file_url: string;
    alt_text: string;
    sort_order: number;
    is_primary: number;
  }>;
  // Legacy fields for compatibility
  image?: string;
  thumbnail?: string;
  full_description?: string;
  detailed_ingredients?: string;
  category?: Category;
  colors?: Color[];
  sizes?: Size[];
  details?: Detail[];
}

export interface Category {
  id: number;
  name: string;
  code?: string;
  parent_id?: number | null;
  product_count?: number;
  children?: Array<any>;
  image?: string;
}

export interface Detail {
  title: string;
  content: string;
}
export type Size = string;

export interface Color {
  name: string;
  hex: string;
}

export type SelectedOptions = {
  size?: Size;
  color?: Color["name"];
};

export interface CartItem {
  id: number;
  product: Product;
  options: SelectedOptions;
  quantity: number;
  productId?: number; // For API compatibility
}

export type Cart = CartItem[];
