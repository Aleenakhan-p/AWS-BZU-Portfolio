import { apiClient } from './apiClient';
import { Participant, TeamKey } from '../features/participants/types';

export interface Team {
  id: string;
  name: TeamKey;
  description?: string;
  lead?: Participant;
  members: Participant[];
  memberCount: number;
}

export interface CreateTeamRequest {
  name: TeamKey;
  description?: string;
  leadId?: number;
}

export interface UpdateTeamRequest extends Partial<CreateTeamRequest> {}

/**
 * Team Services
 * Handles CRUD operations for teams
 */
export const teamServices = {
  /**
   * Get all teams
   */
  getAll: async (): Promise<Team[]> => {
    return apiClient.get('/teams');
  },

  /**
   * Get team by ID/name
   */
  getById: async (teamId: string): Promise<Team> => {
    return apiClient.get(`/teams/${teamId}`);
  },

  /**
   * Get team by name
   */
  getByName: async (name: TeamKey): Promise<Team> => {
    return apiClient.get(`/teams/name/${name}`);
  },

  /**
   * Get team members
   */
  getMembers: async (teamId: string): Promise<Participant[]> => {
    return apiClient.get(`/teams/${teamId}/members`);
  },

  /**
   * Get team lead
   */
  getLead: async (teamId: string): Promise<Participant | null> => {
    return apiClient.get(`/teams/${teamId}/lead`);
  },

  /**
   * Create new team (requires authentication)
   */
  create: async (teamData: CreateTeamRequest, token: string): Promise<Team> => {
    return apiClient.post('/teams', teamData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update team (requires authentication)
   */
  update: async (teamId: string, teamData: UpdateTeamRequest, token: string): Promise<Team> => {
    return apiClient.put(`/teams/${teamId}`, teamData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Delete team (requires authentication)
   */
  delete: async (teamId: string, token: string): Promise<{ message: string }> => {
    return apiClient.delete(`/teams/${teamId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Add member to team (requires authentication)
   */
  addMember: async (teamId: string, memberId: number, token: string): Promise<Team> => {
    return apiClient.post(`/teams/${teamId}/members`, { memberId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Remove member from team (requires authentication)
   */
  removeMember: async (teamId: string, memberId: number, token: string): Promise<Team> => {
    return apiClient.delete(`/teams/${teamId}/members/${memberId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Set team lead (requires authentication)
   */
  setLead: async (teamId: string, memberId: number, token: string): Promise<Team> => {
    return apiClient.patch(`/teams/${teamId}/lead`, { memberId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
