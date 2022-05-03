import { black, primary, secondary, white } from "../palette"
import { createTheme, responsiveFontSizes } from "@mui/material"

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      tonalOffset: 0.15,
      primary: { main: primary },
      secondary: { main: secondary },
      common: {
        black: black,
        white: white,
      },
      background: {
        default: white,
        paper: white,
      },
    },
    typography: {
      fontFamily: "meticula",
      h1: {
        fontFamily: "meticula-bold",
        textTransform: "uppercase",
      },
      h2: {
        fontFamily: "meticula-bold",
        textTransform: "uppercase",
      },
      h3: {
        fontFamily: "meticula-bold",
        textTransform: "uppercase",
      },
      h4: {
        fontFamily: "meticula-bold",
        textTransform: "uppercase",
      },
      h5: {
        fontFamily: "meticula-bold",
        textTransform: "uppercase",
      },
      h6: {
        fontFamily: "meticula-bold",
        textTransform: "uppercase",
      },
      lead: {
        "@media (min-width:600px)": {
          fontSize: "1.2rem",
        },
        "@media (min-width:900px)": {
          fontSize: "1.3rem",
        },
        "@media (min-width:1200px)": {
          fontSize: "1.4rem",
        },
        fontSize: "1.15rem",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
      },
      MuiTextField: {
        defaultProps: {
          required: true,
          fullWidth: true,
          InputLabelProps: {
            required: false,
          },
        },
      },
    },
  })
)
