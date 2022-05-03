import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "../../src/theme"
import { Helmet } from "react-helmet"

const SiteWrapper = ({ children }) => {
  return (
    <>
      <Helmet>
        <link href="http://fonts.cdnfonts.com/css/meticula" rel="stylesheet" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default SiteWrapper
