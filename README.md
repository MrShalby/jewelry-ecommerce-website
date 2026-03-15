# Shalby Jewels

A premium luxury jewellery e-commerce website built with **Next.js 15**, **Tailwind CSS v4**, and **Framer Motion**. Features a stunning user interface with gold gradient theme, smooth animations, and a complete e-commerce experience.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss)

---

## ✨ Features

### E-Commerce Functionality
- 🛍️ **Product Catalog** - Browse 20+ handcrafted jewellery items
- 🔍 **Smart Filtering** - Filter by category, price, karat, and gender
- ❤️ **Wishlist** - Save favorite products for later
- 🛒 **Shopping Cart** - Add/remove items, manage quantities
- 💳 **Checkout** - Complete checkout flow with multiple payment methods

### User Interface
- 💫 **Animated Hero** - Gold particle effects and scroll progress
- 🎨 **Premium Design** - Gold gradient theme with dark background
- 📱 **Fully Responsive** - Mobile-first design, optimized for all devices
- 🖼️ **Image Gallery** - Masonry layout with lightbox viewer
- ⚡ **Smooth Animations** - Framer Motion animations throughout

### Pages & Sections
- 🏠 **Home** - Hero section, featured collections, bestsellers, testimonials
- 📦 **Shop** - Filterable product grid with sorting
- 🔍 **Product Details** - Image carousel, specifications, related products
- 🎭 **Gallery** - Masonry layout with category filtering
- ℹ️ **About** - Company story, timeline, team stats
- 📞 **Contact** - Contact form, store information, embedded map
- 🛒 **Checkout** - Cart review, shipping address, payment options
- ❤️ **Wishlist** - Saved products collection

### Technical Features
- 🚀 **Server-Side Rendering** - Next.js App Router
- 🎯 **Type Safety** - Full TypeScript support
- 🌓 **Global State** - React Context for cart and wishlist
- 📊 **SEO Optimized** - Metadata, structured data
- ♿ **Accessible** - WCAG compliant components

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18.17.0 or higher
- **npm** or **pnpm** package manager
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd jewelry-ecommerce-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📦 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **UI Components** | shadcn/ui, Radix UI |
| **Icons** | Lucide React |
| **State Management** | React Context API |
| **Particles** | tsParticles |
| **Forms** | React Hook Form |
| **Fonts** | Google Fonts (Inter, Playfair Display) |

---

## 📁 Project Structure

```
shalby-jewels/
├── app/                          # Next.js pages
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── about/page.tsx            # About page
│   ├── shop/page.tsx             # Shop with filters
│   ├── product/[id]/page.tsx     # Product details
│   ├── gallery/page.tsx          # Gallery
│   ├── contact/page.tsx          # Contact form
│   ├── checkout/page.tsx         # Checkout
│   └── wishlist/page.tsx         # Wishlist
│
├── components/                   # React components
│   ├── home/                     # Home sections
│   ├── shop/                     # Shop components
│   ├── products/                 # Product components
│   ├── layout/                   # Layout (navbar, footer)
│   ├── cart/                     # Cart drawer
│   ├── animations/               # Animation components
│   ├── theme-provider.tsx        # Theme setup
│   └── ui/                       # shadcn/ui components
│
├── hooks/                        # Custom React hooks
│   ├── use-store.tsx             # Cart & wishlist state
│   ├── use-mobile.ts             # Mobile detection
│   └── use-toast.ts              # Toast notifications
│
├── lib/                          # Utilities
│   ├── config.ts                 # Site configuration
│   └── utils.ts                  # Helper functions
│
├── data/                         # Data files
│   └── products.ts               # Product catalog
│
├── styles/                       # Global styles
│   └── globals.css               # Global CSS
│
└── public/                       # Static assets
```

---

## ⚙️ Configuration

### Site Settings

Edit `lib/config.ts` to customize:

```typescript
export const siteConfig = {
  name: "Shalby Jewels",
  tagline: "Where Tradition Meets Timeless Elegance",
  phone: "+91 79 2657 1234",
  whatsapp: "+919876543210",
  email: "contact@shalbyjewels.com",
  address: "123, Manek Chowk, Old City, Ahmedabad - 380001",
  social: {
    instagram: "https://instagram.com/shalbyjewels",
    facebook: "https://facebook.com/shalbyjewels",
  },
}
```

### Add Products

Edit `data/products.ts` to add products:

```typescript
{
  id: "1",
  name: "Product Name",
  category: "Necklaces",
  price: 125000,
  karat: "22K",
  gender: "women",
  images: ["https://images.unsplash.com/..."],
  description: "Product description",
  weight: "45g",
  sizes: ["16 inch", "18 inch", "20 inch"],
  featured: true,
  bestseller: true,
}
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev      # Start dev server (http://localhost:3000)

# Production
npm run build    # Create production build
npm start        # Run production server

# Linting
npm run lint     # Run ESLint
```

---

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized `.next` folder with all assets.

### Run Production Locally

```bash
npm start
```

### Deploy to Cloud

This Next.js app can be deployed to any platform:

- **[Vercel](https://vercel.com)** - One-click deployment from GitHub
- **[Netlify](https://netlify.com)** - Connect your GitHub repo
- **[AWS Amplify](https://aws.amazon.com/amplify/)** - AWS native deployment
- **[Railway](https://railway.app)** - Fast and simple
- **[Heroku](https://www.heroku.com/)** - Classic PaaS
- **[DigitalOcean](https://www.digitalocean.com/)** - Affordable VPS
- **Self-Hosted** - Any Linux server, Docker, or VPS

All platforms have built-in Next.js support.

---

## 📚 Documentation

For detailed setup and configuration instructions, see [SETUP.md](./SETUP.md).

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Clear Cache
```bash
rm -rf .next
npm run dev
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ |
| Firefox | Latest | ✅ |
| Safari | Latest | ✅ |
| Edge | Latest | ✅ |

---

## 📄 License

This project is **proprietary**. All rights reserved by Shalby Jewels.

---

## 📞 Support & Contact

For questions, support, or business inquiries:

- **Email:** contact@shalbyjewels.com
- **WhatsApp:** +91 98765 43210
- **Location:** Ahmedabad, Gujarat, India
- **Hours:** Mon-Fri 10:00 AM - 8:00 PM | Sat 10:00 AM - 9:00 PM | Sun 11:00 AM - 7:00 PM

---

## 🙏 Credits

Built with modern web technologies:
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Radix UI](https://www.radix-ui.com/) - Primitives

---

**Made with ❤️ for premium jewellery lovers**
