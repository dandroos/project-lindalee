import { CssBaseline, ThemeProvider } from "@mui/material"

import { Helmet } from "react-helmet"
import React from "react"
import { theme } from "../../src/theme"

const SiteWrapper = ({ children }) => {
  return (
    <>
      <Helmet>
        <link href="https://fonts.cdnfonts.com/css/meticula" rel="stylesheet" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default SiteWrapper
