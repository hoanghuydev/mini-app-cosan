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
  };
}

const ORDER_API_PATH = "/orders/create.php";

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
