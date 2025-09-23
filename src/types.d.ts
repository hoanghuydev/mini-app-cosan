export interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  slug?: string;
  
  // From products API
  short_description?: string;
  thumbnail?: string;
  product_image?: string;
  weight?: string;
  product_type?: number;
  sort_order?: number;
  
  // From product-detail API  
  short_name?: string;
  tax_price?: number;
  pcb_number?: string;
  barcode?: string;
  full_description?: string;
  detailed_ingredients?: string;
  ingredients?: any[];
  material?: string;
  packaging?: string;
  usage_instructions?: string;
  precautions?: string;
  images?: {
    thumbnail?: string;
    product_with_box?: string;
    product_only?: string;
    box_only?: string;
  };
  categories?: Array<{
    id: number;
    name: string;
    code: string;
  }>;
  is_combo?: boolean;
  stock_quantity?: number;
  
  // For compatibility with existing components
  image?: string;
  description?: string;
  category_id?: number;
  category?: Category;
  details?: Detail[];
  sizes?: Size[];
  colors?: Color[];
  social_links?: {
    tiktok: string;
    lazada: string;
    shopee: string;
  };
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
