import React from 'react'
import { toast } from 'react-hot-toast';
import { events, EventName } from "zmp-sdk/apis"; // Require: zmp-sdk >= 2.25.3
import { Payment } from "zmp-sdk/apis";
import { useNavigate } from 'react-router-dom';
const CheckTransaction = () => {
    const navigate = useNavigate();
    events.on(EventName.OpenApp, (data) => {
        const params = data?.path;
        const RedirectPath = "/checkout-transaction";
        if (params.includes(RedirectPath)) {
          // gọi api checkTransaction để lấy thông tin giao dịch
          Payment.checkTransaction({
            data: params,
            success: (rs) => {
              // Kết quả giao dịch khi gọi api thành công
              const { orderId, resultCode, msg, transTime, createdAt } = rs;
            },
            fail: (err) => {
                toast.error(err.message || "Có lỗi xảy ra khi kiểm tra giao dịch");
                navigate("/");
              console.log(err);
            },
          });
        }
      });
  return (
    <div>Kiểm tra giao dịch</div>
  )
}

export default CheckTransaction