/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "btn-primary":
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    },
  },
  plugins: [],
};
