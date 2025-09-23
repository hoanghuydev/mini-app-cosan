const BASE_URL = 'https://provinces.open-api.vn/api/v1';

export interface ProvinceAPI {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: DistrictAPI[];
}

export interface DistrictAPI {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
  wards: WardAPI[];
}

export interface WardAPI {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  district_code: number;
}

// Fetch all provinces
export const fetchProvinces = async (): Promise<ProvinceAPI[]> => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

// Fetch districts by province code
export const fetchDistricts = async (provinceCode: number): Promise<DistrictAPI[]> => {
  try {
    const response = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.districts || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

// Fetch wards by district code
export const fetchWards = async (districtCode: number): Promise<WardAPI[]> => {
  try {
    const response = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.wards || [];
  } catch (error) {
    console.error('Error fetching wards:', error);
    throw error;
  }
};
