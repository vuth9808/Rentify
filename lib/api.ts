import axios from 'axios';

// Spring Boot API URL
const API_URL = 'http://localhost:8080/api';

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const fetchHello = async () => {
  try {
    const response = await api.get('/hello');
    return response.data;
  } catch (error) {
    console.error('Error fetching hello:', error);
    throw error;
  }
};

// Properties API
export const fetchProperties = async () => {
  try {
    const response = await api.get('/properties');
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const fetchPropertyById = async (id: string | number) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    throw error;
  }
};

export const fetchFeaturedProperties = async () => {
  try {
    const response = await api.get('/properties/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    throw error;
  }
};

export const searchProperties = async (params: {
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
}) => {
  try {
    const response = await api.get('/properties/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};

export default api; 