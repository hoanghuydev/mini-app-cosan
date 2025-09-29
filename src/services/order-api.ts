import { request } from "@/utils/request";

export interface OrderRequest {
  cart: Array<{
    productId: number;
    quantity: number;
  }>;
  customerInfo: {
    name: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    note?: string;
  };
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data?: {
    orderId: string;
    totalAmount: number;
    orderDate: string;
    mac: string;
  };
}

export interface OrderDetailResponse {
  success: boolean;
  message: string;
  data?: {
    orderId: string;
    customerName: string;
    phone: string;
    status: number;
    statusText: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    fullAddress: string;
    note: string;
    totalAmount: number;
    originalAmount: number;
    products: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
      image: string;
      total: number;
    }>;
    createdAt: string;
    createdDate: string;
    shippingDate: string;
    createdBy: number;
  };
}

const ORDER_API_PATH = "/orders/create.php";
const ORDER_DETAIL_API_PATH = "/orders/detail.php";
const ORDER_MAC_API_PATH = "/orders/zalo/mac.php";
export const createOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  try {
    const response = await request<OrderResponse>(ORDER_API_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...orderData, token: 'Kwewjf23Kasfj!kCAMp23daed@mqpqwcasw'}),
    });
    
    // Server response sẽ có success: false và message từ server nếu có lỗi
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    // Chỉ trả về fallback message khi không thể kết nối đến server
    return {
      success: false,
      message: "Không thể kết nối đến server. Vui lòng thử lại sau.",
    };
  }
};

export const getMac = async (data: any): Promise<{success: boolean, message: string, data: {mac: string}}> => {
  try {
    const response = await request<any>(`${ORDER_MAC_API_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error('Error getting mac:', error);
    return {
      success: false,
      message: "Không thể kết nối đến server. Vui lòng thử lại sau.",
      data: {mac: ''},
    };
  }
};

export const getOrderDetail = async (orderId: string): Promise<OrderDetailResponse> => {
  try {
    const response = await request<OrderDetailResponse>(`${ORDER_DETAIL_API_PATH}?orderId=${orderId}&token=Kwewjf23Kasfj!kCAMp23daed@mqpqwcasw`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return response;
  } catch (error) {
    console.error('Error getting order detail:', error);
    return {
      success: false,
      message: "Không thể kết nối đến server. Vui lòng thử lại sau.",
    };
  }
};
