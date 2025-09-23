import AddressSelects, { Province, District, Ward } from "./address-selects";

interface ShippingFormData {
  name: string;
  phone: string;
  province: number;
  district: number;
  ward: number;
  address: string;
  note: string;
}

interface ShippingFormProps {
  formData: ShippingFormData;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  onInputChange: (field: string, value: string | number) => void;
}

export default function ShippingForm({
  formData,
  provinces,
  districts,
  wards,
  onInputChange,
}: ShippingFormProps) {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-medium mb-4">Thông tin giao hàng</h2>
      
      {/* Họ và tên */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Họ và tên *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          placeholder="Nhập họ và tên"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Số điện thoại */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Số điện thoại *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          placeholder="Nhập số điện thoại"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Address Selects */}
      <AddressSelects
        provinces={provinces}
        selectedProvince={formData.province}
        selectedDistrict={formData.district}
        selectedWard={formData.ward}
        districts={districts}
        wards={wards}
        onProvinceChange={(value) => onInputChange("province", value)}
        onDistrictChange={(value) => onInputChange("district", value)}
        onWardChange={(value) => onInputChange("ward", value)}
      />

      {/* Địa chỉ cụ thể */}
      <div className="mb-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Địa chỉ cụ thể *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onInputChange("address", e.target.value)}
          placeholder="Số nhà, tên đường..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Ghi chú */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ghi chú (tùy chọn)
        </label>
        <textarea
          value={formData.note}
          onChange={(e) => onInputChange("note", e.target.value)}
          placeholder="Ghi chú cho đơn hàng..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}

export type { ShippingFormData };
