import { Box, Button, Grid, TextField, Typography } from "@mui/material"

import React from "react"
import { Send } from "mdi-material-ui"
import { connect } from "react-redux"
import { setToast } from "../redux/actions"
import text from "../dictionary"

const ContactForm = ({ dispatch, language }) => {
  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = e => {
    setFields({
      ...fields,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()

    const encode = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...fields,
      }),
    })
      .then(() => {
        dispatch(
          setToast({
            open: true,
            msg: "Sent successfully",
            severity: "success",
          })
        )
        setFields({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      })
      .catch(() =>
        dispatch(
          setToast({
            open: true,
            msg: "There was a problem",
            severity: "error",
          })
        )
      )
  }

  return (
    <Box my={2}>
      <Typography gutterBottom>{text.contactFormIntro[language]}</Typography>
      <form
        name="contact"
        action="#"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label={text.name[language]}
              name="name"
              required
              id="name"
              onChange={handleChange}
              value={fields.name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label={text.email[language]}
              name="email"
              required
              id="email"
              type="email"
              onChange={handleChange}
              value={fields.email}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label={text.phone[language]}
              name="phone"
              id="phone"
              onChange={handleChange}
              value={fields.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              minRows={5}
              variant="outlined"
              multiline
              required
              label={text.message[language]}
              name="message"
              id="message"
              onChange={handleChange}
              value={fields.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Send />}
            type="submit"
            size="large"
          >
            {text.send[language]}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

const stp = s => ({
  language: s.language,
  toast: s.toast,
})

export default connect(stp)(ContactForm)
