import { apiClient } from './apiClient';

export interface Recognition {
  id: number;
  memberId: number;
  title: string;
  description: string;
  date: string;
  category: 'Award' | 'Achievement' | 'Milestone' | 'Contribution';
  image?: string;
}

export interface CreateRecognitionRequest {
  memberId: number;
  title: string;
  description: string;
  date: string;
  category: 'Award' | 'Achievement' | 'Milestone' | 'Contribution';
  image?: string;
}

export interface UpdateRecognitionRequest extends Partial<CreateRecognitionRequest> {}

/**
 * Recognition Services
 * Handles CRUD operations for member recognitions and achievements
 */
export const recognitionServices = {
  /**
   * Get all recognitions
   */
  getAll: async (filters?: { 
    category?: string; 
    memberId?: number; 
    limit?: number;
  }): Promise<Recognition[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.memberId) params.append('memberId', filters.memberId.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/recognitions?${queryString}` : '/recognitions';
    return apiClient.get(endpoint);
  },

  /**
   * Get recognition by ID
   */
  getById: async (id: number): Promise<Recognition> => {
    return apiClient.get(`/recognitions/${id}`);
  },

  /**
   * Get recognitions for a member
   */
  getByMemberId: async (memberId: number): Promise<Recognition[]> => {
    return apiClient.get(`/recognitions/member/${memberId}`);
  },

  /**
   * Get recognitions by category
   */
  getByCategory: async (category: string): Promise<Recognition[]> => {
    return apiClient.get(`/recognitions/category/${category}`);
  },

  /**
   * Create recognition (requires authentication)
   */
  create: async (recognitionData: CreateRecognitionRequest, token: string): Promise<Recognition> => {
    return apiClient.post('/recognitions', recognitionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update recognition (requires authentication)
   */
  update: async (id: number, recognitionData: UpdateRecognitionRequest, token: string): Promise<Recognition> => {
    return apiClient.put(`/recognitions/${id}`, recognitionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete recognition (requires authentication)
   */
  delete: async (id: number, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/recognitions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Get recent recognitions
   */
  getRecent: async (limit: number = 10): Promise<Recognition[]> => {
    return apiClient.get(`/recognitions/recent?limit=${limit}`);
  },

  /**
   * Bulk create recognitions (requires authentication)
   */
  createBulk: async (recognitions: CreateRecognitionRequest[], token: string): Promise<Recognition[]> => {
    return apiClient.post('/recognitions/bulk', { recognitions }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
