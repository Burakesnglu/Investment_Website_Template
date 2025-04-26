import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_COLLECTAPI_KEY;
const BASE_URL = 'https://api.collectapi.com/economy';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `apikey ${API_KEY}`
};

export interface MarketData {
  rate: number;
  name: string;
  buying?: number;
  selling?: number;
  time: string;
}

const handleApiError = (error: any, dataType: string): MarketData[] => {
  if (axios.isAxiosError(error)) {
    console.error(`Error fetching ${dataType} data:`, {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
  } else {
    console.error(`Error fetching ${dataType} data:`, error);
  }
  return [];
};

export const getGoldData = async (): Promise<MarketData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/goldPrice`, { 
      headers,
      timeout: 5000 // 5 saniye timeout
    });

    if (!response.data?.result) {
      throw new Error('Invalid gold data format');
    }

    return response.data.result
      .filter((item: any) => item && typeof item === 'object')
      .map((item: any) => ({
        rate: Number(item.selling) || 0,
        name: item.name || 'Unknown',
        buying: Number(item.buying) || 0,
        selling: Number(item.selling) || 0,
        time: item.time || new Date().toISOString()
      }));
  } catch (error) {
    return handleApiError(error, 'gold');
  }
};

export const getCurrencyData = async (): Promise<MarketData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/allCurrency`, { 
      headers,
      timeout: 5000
    });

    if (!response.data?.result) {
      throw new Error('Invalid currency data format');
    }

    return response.data.result
      .filter((item: any) => item && typeof item === 'object')
      .map((item: any) => ({
        rate: Number(item.rate) || 0,
        name: item.code || 'Unknown',
        buying: Number(item.buying) || 0,
        selling: Number(item.selling) || 0,
        time: new Date().toISOString()
      }));
  } catch (error) {
    return handleApiError(error, 'currency');
  }
};

export const getBistData = async (): Promise<MarketData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/borsaIstanbul`, { 
      headers,
      timeout: 5000
    });

    if (!response.data?.result) {
      throw new Error('Invalid BIST data format');
    }

    return response.data.result
      .filter((item: any) => item && typeof item === 'object')
      .map((item: any) => ({
        rate: Number(item.rate) || Number(item.current) || 0,
        name: item.name || 'BIST 100',
        time: item.time || new Date().toISOString()
      }));
  } catch (error) {
    return handleApiError(error, 'BIST');
  }
}; 