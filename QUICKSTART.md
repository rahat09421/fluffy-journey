# StoreForge AI - Quick Start Guide

Get your AI-powered e-commerce store up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Basic understanding of web applications (optional)

## Installation

```bash
# Clone or download the project
cd storeforge-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Creating Your First Store (5-Minute Guide)

### Step 1: Access the Platform (30 seconds)

1. Open your browser to `http://localhost:3000`
2. Click **"Start Building Free"** or **"Get Started"** button
3. You'll be redirected to the Store Builder

### Step 2: Enter Brand Information (1 minute)

1. **Brand Name**: Enter your brand name (e.g., "Luxe Fashion")
2. **Industry**: Select your industry from dropdown (optional)
   - Fashion & Apparel
   - Tech & Gadgets
   - Food & Beverage
   - Health & Wellness
   - Home & Living
   - Other
3. **Description**: Add a brief description OR leave empty for AI generation
4. Click **"Next"**

**Pro Tip**: Leave description empty to see AI magic in action!

### Step 3: Add Products (2 minutes)

Add at least one product:

1. **Product Name**: e.g., "Premium Leather Jacket"
2. **Category**: e.g., "Clothing" (optional)
3. **Price**: e.g., "299.99" (optional)

**Add More Products**:
- Click **"Add Another Product"** button
- Repeat for each product
- Remove products with trash icon if needed

Click **"Next"** when done.

**AI Will Generate**:
- Compelling product descriptions
- Feature lists
- Product tags
- SEO-optimized content

### Step 4: Choose Your Theme (1 minute)

1. Review your AI-generated brand identity:
   - Tagline
   - Color scheme
   - Brand colors

2. Select a theme:
   - **Modern Minimal**: Clean, professional
   - **Bold & Vibrant**: Eye-catching, energetic
   - **Classic Elegant**: Sophisticated, luxury
   - **Tech Modern**: Sleek, modern
   - And 4 more options!

3. Click **"Next"**

### Step 5: Preview & Publish (30 seconds)

1. Review your store summary:
   - Brand name
   - Tagline
   - Product count
   - Selected theme

2. Set your store URL:
   - Enter subdomain (e.g., "luxe-fashion")
   - Your URL: `luxe-fashion.storeforge.ai`

3. Preview AI-generated products

4. Click **"Preview Store"**

5. On preview page, click **"Publish Store"** to go live!

## Quick Tips

### For Best Results

**Brand Information**:
- Use descriptive brand names
- Select correct industry for better AI results
- Add brief description for more personalized content

**Products**:
- Add at least 3-5 products for better preview
- Include prices for accurate display
- Use clear, descriptive product names

**Themes**:
- Try different themes - you can change later
- Match theme to your industry
- Consider your target audience

### Common Use Cases

#### Fashion Brand
```
Brand: "Urban Style Co"
Industry: Fashion
Products: 
  - "Vintage Denim Jacket" - $89
  - "Classic White Sneakers" - $79
  - "Minimalist Backpack" - $65
Theme: Boutique Chic or Urban Edge
```

#### Tech Store
```
Brand: "TechHub Pro"
Industry: Tech & Gadgets
Products:
  - "Wireless Earbuds Pro" - $149
  - "Smart Watch Series X" - $299
  - "USB-C Hub 7-in-1" - $49
Theme: Tech Modern or Modern Minimal
```

#### Food Business
```
Brand: "Artisan Bakery"
Industry: Food & Beverage
Products:
  - "Sourdough Bread" - $8
  - "Croissant Pack (6)" - $12
  - "Organic Coffee Beans" - $18
Theme: Organic Natural or Classic Elegant
```

#### Wellness Brand
```
Brand: "ZenLife Wellness"
Industry: Health & Wellness
Products:
  - "Yoga Mat Premium" - $59
  - "Meditation Cushion" - $39
  - "Essential Oil Set" - $45
Theme: Minimal Zen or Organic Natural
```

## Dashboard Features

After creating your store, access the dashboard:

### View Your Stores
- Navigate to `/dashboard`
- See all your stores
- View statistics:
  - Views
  - Products
  - Revenue (demo)

### Manage Stores
- **Preview**: See your live store
- **Settings**: Edit store details
- **Analytics**: View performance metrics

### Create More Stores
- Click **"Create New Store"**
- Follow the same 5-step process
- Manage multiple brands easily

## Exploring Themes

Want to see all available themes?

1. Click **"Explore Themes"** on homepage
2. Or navigate to `/themes`
3. Browse 8+ professional themes
4. Click **"Use This Theme"** to start building

Each theme includes:
- Preview mockup
- Feature list
- Category tag
- Description

## API Usage (Advanced)

### Generate Store Content

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "brandInfo": {
      "brandName": "My Store",
      "industry": "fashion"
    },
    "products": [
      {
        "name": "Product 1",
        "price": 99
      }
    ]
  }'
```

### Create Store via API

```bash
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "My Store",
    "subdomain": "my-store",
    "themeId": "modern-minimal",
    "products": []
  }'
```

## Troubleshooting

### Server Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Errors
```bash
# Run type check
npm run lint

# Clean build
rm -rf .next
npm run build
```

### Store Not Saving
- Check browser console for errors
- Ensure localStorage is enabled
- Try different browser

### Theme Not Displaying
- Clear browser cache
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Check selected theme ID

## Next Steps

### Enhance Your Store
1. Add more products
2. Try different themes
3. Customize colors
4. Add product images (coming soon)

### Learn More
- Read full [README.md](./README.md)
- Check [FEATURES.md](./FEATURES.md)
- Explore API endpoints
- Review theme customization

### Deploy to Production
```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel
vercel deploy
```

## Support

Need help?
- Check documentation in `/docs`
- Review feature list in `FEATURES.md`
- Check API examples above
- Review code comments

## Pro Tips

1. **Start Simple**: Begin with 3-5 products, add more later
2. **Let AI Work**: Leave optional fields empty to see AI generation
3. **Try Themes**: Preview different themes before deciding
4. **Iterate**: You can always edit and republish
5. **Test Mobile**: Preview on different devices
6. **Use Analytics**: Monitor performance in dashboard

## What's Next?

After mastering the basics:
- Integrate payment processing
- Add user authentication
- Connect to real database
- Implement email notifications
- Add custom domains
- Integrate real AI APIs (OpenAI/Claude)

---

**Congratulations!** 🎉 You're ready to build amazing e-commerce stores with AI!

Questions? Check the full documentation or open an issue on GitHub.
