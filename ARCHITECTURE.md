# StoreForge AI - Architecture Documentation

## System Overview

StoreForge AI is a modern, full-stack B2B SaaS platform built with Next.js 16, leveraging the App Router for optimal performance and developer experience.

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage (expandable)

### Backend
- **API**: Next.js API Routes
- **Runtime**: Node.js
- **Storage**: In-memory (ready for database integration)
- **AI**: Pattern-based generation (ready for AI API integration)

## Project Structure

```
storeforge-ai/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── generate/             # AI content generation
│   │   │   └── route.ts
│   │   └── stores/               # Store CRUD operations
│   │       ├── route.ts          # List/Create stores
│   │       └── [id]/
│   │           └── route.ts      # Get/Update/Delete store
│   ├── builder/                  # Store creation wizard
│   │   └── page.tsx
│   ├── dashboard/                # Store management
│   │   └── page.tsx
│   ├── preview/                  # Store preview with themes
│   │   └── page.tsx
│   ├── themes/                   # Theme showcase
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   └── Button.tsx
├── lib/                          # Core business logic
│   ├── ai-generator.ts           # AI content generation
│   ├── store.ts                  # Store data management
│   ├── themes.ts                 # Theme definitions
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── ARCHITECTURE.md               # This file
├── FEATURES.md                   # Feature documentation
├── QUICKSTART.md                 # Quick start guide
├── README.md                     # Main documentation
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Core Modules

### 1. AI Generation System (`lib/ai-generator.ts`)

#### Purpose
Generates store content based on brand information and product data.

#### Key Components

**Industry Detection**
```typescript
function detectIndustry(brandName: string, description?: string): Industry
```
- Analyzes brand name and description
- Returns matching industry category
- Supports: fashion, tech, food, health, home, default

**Brand Content Generation**
```typescript
function generateStoreContent(brandInfo: BrandInfo, products: ProductInput[]): GeneratedStore
```
- Generates brand tagline
- Creates color schemes
- Generates brand description
- Processes all products

**Product Enhancement**
```typescript
function suggestProductEnhancements(products: ProductInput[]): string[]
```
- Analyzes product data
- Returns improvement suggestions

#### Data Structures

```typescript
interface GeneratedStore {
  brandName: string;
  tagline: string;
  description: string;
  colorScheme: ColorScheme;
  products: GeneratedProduct[];
}
```

### 2. Store Management (`lib/store.ts`)

#### Purpose
Handles all store CRUD operations.

#### Key Functions

```typescript
createStore(storeData): Store
getStoreById(id: string): Store | undefined
getStoresByUserId(userId: string): Store[]
updateStore(id: string, updates: Partial<Store>): Store | undefined
deleteStore(id: string): boolean
publishStore(id: string): Store | undefined
```

#### Storage Strategy

**Current**: In-memory array
- Fast for development
- No persistence between restarts
- Perfect for prototyping

**Future**: Database integration ready
- PostgreSQL for relational data
- MongoDB for flexible schema
- Redis for caching

### 3. Theme System (`lib/themes.ts`)

#### Purpose
Defines and manages store themes.

#### Theme Structure

```typescript
interface Theme {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'modern' | 'classic' | 'minimal' | 'bold';
  features: string[];
}
```

#### Available Themes

1. **Modern Minimal** - Clean, professional
2. **Bold & Vibrant** - Eye-catching, energetic
3. **Classic Elegant** - Sophisticated, luxury
4. **Tech Modern** - Sleek, modern
5. **Boutique Chic** - Trendy, fashionable
6. **Minimal Zen** - Ultra-minimal, calm
7. **Urban Edge** - Dark, edgy
8. **Organic Natural** - Earth-toned, eco-friendly

### 4. Type System (`lib/types.ts`)

#### Core Types

```typescript
Store          // Complete store data
Product        // Product information
Theme          // Theme definition
User           // User account
ColorScheme    // Brand colors
```

## Application Flow

### Store Creation Flow

```
1. Landing Page (/)
   ↓
