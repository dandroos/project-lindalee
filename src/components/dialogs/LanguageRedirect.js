import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Portal,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { setLanguage, setShowLanguageRedirect } from "../../redux/actions"

import { connect } from "react-redux"
import text from "../../dictionary"

const LanguageRedirect = ({ dispatch, isOpen, redirectLang }) => {
  const handleClose = () => {
    dispatch(setShowLanguageRedirect({ open: false }))
  }

  const handleClick = e => {
    if (checked) {
      localStorage.setItem("manohecha_lang_redirect", "1")
    }
    switch (e.target.id) {
      case "redirect":
        localStorage.setItem("manohecha_lang_pref", redirectLang)
        dispatch(setLanguage(redirectLang))
        handleClose()
        break
      case "cancel-redirect":
        handleClose()
        break
      default:
        break
    }
  }
  const [checked, setChecked] = useState(false)

  return (
    <Portal>
      <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h6">
            {text.languageRedirectTitle[redirectLang]}
          </Typography>
          <Typography>{text.languageRedirectBody[redirectLang]}</Typography>
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={<Checkbox onChange={e => setChecked(e.target.checked)} />}
            label={
              <Typography variant="caption">
                {text.dontShow[redirectLang]}
              </Typography>
            }
            disableTypography
          />
          <Button color="success" id="redirect" onClick={handleClick}>
            {text.yes[redirectLang]}
          </Button>
          <Button color="error" id="cancel-redirect" onClick={handleClick}>
            {text.no[redirectLang]}
          </Button>
        </DialogActions>
      </Dialog>
    </Portal>
  )
}

const stp = s => ({
  isOpen: s.showLanguageRedirect.open,
  redirectLang: s.showLanguageRedirect.redirectLang,
})

export default connect(stp)(LanguageRedirect)
