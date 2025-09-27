import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetail } from "@/services/order-api";
import { formatPrice } from "@/utils/format";
import toast from "react-hot-toast";
import Button from "@/components/button";
import HorizontalDivider from "@/components/horizontal-divider";

interface OrderDetailPageProps {}

export default function OrderDetailPage({}: OrderDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!id) {
        toast.error("Mã đơn hàng không hợp lệ");
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const result = await getOrderDetail(id);
        
        if (result.success && result.data) {
          setOrderData(result.data);
        } else {
          toast.error(result.message || "Không thể tải thông tin đơn hàng");
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
  }, [id, navigate]);

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

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1: return "text-yellow-600 bg-yellow-100";
      case 2: return "text-blue-600 bg-blue-100";
      case 3: return "text-purple-600 bg-purple-100";
      case 4: return "text-green-600 bg-green-100";
      case 5: return "text-red-600 bg-red-100";
      case 6: return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div id="scroll-container" className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Chi tiết đơn hàng</h1>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orderData.status)}`}>
              {orderData.statusText}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">Mã đơn hàng: {orderData.id}</p>
        </div>

        {/* Thông tin khách hàng */}
        <div className="bg-white px-4 py-3 border-b">
          <h2 className="text-base font-semibold mb-2">Thông tin khách hàng</h2>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Họ tên:</span>
              <span className="text-sm font-medium">{orderData.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Số điện thoại:</span>
              <span className="text-sm font-medium">{orderData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Địa chỉ:</span>
              <span className="text-sm font-medium text-right max-w-[60%]">{orderData.fullAddress}</span>
            </div>
            {orderData.note && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ghi chú:</span>
                <span className="text-sm font-medium text-right max-w-[60%]">{orderData.note}</span>
              </div>
            )}
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-white px-4 py-3 border-b">
          <h2 className="text-base font-semibold mb-3">Sản phẩm đã đặt</h2>
          <div className="space-y-3">
            {orderData.products.map((product: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs">No Image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Số lượng: {product.quantity}</span>
                    <span className="text-sm font-medium">{formatPrice(product.total)}</span>
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
              <span className="text-sm text-gray-600">Tạm tính:</span>
              <span className="text-sm">{formatPrice(orderData.originalAmount)}</span>
            </div>
            {orderData.originalAmount !== orderData.totalAmount && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Giảm giá:</span>
                <span className="text-sm text-green-600">-{formatPrice(orderData.originalAmount - orderData.totalAmount)}</span>
              </div>
            )}
            <HorizontalDivider />
            <div className="flex justify-between">
              <span className="text-base font-semibold">Tổng cộng:</span>
              <span className="text-base font-semibold text-primary">{formatPrice(orderData.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Thông tin thời gian */}
        <div className="bg-white px-4 py-3">
          <h2 className="text-base font-semibold mb-2">Thông tin thời gian</h2>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Giờ đặt:</span>
              <span className="text-sm">{orderData.createdAt}</span>
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
