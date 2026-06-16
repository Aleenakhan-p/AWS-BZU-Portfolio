# Frontend API Services Layer

## Overview
Complete API service layer for backend integration. All services are ready to communicate with your backend.

## Setup

### 1. Configure API URL
Create a `.env.local` file in your project root:

```env
VITE_API_URL=http://localhost:3000/api
```

For production:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### 2. Available Services

#### **authServices**
- `login()` - User login
- `register()` - User registration
- `verifyToken()` - Verify authentication token
- `logout()` - Logout user
- `refreshToken()` - Refresh auth token
- `requestPasswordReset()` - Request password reset
- `resetPassword()` - Reset password with token

#### **eventServices**
- `getAll()` - Get all events with filters
- `getById()` - Get specific event
- `getUpcoming()` - Get upcoming events
- `getPast()` - Get past events
- `create()` - Create new event
- `update()` - Update event
- `delete()` - Delete event
- `addGalleryImage()` - Add gallery image to event

#### **blogServices**
- `getAll()` - Get all blog posts with filters
- `getById()` - Get specific post
- `getByCategory()` - Get posts by category
- `search()` - Search posts
- `create()` - Create post
- `update()` - Update post
- `delete()` - Delete post
- `getRecent()` - Get recent posts

#### **memberServices**
- `getAll()` - Get all members with filters
- `getById()` - Get specific member
- `getByTeam()` - Get members by team
- `getByLevel()` - Get members by level
- `getByName()` - Search member by name
- `getLeaderboard()` - Get leaderboard sorted by points
- `create()` - Create member
- `update()` - Update member
- `delete()` - Delete member
- `addPoints()` - Add points to member
- `updateRole()` - Update member role/level

#### **teamServices**
- `getAll()` - Get all teams
- `getById()` - Get specific team
- `getByName()` - Get team by name
- `getMembers()` - Get team members
- `getLead()` - Get team lead
- `create()` - Create team
- `update()` - Update team
- `delete()` - Delete team
- `addMember()` - Add member to team
- `removeMember()` - Remove member from team
- `setLead()` - Set team lead

#### **collaborationServices**
Portfolio, Partner, and University services:
- `portfolioServices` - Manage portfolio items
- `partnerServices` - Manage partners
- `universityServices` - Manage universities

#### **recognitionServices**
- `getAll()` - Get recognitions
- `getById()` - Get specific recognition
- `getByMemberId()` - Get member recognitions
- `getByCategory()` - Get by category
- `create()` - Create recognition
- `update()` - Update recognition
- `delete()` - Delete recognition
- `getRecent()` - Get recent recognitions
- `createBulk()` - Bulk create recognitions

### 3. Usage Examples

```typescript
import { 
  authServices, 
  eventServices, 
  memberServices,
  teamServices 
} from '@/services';

// Login
const auth = await authServices.login({
  email: 'user@example.com',
  password: 'password'
});

// Get all events
const events = await eventServices.getAll({ 
  type: 'upcoming',
  limit: 10 
});

// Get members by team
const coreTeam = await memberServices.getByTeam('Core');

// Get team details
const team = await teamServices.getByName('Technical');

// Create new event (requires token)
const newEvent = await eventServices.create({
  title: 'AWS Workshop',
  date: '2024-07-15',
  type: 'upcoming',
  location: 'Campus',
  description: 'Cloud workshop'
}, token);
```

### 4. Authentication
Protected endpoints require a Bearer token in the Authorization header:

```typescript
// Token is automatically included in requests by passing it:
await eventServices.create(eventData, authToken);

// Or manually:
await apiClient.post('/events', eventData, {
  headers: { Authorization: `Bearer ${token}` }
});
```

### 5. Error Handling

```typescript
import { ApiError } from '@/services';

try {
  const user = await authServices.login({
    email: 'user@example.com',
    password: 'password'
  });
} catch (error) {
  const apiError = error as ApiError;
  console.error(`${apiError.status}: ${apiError.message}`);
  // Handle based on status code:
  // 401 - Unauthorized
  // 403 - Forbidden
  // 404 - Not Found
  // 500 - Server Error
}
```

### 6. Expected Backend API Structure

Your backend should implement these endpoints:

```
# Auth
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/verify
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/password-reset/request
POST   /api/auth/password-reset/confirm

# Events
GET    /api/events
GET    /api/events/:id
GET    /api/events/upcoming
GET    /api/events/past
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
POST   /api/events/:id/gallery

# Blog
GET    /api/blog
GET    /api/blog/:id
GET    /api/blog/category/:category
GET    /api/blog/search
GET    /api/blog/recent
POST   /api/blog
PUT    /api/blog/:id
DELETE /api/blog/:id

# Members
GET    /api/members
GET    /api/members/:id
GET    /api/members/team/:teamName
GET    /api/members/level/:level
GET    /api/members/search/:name
GET    /api/members/leaderboard
POST   /api/members
PUT    /api/members/:id
DELETE /api/members/:id
POST   /api/members/:id/points
PATCH  /api/members/:id/role

# Teams
GET    /api/teams
GET    /api/teams/:teamId
GET    /api/teams/name/:name
GET    /api/teams/:teamId/members
GET    /api/teams/:teamId/lead
POST   /api/teams
PUT    /api/teams/:teamId
DELETE /api/teams/:teamId
POST   /api/teams/:teamId/members
DELETE /api/teams/:teamId/members/:memberId
PATCH  /api/teams/:teamId/lead

# Collaborations
GET    /api/collaborations/portfolios
GET    /api/collaborations/portfolios/:id
POST   /api/collaborations/portfolios
PUT    /api/collaborations/portfolios/:id
DELETE /api/collaborations/portfolios/:id

GET    /api/collaborations/partners
GET    /api/collaborations/partners/:id
GET    /api/collaborations/partners/focus/:focus
POST   /api/collaborations/partners
PUT    /api/collaborations/partners/:id
DELETE /api/collaborations/partners/:id

GET    /api/collaborations/universities
GET    /api/collaborations/universities/:id
GET    /api/collaborations/universities/search
POST   /api/collaborations/universities
PUT    /api/collaborations/universities/:id
DELETE /api/collaborations/universities/:id

# Recognition
GET    /api/recognitions
GET    /api/recognitions/:id
GET    /api/recognitions/member/:memberId
GET    /api/recognitions/category/:category
GET    /api/recognitions/recent
POST   /api/recognitions
PUT    /api/recognitions/:id
DELETE /api/recognitions/:id
POST   /api/recognitions/bulk
```

### 7. Testing with Mock Data

Until your backend is ready, use mock data from your seed files:

```typescript
import { events } from '@/features/events/seed';

// Use local data temporarily
const mockEvents = events; // from seed.ts
```

### 8. CORS Configuration

Ensure your backend enables CORS for your frontend URL:

```javascript
// Example Node.js/Express
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  credentials: true
}));
```

---

**Ready to integrate!** Update `VITE_API_URL` when your backend is live.
