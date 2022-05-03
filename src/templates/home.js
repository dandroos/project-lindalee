import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Carousel } from "react-responsive-carousel"
import { setLanguage, setLocationId } from "../redux/actions"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { graphql, Link, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import { nav } from "../../nav"
import Seo from "../components/seo"

const HomePage = ({ dispatch, pageContext, isMobile, siteReady }) => {
  const { language } = pageContext

  useEffect(() => {
    dispatch(setLanguage(language))
    dispatch(setLocationId("home"))
    //eslint-disable-next-line
  }, [])

  const { slides } = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "pages" }, name: { eq: "homepage" }) {
        childMarkdownRemark {
          frontmatter {
            slides {
              slide {
                overlay
                button {
                  link
                  text {
                    en
                    es
                    de
                  }
                }
                heading {
                  en
                  es
                  de
                }
                image {
                  childImageSharp {
                    gatsbyImageData(quality: 75, placeholder: BLURRED)
                  }
                }
                main {
                  en
                  es
                  de
                }
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
  const theme = useTheme()
  return (
    siteReady && (
      <>
        <Seo homepage title="" language={language} />
        <Carousel
          showThumbs={false}
          infiniteLoop
          showArrows={!isMobile}
          showStatus={false}
          autoPlay={true}
          interval={6000}
          stopOnHover={false}
        >
          {slides.map(({ slide }, ind) => {
            let bgImage = getImage(slide.image)
            bgImage = convertToBgImage(bgImage)
            return (
              <BackgroundImage {...bgImage} alt="Hero image" key={ind}>
                <Box
                  flexDirection="column"
                  display="flex"
                  minHeight="100vh"
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                  color={(() => {
                    switch (slide.overlay) {
                      case "light":
                        return theme.palette.common.black
                      case "dark":
                        return theme.palette.common.white
                      case "primary":
                        return theme.palette.primary.contrastText
                      case "secondary":
                        return theme.palette.secondary.contrastText
                      default:
                        return
                    }
                  })()}
                >
                  <Box
                    width="100%"
                    py={2}
                    pb={5}
                    position="absolute"
                    bottom={0}
                    //   mt={28}
                    bgcolor={() => {
                      switch (slide.overlay) {
                        case "light":
                          return `${theme.palette.common.white}aa`
                        case "dark":
                          return `${theme.palette.common.black}aa`
                        case "primary":
                          return `${theme.palette.primary.main}aa`
                        case "secondary":
                          return `${theme.palette.secondary.main}aa`
                        default:
                          return
                      }
                    }}
                    boxShadow={`0px -1rem 3rem ${theme.palette.common.black}aa`}
                  >
                    <Container>
                      <Typography variant="h4" variantMapping={{ h4: "h3" }}>
                        {slide.heading[language]}
                      </Typography>
                      <Typography variant="lead" display="block" gutterBottom>
                        {slide.main[language]}
                      </Typography>
                      <Button
                        size="large"
                        component={Link}
                        to={(() =>
                          `/${
                            language +
                            nav[language].filter(i => {
                              return slide.button.link === i.id
                            })[0].url
                          }`)()}
                        color={(() => {
                          switch (slide.overlay) {
                            case "light":
                            case "dark":
                            case "secondary":
                              return "primary"
                            case "primary":
                              return "secondary"
                            default:
                              return
                          }
                        })()}
                      >
                        {slide.button.text[language]}
                      </Button>
                    </Container>
                  </Box>
                </Box>
              </BackgroundImage>
            )
          })}
        </Carousel>
      </>
    )
  )
}

const stp = s => ({
  siteReady: s.siteReady,
  isMobile: s.isMobile,
})

export default connect(stp)(HomePage)
