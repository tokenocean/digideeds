module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,svelte}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#2596BE",
        secondary: "#52B9FF",
      },
    },
  },
  variants: {
    borderWidth: ["responsive", "hover", "focus"],
  },
};
