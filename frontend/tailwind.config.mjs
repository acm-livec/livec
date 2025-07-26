import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#1f2937', // gray-800
                        },
                        h2: {
                            fontSize: '2rem',
                            fontWeight: '600',
                            color: '#374151', // gray-700
                        },
                        h3: {
                            fontSize: '1.75rem',
                            fontWeight: '600',
                            color: '#4b5563',
                        },
                    },
                },
            },
        },
        fontFamily: {
            monts: ['Montserrat', 'sans-serif'],
        },
    },
    plugins: [typography],
};
