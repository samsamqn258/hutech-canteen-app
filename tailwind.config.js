/** @type {import('tailwindcss').Config} */

module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#e57905',
                secondary: '#fff1d6',
                header: '#fff9d9',
                body: '#fefefe',
                dark: '#3e3e3e',
                darkLight: '#f5f5f5',
                gray: '#e3e3e3',
                white: '#fff',
                text: '#494949',
                textLight: '#7c7c7c',
                textDark: '#1d1d1d',
            },
            boxShadow: {
                '3xl': '20px 20px 20px 20px rgba(0, 0, 0, 0.5)',
            },
        },
    },
    plugins: [],
};
