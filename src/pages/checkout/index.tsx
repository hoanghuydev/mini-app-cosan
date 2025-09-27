import Button from "@/components/button";
import HorizontalDivider from "@/components/horizontal-divider";
import { useAtomValue, useSetAtom } from "jotai";
import { cartState } from "@/state";
import { formatPrice } from "@/utils/format";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ShippingForm, { ShippingFormData } from "./shipping-form";
import OrderSummary from "./order-summary";
import { Province, District, Ward } from "./address-selects";
import { fetchProvinces, fetchDistricts, fetchWards } from "@/services/address-api";
import { createOrder } from "@/services/order-api";
import { Payment } from "zmp-sdk";

export default function CheckoutPage() {
  const cart = useAtomValue(cartState);
  const setCart = useSetAtom(cartState);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    phone: "",
    province: 0,
    district: 0,
    ward: 0,
    address: "",
    note: ""
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);

  // Tính toán giá trị
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const originalShippingFee = 30000;
  const discountedShippingFee = 0;
  const shippingDiscount = originalShippingFee - discountedShippingFee;
  const total = subtotal + discountedShippingFee;

  // Load provinces khi component mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setIsLoadingProvinces(true);
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error('Failed to load provinces:', error);
        toast.error("Không thể tải danh sách tỉnh thành");
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  // Redirect nếu giỏ hàng trống
  useEffect(() => {
    if (cart.length === 0) {
      toast.error("Giỏ hàng trống");
      navigate("/cart");
    }
  }, [cart, navigate]);

  // Cập nhật districts khi chọn province
  useEffect(() => {
    const loadDistricts = async () => {
      if (formData.province) {
        try {
          const districtsData = await fetchDistricts(formData.province);
          setDistricts(districtsData);
          setFormData(prev => ({ ...prev, district: 0, ward: 0 }));
        } catch (error) {
          console.error('Failed to load districts:', error);
          toast.error("Không thể tải danh sách quận/huyện");
        }
      } else {
        setDistricts([]);
        setFormData(prev => ({ ...prev, district: 0, ward: 0 }));
      }
    };

    loadDistricts();
  }, [formData.province]);

  // Cập nhật wards khi chọn district
  useEffect(() => {
    const loadWards = async () => {
      if (formData.district) {
        try {
          const wardsData = await fetchWards(formData.district);
          setWards(wardsData);
          setFormData(prev => ({ ...prev, ward: 0 }));
        } catch (error) {
          console.error('Failed to load wards:', error);
          toast.error("Không thể tải danh sách phường/xã");
        }
      } else {
        setWards([]);
        setFormData(prev => ({ ...prev, ward: 0 }));
      }
    };

    loadWards();
  }, [formData.district]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập họ và tên");
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    
    if (!formData.province || !formData.district || !formData.ward) {
      toast.error("Vui lòng chọn đầy đủ tỉnh/huyện/xã");
      return;
    }
    
    if (!formData.address.trim()) {
      toast.error("Vui lòng nhập địa chỉ cụ thể");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare order data
      // const orderData = {
      //   cart: cart.map(item => ({
      //     productId: item.product.id,
      //     quantity: item.quantity
      //   })),
      //   customerInfo: {
      //     name: formData.name,
      //     phone: formData.phone,
      //     province: provinces.find(p => p.code === formData.province)?.name || '',
      //     district: districts.find(d => d.code === formData.district)?.name || '',
      //     ward: wards.find(w => w.code === formData.ward)?.name || '',
      //     address: formData.address,
      //     note: formData.note
      //   }
      // };


      const orderData = {
        desc : "Đặt hàng từ zalo mini app",
        amount : total,
        item : cart.map(item => ({
          id : item.product.id,
          name : item.product.name,
          quantity : item.quantity,
        })),
        mac : "mac",
        method : {
          id : "COD",
          isCustom : false,
        },
        success: (data) => {
          setCart([]);

          navigate(`/checkout-success/${data.orderId}?status=success`);
        },
        fail: (err) => {
          toast.error(err.message || "Có lỗi xảy ra khi đặt hàng");
          console.log(err);
        },
      }

      Payment.createOrder(orderData);

    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  if (isLoadingProvinces) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">Đang tải danh sách tỉnh thành...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div id="scroll-container" className="flex-1 overflow-y-auto">
        {/* Thông tin giao hàng */}
        <ShippingForm
          formData={formData}
          provinces={provinces}
          districts={districts}
          wards={wards}
          onInputChange={handleInputChange}
        />

        <div className="bg-section h-2 w-full"></div>

        {/* Thông tin đơn hàng */}
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          originalShippingFee={originalShippingFee}
          discountedShippingFee={discountedShippingFee}
          shippingDiscount={shippingDiscount}
          total={total}
        />
      </div>

      {/* Nút đặt hàng */}
      <HorizontalDivider />
      <div className="flex-none px-4 py-3">
        <Button
          large
          primary
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full"
        >
          {isSubmitting ? "Đang xử lý..." : `Đặt hàng • ${formatPrice(total)}`}
        </Button>
      </div>
    </div>
  );
}
