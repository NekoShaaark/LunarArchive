"use client"

import styles from "@/styles/AlertDialogue.module.css"
import { Button, ThemeProvider, createTheme } from "@mui/material"
import { useEffect, useState } from "react"

export default function AlertDialogue({ setClose, errorDescription }) {
    const [alertDescription, setAlertDescription] = useState()
    const [themeGlobalColor, setThemeGlobalColor] = useState("#c31c1c")
    var description = `${errorDescription}`

    //--THEME--//
    const theme = createTheme({
      typography: {
        fontFamily: 'eightbitFortress'
      },
      palette: {
        themeGlobal: { 
          main: `${themeGlobalColor}`,
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
            color: "themeGlobal",
          }
        },
      }
    })

    function handleClose(){
      setClose()
    }

    useEffect(() => {
      setThemeGlobalColor(localStorage.getItem("globalColor")) //set theme color
      setAlertDescription(description)
    }, [description])

    if(alertDescription == "undefined"){ setAlertDescription("Access Denied") }


    return(
      <div className={styles.alertBody}>
        <ThemeProvider theme={theme}>
            <h1 className={styles.text}>{alertDescription}</h1>
            <div className={styles.button}>
              <Button disableRipple autoFocus variant="contained" sx={{fontSize:"medium"}} onClick={handleClose}>
                Oki Doki
              </Button>
            </div>
        </ThemeProvider>
      </div>
    )
}