import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Paw, Phone } from "mdi-material-ui"

import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Seo from "./seo"
import { connect } from "react-redux"
import { nav } from "../../nav"
import { setBookingForm } from "../redux/actions"
import text from "../dictionary"

const Page = ({
  dispatch,
  language,
  isMobile,
  siteReady,
  children,
  title,
  img,
  mobImg,
  noCTA,
  price,
  reservePage,
}) => {
  const siteTitle = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata.title

  const theme = useTheme()
  return (
    siteReady && (
      <>
        <Seo title={title} language={language} />
        <GatsbyImage
          image={isMobile ? mobImg : img}
          alt={`${siteTitle} - ${title}`}
        />
        <Container maxWidth="md" sx={{ mt: 1.5 }}>
          {title && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h2">{title}</Typography>
              {price && (
                <Paper
                  sx={{
                    p: 0.5,
                    px: 1,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  <Typography fontWeight="bold" variant="caption">
                    {price}
                  </Typography>
                </Paper>
              )}
            </Box>
          )}
          {children}
          {!noCTA && (
            <Box textAlign="center">
              {!reservePage ? (
                <>
                  <Typography variant="overline" display="block">
                    {text.moreInformation[language]}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/${
                      language +
                      nav[language].filter(i => i.id === "contact")[0].url
                    }`}
                    startIcon={<Phone />}
                  >
                    {text.getInTouch[language]}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => dispatch(setBookingForm({ isOpen: true }))}
                  startIcon={<Paw />}
                >
                  {text.makeAReservation[language]}
                </Button>
              )}
            </Box>
          )}
        </Container>
      </>
    )
  )
}

const stp = s => ({
  siteReady: s.siteReady,
  isMobile: s.isMobile,
  language: s.language,
})

export default connect(stp)(Page)
