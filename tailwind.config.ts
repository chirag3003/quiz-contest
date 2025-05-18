/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4682B4',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#66CDAA',
          foreground: '#000000',
        },
        accent: {
          DEFAULT: '#FFD700',
          foreground: '#000000',
        },
        background: {
          DEFAULT: '#F0F0F0',
          foreground: '#333333',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#333333',
        },
        border: '#F0F0F0',
        input: '#F0F0F0',
        ring: '#4682B4',
        foreground: '#333333',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
