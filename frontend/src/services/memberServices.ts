import { apiClient } from './apiClient';
import { Participant } from '../features/participants/types';

export interface CreateMemberRequest {
  name: string;
  role: string;
  team: string;
  level: 'Lead' | 'Core' | 'Builder' | 'Developer';
  email?: string;
  image?: string;
  campus?: string;
  responsibilities?: string;
  desc?: string;
}

export interface UpdateMemberRequest extends Partial<CreateMemberRequest> {}

/**
 * Member Services
 * Handles CRUD operations for team members and participants
 */
export const memberServices = {
  /**
   * Get all members
   */
  getAll: async (filters?: { team?: string; level?: string }): Promise<Participant[]> => {
    const params = new URLSearchParams();
    if (filters?.team) params.append('team', filters.team);
    if (filters?.level) params.append('level', filters.level);

    const queryString = params.toString();
    const endpoint = queryString ? `/members?${queryString}` : '/members';
    return apiClient.get(endpoint);
  },

  /**
   * Get member by ID
   */
  getById: async (id: number): Promise<Participant> => {
    return apiClient.get(`/members/${id}`);
  },

  /**
   * Get members by team
   */
  getByTeam: async (teamName: string): Promise<Participant[]> => {
    return apiClient.get(`/members/team/${teamName}`);
  },

  /**
   * Get members by level
   */
  getByLevel: async (level: string): Promise<Participant[]> => {
    return apiClient.get(`/members/level/${level}`);
  },

  /**
   * Get member by name
   */
  getByName: async (name: string): Promise<Participant | null> => {
    return apiClient.get(`/members/search/${name}`);
  },

  /**
   * Get leaderboard (sorted by points)
   */
  getLeaderboard: async (limit?: number): Promise<Participant[]> => {
    const endpoint = limit ? `/members/leaderboard?limit=${limit}` : '/members/leaderboard';
    return apiClient.get(endpoint);
  },

  /**
   * Create new member (requires authentication)
   */
  create: async (memberData: CreateMemberRequest, token: string): Promise<Participant> => {
    return apiClient.post('/members', memberData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update member (requires authentication)
   */
  update: async (id: number, memberData: UpdateMemberRequest, token: string): Promise<Participant> => {
    return apiClient.put(`/members/${id}`, memberData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete member (requires authentication)
   */
  delete: async (id: number, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/members/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Add points to member (requires authentication)
   */
  addPoints: async (id: number, points: number, token: string): Promise<Participant> => {
    return apiClient.post(`/members/${id}/points`, { points }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update member status/role
   */
  updateRole: async (id: number, role: string, level: string, token: string): Promise<Participant> => {
    return apiClient.patch(`/members/${id}/role`, { role, level }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
