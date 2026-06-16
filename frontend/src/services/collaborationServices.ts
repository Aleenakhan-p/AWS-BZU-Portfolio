import { apiClient } from './apiClient';
import { Portfolio, Partner, University } from '../features/collaborations/types';

export interface CreatePortfolioRequest {
  title: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
}

export interface UpdatePortfolioRequest extends Partial<CreatePortfolioRequest> {}

export interface CreatePartnerRequest {
  name: string;
  focus: string;
  image?: string;
  website?: string;
  description?: string;
}

export interface UpdatePartnerRequest extends Partial<CreatePartnerRequest> {}

export interface CreateUniversityRequest {
  name: string;
  location: string;
  image?: string;
  website?: string;
  memberCount?: number;
}

export interface UpdateUniversityRequest extends Partial<CreateUniversityRequest> {}

/**
 * Portfolio Services
 */
export const portfolioServices = {
  /**
   * Get all portfolios
   */
  getAll: async (): Promise<Portfolio[]> => {
    return apiClient.get('/collaborations/portfolios');
  },

  /**
   * Get portfolio by ID
   */
  getById: async (id: number): Promise<Portfolio> => {
    return apiClient.get(`/collaborations/portfolios/${id}`);
  },

  /**
   * Create portfolio (requires authentication)
   */
  create: async (data: CreatePortfolioRequest, token: string): Promise<Portfolio> => {
    return apiClient.post('/collaborations/portfolios', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update portfolio (requires authentication)
   */
  update: async (id: number, data: UpdatePortfolioRequest, token: string): Promise<Portfolio> => {
    return apiClient.put(`/collaborations/portfolios/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete portfolio (requires authentication)
   */
  delete: async (id: number, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/collaborations/portfolios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

/**
 * Partner Services
 */
export const partnerServices = {
  /**
   * Get all partners
   */
  getAll: async (): Promise<Partner[]> => {
    return apiClient.get('/collaborations/partners');
  },

  /**
   * Get partner by ID
   */
  getById: async (id: number): Promise<Partner> => {
    return apiClient.get(`/collaborations/partners/${id}`);
  },

  /**
   * Get partners by focus area
   */
  getByFocus: async (focus: string): Promise<Partner[]> => {
    return apiClient.get(`/collaborations/partners/focus/${focus}`);
  },

  /**
   * Create partner (requires authentication)
   */
  create: async (data: CreatePartnerRequest, token: string): Promise<Partner> => {
    return apiClient.post('/collaborations/partners', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update partner (requires authentication)
   */
  update: async (id: number, data: UpdatePartnerRequest, token: string): Promise<Partner> => {
    return apiClient.put(`/collaborations/partners/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete partner (requires authentication)
   */
  delete: async (id: number, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/collaborations/partners/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

/**
 * University Services
 */
export const universityServices = {
  /**
   * Get all universities
   */
  getAll: async (): Promise<University[]> => {
    return apiClient.get('/collaborations/universities');
  },

  /**
   * Get university by ID
   */
  getById: async (id: number): Promise<University> => {
    return apiClient.get(`/collaborations/universities/${id}`);
  },

  /**
   * Search universities by name
   */
  search: async (query: string): Promise<University[]> => {
    return apiClient.get(`/collaborations/universities/search?q=${query}`);
  },

  /**
   * Create university (requires authentication)
   */
  create: async (data: CreateUniversityRequest, token: string): Promise<University> => {
    return apiClient.post('/collaborations/universities', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update university (requires authentication)
   */
  update: async (id: number, data: UpdateUniversityRequest, token: string): Promise<University> => {
    return apiClient.put(`/collaborations/universities/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete university (requires authentication)
   */
  delete: async (id: number, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/collaborations/universities/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
