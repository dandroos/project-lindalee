import { Box, Container, Grid, Link, Typography, useTheme } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import Address from "./Address"
import LocationMap from "./LocationMap"
import React from "react"
import Schedule from "./Schedule"
import { connect } from "react-redux"
import text from "../dictionary"

const Footer = ({ language }) => {
  const { title } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata

  const getCopyrightYear = () => {
    const currentYear = new Date().getFullYear()

    if (currentYear > 2022) {
      return `2022 - ${currentYear}`
    } else {
      return `2022`
    }
  }

  const theme = useTheme()

  return (
    <Box
      component="footer"
      textAlign="center"
      bgcolor="secondary.dark"
      color="common.white"
      py={4}
      sx={{
        boxShadow: `0px -5px 30px inset ${theme.palette.common.black}66`,
      }}
    >
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <LocationMap />
          </Grid>
          <Grid item xs={12} md={6}>
            <Address />
            <Schedule />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Typography variant="caption" display="block">
              {text.allContent[language]} &copy;{" "}
              {getCopyrightYear() + " " + title}
            </Typography>
            <Typography variant="caption" display="block">
              {text.website[language] + ": "}
              <Link
                href="mailto:dandrewsuk82@gmail.com"
                target="_blank"
                color="inherit"
                underline="hover"
              >
                Dave Andrews
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(Footer)
