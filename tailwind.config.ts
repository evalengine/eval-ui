import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic':
  				'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  		},
  		keyframes: {
  			'slide-up': {
  				'0%': { transform: 'translateY(100%)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' },
  			},
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' },
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				},
  			}
  		},
  		animation: {
  			'slide-up': 'slide-up 0.3s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'fade-in-up': 'fade-in-up 0.5s ease-out forwards'
  		},
  		fontFamily: {
  			sans: [
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'SF Pro Display',
  				'Segoe UI',
  				'Roboto',
  				'Ubuntu',
  				'sans-serif'
  			],
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
  					fontSize: '1.125rem',
  					lineHeight: '1.8',
  					p: {
  						marginTop: '1.5em',
  						marginBottom: '1.5em',
  					},
  					h1: {
  						fontWeight: '600',
  						letterSpacing: '-0.015em',
  					},
  					h2: {
  						fontWeight: '600',
  						letterSpacing: '-0.015em',
  					},
  					h3: {
  						fontWeight: '600',
  						letterSpacing: '-0.015em',
  					}
  				}
  			}
  		},
  	}
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
};
export default config;
