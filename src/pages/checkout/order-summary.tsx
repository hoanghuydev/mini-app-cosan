import HorizontalDivider from "@/components/horizontal-divider";
import { Cart } from "@/types";
import { formatPrice } from "@/utils/format";

interface OrderSummaryProps {
  cart: Cart;
  subtotal: number;
  originalShippingFee: number;
  discountedShippingFee: number;
  shippingDiscount: number;
  total: number;
}

export default function OrderSummary({
  cart,
  subtotal,
  originalShippingFee,
  discountedShippingFee,
  shippingDiscount,
  total,
}: OrderSummaryProps) {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-medium mb-4">Thông tin đơn hàng</h2>
      
      {/* Danh sách sản phẩm */}
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={`${item.product.id}-${item.options?.size || ""}-${item.options?.color || ""}`} className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={item.product.thumbnail_url}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {item.product.name}
              </div>
              {(item.options?.size || item.options?.color) && (
                <div className="text-xs text-gray-500">
                  {item.options.size && `Size: ${item.options.size}`}
                  {item.options.size && item.options.color && " • "}
                  {item.options.color && `Màu: ${item.options.color}`}
                </div>
              )}
              <div className="text-sm text-primary font-medium">
                {formatPrice(item.product.price)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <HorizontalDivider />

      {/* Tóm tắt giá */}
      <div className="space-y-3 mt-4">
        <div className="flex justify-between text-sm">
          <span>Tạm tính</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Phí vận chuyển</span>
          <div className="text-right">
            <div className="line-through text-gray-500 text-xs">
              {formatPrice(originalShippingFee)}
            </div>
            <div className="text-primary">
              {formatPrice(discountedShippingFee)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-green-600">
          <span>Giảm phí ship</span>
          <span>-{formatPrice(shippingDiscount)}</span>
        </div>

        <HorizontalDivider />
        
        <div className="flex justify-between text-lg font-medium">
          <span>Tổng cộng</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
