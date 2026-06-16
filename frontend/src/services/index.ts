/**Central export point for all services
  This makes it easier to import services throughout the application
 Usage:
 import { authServices, eventServices, memberServices } from '@/services';
 */

export { apiClient, type ApiResponse, type ApiError } from './apiClient';
export { authServices, type AuthResponse, type LoginRequest, type RegisterRequest } from './authServices';
export { eventServices, type CreateEventRequest, type UpdateEventRequest } from './eventServices';
export { blogServices, type CreateBlogRequest, type UpdateBlogRequest } from './blogServices';
export { memberServices, type CreateMemberRequest, type UpdateMemberRequest } from './memberServices';
export { teamServices, type Team, type CreateTeamRequest, type UpdateTeamRequest } from './teamServices';
export {
  portfolioServices,
  partnerServices,
  universityServices,
  type CreatePortfolioRequest,
  type UpdatePortfolioRequest,
  type CreatePartnerRequest,
  type UpdatePartnerRequest,
  type CreateUniversityRequest,
  type UpdateUniversityRequest,
} from './collaborationServices';
export {
  recognitionServices,
  type Recognition,
  type CreateRecognitionRequest,
  type UpdateRecognitionRequest,
} from './recognitionServices';
