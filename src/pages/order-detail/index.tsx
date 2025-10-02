import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetail, OrderDetailResponse } from "@/services/order-api";
import { formatPrice } from "@/utils/format";
import toast from "react-hot-toast";
import Button from "@/components/button";
import HorizontalDivider from "@/components/horizontal-divider";

interface OrderDetailPageProps {}

export default function OrderDetailPage({}: OrderDetailPageProps) {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderDetailResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!code) {
        toast.error("Mã đơn hàng không hợp lệ");
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const result = await getOrderDetail(code);
        
        if (result.returnCode === 1 && result.data) {
          setOrderData(result.data);
        } else {
          toast.error("Không thể tải thông tin đơn hàng");
          navigate("/");
        }
      } catch (error) {
        console.error('Error fetching order detail:', error);
        toast.error("Có lỗi xảy ra khi tải thông tin đơn hàng");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [code, navigate]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">Đang tải thông tin đơn hàng...</div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">Không tìm thấy thông tin đơn hàng</div>
        </div>
      </div>
    );
  }

  const getStatusColor = (statusId: number) => {
    switch (statusId) {
      case 1: return "text-yellow-600 bg-yellow-100"; // Chờ xử lý
      case 2: return "text-blue-600 bg-blue-100"; // Đã xác nhận
      case 3: return "text-purple-600 bg-purple-100"; // Đang chuẩn bị
      case 4: return "text-orange-600 bg-orange-100"; // Đang giao
      case 5: return "text-red-600 bg-red-100"; // Đã hủy
      case 6: return "text-gray-600 bg-gray-100"; // Hoàn trả
      case 7: return "text-green-600 bg-green-100"; // Giao thành công
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const formatAddress = (orderData: OrderDetailResponse['data']) => {
    const parts = [
      orderData.address,
      orderData.ward_commune,
      orderData.district,
      orderData.province
    ].filter(Boolean);
    return parts.join(", ");
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div id="scroll-container" className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Chi tiết đơn hàng</h1>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orderData.status_id)}`}>
              {orderData.order_status}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">Mã đơn hàng: {orderData.order_code}</p>
          {orderData.tracking_number && (
            <p className="text-sm text-gray-500">Mã vận đơn: {orderData.tracking_number}</p>
          )}
        </div>

        {/* Thông tin khách hàng */}
        <div className="bg-white px-4 py-3 border-b">
          <h2 className="text-base font-semibold mb-2">Thông tin khách hàng</h2>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Họ tên:</span>
              <span className="text-sm font-medium">{orderData.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Số điện thoại:</span>
              <span className="text-sm font-medium">{orderData.customer_phone.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Địa chỉ:</span>
              <span className="text-sm font-medium text-right max-w-[60%]">{formatAddress(orderData)}</span>
            </div>
            {orderData.notes && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ghi chú:</span>
                <span className="text-sm font-medium text-right max-w-[60%]">{orderData.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-white px-4 py-3 border-b">
          <h2 className="text-base font-semibold mb-3">Sản phẩm đã đặt</h2>
          <div className="space-y-3">
            {orderData.order_items.map((item, index) => (
              <div key={item.order_item_id} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {item.product.image ? (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs">No Image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Số lượng: {item.quantity}</span>
                    <span className="text-sm font-medium">{formatPrice(parseFloat(item.total_price))}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatPrice(parseFloat(item.unit_price))} x {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="bg-white px-4 py-3 border-b">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tổng tiền hàng:</span>
              <span className="text-sm">{formatPrice(parseFloat(orderData.total_amount))}</span>
            </div>
            {parseFloat(orderData.total_amount_paid) > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Đã thanh toán:</span>
                <span className="text-sm text-green-600">{formatPrice(parseFloat(orderData.total_amount_paid))}</span>
              </div>
            )}
            {parseFloat(orderData.total_outstanding_amount) > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Còn lại:</span>
                <span className="text-sm text-red-600">{formatPrice(parseFloat(orderData.total_outstanding_amount))}</span>
              </div>
            )}
            <HorizontalDivider />
            <div className="flex justify-between">
              <span className="text-base font-semibold">Tổng cộng:</span>
              <span className="text-base font-semibold text-primary">{formatPrice(parseFloat(orderData.total_amount))}</span>
            </div>
          </div>
        </div>

        {/* Thông tin thời gian */}
        <div className="bg-white px-4 py-3">
          <h2 className="text-base font-semibold mb-2">Thông tin thời gian</h2>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Ngày đặt hàng:</span>
              <span className="text-sm">{formatDateTime(orderData.order_date)}</span>
            </div>
            {orderData.confirm_order_date && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ngày xác nhận:</span>
                <span className="text-sm">{formatDateTime(orderData.confirm_order_date)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cập nhật lần cuối:</span>
              <span className="text-sm">{formatDateTime(orderData.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nút quay lại */}
      <HorizontalDivider />
      <div className="flex-none px-4 py-3">
        <Button
          large
          onClick={() => navigate("/")}
          className="w-full"
        >
          Quay lại trang chủ
        </Button>
      </div>
    </div>
  );
}
