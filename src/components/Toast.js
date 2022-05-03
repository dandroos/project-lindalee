import { Alert, Snackbar } from "@mui/material"

import React from "react"
import { connect } from "react-redux"
import { setToast } from "../redux/actions"

const Toast = ({ dispatch, toast, isOpen, msg, severity }) => {
  const handleClose = () => {
    dispatch(setToast({ ...toast, open: false }))
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{
        onExit: () => dispatch(setToast({ ...toast, msg: "" })),
      }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        This is a success message!
      </Alert>
    </Snackbar>
  )
}

const stp = s => ({
  toast: s.toast,
  isOpen: s.toast.open,
  msg: s.toast.msg,
  severity: s.toast.severity,
})

export default connect(stp)(Toast)
