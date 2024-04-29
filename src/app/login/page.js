import styles from '@/styles/Login.module.css'
import TypewriterEffect from '@/components/TypewriterEffect'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import Image from 'next/image'


export default function Login({ setLoginOpen }) {

  //--THEME--//
  const theme = createTheme({
    typography: {
      fontFamily: 'eightbitFortress'
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
      },
    }
  })

  function createUserSection(profilePictureLink, userName, lastLoginDate, lastLoginTime, previousSessionLength){
    return(
      <section className={styles.user}>
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


  return (
    <div className={styles.loginBody}>
      <div className={styles.grid}>
        <ThemeProvider theme={theme}>

          {/* --Dialogue Section-- */}
          <div className={styles.dialogue}>
            <div style={{ display:"flex", gap:"10px", margin:"10px", padding:"8px", border:"4px solid #524a64", background:"#000" }}>
              <div style={{ display:"flex", width:"fit-content", border:"6px solid #7158a5" }}><Image src="notNiko6.webp" width={128} height={128}/></div>
              <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                  <div style={{ display:"flex", marginBottom:"auto", marginTop:"10px", color:"#7158a5", fontSize:"x-large" }}>Welcome [USER]</div>
                  <div style={{ display:"flex", color:"transparent", userSelect:"none" }}>"Please select an account to log-in to."</div> {/* invisible placeholder for border */}
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
            <span className={styles.passwordInput}>Input here</span>
            <Button onClick={() => setLoginOpen(false)}>Login</Button>
          </div>

          {/* --Profiles Section--  */}
          <div className={styles.profiles}>
            {createProfileSection("Niko5.webp", "Neko", "███████", undefined, "███hi██", "Threat", "Admin", undefined, "NotNiko7.webp")}
          </div>

          {/* --Blank Section-- */}
          <div className={styles.blank}>
          
          </div>

        </ThemeProvider>
      </div>
    </div>
  )
}