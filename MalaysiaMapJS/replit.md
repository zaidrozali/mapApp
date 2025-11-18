# Malaysian State Projects Directory

## Project Overview
A fullstack JavaScript web application that showcases development projects across Malaysian states. The application features an interactive HTML5 map of Malaysia where users can click on states to view associated projects, filter by categories and status, and explore comprehensive project information.

## Current State (November 18, 2025)
✅ **Fully functional on Replit**
- **Interactive D3.js Malaysia map** with clickable states and choropleth coloring
- Project directory with 16 sample projects across all Malaysian states
- Real-time filtering using interactive map and state selection buttons
- Search functionality
- Responsive design with light/dark theme support
- RESTful API backend serving project data
- Configured for Replit environment with proper port and host settings
- ✅ **Successfully imported and configured for Replit environment**
  - Node.js 20 installed
  - All dependencies installed
  - Workflow configured to run on port 5000
  - Deployment settings configured for production
  - Application running and verified

## Tech Stack

### Frontend
- **React** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** (React Query v5) for data fetching and caching
- **Tailwind CSS** for styling with custom design system
- **Shadcn UI** components
- **HTML5 Interactive Map** (custom worldmap.js and mapdata.js)

### Backend
- **Express.js** server
- **In-memory storage** (MemStorage) for project data
- **Drizzle ORM** schemas with Zod validation

## Project Structure

```
├── client/
│   ├── public/
│   │   ├── worldmap.js         # Interactive map library
│   │   └── mapdata.js          # Malaysia map data and state definitions
│   └── src/
│       ├── components/
│       │   ├── Navigation.tsx   # Top navigation with theme toggle
│       │   ├── Hero.tsx         # Hero section with hero image
│       │   ├── MalaysiaMap.tsx  # Interactive map component
│       │   ├── ProjectCard.tsx  # Individual project display
│       │   ├── ProjectFilters.tsx # Filter controls (synchronized with parent)
│       │   ├── StateBadge.tsx   # State abbreviation badges
│       │   ├── StatusIndicator.tsx # Project status badges
│       │   └── Footer.tsx       # Footer with links
│       └── pages/
│           └── Home.tsx         # Main page with map and projects
├── server/
│   ├── storage.ts              # In-memory data storage with sample data
│   └── routes.ts               # API endpoints for projects
└── shared/
    └── schema.ts               # TypeScript types and Zod schemas
```

## Key Features

### 1. Interactive Malaysia Map
- Custom SVG-based map with all 13 Malaysian states
- Clickable states that filter projects
- Hover effects for better UX
- Project count badges for each state
- Scripts load once per session for optimal performance
- Map remains interactive across React Query refetches

### 2. Project Management
- 16 sample projects across all states
- Categories: Infrastructure, Development, Social, Economic
- Status tracking: Ongoing, Completed, Planned
- Detailed project information including location and description

### 3. Advanced Filtering System
- **Synchronized filtering**: Map clicks and filter badges work together
- Search by project name or description
- Filter by multiple states simultaneously
- Filter by project category
- Filter by project status
- Real-time filter application
- "Clear All" button to reset filters
- "View all states" button to clear state-specific filters

### 4. Design System
- **Colors**: Professional blue-gray palette with Malaysian government portal aesthetics
- **Typography**: Inter for headings/body, JetBrains Mono for monospace
- **Components**: Shadcn UI components with custom elevation system
- **Theme**: Full dark mode support with localStorage persistence

## API Endpoints

### GET /api/projects
Retrieves all projects or filters by state
```
Query params:
  - state (optional): Filter by state name
Response: Array of Project objects
```

### GET /api/projects/:id
Retrieves a specific project by ID
```
Response: Single Project object or 404
```

### POST /api/projects
Creates a new project
```
Body: {
  title: string,
  description: string,
  state: string,
  location: string,
  category: string,
  status: string
}
Response: Created Project object
```

## Malaysian States Covered
1. Johor - 1 project
2. Kedah - 1 project
3. Kelantan - 1 project
4. Melaka - 1 project
5. Negeri Sembilan - 1 project
6. Pahang - 1 project
7. Penang - 1 project
8. Perak - 2 projects
9. Perlis - 1 project
10. Selangor - 2 projects
11. Terengganu - 1 project
12. Sabah - 2 projects
13. Sarawak - 1 project

