import { Grid, TextField, Typography } from "@mui/material"

import React from "react"
import { connect } from "react-redux"
import text from "../../dictionary"

const PersonalDetails = ({ language, handleChange, fields }) => {
  return (
    <>
      <Typography gutterBottom variant="h5">
        {text.yourDetails[language]}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label={text.name[language]}
            name="name"
            value={fields.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label={text.email[language]}
            name="email"
            value={fields.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label={text.phone[language]}
            name="phone"
            value={fields.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            label={text.address[language]}
            name="address"
            value={fields.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label={`NIE/DNI/${text.passport[language]}`}
            name="identification"
            value={fields.identification}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(PersonalDetails)
