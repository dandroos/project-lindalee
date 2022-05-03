import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Fab,
  Grid,
  Portal,
  TextField,
  Typography,
} from "@mui/material"
import { Close, Paw, Send } from "mdi-material-ui"
import React, { useEffect, useState } from "react"

import PersonalDetails from "./BookingForm/PersonalDetails"
import PetDetail from "./BookingForm/PetDetail"
import TripDetails from "./BookingForm/TripDetails"
import { connect } from "react-redux"
import moment from "moment"
import { setBookingForm } from "../redux/actions"
import text from "../dictionary"
import uniqId from "uniqid"

const BookingForm = ({ dispatch, isOpen, isMobile, saveState, language }) => {
  const defaultFields = {
    name: "",
    email: "",
    phone: "",
    address: "",
    identification: "",
    dateFrom: moment(Date.now()),
    dateTo: moment(Date.now()),
    timeDropOff: moment(new Date()).set({ hour: 9, minute: 0, second: 0 }),
    timePickUp: moment(new Date()).set({ hour: 9, minute: 0, second: 0 }),
    pets: [],
    comments: "",
  }
  const [fields, setFields] = useState(defaultFields)

  const petFields = {
    type: "dog",
    name: "",
    breed: "",
    bath: "no",
    preferredFood: "unimportant",
  }

  const handleClose = () => {
    dispatch(setBookingForm({ isOpen: false, saveState: fields }))
  }

  const handleClick = e => {
    switch (e.currentTarget.id) {
      case "add":
        const newPet = Object.assign({}, { id: uniqId(), ...petFields })
        setFields({ ...fields, pets: fields.pets.concat([newPet]) })
        break
      default:
        break
    }
  }

  const handleChange = e => {
    if (e.currentTarget.getAttribute("pet")) {
      setFields({
        ...fields,
        pets: fields.pets.map(i => {
          if (e.currentTarget.id === i.id) {
            return {
              ...i,
              [e.target.name]: e.target.value,
            }
          } else {
            return i
          }
        }),
      })
    } else {
      setFields({ ...fields, [e.target.name]: e.target.value })
    }
  }

  useEffect(() => {
    if (isOpen) {
      if (saveState) {
        setFields(saveState)
      }
    }
    //eslint-disable-next-line
  }, [isOpen])

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)

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
        "form-name": "reservation",
        ...fields,
      }),
    }).then(() => {
      // setToast({
      //   open: true,
      //   msg: data.contact_us_contact_form_message_sent[
      //     `contact_us_contact_form_message_sent_${language}`
      //   ],
      //   severity: "success",
      // })
      setFields(defaultFields)
    })
    //   .catch(() =>
    // setToast({
    //   open: true,
    //   msg: data.contact_us_contact_form_message_failed[
    //     `contact_us_contact_form_message_failed_${language}`
    //   ],
    //   severity: "error",
    // })
    //   )
  }
  return (
    <Portal>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
        <Fab
          color="error"
          sx={{ position: "fixed", top: 15, right: 15 }}
          size="small"
          onClick={handleClose}
        >
          <Close />
        </Fab>
        <DialogContent>
          <Typography variant="h3">{text.bookingForm[language]}</Typography>
          <Divider sx={{ mb: 2 }} />
          <form
            onSubmit={handleSubmit}
            name="reservation"
            action="#"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="reservation" />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PersonalDetails handleChange={handleChange} fields={fields} />
              </Grid>
              <Grid item xs={12}>
                <TripDetails setFields={setFields} fields={fields} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection={isMobile ? "column" : undefined}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5">
                    {text.petDetails[language]}
                  </Typography>
                  <Button
                    id="add"
                    onClick={handleClick}
                    startIcon={<Paw />}
                    sx={{
                      my: isMobile ? undefined : 1,
                      mt: isMobile ? 1 : undefined,
                    }}
                  >
                    {text.addPet[language]}
                  </Button>
                </Box>
              </Grid>
              {!fields.pets.length > 0 ? (
                <Grid item xs={12} sx={{ my: 2 }}>
                  <Typography color="text.secondary" align="center">
                    {text.toContinue[language]}
                  </Typography>
                </Grid>
              ) : (
                fields.pets.map(pet => {
                  return (
                    <PetDetail
                      handleChange={handleChange}
                      pet={pet}
                      fields={fields}
                      setFields={setFields}
                    />
                  )
                })
              )}
              {fields.pets.length > 0 && (
                <Grid item xs={12}>
                  <TextField
                    required={false}
                    multiline
                    rows={5}
                    label={text.additionalComments[language]}
                    value={fields.comments}
                    onChange={handleChange}
                    name="comments"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  startIcon={<Send />}
                  color="success"
                  fullWidth
                  disabled={!fields.pets.length > 0}
                  type="submit"
                >
                  {text.send[language]}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Portal>
  )
}

const stp = s => ({
  isMobile: s.isMobile,
  isOpen: s.bookingForm.isOpen,
  saveState: s.bookingForm.saveState,
  language: s.language,
})

export default connect(stp)(BookingForm)
