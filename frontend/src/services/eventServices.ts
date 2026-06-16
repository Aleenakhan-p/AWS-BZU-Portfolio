import { apiClient } from './apiClient';
import { EventItem } from '../features/events/types';

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  type: 'upcoming' | 'past';
  location: string;
  link?: string;
  image?: string;
  gallery?: string[];
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {}

/**
 * Event Services
 * Handles CRUD operations for events
 */
export const eventServices = {
  /**
   * Get all events
   */
  getAll: async (filters?: { type?: 'upcoming' | 'past'; limit?: number }): Promise<EventItem[]> => {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/events?${queryString}` : '/events';
    return apiClient.get(endpoint);
  },

  /**
   * Get event by ID
   */
  getById: async (id: number): Promise<EventItem> => {
    return apiClient.get(`/events/${id}`);
  },

  /**
   * Get upcoming events
   */
  getUpcoming: async (limit?: number): Promise<EventItem[]> => {
    const endpoint = limit ? `/events/upcoming?limit=${limit}` : '/events/upcoming';
    return apiClient.get(endpoint);
  },

  /**
   * Get past events
   */
  getPast: async (limit?: number): Promise<EventItem[]> => {
    const endpoint = limit ? `/events/past?limit=${limit}` : '/events/past';
    return apiClient.get(endpoint);
  },

  /**
   * Create new event (requires authentication)
   */
  create: async (eventData: CreateEventRequest, token: string): Promise<EventItem> => {
    return apiClient.post('/events', eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update event (requires authentication)
   */
  update: async (id: number, eventData: UpdateEventRequest, token: string): Promise<EventItem> => {
    return apiClient.put(`/events/${id}`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete event (requires authentication)
   */
  delete: async (id: number, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Add image to event gallery
   */
  addGalleryImage: async (id: number, imageUrl: string, token: string): Promise<EventItem> => {
    return apiClient.post(`/events/${id}/gallery`, { imageUrl }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