2. Builder (/builder)
   ├─ Step 1: Brand Info
   ├─ Step 2: Products
   ├─ Step 3: Theme Selection
   └─ Step 4: Preview
   ↓
3. AI Generation (automatic)
   ├─ Detect industry
   ├─ Generate tagline
   ├─ Create color scheme
   └─ Generate product content
   ↓
4. Preview (/preview)
   ├─ Render selected theme
   └─ Display generated content
   ↓
5. Publish
   └─ Store saved to storage
   ↓
6. Dashboard (/dashboard)
   └─ Manage all stores
```

### Data Flow

```
User Input
   ↓
Builder Component (React State)
   ↓
AI Generator (lib/ai-generator.ts)
   ↓
Generated Content
   ↓
Store Manager (lib/store.ts)
   ↓
Storage Layer (In-memory/Database)
   ↓
API Routes (/api/stores)
   ↓
Client Components
   ↓
User Interface
```

## Component Architecture

### Page Components

**Landing Page (`app/page.tsx`)**
- Marketing content
- Feature highlights
- Pricing plans
- Call-to-action

**Builder (`app/builder/page.tsx`)**
- Multi-step wizard
- Form validation
- State management
- AI integration

**Dashboard (`app/dashboard/page.tsx`)**
- Store list
- Statistics
- Quick actions
- Analytics

**Preview (`app/preview/page.tsx`)**
- Theme rendering
- Dynamic styling
- Responsive layout
- Publish controls

**Themes (`app/themes/page.tsx`)**
- Theme gallery
- Feature lists
- Quick selection

### API Routes

**Generate API (`app/api/generate/route.ts`)**
```typescript
POST /api/generate
Input: { brandInfo, products }
Output: { store: GeneratedStore }
```

**Stores API (`app/api/stores/route.ts`)**
```typescript
GET  /api/stores?userId=xxx
POST /api/stores
```

**Store Detail API (`app/api/stores/[id]/route.ts`)**
```typescript
GET    /api/stores/[id]
PUT    /api/stores/[id]
DELETE /api/stores/[id]
```

## State Management

### Client State
- React hooks (useState, useEffect)
- Local component state
- No global state library (by design)

### Server State
- API routes for data fetching
- Server-side rendering
- Static generation where possible

### Persistent State
- localStorage for temporary data
- Cookies for user sessions (ready)
- Database for permanent storage (ready)

## Styling Architecture

### Tailwind CSS Strategy

**Utility-First Approach**
- Direct className usage
- No custom CSS files (except globals)
- Responsive modifiers (md:, lg:)
- State variants (hover:, focus:)

**Color System**
```typescript
colorScheme: {
  primary: string;    // Main brand color
  secondary: string;  // Background/secondary color
  accent: string;     // Call-to-action color
  background: string; // Page background
  text: string;       // Text color
}
```

**Responsive Breakpoints**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## Theme Rendering System

### Dynamic Theme Application

```typescript
// Each theme has a renderer function
const renderModernMinimal = () => {
  // Uses store.colorScheme for dynamic colors
  // Applies theme-specific layouts
  // Returns complete page structure
}
```

### Theme Features

**Layout Variations**
- Header styles
- Hero sections
- Product grids
- Footer designs

**Typography**
- Font families
- Size scales
- Weight variations
- Letter spacing

**Color Application**
- Background colors
- Text colors
- Border colors
- Hover states

## Performance Optimization

### Next.js Optimizations

**Static Generation**
- Pre-rendered pages
- Fast initial load
- SEO-friendly

**Code Splitting**
- Automatic code splitting
- Route-based splitting
- Dynamic imports ready

**Image Optimization**
- Next.js Image component ready
- Lazy loading
- Responsive images

### Rendering Strategy

**Pages**
- `/` - Static (SSG)
- `/themes` - Static (SSG)
- `/builder` - Client-side
- `/dashboard` - Client-side
- `/preview` - Client-side

**API Routes**
- Dynamic (SSR)
- Edge-ready
- Serverless-compatible

## Security Considerations

### Current Implementation

**Input Validation**
- Type checking with TypeScript
- Runtime validation in APIs
- Sanitization ready

**XSS Prevention**
- React escapes by default
- No dangerouslySetInnerHTML usage
- Safe HTML rendering

### Future Enhancements

**Authentication**
- NextAuth.js integration ready
- JWT token support
- Session management

**Authorization**
- Role-based access control
- Resource ownership validation
- API key management

**Data Protection**
- HTTPS enforcement
- CSRF protection
- Rate limiting

## Scalability Design

### Horizontal Scaling

**Stateless Architecture**
- No server-side sessions
- API routes are stateless
- Easy to replicate

**Database Strategy**
- Connection pooling ready
- Read replicas support
- Caching layer ready

### Vertical Scaling

**Code Optimization**
- Tree shaking
- Minification
- Compression

**Resource Management**
- Efficient data structures
- Lazy loading
- Pagination ready

## Integration Points

### Database Integration

**PostgreSQL Example**
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function createStore(data: StoreData) {
  const result = await pool.query(
    'INSERT INTO stores (...) VALUES (...)',
    [data]
  );
  return result.rows[0];
}
```

