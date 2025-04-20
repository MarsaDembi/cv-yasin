const config = {
    darkMode: "class",
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          body: ['Roboto', 'sans-serif'],
        },
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          primary: "var(--primary)",
          "primary-foreground": "var(--primary-foreground)",
          muted: "#fef2f2",
          card: "#fff1f2",
          "card-foreground": "#4b0000"
        },
      },
    },
    plugins: [],
  };
  
  export default config;
  