**Total: 16 projects**

## Sample Projects by Category
- **Infrastructure** (4): MRT lines, highways, water treatment, flood control
- **Economic** (5): Digital hubs, agriculture, fisheries, industrial parks, border zones
- **Social** (3): Electrification, heritage conservation, wildlife conservation
- **Development** (4): Land reclamation, tourism circuits, eco-tourism, industrial zones

## HTML5 Map Integration
The map is implemented using custom JavaScript files:
- **worldmap.js**: Core map rendering engine with SVG generation
- **mapdata.js**: Malaysia-specific configuration and state definitions
- Module-level promise ensures scripts load exactly once
- State click events trigger synchronized filtering
- Hover effects provide visual feedback
- Idempotent initialization prevents conflicts during React remounts

## Architecture Highlights

### Filter Synchronization
The application uses a **single source of truth** for filtering:
- `filters` state managed in `Home.tsx`
- `ProjectFilters` receives filters as props and calls parent callback on changes
- `MalaysiaMap` state clicks update the same filters state
- All UI elements (map, badges, clear buttons) stay synchronized
- Prevents filter conflicts and ensures consistent behavior

### Map Script Loading
- Module-level `scriptsLoadPromise` prevents duplicate script injection
- Global flag `window.__mapScriptsLoaded` guards against reinitialization
- Callback routing through refs keeps latest handlers without rebinding
- Auto-load disabled after initial load for manual control
- Solution maintains interactivity across React Query refetches and route changes

## Development

### Running the Application
```bash
npm run dev
```
The workflow "Start application" runs automatically and serves both frontend and backend on port 5000.

### Adding New Projects
Projects can be added via:
1. POST to `/api/projects` endpoint
2. Modifying `initializeSampleProjects()` in `server/storage.ts`

### Testing
End-to-end tests verify:
- Map interaction and state filtering
- Filter synchronization between map and controls
- Search functionality
- Theme toggle persistence
- API endpoint responses
- Project count accuracy

## Design Guidelines
See `design_guidelines.md` for comprehensive design specifications including:
- Color palette and theming
- Typography hierarchy
- Component structure
- Layout system
- Responsive behavior

## Replit Environment Setup (November 18, 2025)
- ✅ Installed Node.js 20 and all npm dependencies
- ✅ Installed D3.js library for interactive map visualization
- ✅ Configured workflow "Start Application" on port 5000
- ✅ Set up deployment configuration for production
- ✅ Added .gitignore for Node.js projects
- ✅ Vite configured with allowedHosts for Replit proxy
- ✅ Server configured to bind to 0.0.0.0:5000
- ✅ Integrated D3.js with Malaysia GeoJSON data for interactive state map

## Recent Changes (November 18, 2025)

### Initial Implementation
- ✅ Implemented backend API with project CRUD operations
- ✅ Created custom HTML5 Malaysia map (worldmap.js + mapdata.js)
- ✅ Integrated interactive map with click handlers
- ✅ Connected frontend to backend API using React Query
- ✅ Added 16 sample projects across all Malaysian states
- ✅ Implemented real-time filtering and search
- ✅ Full responsive design with theme support

### Bug Fixes & Improvements
- ✅ Fixed map script reinitialization issue using module-level promise
- ✅ Synchronized state filtering between map clicks and filter badges
- ✅ Ensured map interactivity persists across React Query refetches
- ✅ Fixed "View all states" button to properly clear all state filters
- ✅ All end-to-end tests passing

## Future Enhancements
- Project detail pages with full information and images
- Admin dashboard for managing projects (add/edit/delete)
- Project submission form for users to propose new projects
- Data export functionality for project reports by state
- Enhanced map with project density heat visualization
- Project timeline views and status tracking
- Multi-language support (English, Bahasa Malaysia)
- Integration with actual government project databases

## Notes
- The application uses in-memory storage, so data resets on server restart
- For production use, migrate to PostgreSQL using the existing Drizzle schemas
- Map scripts are served from `/public` directory as static assets
- Theme preference persists in browser localStorage