### AI API Integration

**OpenAI Example**
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateContent(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });
  return response.choices[0].message.content;
}
```

### Payment Integration

**Stripe Example**
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createSubscription(customerId: string, priceId: string) {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }]
  });
}
```

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run lint

# Build production
npm run build
```

### Testing Strategy

**Unit Tests** (Ready for implementation)
- Jest + React Testing Library
- Component testing
- Utility function testing

**Integration Tests** (Ready for implementation)
- API route testing
- E2E flows
- Database integration

**E2E Tests** (Ready for implementation)
- Playwright/Cypress
- User flow testing
- Cross-browser testing

## Deployment Architecture

### Vercel Deployment (Recommended)

**Automatic Deployments**
- Git push → Auto deploy
- Preview deployments
- Production deployments

**Edge Network**
- Global CDN
- Edge functions
- Fast worldwide access

**Configuration**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Self-Hosted Deployment

**Docker Setup** (Ready)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Monitoring & Analytics

### Performance Monitoring (Ready for)
- Web Vitals tracking
- Error tracking (Sentry)
- Performance metrics
- User analytics

### Business Metrics
- Store creation rate
- User engagement
- Conversion tracking
- Revenue metrics

## Future Architecture Enhancements

### Phase 1: Database Integration
- PostgreSQL/MongoDB setup
- Migration system
- Connection pooling
- Query optimization

### Phase 2: Real AI Integration
- OpenAI API
- Claude API
- Custom fine-tuned models
- Prompt optimization

### Phase 3: Advanced Features
- Real-time collaboration
- WebSocket support
- Advanced caching
- Microservices architecture

### Phase 4: Scale
- Load balancing
- Database sharding
- CDN optimization
- Multi-region deployment

## Code Organization Principles

### File Naming
- kebab-case for files: `ai-generator.ts`
- PascalCase for components: `Button.tsx`
- camelCase for functions: `generateStoreContent`

### Import Order
1. External dependencies
2. Internal modules
3. Types
4. Utilities

### Component Structure
```typescript
// Imports
import { ... } from '...';

// Types
interface Props { }

// Component
export default function Component(props: Props) {
  // Hooks
  // Handlers
  // Render
}
```

## Best Practices

### TypeScript Usage
- Strict mode enabled
- No `any` types
- Interface over type
- Proper generics

### React Patterns
- Functional components
- Custom hooks for logic
- Composition over inheritance
- Props drilling avoided

### Performance
- Lazy loading components
- Memoization where needed
- Efficient re-renders
- Code splitting

---

This architecture is designed to be:
- **Scalable**: Easy to add features
- **Maintainable**: Clear structure
- **Performant**: Optimized delivery
- **Secure**: Best practices
- **Extensible**: Ready for integrations
