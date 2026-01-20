# StoreForge AI - AI-Powered B2B E-commerce Platform

A complete SaaS platform that enables sellers to create AI-generated e-commerce sites by simply adding their brand name and products. Features multiple professional themes and templates for maximum user flexibility.

## 🚀 Features

### AI-Powered Content Generation
- **Brand Identity Generation**: Automatically creates taglines, descriptions, and color schemes based on brand name and industry
- **Product Content**: Generates compelling product descriptions, features, and SEO-optimized content
- **Smart Recommendations**: AI suggests improvements and enhancements for better conversions

### Multiple Themes & Templates
- **8+ Professional Themes**: Carefully designed themes for different industries and styles
  - Modern Minimal: Clean, professional design for fashion and lifestyle brands
  - Bold & Vibrant: Eye-catching design for creative brands
  - Classic Elegant: Timeless sophistication for luxury brands
  - Tech Modern: Sleek design for technology products
  - Boutique Chic: Trendy design for fashion retailers
  - Minimal Zen: Ultra-minimal for wellness brands
  - Urban Edge: Dark, edgy design for streetwear
  - Organic Natural: Earth-toned for eco-friendly products

### Complete B2B SaaS Platform
- **Multi-Store Management**: Users can create and manage multiple stores
- **Dashboard**: Comprehensive analytics and store management
- **Instant Publishing**: One-click deployment with custom subdomains
- **Theme Switching**: Change themes without losing content
- **Product Management**: Easy-to-use interface for adding and editing products

### Tiered Pricing Plans
- **Free**: 1 store, 10 products, basic themes
- **Starter ($19/mo)**: 3 stores, 50 products, all themes, analytics
- **Professional ($49/mo)**: 10 stores, unlimited products, premium themes, API access
- **Enterprise ($199/mo)**: Unlimited stores, custom themes, white label, SLA

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Hooks + Local Storage (expandable to database)

### Project Structure
```
/app
  /api                    # API routes for store operations
    /stores              # Store CRUD operations
    /generate            # AI content generation
  /builder               # Store creation wizard
  /dashboard             # Store management dashboard
  /preview               # Live store preview with themes
  /themes                # Theme showcase
  page.tsx               # Landing page
  layout.tsx             # Root layout

/lib
  ai-generator.ts        # AI content generation logic
  store.ts               # Store data management
  themes.ts              # Theme definitions
  types.ts               # TypeScript interfaces
  utils.ts               # Utility functions
```

## 🎯 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform.

### Building for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### Creating Your First Store

1. **Navigate to Builder** (`/builder`)
   - Enter your brand name (required)
   - Select your industry (optional)
   - Add brand description or let AI generate it

2. **Add Products**
   - Enter product names (required)
   - Add categories and prices
   - AI will generate descriptions and features

3. **Choose Theme**
   - Review AI-generated brand identity (colors, tagline)
   - Select from 8+ professional themes
   - Preview in real-time

4. **Preview & Publish**
   - Review all AI-generated content
   - Set your custom subdomain
   - Preview your store
   - Publish with one click

### Managing Stores

Access the dashboard at `/dashboard` to:
- View all your stores
- Monitor views and metrics
- Edit store settings
- Preview published stores
- Create new stores

### API Endpoints

#### Generate Store Content
```typescript
POST /api/generate
Body: {
  brandInfo: {
    brandName: string;
    industry?: string;
    description?: string;
  },
  products: Array<{
    name: string;
    category?: string;
    price?: number;
    features?: string[];
  }>
}
```

#### Create Store
```typescript
POST /api/stores
Body: {
  brandName: string;
  subdomain: string;
  themeId: string;
  colorScheme: object;
  products: array;
  // ... other fields
}
```

#### Get Stores
```typescript
GET /api/stores?userId=xxx
```

#### Update Store
```typescript
PUT /api/stores/[id]
Body: { /* fields to update */ }
```

#### Delete Store
```typescript
DELETE /api/stores/[id]
```

## 🎨 Theme Customization

Each theme is fully customizable with:
- Primary, secondary, and accent colors
- Typography styles
- Layout configurations
- Component variations

Themes are defined in `/lib/themes.ts` and rendered in `/app/preview/page.tsx`.

### Adding New Themes

1. Add theme definition in `/lib/themes.ts`
2. Create theme renderer in `/app/preview/page.tsx`
3. Add theme to selection in `/app/builder/page.tsx`

## 🤖 AI Generation System

The AI generation system (`/lib/ai-generator.ts`) includes:

- Industry detection from brand name and description
- Template-based content generation
- Color scheme generation based on industry
- Product description generation with SEO optimization
- Feature suggestion and enhancement recommendations

### Extending AI Capabilities

To integrate with real AI APIs (OpenAI, Claude, etc.):

1. Add API keys to environment variables
2. Replace template logic in `generateStoreContent()`
3. Implement API calls for content generation
4. Add error handling and rate limiting

## 🚀 Deployment

### Environment Variables

Create a `.env.local` file:

```env
# Optional: For future database integration
DATABASE_URL=your_database_url

# Optional: For AI API integration
OPENAI_API_KEY=your_openai_key

# Optional: For authentication
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=your_domain
```

### Deploy to Vercel

```bash
vercel deploy
```

The platform is optimized for Vercel deployment with:
- Automatic static optimization
- Incremental static regeneration
- Edge function support

## 📈 Future Enhancements

### Phase 1 (Current)
- ✅ AI content generation
- ✅ Multiple themes
- ✅ Store builder wizard
- ✅ Dashboard
- ✅ Preview system

### Phase 2 (Planned)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication (NextAuth)
- [ ] Payment processing (Stripe)
- [ ] Custom domain support
- [ ] Email notifications

### Phase 3 (Future)
- [ ] Real AI integration (OpenAI/Claude)
- [ ] Advanced analytics
- [ ] A/B testing
- [ ] Multi-language support
- [ ] Mobile app

## 🔧 Development

### Code Style
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Keep components client-side only when needed
- Use Tailwind for styling

### Testing

```bash
npm run lint
npm run type-check
```

## 📄 License

This project is part of a SaaS platform. All rights reserved.

## 🤝 Contributing

This is a private SaaS project. For questions or support, contact the development team.

## 🎯 Key Features Summary

✅ **AI-Powered**: Automatic content generation for brands and products
✅ **8+ Themes**: Professional, industry-specific templates
✅ **No-Code Builder**: Simple wizard-based store creation
✅ **Instant Preview**: Real-time store preview before publishing
✅ **Multi-Store**: Manage unlimited stores (plan-based)
✅ **Responsive**: Mobile-optimized themes
✅ **SEO-Ready**: AI-generated SEO-friendly content
✅ **B2B Model**: Complete SaaS platform with pricing tiers
✅ **Scalable**: Built on modern, performant stack

## 📞 Support

For technical support or feature requests, please contact:
- Email: support@storeforge.ai
- Documentation: /docs
- Community: /community

---

Built with ❤️ using Next.js, TypeScript, and AI
