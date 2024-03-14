"use client"

import styles from "@/styles/AlertDialogue.module.css"
import { Button, ThemeProvider, createTheme } from "@mui/material"
import { useEffect, useState } from "react"

export default function AlertDialogue({ setClose, errorDescription }) {
    const [alertDescription, setAlertDescription] = useState()
    var description = `${errorDescription}`

    //--THEME--//
    const theme = createTheme({
      typography: {
        fontFamily: 'eightbitFortress'
      },
      palette: {
        retroPurple: { 
          main: '#9665ff',
          contrastText: '#000',
        }
      },
      components: {
        MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                '&:hover': {
                  color: "#fff"
                }, 
              }
            },
            defaultProps: {
              color: "retroPurple",
            }
          },
        }
    })

    function handleClose(){
        setClose()
    }

    useEffect(() => {
        setAlertDescription(description)
    }, [description])

    if(alertDescription == "undefined"){ setAlertDescription("Access Denied") }

    return(
        <ThemeProvider theme={theme}>
            <h1 className={styles.text}>{alertDescription}</h1>
            <div className={styles.button}>
              <Button variant="contained" disableRipple autoFocus onClick={handleClose}>Oki Doki</Button>
            </div>
        </ThemeProvider>
    )
}