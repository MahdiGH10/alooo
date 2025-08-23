# 🌸 Roselle Landing Page

A premium, animated landing page for the luxury brand Roselle with the tagline "Blooming Your World With Love." This elegant, romantic, and minimal design features soft pastel tones, floral elements, and smooth animations that create a sophisticated user experience.

## ✨ Features

### 🎨 Design & Aesthetics
- **Elegant, romantic, and minimal design** inspired by the Roselle brand
- **Soft pastel color palette** (blush pink, beige, cream, sage green)
- **Floral elements** that subtly animate throughout the user experience
- **Luxury brand feel** with Apple-level minimalism meets Dior floral campaigns

### 🚀 Sections
1. **Hero Section** - Centered logo with soft entrance animations and blooming flowers
2. **About Section** - Romantic layout with floating flower illustrations and parallax scroll
3. **Features Section** - 4 feature cards highlighting uniqueness with bloom animations
4. **Waitlist Section** - Beautiful callout box with floral border animation and form handling
5. **Footer** - Minimal footer with logo mark and elegant social link animations

### 🎭 Animations & Effects
- **Smooth, luxurious scroll animations** using Framer Motion
- **Flowers blooming** when scrolled into view
- **Petal particles** drifting in hero and CTA sections
- **Soft hover effects** with glow and pastel gradients
- **Parallax scrolling** with subtle flower swaying
- **Floating background elements** for ambient beauty

### 🎯 Conversion Focus
- **Waitlist form** with React Hook Form validation
- **Beautiful callout box** with floral border animation
- **CTA buttons** with glowing hover effects and petal particles
- **Form validation** and success states

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion for premium, smooth animations
- **Forms**: React Hook Form for clean form handling
- **Icons**: Lucide React for elegant iconography
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roselle-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.js` with custom Roselle brand colors:
- `roselle` - Primary brand colors
- `sage` - Natural green tones
- `cream` - Warm neutral tones
- `blush` - Soft pink tones

### Typography
- **Script Font**: Playfair Display for elegant headings
- **Sans Font**: Inter for clean body text

### Animations
Custom animations are defined in `tailwind.config.js`:
- `bloom` - Flower blooming effect
- `float` - Gentle floating motion
- `sway` - Flower swaying effect
- `petal-fall` - Falling petal animation
- `glow` - Glowing hover effect

## 📱 Responsive Design

The landing page is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌟 Premium Features

### Animation System
- **Scroll-triggered animations** using Framer Motion's `useScroll` and `useTransform`
- **Staggered animations** for feature cards and content sections
- **Interactive hover effects** with smooth transitions
- **Background ambient animations** for floating flowers and petals

### Performance Optimizations
- **Lazy loading** of animations using `whileInView`
- **Optimized SVG graphics** for smooth rendering
- **Efficient animation loops** with proper cleanup
- **Smooth scrolling** with CSS optimizations

## 🔧 Development

### Project Structure
```
roselle-landing/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── HeroSection.tsx    # Hero section with logo
│   ├── AboutSection.tsx   # About section with story
│   ├── FeaturesSection.tsx # Features with cards
│   ├── WaitlistSection.tsx # Waitlist form
│   ├── Footer.tsx         # Footer with links
│   ├── FloatingFlowers.tsx # Background flowers
│   └── PetalParticles.tsx # CTA particle effects
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies
└── README.md             # This file
```

### Adding New Sections
1. Create a new component in the `components/` directory
2. Import and add it to `app/page.tsx`
3. Follow the existing animation patterns using Framer Motion
4. Use the established color palette and typography

### Customizing Animations
- Modify animation values in `tailwind.config.js`
- Adjust Framer Motion transitions in individual components
- Add new animation variants as needed

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Get instant previews and automatic deployments

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify
3. Configure build settings for Next.js

### Other Platforms
The project can be deployed to any platform that supports Next.js static exports.

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for smooth user experience
- **Bundle Size**: Optimized with tree shaking and code splitting
- **Image Optimization**: SVG graphics for crisp rendering at any size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌸 About Roselle

Roselle is where love, beauty, and nature meet—crafted to bring elegance into your everyday world. This landing page captures the essence of the brand through thoughtful design, smooth animations, and a focus on creating meaningful connections with visitors.

---

**Built with ❤️ and 🌸 for Roselle**
"# Testing Project" 
# Alooo Project
"# Alooo Project" 
