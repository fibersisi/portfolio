/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                cyber: {
                    cyan: '#00f3ff',
                    magenta: '#ff00ff',
                    dark: '#050508',
                    glass: 'rgba(255, 255, 255, 0.05)',
                }
            }
        },
    },
    plugins: [],
}
