import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Link as MLink,
  Grid,
  useTheme,
  Divider,
} from "@mui/material"
import { Link, graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { Email, Phone, Whatsapp } from "mdi-material-ui"
import React, { useEffect } from "react"
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import { nav } from "../../nav"
import Address from "../components/Address"
import ContactForm from "../components/ContactForm"
import LocationMap from "../components/LocationMap"
import Page from "../components/Page"
import Schedule from "../components/Schedule"
import { setLanguage, setLocationId } from "../redux/actions"

const ContactPage = ({ dispatch, currLanguage, pageContext }) => {
  const { language, title } = pageContext

  const data = useStaticQuery(graphql`
    {
      contact: file(
        sourceInstanceName: { eq: "admin" }
        name: { eq: "contact" }
      ) {
        childMarkdownRemark {
          frontmatter {
            phoneNumber_en
            phoneNumber_es
            emailAddress
          }
        }
      }
      img: file(sourceInstanceName: { eq: "pages" }, name: { eq: "contact" }) {
        childMarkdownRemark {
          frontmatter {
            featured_image {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 2.6
                  transformOptions: { cropFocus: CENTER }
                )
              }
            }
          }
        }
      }
      mobileImg: file(
        sourceInstanceName: { eq: "pages" }
        name: { eq: "contact" }
      ) {
        childMarkdownRemark {
          frontmatter {
            featured_image {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.3)
              }
            }
          }
        }
      }
    }
  `)

  const image = getImage(
    data.img.childMarkdownRemark.frontmatter.featured_image
  )
  const mobileImage = getImage(
    data.mobileImg.childMarkdownRemark.frontmatter.featured_image
  )

  const { phoneNumber_en, phoneNumber_es, emailAddress } =
    data.contact.childMarkdownRemark.frontmatter

  const displayPhoneNumber_en = `+34 ${phoneNumber_en.substr(
    0,
    3
  )} ${phoneNumber_en.substr(3, 3)} ${phoneNumber_en.substr(6, 3)}`

  const displayPhoneNumber_es = `+34 ${phoneNumber_es.substr(
    0,
    3
  )} ${phoneNumber_es.substr(3, 3)} ${phoneNumber_es.substr(6, 3)}`

  useEffect(() => {
    dispatch(setLocationId("contact"))
    if (language !== currLanguage) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])

  const text = {
    bookingRequest: {
      en: "If you would like to make a reservation, please click here.",
      es: "Si desea hacer una reserva, por favor haga clic aquí.",
      de: "Wenn Sie eine Reservierung vornehmen möchten, klicken Sie bitte hier.",
    },
    phoneUs: {
      en: "Phone us",
      es: "Llámanos",
      de: "Rufen",
    },
    emailUs: {
      en: "Email us",
      es: "Email",
      de: "E-mail",
    },
  }

  const theme = useTheme()

  return (
    <Page title={title} noCTA img={image} mobImg={mobileImage}>
      <MLink
        color="secondary"
        underline="hover"
        component={Link}
        to={`/${
          language +
          (() => {
            return nav[language].filter(i => {
              return i.id === "book"
            })[0].url
          })()
        }`}
      >
        {text.bookingRequest[language]}
      </MLink>
      <List>
        <Divider />
        <ListItemButton
          divider
          component="a"
          href={`tel:34${phoneNumber_en}`}
          target="_blank"
        >
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            disableTypography
            primary={
              <Box display="flex" alignItems="center">
                <Typography>{text.phoneUs[language]}</Typography>
                <ReactCountryFlag
                  countryCode="gb"
                  svg
                  style={{ marginLeft: 10 }}
                />
              </Box>
            }
            secondary={
              <Typography variant="caption">{displayPhoneNumber_en}</Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          divider
          component="a"
          href={`tel:34${phoneNumber_es}`}
          target="_blank"
        >
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            disableTypography
            primary={
              <Box display="flex" alignItems="center">
                <Typography>{text.phoneUs[language]}</Typography>
                <ReactCountryFlag
                  countryCode="es"
                  svg
                  style={{ marginLeft: 10 }}
                />
                <ReactCountryFlag
                  countryCode="gb"
                  svg
                  style={{ marginLeft: 10 }}
                />
              </Box>
            }
            secondary={
              <Typography variant="caption">{displayPhoneNumber_es}</Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          divider
          component="a"
          href={`https://wa.me/34${phoneNumber_es}`}
          target="_blank"
        >
          <ListItemIcon>
            <Whatsapp />
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            disableTypography
            primary={
              <Box display="flex" alignItems="center">
                <Typography>WhatsApp</Typography>
                <ReactCountryFlag
                  countryCode="es"
                  svg
                  style={{ marginLeft: 10 }}
                />
                <ReactCountryFlag
                  countryCode="gb"
                  svg
                  style={{ marginLeft: 10 }}
                />
              </Box>
            }
            secondary={
              <Typography variant="caption">{displayPhoneNumber_es}</Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          divider
          component="a"
          href={`mailto:${emailAddress}`}
          target="_blank"
        >
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            disableTypography
            primary={<Typography>{text.emailUs[language]}</Typography>}
            secondary={
              <Typography variant="caption">{emailAddress}</Typography>
            }
          />
        </ListItemButton>
      </List>
      <ContactForm />
      <Box
        p={1}
        bgcolor="primary.main"
        boxShadow={`.15rem .15rem .5rem ${theme.palette.common.black}99`}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LocationMap />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Address />
            <Schedule />
          </Grid>
        </Grid>
      </Box>
    </Page>
  )
}

const stp = s => ({
  currLanguage: s.language,
})

export default connect(stp)(ContactPage)
