# Design Guidelines: Malaysian State Projects Directory

## Design Approach
**Hybrid Approach**: Combining Material Design's information hierarchy principles with Malaysian government portal aesthetics (clean, trustworthy, data-focused). Reference sites like gov.my portals and regional development websites for cultural context.

## Core Design Principles
1. **Map-Centric Design**: Interactive Malaysia map is the primary navigation and visual anchor
2. **Information Clarity**: Clear project data presentation with efficient filtering
3. **Malaysian Identity**: Incorporate subtle Malaysian design elements without overwhelming functionality
4. **Data Accessibility**: Easy-to-scan project listings with prominent state identification

## Typography
**Font Stack**: 
- Headings: Inter (700, 600) - Clean, modern, professional
- Body: Inter (400, 500) - Excellent readability for data
- Monospace: JetBrains Mono (400) for project IDs/codes

**Hierarchy**:
- Page Titles: text-4xl md:text-5xl font-bold
- Section Headers: text-2xl md:text-3xl font-semibold
- Project Titles: text-xl font-semibold
- Body Text: text-base
- Metadata/Labels: text-sm font-medium

## Layout System
**Spacing Units**: Tailwind units of 3, 4, 6, 8, 12, 16
- Container padding: px-4 md:px-8 lg:px-12
- Section spacing: py-12 md:py-16
- Card padding: p-6
- Element gaps: gap-4 to gap-8

**Container Widths**:
- Main content: max-w-7xl mx-auto
- Map section: w-full (contained within max-w-7xl)
- Project grids: grid with responsive columns

## Component Structure

### Hero Section
Large hero with Malaysian landmark image (KLCC, Penang Bridge, or Putrajaya) with subtle overlay
- Hero height: min-h-[60vh]
- Heading + subtitle explaining the project directory
- Primary CTA: "Explore Projects by State" (blurred background)
- Quick stats: Total projects, States covered, Active initiatives

### Interactive Map Section
**Map Container**: 
- Full width within container, aspect ratio maintained
- Sticky positioning on desktop (stays visible while scrolling projects)
- Clear state labels with hover effects
- Click interaction shows project count per state
- Legend showing project categories/status

### Project Listings
**Card-Based Grid**:
- Desktop: grid-cols-3
- Tablet: grid-cols-2  
- Mobile: grid-cols-1
- Each card includes: Project badge (state abbreviation), title, location, category tag, status indicator, brief description, "View Details" link

**Filtering Sidebar** (Desktop) / Top Bar (Mobile):
- State selector (all states)
- Category filter (Infrastructure, Development, Social, etc.)
- Status filter (Ongoing, Completed, Planned)
- Search by project name

### State Detail Pages
Two-column layout:
- Left: State information card (map highlight, statistics, description)
- Right: Project list specific to that state
- Breadcrumb navigation: Home > [State Name]

### Navigation
Top navigation bar (sticky):
- Logo/Site title (left)
- Main links: Home, All Projects, States, About (center)
- Search icon (right)

### Footer
Three-column layout:
- Column 1: Quick links to major states
- Column 2: Project categories
- Column 3: Contact information, social links
- Bottom bar: Copyright, privacy policy, accessibility statement

## Images
**Hero Image**: Malaysian landmark (KLCC skyline, Petronas Towers, or Putrajaya architecture) - wide landscape format with subtle gradient overlay for text readability

**State Thumbnails**: Use Malaysian state flag colors or landmark silhouettes as card headers (small, 60px height decorative elements)

## Visual Treatments
- **Cards**: Subtle border (border-gray-200), rounded-lg, hover:shadow-lg transition
- **State Badges**: Rounded pill badges with state abbreviation
- **Status Indicators**: Colored dots (green=completed, blue=ongoing, yellow=planned)
- **Map States**: Fill colors based on project density (light to saturated scale)

## Responsive Behavior
- Map switches from side-by-side with filters (desktop) to stacked (mobile)
- Filter sidebar becomes slide-out drawer on mobile
- Project grid adjusts from 3→2→1 columns
- Navigation condenses to hamburger menu on mobile
- Maintain map interactivity across all devices

## Micro-interactions
- Smooth state highlighting on map hover
- Card lift effect on hover (subtle shadow increase)
- Filter selections update count badge
- Lazy loading for project images
- Skeleton screens while map loads