import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#f5f5f5',
        secondary: '#d1d5db',
        accent: '#10b981',
      },
      fontSize: {
        body: '0.4rem',
        title: '0.4rem',
        subtitle: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
