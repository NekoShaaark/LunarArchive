"use client"

import styles from '@/styles/Documents.module.css'
import { AlertIcon, ArchiveIcon, BackIcon, BugIcon, ChessIcon, FolderIcon, GamepadIcon, ImageIcon, ImagesIcon, NoteIcon } from '@/components/SvgHandler'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'


export default function Documents({ currentOpenDir, archiveOpen, alertOpen, setIvyOpen, setIvyImage, setIvyImageWidth, setIvyImageHeight, setIvyImageDescription, setIvyImageHeaderName, setHeaderName, setErrorDescription, setNotusOpen, setNotusText, setNotusHeaderName, setNotusFile }) {
  const [sysFolderOpen, setSysFolderOpen] = useState(false)
    const [documentsFolderOpen, setDocumentsFolderOpen] = useState(true) //default open
      
      const [archivesFolderOpen, setArchivesFolderOpen] = useState(false)
        const [discordStuffiesFolderOpen, setDiscordStuffiesFolderOpen] = useState(false)
          const [acceptedIdeasFolderOpen, setAcceptedIdeasFolderOpen] = useState(false)
          const [rejectedIdeasFolderOpen, setRejectedIdeasFolderOpen] = useState(false)
      
      const [gamesFolderOpen, setGamesFolderOpen] = useState(false)
        const [moreGamesFolderOpen, setMoreGamesFolderOpen] = useState(false)
        const [newFolderFolderOpen, setNewFolderFolderOpen] = useState(false)
          const [heomeworkFolderOpen, setHeomeworkFolderOpen] = useState(false)
      
      const [realArchiveFolderOpen, setRealArchiveFolderOpen] = useState(false)
        const [prototype07FolderOpen, setPrototype07FolderOpen] = useState(false)

    const [picturesFolderOpen, setPicturesFolderOpen] = useState(false)

  const [currentReadableDirectory, setCurrentReadableDirectory] = useState("/Users/Neko/Sys/Documents")
  var dirToOpen = `${currentOpenDir}`


  useEffect(() => {
    closeAllFolders()
    // console.log("toOpen: " + dirToOpen)
    switch(dirToOpen){
      case "Documents": setDocumentsFolderOpen(true); setCurrentReadableDirectory("/Users/Neko/Sys/Documents"); break
      case "Pictures": setPicturesFolderOpen(true); setCurrentReadableDirectory("/Users/Neko/Sys/Pictures"); break
    }
  }, [dirToOpen])

  //--SYSTEM DIRECTORY ARRAY--//
  const sysDir = 
  [
    {
      id: "0",
      name: "Documents",
      nameColor: "#e4c525",
      icon: <FolderIcon fill="#e4c525" width={48} height={48}/>,
      files: [
        {
          id: "00",
          name: "Archives",
          icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
          files: [
            {
              id: "000",
              name: "Discord Stuffies",
              icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
              files: [
                {
                  id: "0000",
                  name: "accepted_Ideas",
                  icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
                  files: [
                    {
                      id: "00000",
                      name: "missingChildren.txt",
                      fileType: "Text",
                      icon: <NoteIcon fill="#9665ff" width={48} height={48}/>
                    },
                    {
                      id: "00001",
                      name: "evilNekoVirus.exe",
                      fileType: "Text",
                      icon: <NoteIcon fill="#9665ff" width={48} height={48}/>
                    }
                  ]
                },
                {
                  id: "0001",
                  name: "Rejected_ideas",
                  icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
                  files: [
                    {
                      id: "00010",
                      name: "blackHole.txt",
                      fileType: "Text",
                      icon: <NoteIcon fill="#9665ff" width={48} height={48}/>
                    }
                  ]
                },
              ]
            },
            {
              id: "001",
              name: "Something.txt",
              fileType: "Text",
              icon: <NoteIcon fill="#9665ff" width={48} height={48}/>
            }
          ]
        },
        {
          id: "01",
          name: "Games",
          nameColor: "#1e90ff",
          icon: <GamepadIcon fill="#1e90ff" width={48} height={48}/>,
          files: [
            {
              id: "010",
              name: "Niko5.png",
              nameColor: "#e4c525",
              fileType: "Image",
              description: "Niko",
              icon: <Image unoptimized src="/niko5.png" alt="niko5" width={48} height={48}/>
            },
            {
              id: "011",
              name: "More Games",
              icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
              files: [
                {
                  id: "0110",
                  name: "Skadoodle.exe",
                  fileType: "exe",
                  icon: <ChessIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0111",
                  name: "ScoobyDoo2.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0112",
                  name: "HomeWwo.png",
                  fileType: "Image",
                  description: `"I always used to hate algebra..."`,
                  icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0113",
                  name: "MathSolver3.2.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>,
                },
                {
                  id: "0114",
                  name: "Heomework",
                  icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
                  files: [
                    {
                      id: "01140",
                      name: "Skadoodle2.exe",
                      fileType: "exe",
                      icon: <ChessIcon fill="#9665ff" width={48} height={48}/>
                    },
                    {
                      id: "01141",
                      name: "Sharkness.exe",
                      nameColor: "#1e59ff",
                      fileType: "exe",
                      icon: <BugIcon fill="#1e59ff" width={48} height={48}/>
                    },
                  ]
                },
                {
                  id: "0115",
                  name: "MathSolver.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>,
                }
              ]
            },
            {
              id: "012",
              name: "N3w fO1d3r",
              icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
              files: [
                {
                  id: "0120",
                  name: "sakhduh23.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0121",
                  name: "alula7.png",
                  fileType: "Image",
                  description: "Hehehhehehehehe hi there~",
                  icon: <Image unoptimized src="/alula7.png" alt="niko5" width={48} height={48}/>
                }
              ]
            },
            {
              id: "013",
              name: "Test.txt",
              nameColor: "#769ad4",
              fileType: "Text",
              icon: <NoteIcon fill="#769ad4" width={48} height={48}/>
            }
          ],
        },
        {
          id: "02",
          name: "Real Archive",
          nameColor: "#c31c1c",
          icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>,
          files: [
            {
              id: "020",
              name: "prototype_07",
              nameColor: "#c31c1c",
              icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>,
              files: [
                {
                  id: "0200",
                  name: "a",
                  nameColor: "#c31c1c"
                },
                {
                  id: "0201",
                  name: "aa",
                  nameColor: "#c31c1c"
                }
              ]
            },
            {
              id: "021",
              name: ""
            },
            {
              id: "022",
              name: "pl██s2.txt",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <NoteIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "023",
              name: "plans4.txt",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "024",
              name: "old.jpeg",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <ImageIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "025",
              name: "prototype_04.png",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <ImageIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "026",
              name: ""
            },
            {
              id: "027",
              name: "exter█al██og█am.exe",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "028",
              name: "01101000_01100101_01111001",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "029",
              name: "pr██ec█Lun█r",
              nameColor: "#c31c1c",
              icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>
            },
          ]
        },
        {
          id: "03",
          name: "Archive.exe",
          nameColor: "#8a2be2",
          fileType: "exe",
          icon: <ArchiveIcon fill="#8a2be2" width={48} height={48}/>,
        },
      ]
    },
    {
      id: "1",
      name: "Pictures",
      nameColor: "#228b22",
      icon: <ImagesIcon fill="#228b22" width={48} height={48}/>,
      files: [
        {
          id: "10",
          name: "Beach.png",
          fileType: "Image",
          description: `"Our time at the Beach."`,
          icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
        },
        {
          id: "11",
          name: "Sunset.jpeg",
          fileType: "Image",
          description: `"I love this Sunset.."`,
          icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
        },
        {
          id: "12",
          name: "worldMachine.png",
          fileType: "Image",
          description: `"Wonder how The Machine was made..."`,
          icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
        }
      ]
    },
    {
      id: "2",
      name: "Hey.txt",
      nameColor: "#1e90ff",
      fileType: "Text",
      icon: <NoteIcon fill="#c31c1c" width={48} height={48}/>
    },
    {
      id: "3",
      name: "missing.png",
      nameColor: "#9c9c9c",
      fileType: "Image",
      description: `"I wonder what happened to her.."`,
      icon: <ImageIcon fill="#9c9c9c" width={48} height={48}/>
    }
  ]

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
  
  //folder reference variables
  const sysFolder = sysDir
    const documentsFolder = sysFolder[0].files
  
      const archivesFolder = documentsFolder[0].files
        const discordStuffiesFolder = archivesFolder[0].files
          const acceptedIdeasFolder = discordStuffiesFolder[0].files
          const rejectedIdeasFolder = discordStuffiesFolder[1].files
        
      const gamesFolder = documentsFolder[1].files
        const moreGamesFolder = gamesFolder[1].files
        const newFolderFolder = gamesFolder[2].files
          const heomeworkFolder = moreGamesFolder[4].files
      
      const realArchiveFolder = documentsFolder[2].files
        const prototype07Folder = realArchiveFolder[0].files
    
    const picturesFolder = sysFolder[1].files


  function filesInFolder(folder){
    return(
      <ThemeProvider theme={theme}>
        {/* map all files in folder */}
        {folder.map((file, mapId) => (
          <div key={mapId} className={styles.icon}>
            {/* button to interact with files/folder */}
            <Button disableRipple key={mapId} className={styles.iconButton} id={file.id} onClick={e => openFileOrFolder(e.currentTarget, file.fileType, file.description)}>
              <div className={styles.iconContents}>
                {/* set custom color for name (icon is done within' the file array) */}
                {file.icon}
                <span style={{color: file.nameColor}}>
                  {file.name}
                </span>
              </div>
            </Button>
          </div>
        ))}
      </ThemeProvider>
    )
  }

  function openFileOrFolder(file, fileType, fileDescription){
    switch(fileOrFolder(file.id)){
      case "file":
        console.log("file")
        // console.log(fileType)
        var headerName = file.textContent.slice(0, -4)
        changeErrorDescription() //sets error description to default

        switch(file.textContent){
          case "Archive.exe":
            handleArchiveOpen()
            break

          case "Skadoodle.exe":
          case "ScoobyDoo2.exe":
          case "MathSolver3.2.exe":
          case "Skadoodle2.exe":
          case "Sharkness.exe":
          case "MathSolver.exe":
          case "sakhduh23.exe":
          case "pl██s2.txt":
          case "plans4.txt":
          case "old.jpeg":
          case "prototype_04.png":
          case "exter█al██og█am.exe":
          case "01101000_01100101_01111001":
          case "pr██ec█Lun█r":
          case "a":
          case "aa":
            handleAlertOpen()
            break
        }
        if(file.textContent == "MathSolver.exe"){ changeErrorDescription(`Blocked by Firewall`) }
        if(file.textContent == "sakhduh23.exe"){ changeErrorDescription(`"Hi there"`) }
        if(file.textContent == "exter█al██og█am.exe"){ changeErrorDescription(`Con███t █dm█n: N█ko Sha██`); changeHeaderName(`U█kn██n E█ro█`) }
        if(file.textContent == "pl██s2.txt"){ changeErrorDescription(`"File Corrupt"`); }
        if(file.textContent == "plans4.txt"){ changeErrorDescription(`"What are you doing here?"`); }
        if(file.textContent == "prototype_04.png"){ changeErrorDescription(`█████████████████████`); }
        if(file.textContent == "old.jpeg"){ changeErrorDescription(`File Not Found`); }
        if(file.textContent == "01101000_01100101_01111001"){ changeErrorDescription(`01010011 01111001 01110011 01011111 01000101 01110010 01110010 01101111 01110010`); }
        if(file.textContent == "pr██ec█Lun█r"){ changeErrorDescription(`"System Error ██████████"`); }
        
        //image files
        if(fileType == "Image"){
          switch(file.textContent){ //TODO: dynamically handle images
            case "Niko5.png":
              handleIvyImage("niko5.png", 200, 200, fileDescription, headerName)
              break

            case "Beach.png":
              handleIvyImage("beach.webp", 480, 270, fileDescription, headerName)
              break

            case "Sunset.jpeg":
              handleIvyImage("sunset.webp", 720, 400, fileDescription, "Sunset")
              break

            case "worldMachine.png":
              handleIvyImage("worldMachine.webp", 500, 500, fileDescription, headerName)
              // changeHeaderName("eRrOR")
              break

            case "HomeWwo.png":
              handleIvyImage("homework.webp", 380, 420, fileDescription, headerName)
              break

            case "alula7.png":
              handleIvyImage("alula7.png", 160, 160, fileDescription, headerName)
              break

            case "missing.png":
              handleIvyImage("missingPersonPoster.webp", 380, 480, fileDescription, "Swimming")
              break
          }
          handleIvyOpen()
        }

        //text files
        if(fileType == "Text"){
          handleNotusText(headerName, undefined, file.textContent)
          // handleNotusText("Test", "Yippeeeee this is a testing file wooohoooo testing we love testing", undefined)

          handleNotusOpen()
        }
        break

      case "folder":
        console.log("folder")

        if(file.textContent == "Real Archive"){
          console.log("woah")
          // return
        }

        openFolder(file.id)
        break
    }
  }  

  function openFolder(folderID){
    //set all to false, and set only one to true
    closeAllFolders()

    //open a specific folder
    //NOTE: if the files start bleeding into each other, you might've missed a break somewhere here
    switch(folderID){
      
      //back
      case "-1":
      case "Sys":
        setSysFolderOpen(true)
        // console.log("open root")
        break

      //documents
      case "0":
      case "Documents":
        setDocumentsFolderOpen(true)
        // console.log("open documents")
        break

        //archive
        case "00":
        case "Archives":
          setArchivesFolderOpen(true)
          // console.log("open archives")
          break

          //discord stuffies
          case "000":
          case "Discord Stuffies":
            setDiscordStuffiesFolderOpen(true)
            // console.log("open discord stuffies")
            break

            //accepted ideas
            case "0000":
            case "accepted_Ideas":
              setAcceptedIdeasFolderOpen(true)
              // console.log("open accepted ideas")
              break

            case "0001":
            case "Rejected_ideas":
              setRejectedIdeasFolderOpen(true)
              // console.log("open rejected ideas")
              break
              

        //games
        case "01":
        case "Games":
          setGamesFolderOpen(true)
          // console.log("open games")
          break

          //more games
          case "011":
          case "More Games":
            setMoreGamesFolderOpen(true)
            // console.log("open more games")
            break
          
              //new folder
              case "012":
              case "N3w fO1d3r":
                setNewFolderFolderOpen(true)
                // console.log("open N3w fO1d3r")
                break
          
              //heomework
              case "0114":
              case "Heomework":
                setHeomeworkFolderOpen(true)
                // console.log("open heomework")
                break

        //real archive
        case "02":
        case "Real Archive":
          setRealArchiveFolderOpen(true)
          // console.log("open real archive")
          break

          //protoype_07
          case "020":
          case "protoype_07":
          setPrototype07FolderOpen(true)
          // console.log("open prototype_07")
          break

      //pictures
      case "1":
      case "Pictures":
        setPicturesFolderOpen(true)
        // console.log("open pictures")
        break
    }

    //update navabr directory
    updateCurrentDirectory(folderID)
  }

  function closeAllFolders(){
    setSysFolderOpen(false)
      setDocumentsFolderOpen(false)
        
        setArchivesFolderOpen(false)
          setDiscordStuffiesFolderOpen(false)
            setAcceptedIdeasFolderOpen(false)
            setRejectedIdeasFolderOpen(false)
        
        setGamesFolderOpen(false)
          setMoreGamesFolderOpen(false)
          setHeomeworkFolderOpen(false)
          setNewFolderFolderOpen(false)

        setRealArchiveFolderOpen(false)
          setPrototype07FolderOpen(false)
    
      setPicturesFolderOpen(false)
  }

  function backOneFolder(){
    const currentDir = currentReadableDirectory.split("/")
    const moveDir = currentDir[currentDir.length - 2]

    //check to make sure the user doesnt go back too far
    if(moveDir == "Neko"){
      // console.log("going back in Sys")
      handleAlertOpen()
      return
    }

    // console.log(moveDir)
    if(moveDir){ openFolder(moveDir) }
  }

  function getCurrentDirectory(fileID, returnType){
    
    //fileID will be literal if it's passed from the "backOneFolder()" method (this allows the user to go back by exactly one folder)
    if(fileID == "Sys"){ return "/Users/Neko/Sys" }
      if(fileID == "Documents"){ return "/Users/Neko/Sys/Documents" }
        
        if(fileID == "Archives"){ return "/Users/Neko/Sys/Documents/Archives" }
          if(fileID == "Discord Stuffies"){ return "/Users/Neko/Sys/Documents/Archives/Discord Stuffies" }
            if(fileID == "accepted_Ideas"){ return "/Users/Neko/Sys/Documents/Archives/accepted_Ideas" }
            if(fileID == "Rejected_ideas"){ return "/Users/Neko/Sys/Documents/Archives/Rejected_ideas" }
        
        if(fileID == "Games"){ return "/Users/Neko/Sys/Documents/Games" }
          if(fileID == "More Games"){ return "/Users/Neko/Sys/Documents/Games/More Games" }
            if(fileID == "Heomework"){ return "/Users/Neko/Sys/Documents/Games/Heomework" }
        
        // if(fileID == "Real Archive"){ return "/Users/Neko/Sys/hidden/system84/nekOS/internals/Real Archive" }
        if(fileID == "Real Archive"){ return "/Users/Neko/Sys/Documents/Real Archive" }
          if(fileID == "prototype_07"){ return "/Users/Neko/Sys/Documents/Real Archive/prototype_07" }
      
      if(fileID == "Pictures"){ return "/Users/Neko/Sys/Pictures" }

    //slice the fileID into its seperate array indices
    const arrayLayer = fileID.toString().slice("")
    const arrayLayer0 = arrayLayer[0]
    const arrayLayer1 = arrayLayer[1]
    const arrayLayer2 = arrayLayer[2]
    const arrayLayer3 = arrayLayer[3]
    const arrayLayer4 = arrayLayer[4]
    const arrayLayer5 = arrayLayer[5] //not used yet (as of current the furtherest the user can go from Sys to Heomework)
    var currentDir = `/Users/Neko/Sys`
    var layer5
    var layer4
    var layer3
    var layer2
    var layer1
    var layer0

    //arrays are handled in ascending order due to adding on currentDir to itself each layer
    //layer0 handler
    if(arrayLayer0){ 
      layer0 = sysDir[arrayLayer0]
      currentDir += `/${layer0.name}`
    }

    //layer1 handler
    if(arrayLayer1){ 
      layer1 = sysDir[arrayLayer0].files[arrayLayer1]
      currentDir += `/${layer1.name}`
    }

    //layer2 handler
    if(arrayLayer2){ 
      layer2 = sysDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2]
      currentDir += `/${layer2.name}`
    }

    //layer3 handler
    if(arrayLayer3){ 
      layer3 = sysDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2].files[arrayLayer3]
      currentDir += `/${layer3.name}`
    }

    //layer4 handler
    if(arrayLayer4){ 
      layer4 = sysDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2].files[arrayLayer3].files[arrayLayer4]
      currentDir += `/${layer4.name}`
    }

    //layer5 handler
    if(arrayLayer5){ 
      layer5 = sysDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2].files[arrayLayer3].files[arrayLayer4].files[arrayLayer5]
      currentDir += `/${layer5.name}`
    }

    //arrays are in decending order due to process-of-elimination (and layer0 will always fire if it went in ascending order)
    if(returnType == "array"){
      if(arrayLayer5){ return(layer5) }
      if(arrayLayer4){ return(layer4) }
      if(arrayLayer3){ return(layer3) }
      if(arrayLayer2){ return(layer2) }
      if(arrayLayer1){ return(layer1) }
      if(arrayLayer0){ return(layer0) }
    }

    // console.log(currentDir)
    return(currentDir)
  }

  function updateCurrentDirectory(fileID){
    setCurrentReadableDirectory(getCurrentDirectory(fileID))
  }

  function fileOrFolder(fileID){
    var dir = getCurrentDirectory(fileID, "array")
    
    if(!dir.files){ return "file"}
    return "folder"
  }


  //--HANDLERS & METHODS--
  function handleArchiveOpen(){
    archiveOpen()
  }

  function handleAlertOpen(){
    alertOpen()
  }

  function handleIvyOpen(){
    setIvyOpen()
  }

  function handleIvyImage(imageLocation, imageWidth, imageHeight, imageDescription, imageName){
    setIvyImage(imageLocation)
    setIvyImageWidth(imageWidth)
    setIvyImageHeight(imageHeight)
    setIvyImageDescription(imageDescription)
    setIvyImageHeaderName(imageName)
  }

  function changeHeaderName(e){
    setHeaderName(e)
  }

  function changeErrorDescription(e){
    setErrorDescription(e)
  }

  function handleNotusOpen(){
    setNotusOpen()
  }

  function handleNotusText(txtName, txtText, txtFile){
    setNotusHeaderName(txtName)
    setNotusText(txtText)
    setNotusFile(txtFile)
  }

  //TODO: function to put in a dynamic/specific directory path
  //TODO: when hovering over icons, they should be bordered with a different color

  return (
    <>
      <div className={styles.navbar}>
        <Button disableRipple onClick={() => backOneFolder()}>
          <BackIcon className={styles.backButton} width={48} height={48}/>
        </Button>
        <div className={styles.text}>{currentReadableDirectory}</div>
      </div>
      <div className={styles.grid}>

        {sysFolderOpen && filesInFolder(sysFolder)}
          {documentsFolderOpen && filesInFolder(documentsFolder)}
            
            {archivesFolderOpen && filesInFolder(archivesFolder)}
              {discordStuffiesFolderOpen && filesInFolder(discordStuffiesFolder)}
                {acceptedIdeasFolderOpen && filesInFolder(acceptedIdeasFolder)}
                {rejectedIdeasFolderOpen && filesInFolder(rejectedIdeasFolder)}
            
            {gamesFolderOpen && filesInFolder(gamesFolder)}
              {moreGamesFolderOpen && filesInFolder(moreGamesFolder)}
              {newFolderFolderOpen && filesInFolder(newFolderFolder)}
                {heomeworkFolderOpen && filesInFolder(heomeworkFolder)}
            
            {realArchiveFolderOpen && filesInFolder(realArchiveFolder)}
              {prototype07FolderOpen && filesInFolder(prototype07Folder)}
          
          {picturesFolderOpen && filesInFolder(picturesFolder)}
      
      </div>
    </>
  )
}