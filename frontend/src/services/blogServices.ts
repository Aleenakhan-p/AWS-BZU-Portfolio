import { apiClient } from './apiClient';
import { BlogPost } from '../features/blog/types';

export interface CreateBlogRequest {
  title: string;
  excerpt: string;
  category: 'Announcement' | 'Event' | 'Program' | 'Engineering';
  date: string;
  content?: string;
  author?: string;
  image?: string;
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {}

/**
 * Blog Services
 * Handles CRUD operations for blog posts
 */
export const blogServices = {
  /**
   * Get all blog posts
   */
  getAll: async (filters?: { 
    category?: string; 
    limit?: number; 
    page?: number;
    sort?: 'latest' | 'oldest';
  }): Promise<BlogPost[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.sort) params.append('sort', filters.sort);

    const queryString = params.toString();
    const endpoint = queryString ? `/blog?${queryString}` : '/blog';
    return apiClient.get(endpoint);
  },

  /**
   * Get blog post by ID
   */
  getById: async (id: number): Promise<BlogPost> => {
    return apiClient.get(`/blog/${id}`);
  },

  /**
   * Get posts by category
   */
  getByCategory: async (category: string, limit?: number): Promise<BlogPost[]> => {
    const endpoint = limit ? `/blog/category/${category}?limit=${limit}` : `/blog/category/${category}`;
    return apiClient.get(endpoint);
  },

  /**
   * Search blog posts
   */
  search: async (query: string, limit?: number): Promise<BlogPost[]> => {
    const endpoint = limit ? `/blog/search?q=${query}&limit=${limit}` : `/blog/search?q=${query}`;
    return apiClient.get(endpoint);
  },

  /**
   * Create new blog post (requires authentication)
   */
  create: async (postData: CreateBlogRequest, token: string): Promise<BlogPost> => {
    return apiClient.post('/blog', postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update blog post (requires authentication)
   */
  update: async (id: number, postData: UpdateBlogRequest, token: string): Promise<BlogPost> => {
    return apiClient.put(`/blog/${id}`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete blog post (requires authentication)
   */
  delete: async (id: number, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/blog/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Get recent posts
   */
  getRecent: async (limit: number = 5): Promise<BlogPost[]> => {
    return apiClient.get(`/blog/recent?limit=${limit}`);
  },
};
