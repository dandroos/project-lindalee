import "moment/locale/de"
import "moment/locale/es"

import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { Grid, TextField, Typography } from "@mui/material"

import React from "react"
import { connect } from "react-redux"
import moment from "moment"
import text from "../../dictionary"

const TripDetails = ({ language, fields, setFields }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h5">
          {text.tripDetails[language]}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DatePicker
            label={text.startDate[language]}
            inputFormat="DD/MM/yyyy"
            value={fields.dateFrom}
            renderInput={params => <TextField {...params} />}
            onChange={e => setFields({ ...fields, dateFrom: e })}
            minDate={moment(Date.now())}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label={text.endDate[language]}
            inputFormat="DD/MM/yyyy"
            value={fields.dateTo}
            minDate={fields.dateFrom}
            renderInput={params => <TextField {...params} />}
            onChange={e => setFields({ ...fields, dateTo: e })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TimePicker
            label={text.arrivalTime[language]}
            shouldDisableTime={(timeValue, clockType) => {
              switch (clockType) {
                case "hours":
                  if (timeValue >= 9 && timeValue < 14) {
                    return false
                  } else if (timeValue >= 16 && timeValue < 19) {
                    return false
                  }
                  return true
                case "minutes":
                  if (timeValue % 5) {
                    return true
                  }
                  return false
                default:
                  return
              }
            }}
            value={fields.timeDropOff}
            renderInput={params => <TextField {...params} />}
            onChange={e => setFields({ ...fields, timeDropOff: e })}
            minutesStep={5}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TimePicker
            label={text.colectionTime[language]}
            ampm
            shouldDisableTime={(timeValue, clockType) => {
              switch (clockType) {
                case "hours":
                  if (timeValue >= 9 && timeValue < 14) {
                    return false
                  } else if (timeValue >= 16 && timeValue < 19) {
                    return false
                  }
                  return true
                case "minutes":
                  if (timeValue % 5) {
                    return true
                  }
                  return false
                default:
                  return
              }
            }}
            value={fields.timePickUp}
            renderInput={params => <TextField {...params} />}
            onChange={e => setFields({ ...fields, timePickUp: e })}
            minutesStep={5}
          />
        </Grid>
      </Grid>
    </>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(TripDetails)
