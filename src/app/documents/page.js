"use client"

import styles from '@/styles/Documents.module.css'
import { AlertIcon, ArchiveIcon, BackIcon, BugIcon, ChessIcon, FolderIcon, GamepadIcon, ImageIcon, ImagesIcon, NoteIcon } from '@/components/SvgHandler'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'


export default function Documents({ archiveOpen, alertOpen, setIvyOpen, setIvyImage, setIvyImageWidth, setIvyImageHeight, setIvyImageDescription, setHeaderName, setErrorDescription }) {
  const [rootFolderOpen, setRootFolderOpen] = useState(false)
    const [documentsFolderOpen, setDocumentsFolderOpen] = useState(true)
      const [gamesFolderOpen, setGamesFolderOpen] = useState(false)
        const [moreGamesFolderOpen, setMoreGamesFolderOpen] = useState(false)
        const [newFolderFolderOpen, setNewFolderFolderOpen] = useState(false)
          const [heomeworkFolderOpen, setHeomeworkFolderOpen] = useState(false)
      const [picturesFolderOpen, setPicturesFolderOpen] = useState(false)
      const [archiveFolderOpen, setArchiveFolderOpen] = useState(false)
      const [prototype07FolderOpen, setPrototype07FolderOpen] = useState(false)

  const [currentReadableDirectory, setCurrentReadableDirectory] = useState("/Users/Neko/Sys/Documents")


  const rootDir = 
  [
    {
      id: "0",
      name: "Documents",
      icon: <FolderIcon fill="#9965ff" width={48} height={48}/>,
      files: [
        {
          id: "00",
          name: "Games",
          nameColor: "#1e90ff",
          icon: <GamepadIcon fill="#1e90ff" width={48} height={48}/>,
          files: [
            {
              id: "000",
              name: "Niko5.png",
              nameColor: "#e4c525",
              fileType: "Image",
              description: "Niko",
              icon: <Image unoptimized src="/niko5.png" alt="niko5" width={48} height={48}/>
            },
            {
              id: "001",
              name: "More Games",
              icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
              files: [
                {
                  id: "0010",
                  name: "Skadoodle.exe",
                  fileType: "exe",
                  icon: <ChessIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0011",
                  name: "ScoobyDoo2.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0012",
                  name: "HomeWwo.png",
                  fileType: "Image",
                  description: `"I always used to hate algebra..."`,
                  icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0013",
                  name: "MathSolver3.2.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>,
                },
                {
                  id: "0014",
                  name: "Heomework",
                  icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
                  files: [
                    {
                      id: "00140",
                      name: "Skadoodle2.exe",
                      fileType: "exe",
                      icon: <ChessIcon fill="#9665ff" width={48} height={48}/>
                    },
                    {
                      id: "00141",
                      name: "Sharkness.exe",
                      nameColor: "#1e59ff",
                      fileType: "exe",
                      icon: <BugIcon fill="#1e59ff" width={48} height={48}/>
                    },
                  ]
                },
                {
                  id: "0015",
                  name: "MathSolver.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>,
                }
              ]
            },
            {
              id: "002",
              name: "N3w fO1d3r",
              icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
              files: [
                {
                  id: "0020",
                  name: "sakhduh23.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0021",
                  name: "alula7.png",
                  fileType: "Image",
                  description: "Hehehhehehehehe hi there~",
                  icon: <Image unoptimized src="/alula7.png" alt="niko5" width={48} height={48}/>
                }
              ]
            }
          ],
        },
        {
          id: "01",
          name: "Pictures",
          nameColor: "#228b22",
          icon: <ImagesIcon fill="#228b22" width={48} height={48}/>,
          files: [
            {
              id: "010",
              name: "Beach.png",
              fileType: "Image",
              description: `"Our time at the Beach."`,
              icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
            },
            {
              id: "011",
              name: "Sunset.jpeg",
              fileType: "Image",
              description: `"I love this Sunset.."`,
              icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
            },
            {
              id: "012",
              name: "worldMachine.png",
              fileType: "Image",
              description: "TEMP",
              icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
            }
          ]
        },
        {
          id: "02",
          name: "Archive.exe",
          nameColor: "#8a2be2",
          fileType: "exe",
          icon: <ArchiveIcon fill="#8a2be2" width={48} height={48}/>
        },
        {
          id: "03",
          name: "Real Archive",
          nameColor: "#c31c1c",
          icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>,
          files: [
            {
              id: "030",
              name: "prototype_07",
              nameColor: "#c31c1c",
              icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>,
              files: [
                {
                  id: "0300",
                  name: "a",
                  nameColor: "#c31c1c"
                },
                {
                  id: "0301",
                  name: "aa",
                  nameColor: "#c31c1c"
                }
              ]
            },
            {
              id: "031",
              name: ""
            },
            {
              id: "032",
              name: "pl██s2.txt",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <NoteIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "033",
              name: "plans4.txt",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "034",
              name: "old.jpeg",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <ImageIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "035",
              name: "prototype_04.png",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <ImageIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "036",
              name: ""
            },
            {
              id: "037",
              name: "exter█al██og█am.exe",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "038",
              name: "01101000_01100101_01111001",
              nameColor: "#c31c1c",
              fileType: "exe",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "039",
              name: "pr██ec█Lun█r",
              nameColor: "#c31c1c",
              icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>
            },
          ]
        }
      ]
    },
    {
      id: "1",
      name: "DDD",
      icon: <FolderIcon fill="#9965ff" width={48} height={48}/>
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
  const rootFolder = rootDir
    const documentsFolder = rootFolder[0].files
      const gamesFolder = documentsFolder[0].files
        const moreGamesFolder = gamesFolder[1].files
        const newFolderFolder = gamesFolder[2].files
          const heomeworkFolder = moreGamesFolder[4].files
      const picturesFolder = documentsFolder[1].files
      const archiveFolder = documentsFolder[3].files
        const prototype07Folder = archiveFolder[0].files


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
        // console.log("file")
        console.log(fileType)
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
        if(fileType == "Image"){
          switch(file.textContent){ //TODO: dynamically handle images
            case "Niko5.png":
              handleIvyImage("niko5.png", 160, 160, fileDescription)
              break

            case "Beach.png":
              handleIvyImage("beach.webp", 480, 270, fileDescription)
              break

            case "Sunset.jpeg":
              handleIvyImage("sunset.webp", 720, 400, fileDescription)
              break

            case "worldMachine.png":
              handleIvyImage("eclipse.webp", 500, 500, fileDescription)
              // changeHeaderName("eRrOR")
              break

            case "HomeWwo.png":
              handleIvyImage("homework.webp", 380, 420, fileDescription)
              break

            case "alula7.png":
              handleIvyImage("alula7.png", 160, 160, fileDescription)
              break
          }
          handleIvyOpen()
        }
        break

      case "folder":
        // console.log("folder")
        openFolder(file.id)
        break
    }
  }  

  function openFolder(folderID){
    //set all to false, and set only one to true
    setRootFolderOpen(false)
    setDocumentsFolderOpen(false)
    setGamesFolderOpen(false)
    setPicturesFolderOpen(false)
    setMoreGamesFolderOpen(false)
    setHeomeworkFolderOpen(false)
    setNewFolderFolderOpen(false)
    setArchiveFolderOpen(false)
    setPrototype07FolderOpen(false)

    //open a specific folder
    switch(folderID){
      
      //back
      case "-1":
      case "Sys":
        setRootFolderOpen(true)
        // console.log("open root")
        break

      //documents
      case "0":
      case "Documents":
        setDocumentsFolderOpen(true)
        // console.log("open documents")
        break

      //games
      case "00":
      case "Games":
        setGamesFolderOpen(true)
        // console.log("open games")
        break

      //pictures
      case "01":
      case "Pictures":
        setPicturesFolderOpen(true)
        // console.log("open pictures")
        break

      //archive
      case "03":
      case "Real Archive":
        setArchiveFolderOpen(true)
        // console.log("open archive")
        break

        //protoype_07
        case "030":
        case "protoype_07":
        setPrototype07FolderOpen(true)
        console.log("open prototype_07")
        break

        //more games
        case "001":
        case "More Games":
          setMoreGamesFolderOpen(true)
          // console.log("open more games")
          break

        //new folder
        case "002":
        case "N3w fO1d3r":
          setNewFolderFolderOpen(true)
          // console.log("open N3w fO1d3r")
          break

          //heomework
          case "0014":
          case "Heomework":
            setHeomeworkFolderOpen(true)
            // console.log("open heomework")
            break
    }

    //update navabr directory
    updateCurrentDirectory(folderID)
  }

  function backOneFolder(){
    const currentDir = currentReadableDirectory.split("/")
    const moveDir = currentDir[currentDir.length - 2]

    //check to make sure the user doesnt go back too far
    if(moveDir == "Neko"){
      console.log("going back in Sys")
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
        if(fileID == "Games"){ return "/Users/Neko/Sys/Documents/Games" }
          if(fileID == "More Games"){ return "/Users/Neko/Sys/Documents/Games/More Games" }
            if(fileID == "Heomework"){ return "/Users/Neko/Sys/Documents/Games/Heomework" }
        if(fileID == "Pictures"){ return "/Users/Neko/Sys/Documents/Pictures" }
        // if(fileID == "Real Archive"){ return "/Users/Neko/Sys/hidden/system84/nekOS/internals/Real Archive" }
        if(fileID == "Real Archive"){ return "/Users/Neko/Sys/Documents/Real Archive" }
          if(fileID == "prototype_07"){ return "/Users/Neko/Sys/Documents/Real Archive/prototype_07" }

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
      layer0 = rootDir[arrayLayer0]
      currentDir += `/${layer0.name}`
    }

    //layer1 handler
    if(arrayLayer1){ 
      layer1 = rootDir[arrayLayer0].files[arrayLayer1]
      currentDir += `/${layer1.name}`
    }

    //layer2 handler
    if(arrayLayer2){ 
      layer2 = rootDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2]
      currentDir += `/${layer2.name}`
    }

    //layer3 handler
    if(arrayLayer3){ 
      layer3 = rootDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2].files[arrayLayer3]
      currentDir += `/${layer3.name}`
    }

    //layer4 handler
    if(arrayLayer4){ 
      layer4 = rootDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2].files[arrayLayer3].files[arrayLayer4]
      currentDir += `/${layer4.name}`
    }

    //layer5 handler
    if(arrayLayer5){ 
      layer5 = rootDir[arrayLayer0].files[arrayLayer1].files[arrayLayer2].files[arrayLayer3].files[arrayLayer4].files[arrayLayer5]
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

  function handleIvyImage(imageLocation, imageWidth, imageHeight, imageDescription){
    setIvyImage(imageLocation)
    setIvyImageWidth(imageWidth)
    setIvyImageHeight(imageHeight)
    setIvyImageDescription(imageDescription)
  }

  function changeHeaderName(e){
    setHeaderName(e)
  }

  function changeErrorDescription(e){
    setErrorDescription(e)
  }

  //TODO: navbar slash needs to be more prominent (maybe change font?)
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

        {rootFolderOpen && filesInFolder(rootFolder)}
          {documentsFolderOpen && filesInFolder(documentsFolder)}
            {gamesFolderOpen && filesInFolder(gamesFolder)}
              {moreGamesFolderOpen && filesInFolder(moreGamesFolder)}
              {newFolderFolderOpen && filesInFolder(newFolderFolder)}
                {heomeworkFolderOpen && filesInFolder(heomeworkFolder)}
            {picturesFolderOpen && filesInFolder(picturesFolder)}
            {archiveFolderOpen && filesInFolder(archiveFolder)}
              {prototype07FolderOpen && filesInFolder(prototype07Folder)}
      
      </div>
    </>
  )
}