import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  subscriptionPlan: string;
}

export interface Content {
  id: number;
  title: string;
  type: string;
  description: string;
  thumbnailUrl: string;
  releaseYear: number;
  genre: string;
  maturityRating: string;
  contentUrl: string;
  director: string;
  cast: string;
}

api.interceptors.request.use((config) => {
  const userString = Cookies.get("user");

  if (userString) {
    try {
      const user = JSON.parse(userString);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (error) {
      console.error("Erro ao processar cookie do usuário:", error);
    }
  }

  return config;
});

export interface SubscriptionData {
  plan: string;
}

export const authService = {
  async login(data: LoginData): Promise<User> {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
};

export const userService = {
  updateSubscription: async (data: SubscriptionData): Promise<User> => {
    const response = await api.post("/user/subscription", data);
    return response.data;
  },
};

export const contentService = {
  async getContents(): Promise<Content[]> {
    const response = await api.get("/content");
    return response.data;
  },

  async getFeaturedContents(): Promise<Content[]> {
    const response = await api.get("/content/featured");
    return response.data;
  },

  async searchContents(query: string): Promise<Content[]> {
    const response = await api.get(
      `/content/search?query=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  async getContent(id: number): Promise<Content> {
    const response = await api.get(`/content/${id}`);
    return response.data;
  },
};

export default api;
