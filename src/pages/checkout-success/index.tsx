import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "@/components/button";
import toast from "react-hot-toast";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState<{
    orderId?: string;
    status?: string;
    message?: string;
  }>({});
  const params = useParams();

  useEffect(() => {
    const orderId = params.id;
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    if (orderId) {
      setOrderInfo({ orderId, status: status || 'success', message: message || undefined });
      setIsLoading(false);
      
    //   if (status === 'success') {
    //     toast.success('Thanh toán thành công!');
    //   } else if (status === 'cancelled') {
    //     toast.error('Thanh toán đã bị hủy');
    //   } else if (status === 'failed') {
    //     toast.error('Thanh toán thất bại');
    //   }
    } else {
      // No order info, redirect to home
      navigate('/');
    }
  }, [searchParams, navigate, params]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrder = () => {
    // Navigate to order details if available
    if (orderInfo.orderId) {
      navigate(`/order-detail/${orderInfo.orderId}`);
    } else {
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">Đang xử lý...</div>
        </div>
      </div>
    );
  }

  const isSuccess = orderInfo.status === 'success';

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          {/* Status Icon */}
          <div className="mb-6">
            {isSuccess ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>

          {/* Status Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
          </h1>
          
          <p className="text-gray-600 mb-4">
            {isSuccess 
              ? 'Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.'
              : orderInfo.message || 'Có lỗi xảy ra trong quá trình thanh toán.'
            }
          </p>

          {orderInfo.orderId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Mã đơn hàng: <span className="font-semibold text-gray-900">{orderInfo.orderId}</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {isSuccess && orderInfo.orderId && (
              <Button
                large
                primary
                onClick={handleViewOrder}
                className="w-full"
              >
                Xem đơn hàng
              </Button>
            )}
            
            <Button
              large
              onClick={handleContinueShopping}
              className="w-full"
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
