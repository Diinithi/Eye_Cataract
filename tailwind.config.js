/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e7f0f8',
          100: '#c5d9ef',
          200: '#9ec0e5',
          300: '#76a7db',
          400: '#5893d3',
          500: '#185FA5',
          600: '#14528f',
          700: '#104376',
          800: '#0c355e',
          900: '#082645',
        },
        success: {
          50: '#e8f6f2',
          100: '#c4e8df',
          200: '#9cd9ca',
          300: '#74cab5',
          400: '#56bfa5',
          500: '#0F6E56',
          600: '#0c5b48',
          700: '#094a3b',
          800: '#063a2d',
          900: '#042920',
        },
        warning: {
          50: '#fdf4e6',
          100: '#fbe5c1',
          200: '#f8d498',
          300: '#f5c36f',
          400: '#f3b751',
          500: '#BA7517',
          600: '#9d6112',
          700: '#804e0e',
          800: '#633a09',
          900: '#462806',
        },
        danger: {
          50: '#fcf0f0',
          100: '#f6dada',
          200: '#eec1c1',
          300: '#e6a6a6',
          400: '#e09090',
          500: '#A32D2D',
          600: '#892525',
          700: '#6f1e1e',
          800: '#551717',
          900: '#3b0f0f',
        },
        background: '#F8F9FA',
        surface: '#FFFFFF',
        border: '#e0e0e0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bar-grow': 'barGrow 0.8s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        barGrow: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
