/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    'border-red-700', 'text-red-700', 'hover:bg-red-700', 'bg-red-700',
    'border-green-500', 'text-green-500', 'hover:bg-green-500', 'bg-green-500',
    'border-amber-700', 'text-amber-700', 'hover:bg-amber-700', 'bg-amber-700',
    'border-purple-700', 'text-purple-700', 'hover:bg-purple-700', 'bg-purple-700',
  ],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

