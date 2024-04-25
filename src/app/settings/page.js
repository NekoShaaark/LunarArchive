"use client"

import { useEffect, useState } from 'react'
import { Button, Slider, ThemeProvider, createTheme } from '@mui/material'
import { LeftIcon, RightIcon } from '@/components/SvgHandler'
import styles from '@/styles/Settings.module.css'
import { useRouter } from 'next/navigation'


export default function Settings({ setSelectedWallpaper, setSelectedTheme, setCurrentArrayIndex, setBrightnessValue, selectedWallpaper, selectedTheme, currentArrayIndex, brightnessValue }) {
  const router = useRouter()
  const wallpaperArray = ["Asteroid", "Starry", "WorldMachine"]
  const themeArray = ["Purple", "Red", "Blue", "Green", "White"]
  const [themeGlobalBackgroundColor, setThemeGlobalBackgroundColor] = useState("#c31c1c")
  const [themeGlobalHoverBackgroundColor, setThemeGlobalHoverBackgroundColor] = useState("#d13a3a")

  //--THEME--//
  const settingsTheme = createTheme({
    typography: {
      fontFamily: 'eightbitFortress'
    },
    palette: {
      themeGlobal: { 
        main: `${themeGlobalBackgroundColor}`,
        contrastText: '#000',
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            padding: 0,
            minWidth: '32px',
            borderRadius: 0,
            borderInline: `4px solid ${themeGlobalBackgroundColor}`,
            backgroundColor: `${themeGlobalBackgroundColor}`, //needs to be referenced in ``
            '&:hover': {
              backgroundColor: `${themeGlobalHoverBackgroundColor}` //needs to be referenced in ``
            }, 
          }
        },
      }
    }
  })


  //ON SERVER INIT & ON WALLPAPER/THEME UPDATE
  useEffect(() => {
    var rootStyle = document.documentElement.style
    var wallpaper = `/Wallpapers/Wallpaper-${selectedWallpaper}.webp`
    var globalColor
    var globalColorHover
    var globalHoverBorderColor
    var globalHoverBackgroundColor

    switch(selectedTheme){
      case "Purple": 
        globalColor = "#9665ff"
        globalColorHover = "#6a3ad1"
        globalHoverBorderColor = "rgba(106, 64, 197, 0.5)"
        globalHoverBackgroundColor = "rgba(44, 24, 87, 0.5)"
        break

      case "Red":
        globalColor = "#c31c1c"
        globalColorHover = "#d13a3a"
        globalHoverBorderColor = "rgba(197, 64, 64, 0.5)"
        globalHoverBackgroundColor = "rgba(87, 24, 24, 0.5)"
        break

      case "Blue":
        globalColor = "#3a62d1"
        globalColorHover = "#3a77d1"
        globalHoverBorderColor = "rgba(58, 81, 209, 0.5)"
        globalHoverBackgroundColor = "rgba(33, 41, 85, 0.5)"
        break

      case "Green":
        globalColor = "#23af62"
        globalColorHover = "#29cc72"
        globalHoverBorderColor = "rgba(38, 167, 96, 0.5)"
        globalHoverBackgroundColor = "rgba(20, 80, 47, 0.5)"
        break

      case "White":
        globalColor = "#fff"
        globalColorHover = "#bbb"
        globalHoverBorderColor = "rgba(204, 204, 204, 0.5)"
        globalHoverBackgroundColor = "rgba(139, 139, 139, 0.5)"
        break
    }

    //set theme colors
    setThemeGlobalBackgroundColor(globalColor)
    setThemeGlobalHoverBackgroundColor(globalColorHover)

    rootStyle.setProperty("--desktopWallpaper", `url("${wallpaper}")`)
    rootStyle.setProperty("--globalColor", globalColor)
    rootStyle.setProperty("--globalColorHover", globalColorHover)
    rootStyle.setProperty("--globalHoverBorderColor", globalHoverBorderColor)
    rootStyle.setProperty("--globalHoverBackgroundColor", globalHoverBackgroundColor)
    rootStyle.setProperty("--desktopWallpaperBrightness", brightnessValue)
    console.log("set color to: " + selectedTheme)

    //if can, store css properties as local data
    if(typeof(Storage) !== "undefined"){
      localStorage.setItem("selectedWallpaper", selectedWallpaper)
      localStorage.setItem("selectedTheme", selectedTheme)
      localStorage.setItem("desktopWallpaper", `url("${wallpaper}")`)
      localStorage.setItem("globalColor", globalColor)
      localStorage.setItem("globalColorHover", globalColorHover)
      localStorage.setItem("globalHoverBorderColor", globalHoverBorderColor)
      localStorage.setItem("globalHoverBackgroundColor", globalHoverBackgroundColor)
      localStorage.setItem("desktopWallpaperBrightness", brightnessValue)
    }
  }, [selectedWallpaper, selectedTheme])


  //ON SERVER INIT & ON BRIGHTNESS UPDATE
  useEffect(() => {
    var rootStyle = document.documentElement.style

    rootStyle.setProperty("--desktopWallpaperBrightness", (brightnessValue))
    if(typeof(Storage) !== "undefined"){
      localStorage.setItem("desktopWallpaperBrightness", brightnessValue)
    }
  }, [brightnessValue])

  const openWallpaper = () => {
    console.log("redirecting to wallpapers")
    router.push(`/Wallpapers/Wallpaper-${selectedWallpaper}.webp`)
  }


  function cycleArray(array, direction){
    //determine array direction
    var newArrayIndex
    if(direction == "upwards"){ newArrayIndex = currentArrayIndex + 1 }
    if(direction == "downwards"){ newArrayIndex = currentArrayIndex - 1 }

    //go to the other side of the array, if goes outside of array length
    if(newArrayIndex < 0){ newArrayIndex = array.length - 1 }
    if(newArrayIndex >= array.length){ newArrayIndex = 0 }
    setCurrentArrayIndex(newArrayIndex)
    // console.log("newArray: " + newArrayIndex)

    //update selection
    switch(array){
      case wallpaperArray:
        setSelectedWallpaper(wallpaperArray[newArrayIndex])
        break

      case themeArray:
        setSelectedTheme(themeArray[newArrayIndex])
        break
    }
  }

  function updateBrightness(sliderOrNum, value){
    //NOTE: everything here is being converted to a float due to something being a string and messing everything up
    if(sliderOrNum == "slider"){ setBrightnessValue(parseFloat(value)); return }

    //change by one value
    var newValue = parseFloat(brightnessValue) + parseFloat(value)
    console.log("newValue: " + newValue)
    
    if(newValue > 100){ return }
    if(newValue < 0){ return }
    setBrightnessValue(newValue)
  }


  return (
    <>
      <ThemeProvider theme={settingsTheme}>
        <div className={styles.grid}>

          <section className={styles.section}>
            <h1 className={styles.name}>Wallpaper</h1>
            <div className={styles.button}>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(wallpaperArray, "downwards")}>
                <LeftIcon width="3vh" height="3vh"/>
              </Button>

              <h2 className={styles.name}>{selectedWallpaper}</h2>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(wallpaperArray, "upwards")}>
                <RightIcon width="3vh" height="3vh"/>
              </Button>

            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Brightness: {brightnessValue}%</h1>
            <div className={styles.button}>

              <Button className={styles.icon} disableRipple onClick={() => updateBrightness("num", -1)}>
                <LeftIcon width="3vh" height="3vh"/>
              </Button>

              <Slider
                defaultValue={100}
                value={parseFloat(brightnessValue)}
                sx={{margin: "14px", padding: 0, width: "100%"}}
                onChange={e => updateBrightness("slider", e.target.value)}
                color="themeGlobal"
                valueLabelDisplay="off"
                shiftStep={1}
                step={1}
                min={0}
                max={100}
              />

              <Button className={styles.icon} disableRipple onClick={() => updateBrightness("num", 1)}>
                <RightIcon width="3vh" height="3vh"/>
              </Button>

            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Theme</h1>
            <div className={styles.button}>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(themeArray, "downwards")}>
                <LeftIcon width="3vh" height="3vh"/>
              </Button>

              <h2 className={styles.name}>{selectedTheme}</h2>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(themeArray, "upwards")}>
                <RightIcon width="3vh" height="3vh"/>
              </Button>

            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Music Volume</h1>
          </section>

          <section className={styles.section}>
            <div className={styles.isolatedButton} onClick={openWallpaper}>
              View Wallpaper
            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Sound Volume</h1>
          </section>

        </div>
      </ThemeProvider>
    </>
  )
}