/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'primary': '#D4AF37',
        'primary-dark': '#B38728',
        'primary-light': '#F5EED5',
        'secondary': '#1E293B',
        'background-dark': '#0F172A',
        'background-light': '#F8FAFC',
        'text-dark': '#0F172A',
        'text-light': '#F8FAFC',
        'accent-gray': '#F1F5F9',
        'accent-blue': '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px rgba(212, 175, 55, 0.15)',
        'card': '0 10px 30px rgba(15, 23, 42, 0.08)',
        'btn': '0 4px 14px rgba(15, 23, 42, 0.1)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B38728 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        'card-gradient': 'linear-gradient(to bottom, #FFFFFF, #F8FAFC)',
        'gold-radial-gradient': 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0) 70%)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 