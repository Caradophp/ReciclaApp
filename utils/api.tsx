// api.js
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8080';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // importante!
});

// 🧩 Ao iniciar o app, recarrega o cookie salvo (opcional)
export async function restoreCookies() {
  const cookies = await CookieManager.get(API_URL);
  console.log('Cookies restaurados:', cookies);
}

// 🧠 Intercepta todas as requisições e injeta o cookie atual
api.interceptors.request.use(
  async (config) => {
    try {
      // 👉 1. Recupera cookies do domínio
      const cookies = await CookieManager.get(API_URL);
      const cookieString = Object.entries(cookies || {})
        .map(([name, c]) => `${name}=${c?.value}`)
        .join('; ');

      if (cookieString) {
        config.headers.Cookie = cookieString;
      }

      // 👉 2. Recupera Authorization salvo após login
      const authHeader = await AsyncStorage.getItem('authHeader');
      if (authHeader) {
        config.headers.Authorization = authHeader;
      }

      return config;
    } catch (error) {
      console.error('Erro ao configurar headers:', error);
      return config; // ainda envia a requisição, mesmo sem cookies
    }
  },
  (error) => Promise.reject(error)
);


export default api;
