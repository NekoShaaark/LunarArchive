"use client"

import styles from '@/styles/Login.module.css'
import TypewriterEffect from '@/components/TypewriterEffect'
import { Button, IconButton, InputAdornment, TextField, ThemeProvider, createTheme } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'


export default function Login({ setLoginOpen }) {
  const [nikoFace, setNikoFace] = useState("notNiko6.webp")
  const [needsBlink, setNeedsBlink] = useState(false)
  const [selectedUser, setSelectedUser] = useState("Neko")
  const [userProfile, setUserProfile] = useState(createProfileSection("Niko5.webp", "Neko", "███████", undefined, "███hi██", "Threat", "Admin", undefined, "NotNiko7.webp"))
  const [passwordTextValue, setPasswordTextValue] = useState("")
  const [passwordTextPreviewValue, setPasswordTextPreviewValue] = useState()


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
            textTransform: 'none',
            padding: 0,
            '&:hover': {
              backgroundColor: 'transparent'
            }, 
          }
        },
        defaultProps: {
          color: "retroPurple",
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#fff',
            '&.Mui-focused': {
              color: '#9665ff'
            }
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: '#fff', 
            '&:hover': {
              color: '#ddd',
            }, 
            '&.Mui-focused': {
              color: '#bbb',
            },
            input: {
              fontSize: "14px"
            }
          }
        }
      },
    }
  })


  //FIXME: this runs multiple times, not sure why
  // function notNikoBlink() {
  //   if(!needsBlink){
  //     setNikoFace("notNikoNeutral.webp")
  //     setNeedsBlink(true)
  //   }
  //   else{
  //     setNikoFace("notNikoBlink.webp")
  //     setNeedsBlink(false)
  //     console.log("blinked")
  //   }
  //   console.log("ran")
  // }
  // setInterval(notNikoBlink, 5000)

  const handleSelectedUser = async (user) => {
    switch(user){
      case "Neko":
        setUserProfile(createProfileSection("Niko5.webp", "Neko", "███████", undefined, "███hi██", "Threat", "Admin", undefined, "notNiko7.webp"))
        setSelectedUser("Neko")
        break

      case "Alula":
        setUserProfile(createProfileSection("alula7.webp", "Alula", "421 Hours", "14/03/2019", `My big brother's name!`, "Safe", "User", "Glen Zone", "notNiko6.webp"))
        setSelectedUser("Alula")
        break
    }
  }

  function createUserSection(profilePictureLink, userName, lastLoginDate, lastLoginTime, previousSessionLength){
    return(
      <section className={styles.user} onClick={() => handleSelectedUser(userName)}>
        <Image src={profilePictureLink} style={{ border:"4px solid #7158a5" }} width={96} height={96}/>
        <div className={styles.userNames}>
          <span style={{fontSize:"x-large" }}>{userName}</span>
          <div className={styles.profileText} style={{ marginInline:8 }}>
            Last Login: <span className={styles.profileAltText}>{lastLoginDate} - {lastLoginTime}</span>
          </div>
          <div className={styles.profileText} style={{ marginInline:8 }}>
            Previous Session Length: <span className={styles.profileAltText}>{previousSessionLength}</span>
          </div>
        </div>
      </section>
    )
  }

  function createProfileSection(profilePictureLink, userName, hoursUsed, userCreatedDate, passwordHint, systemReputation, accessLevel, userOrigin, reactionPictureLink){
    //reassign variables to be "Unknown" if not provided or undefined
    [profilePictureLink, userName, userCreatedDate, hoursUsed, passwordHint, systemReputation, accessLevel, userOrigin] = [profilePictureLink, userName, userCreatedDate, hoursUsed, passwordHint, systemReputation, accessLevel, userOrigin].map(arg => arg === undefined ? "Unknown" : arg)
    
    return(
      <>
        <div className={styles.profileTop}>
          <Image src={profilePictureLink} style={{ border:"4px solid #7158a5" }} width={144} height={144}/>
          <div className={styles.profileDetails}>
            <span className={styles.title} style={{ marginBottom:10, marginInline:-8, fontSize:"xx-large" }}>{userName}</span>

            <div className={styles.profileText}>
              Hours Used: <span className={styles.profileAltText}>{hoursUsed}</span>
            </div>

            <div className={styles.profileText}>
              User Created: <span className={styles.profileAltText}>{userCreatedDate}</span>
            </div>

            <div className={styles.profileText}>
              Password Hint: <span className={styles.profileAltText}>{passwordHint}</span>
            </div>
          </div>
        </div>

        <div className={styles.profileBottom}>
          <div className={styles.profileReputation}>
            <span className={styles.title} style={{ marginBottom:10, marginInline:-8, fontSize:"x-large" }}>Machine Relations</span>
            
            <div className={styles.profileText}>
              System Reputation: <span className={styles.profileAltText}>{systemReputation}</span>
            </div>

            <div className={styles.profileText}>
              Access Level: <span className={styles.profileAltText}>{accessLevel}</span>
            </div>

            <div className={styles.profileText}>
              User Origin: <span className={styles.profileAltText}>{userOrigin}</span>
            </div>
          </div>

          <Image src={reactionPictureLink} style={{ border:"4px solid #7158a5" }} width={96} height={96}/>
        </div>
      </>
    )
  }

  function isTextEmpty(value){
    return (value == null || (typeof value === "string" && value.trim().length === 0))
  }

  function updatePasswordText(newText){
    console.log(newText)

    setPasswordTextPreviewValue(newText)
    if(isTextEmpty(newText)){
      setPasswordTextValue("")
      return
    }

    setPasswordTextValue(newText)
  }

  function handleUserLogin(user, password){
    switch(user){
      case "Neko":
        break

      case "Alula":
        break
    }
  }


  return (
    <div className={styles.loginBody}>
      <div className={styles.grid}>
        <ThemeProvider theme={theme}>

          {/* --Dialogue Section-- */}
          <div className={styles.dialogue}>
            <div style={{ display:"flex", gap:"10px", margin:"10px", padding:"8px", border:"4px solid #524a64", background:"#000" }}>
              <div style={{ display:"flex", width:"fit-content", border:"6px solid #7158a5" }}><Image src={nikoFace} width={128} height={128} alt="niko"/></div>
              <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                  <div style={{ display:"flex", marginBottom:"auto", marginTop:"10px", color:"#7158a5", fontSize:"x-large" }}>Welcome [USER]</div>
                  <div style={{ display:"flex", color:"transparent", userSelect:"none" }}>Please select an account to log-in to.</div> {/* invisible placeholder for border */}
                  <div style={{ display:"flex", color: "#7158a5" }}><TypewriterEffect text={`Please select an account to log-in to.`} delay={40}/></div>
              </div>
            </div>
          </div>

          {/* --Users Section-- */}
          <div className={styles.users}>
            <h1 className={styles.title} style={{ margin: 0 }}>Users:</h1>
            <h3 className={styles.title}>Select a User to log-in as.</h3>

            <div className={styles.usersList}>
              {createUserSection("Niko5.webp", "Neko", "30/12/23", "13:23", "3 hours")}
              {createUserSection("alula7.webp", "Alula", "20/5/23", "23:02", "49 minutes")}
            </div>
          </div>

          {/* --Password Section-- */}
          <div className={styles.password}>
            <h1 className={styles.text}>Password</h1>
            <TextField
              required
              multiline
              variant="standard"
              placeholder="Input here"
              className={styles.passwordInput}
              value={passwordTextPreviewValue}
              InputProps={{
                disableUnderline: true,
                startAdornment: <InputAdornment id="adornment" position="start"/>,
                endAdornment: 
                  <InputAdornment id="adornment" position="end">
                    {/* <IconButton
                      onClick={() => onReadTextFromClipboard("name")}
                    >
                      <DuplicateIcon alt="duplicateIcon" width={24} height={24}/>
                    </IconButton> */}
                  </InputAdornment>
              }}
              onChange={e => updatePasswordText(e.currentTarget.value)}
              onKeyUp={() => updatePasswordText(passwordTextPreviewValue)} //passing in the previewed name (the value cannot be null)
            />
            <Button onClick={() => setLoginOpen(false)}>Login</Button>
          </div>

          {/* --Profiles Section--  */}
          <div className={styles.profiles}>
            {/* {createProfileSection("Niko5.webp", "Neko", "███████", undefined, "███hi██", "Threat", "Admin", undefined, "NotNiko7.webp")} */}
            {userProfile}
          </div>

          {/* --Blank Section-- */}
          <div className={styles.blank}>
          
          </div>

        </ThemeProvider>
      </div>
    </div>
  )
}