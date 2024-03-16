import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function Notice({ open, severity, onClose, children }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {children}
      </MuiAlert>
    </Snackbar>
  )
}
