// This file re-exports partner-related services from collaborationServices
// for easier imports throughout the application

export {
  partnerServices,
  universityServices,
  type CreatePartnerRequest,
  type UpdatePartnerRequest,
  type CreateUniversityRequest,
  type UpdateUniversityRequest,
} from './collaborationServices';
