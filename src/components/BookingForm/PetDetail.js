import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material"

import { Delete } from "mdi-material-ui"
import React from "react"
import { connect } from "react-redux"
import text from "../../dictionary"

const PetDetail = ({ language, handleChange, pet, setFields, fields }) => {
  return (
    <Grid item xs={12}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          my: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl>
              <FormLabel id="type">{text.type[language]}</FormLabel>
              <RadioGroup
                aria-labelledby="type"
                defaultValue="dog"
                name="type"
                value={pet.type}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="dog"
                  control={<Radio inputProps={{ pet: "Y", id: pet.id }} />}
                  label={text.dog[language]}
                />
                <FormControlLabel
                  value="cat"
                  control={<Radio inputProps={{ pet: "Y", id: pet.id }} />}
                  label={text.cat[language]}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label={text.petName[language]}
              name="name"
              value={pet.name}
              onChange={handleChange}
              inputProps={{ pet: "Y", id: pet.id }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label={text.breed[language]}
              name="breed"
              value={pet.breed}
              onChange={handleChange}
              inputProps={{ pet: "Y", id: pet.id }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl>
              <FormLabel>{text.bath[language]}?</FormLabel>
              <RadioGroup
                value={pet.bath}
                name="bath"
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio inputProps={{ pet: "Y", id: pet.id }} />}
                  label={text.yes[language]}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio inputProps={{ pet: "Y", id: pet.id }} />}
                  label={text.no[language]}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <InputLabel id="preferred">
                {text.preferredFood[language]}
              </InputLabel>
              <Select
                labelId="preferred"
                name="preferredFood"
                value={pet.preferredFood}
                label={text.preferredFood[language]}
                onChange={e =>
                  setFields({
                    ...fields,
                    pets: fields.pets.map(p => {
                      if (p.id === pet.id) {
                        return {
                          ...pet,
                          preferredFood: e.target.value,
                        }
                      } else {
                        return p
                      }
                    }),
                  })
                }
                inputProps={{ pet: "Y", id: pet.id }}
              >
                <MenuItem value="unimportant" pet="Y">
                  {text.unimportant[language]}
                </MenuItem>
                <MenuItem value="self-supply" pet="Y">
                  {text.iWillSupply[language]}
                </MenuItem>
                <MenuItem value="affinity" pet="Y">
                  Affinity
                </MenuItem>
                <MenuItem value="specialised" pet="Y">
                  {text.specialised[language]}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <Button
              color="error"
              onClick={() => {
                setFields({
                  ...fields,
                  pets: fields.pets.filter(i => {
                    return i.id !== pet.id
                  }),
                })
              }}
              startIcon={<Delete />}
            >
              {text.removePet[language]}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
const stp = s => ({
  language: s.language,
})

export default connect(stp)(PetDetail)
