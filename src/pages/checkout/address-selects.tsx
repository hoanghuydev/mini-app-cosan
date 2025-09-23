import SearchableSelect from "@/components/searchable-select";

export interface Province {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
}

export interface District {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
}

export interface Ward {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  district_code: number;
}

interface AddressSelectsProps {
  provinces: Province[];
  selectedProvince: number;
  selectedDistrict: number;
  selectedWard: number;
  districts: District[];
  wards: Ward[];
  onProvinceChange: (value: number) => void;
  onDistrictChange: (value: number) => void;
  onWardChange: (value: number) => void;
}

export default function AddressSelects({
  provinces,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  districts,
  wards,
  onProvinceChange,
  onDistrictChange,
  onWardChange,
}: AddressSelectsProps) {
  const selectedProvinceObj = provinces.find(p => p.code === selectedProvince);
  const selectedDistrictObj = districts.find(d => d.code === selectedDistrict);
  const selectedWardObj = wards.find(w => w.code === selectedWard);

  return (
    <div className="space-y-4">
      {/* Tỉnh/Thành phố */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tỉnh/Thành phố *
        </label>
        <div className="w-full">
          <SearchableSelect
            items={provinces}
            value={selectedProvinceObj}
            placeholder="Chọn tỉnh/thành phố"
            renderItemKey={(item) => item.code.toString()}
            renderItemLabel={(item) => item.name}
            onChange={(item) => onProvinceChange(item?.code || 0)}
          />
        </div>
      </div>

      {/* Quận/Huyện */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quận/Huyện *
        </label>
        <div className="w-full">
          <SearchableSelect
            items={districts}
            value={selectedDistrictObj}
            placeholder="Chọn quận/huyện"
            renderItemKey={(item) => item.code.toString()}
            renderItemLabel={(item) => item.name}
            onChange={(item) => onDistrictChange(item?.code || 0)}
            disabled={!selectedProvince}
          />
        </div>
      </div>

      {/* Phường/Xã */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phường/Xã *
        </label>
        <div className="w-full">
          <SearchableSelect
            items={wards}
            value={selectedWardObj}
            placeholder="Chọn phường/xã"
            renderItemKey={(item) => item.code.toString()}
            renderItemLabel={(item) => item.name}
            onChange={(item) => onWardChange(item?.code || 0)}
            disabled={!selectedDistrict}
          />
        </div>
      </div>
    </div>
  );
}
