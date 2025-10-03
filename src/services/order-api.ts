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

export interface OrderDetailResponse {
  returnCode: number;
  returnMessage?: string;
  errors?: Record<string, string[]>;
  data?: {
    order_id: number;
    order_code: number;
    tracking_number: string;
    customer_phone_id: number;
    customer_id: number;
    address: string;
    additional_address: string;
    ward_commune: string;
    district: string;
    province: string;
    category_id: number | null;
    order_source_id: number;
    total_amount: string;
    commission_rate_at_creation: string;
    commission_after_upsell: string | null;
    commission_amount: string;
    created_by_user_id: number;
    upsold_by: number | null;
    order_date: string;
    confirm_order_date: string;
    notes: string;
    created_at: string;
    updated_at: string;
    total_amount_paid: string;
    total_outstanding_amount: string;
    deleted_at: string | null;
    is_deleted: number;
    order_status: {
      icon: string;
      background_color: string;
      text_color: string;
      name: string;
    };
    order_items: Array<{
      order_item_id: number;
      order_id: number;
      product_id: number;
      quantity: number;
      unit_price: string;
      total_price: string;
      product: {
        product_id: number;
        name: string;
        image: string;
        product_line: string;
        sku: string;
        price: number;
        weight: string;
        short_description: string | null;
        description: string | null;
        ingredients: string | null;
        usage_instructions: string | null;
      };
    }>;
    customer: {
      customer_id: number;
      name: string;
    };
    customer_phone: {
      customer_phone_id: number;
      customer_id: number;
      phone: string;
      is_primary: number;
      is_main_info: number;
      created_time: number;
      created_at: string;
      updated_at: string;
      is_deleted: number;
      deleted_at: string | null;
    };
  };
}

const ORDER_API_PATH = "/orders";
const ORDER_DETAIL_API_PATH = "/orders";
const ORDER_MAC_API_PATH = "/orders/mac";
export const createOrder = async (
  orderData: OrderRequest
): Promise<OrderDetailResponse> => {
  try {
    const response = await request<OrderDetailResponse>(ORDER_API_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        token: "Kwewjf23Kasfj!kCAMp23daed@mqpqwcasw",
      }),
    });

    // Server response sẽ có success: false và message từ server nếu có lỗi
    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    // Chỉ trả về fallback message khi không thể kết nối đến server
    return {
      returnCode: 0,
      returnMessage: "Không thể kết nối đến server",
      data: undefined,
    };
  }
};

export const getMac = async (
  data: any
): Promise<{ returnCode: number; data: { mac: string } }> => {
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
    console.error("Error getting mac:", error);
    return {
      returnCode: 0,
      data: { mac: "" },
    };
  }
};

export const getOrderDetail = async (
  orderId: string
): Promise<OrderDetailResponse> => {
  try {
    const response = await request<OrderDetailResponse>(
      `${ORDER_DETAIL_API_PATH}/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error getting order detail:", error);
    throw error;
  }
};
