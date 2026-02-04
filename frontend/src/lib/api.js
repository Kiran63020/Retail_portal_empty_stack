import axios from "axios";

// With Vite dev proxy, this can be relative:
const api = axios.create({
  baseURL: "/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password }).then((res) => res.data);

export const fetchProducts = (params = {}) =>
  api.get("/products", { params }).then((res) => res.data);

export const createProduct = (formData) =>
  api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }).then((res) => res.data);

export const createOrder = (items) =>
  api.post("/orders", { items }).then((res) => res.data);

export const fetchMyOrders = () =>
  api.get("/orders/my").then((res) => res.data);