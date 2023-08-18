/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        card: { max: '500px' },
        mobile: { max: '390px' },
        tablet: { min: '390px', max: '767px' },
        pc: '768px',
        footer: { max: '650px' },
      },
      spacing: {
        page: '52px 0 63px',
      },
      backgroundImage: {
        checked: "url('/checked.png')",
        notChecked: "url('/notChecked.png')",
        circleChecked: "url('/CircleChecked.svg')",
        circleNotChecked: "url('/CircleNotChecked.svg')",
        blackCircle: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23000'/%3e%3c/svg%3e")`,
      },
      colors: {
        error: '#F60606',
      },
      animation: {
        clock: 'rotate-clock 4s forwards infinite',
        clockTop: 'clock-top-fill 4s linear forwards infinite',
        clockBottom: 'clock-bottom-fill 4s linear forwards infinite',
        lineChartLoading: 'line-chart-loading 4s infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
