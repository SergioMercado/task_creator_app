import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const baseURL = 'https://task-creator-server.herokuapp.com/api';

const getDataStorage = async (key) => await AsyncStorage.getItem(key);

export const authHttpClient = axios.create({
  baseURL,
});

export const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    const token = await getDataStorage('@token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => error,
);

httpClient.interceptors.response.use(
  (res) => res,
  (error) => {
    try {
      if (error.response) {
        if (error.response.status === 403) {
          on403(error);
        } else {
          return Promise.reject(error);
        }
      }
    } catch (e) {}
  },
);

async function on403(error) {
  const refreshToken = await getDataStorage('@refreshToken');

  const { data } = await authHttpClient.post('/token/refresh/', {
    refresh: refreshToken,
  });

  error.response.config.headers.Authorization = `Bearer ${data.access}`;
  await AsyncStorage.setItem('@token', data.access);

  return httpClient.request(error.response.config);
}
