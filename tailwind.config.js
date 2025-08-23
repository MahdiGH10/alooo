/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Roselle brand colors
        roselle: {
          50: '#fef7f7',
          100: '#fdeeee',
          200: '#fbdcdc',
          300: '#f7c2c2',
          400: '#f19a9a',
          500: '#e86b6b',
          600: '#d94a4a',
          700: '#b83a3a',
          800: '#973232',
          900: '#7c2e2e',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7a8c7a',
          500: '#5c6e5c',
          600: '#475847',
          700: '#3a473a',
          800: '#2f3a2f',
          900: '#283128',
        },
        cream: {
          50: '#fefefe',
          100: '#fdfcfb',
          200: '#faf8f5',
          300: '#f5f1ea',
          400: '#ede4d7',
          500: '#e2d4c1',
          600: '#d1c0a7',
          700: '#b8a583',
          800: '#9c8a6a',
          900: '#7f7257',
        },
        blush: {
          50: '#fef7f7',
          100: '#fdeeee',
          200: '#fbdcdc',
          300: '#f7c2c2',
          400: '#f19a9a',
          500: '#e86b6b',
          600: '#d94a4a',
          700: '#b83a3a',
          800: '#973232',
          900: '#7c2e2e',
        },
        // Additional sophisticated colors
        luxury: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'script': ['var(--font-script)', 'serif'],
        'sans': ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 1s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
        'elegant-rotate': 'elegantRotate 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(217, 119, 6, 0.2)' },
          '50%': { borderColor: 'rgba(217, 119, 6, 0.4)' }
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        elegantRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 20px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 30px rgba(0, 0, 0, 0.06)',
        'elegant': '0 4px 20px rgba(217, 119, 6, 0.1), 0 2px 10px rgba(220, 38, 38, 0.05)',
      }
    },
  },
  plugins: [],
}
