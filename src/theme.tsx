import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  max: "100em",
});

const theme = extendTheme({
  colors: {
    primary: "#18191A",
    secondary: "#242526",
    tertiary: "#303031",
    hover: "#3A3B3C",
    active: "#2D86FF",
    textPrimary: "#D5D6DA",
    textSecondary: "#ffffff",
    buttonSuccess: "#42b72a",
    pinkLove: "#FD637F",
    yellowEmoji: "#FFE76D",
    redAngry: "#E2410D"
  },
  fonts,
  breakpoints,
  components: {
    Button: {
      variants: {
        basic: {
          bg: "secondary",
          _hover: { backgroundColor: "hover" },
          _active: { backgroundColor: "hover" },
        },
      },
    },
  },
});

export default theme;
