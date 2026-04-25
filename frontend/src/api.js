import axios from 'axios';

// Create Axios Instance connecting to Django Backend
const API_URL = 'http://localhost:8000/api/';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Interceptor to add JWT token to requests if User is logged in
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchIssues = async () => {
    const response = await apiClient.get('issues/');
    return response.data;
};

export const createIssue = async (issueData) => {
    // The ML model in Django will automatically assign urgency!
    const response = await apiClient.post('issues/', issueData);
    return response.data;
};

export const claimTask = async (issueId) => {
    const response = await apiClient.post(`issues/${issueId}/claim/`);
    return response.data;
};

export const loginToken = async (username, password) => {
    const response = await apiClient.post('auth/login/', { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
};

export default apiClient;
