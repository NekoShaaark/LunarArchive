"use client"

import styles from '@/styles/Documents.module.css'
import { ArchiveIcon, BackIcon, BugIcon, ChessIcon, FolderIcon, GamepadIcon, ImageIcon, ImagesIcon } from '@/components/SvgHandler'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'


export default function Documents({ archiveOpen, alertOpen, setIvyOpen, setIvyImage, setIvyImageWidth, setIvyImageHeight, setIvyImageDescription, setHeaderName, setErrorDescription }) {
  const [rootFolderOpen, setRootFolderOpen] = useState(true)
    const [gamesFolderOpen, setGamesFolderOpen] = useState(false)
      const [moreGamesFolderOpen, setMoreGamesFolderOpen] = useState(false)
      const [newFolderFolderOpen, setNewFolderFolderOpen] = useState(false)
        const [heomeworkFolderOpen, setHeomeworkFolderOpen] = useState(false)
  const [picturesFolderOpen, setPicturesFolderOpen] = useState(false)

  const [currentReadableDirectory, setCurrentReadableDirectory] = useState("/Documents")


  const rootDir = 
  [
    {
      id: "0",
      name: "Games",
      icon: <GamepadIcon fill="#9665ff" width={48} height={48}/>,
      files: [
        {
          id: "00",
          name: "Niko5.png",
          fileType: "Image",
          description: "Niko",
          icon: <Image unoptimized src="/niko5.png" alt="niko5" width={48} height={48}/>
        },
        {
          id: "01",
          name: "More Games",
          icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
          files: [
            {
              id: "010",
              name: "Skadoodle.exe",
              fileType: "exe",
              icon: <ChessIcon fill="#9665ff" width={48} height={48}/>
            },
            {
              id: "011",
              name: "ScoobyDoo2.exe",
              fileType: "exe",
              icon: <BugIcon fill="#9665ff" width={48} height={48}/>
            },
            {
              id: "012",
              name: "HomeWwo.png",
              fileType: "Image",
              description: `"I always used to hate algebra..."`,
              icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
            },
            {
              id: "013",
              name: "MathSolver3.2.exe",
              fileType: "exe",
              icon: <BugIcon fill="#9665ff" width={48} height={48}/>,
            },
            {
              id: "014",
              name: "Heomework",
              icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
              files: [
                {
                  id: "0140",
                  name: "Skadoodle2.exe",
                  fileType: "exe",
                  icon: <ChessIcon fill="#9665ff" width={48} height={48}/>
                },
                {
                  id: "0141",
                  name: "Sharkness.exe",
                  fileType: "exe",
                  icon: <BugIcon fill="#9665ff" width={48} height={48}/>
                },
              ]
            },
            {
              id: "015",
              name: "MathSolver.exe",
              fileType: "exe",
              icon: <BugIcon fill="#9665ff" width={48} height={48}/>,
            }
          ]
        },
        {
          id: "02",
          name: "N3w fO1d3r",
          icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
          files: [
            {
              id: "020",
              name: "sakhduh23.exe",
              fileType: "exe",
              icon: <BugIcon fill="#9665ff" width={48} height={48}/>
            },
            {
              id: "021",
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
      id: "1",
      name: "Pictures",
      icon: <ImagesIcon fill="#9665ff" width={48} height={48}/>,
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
          description: "TEMP",
          icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
        }
      ]
    },
    {
      id: "2",
      name: "Archive.exe",
      fileType: "exe",
      icon: <ArchiveIcon fill="#9665ff" width={48} height={48}/>
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
    const gamesFolder = rootDir[0].files
      const moreGamesFolder = gamesFolder[1].files
      const newFolderFolder = gamesFolder[2].files
        const heomeworkFolder = moreGamesFolder[4].files
    const picturesFolder = rootDir[1].files


  function filesInFolder(folder){
    return(
      <ThemeProvider theme={theme}>
        {folder.map((file, mapId) => (
          <div key={mapId} className={styles.icon}>
            <Button disableRipple key={mapId} className={styles.iconButton} id={file.id} onClick={e => openFileOrFolder(e.currentTarget, file.fileType, file.description)}>
              <div className={styles.iconContents}>
                {file.icon}
                {file.name}
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
        if(file.textContent == "Archive.exe"){ handleArchiveOpen() }
        if(file.textContent == "Skadoodle.exe"){ handleAlertOpen() }
        if(file.textContent == "ScoobyDoo2.exe"){ handleAlertOpen() }
        if(file.textContent == "MathSolver3.2.exe"){ handleAlertOpen() }
        if(file.textContent == "MathSolver.exe"){ handleAlertOpen(); changeErrorDescription(`Blocked by Firewall`) }
        if(file.textContent == "Skadoodle2.exe"){ handleAlertOpen() }
        if(file.textContent == "Sharkness.exe"){ handleAlertOpen() }
        if(file.textContent == "sakhduh23.exe"){ handleAlertOpen(); changeErrorDescription(`"Hi there"`) }
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
    setGamesFolderOpen(false)
    setPicturesFolderOpen(false)
    setMoreGamesFolderOpen(false)
    setHeomeworkFolderOpen(false)
    setNewFolderFolderOpen(false)

    //open a specific folder
    switch(folderID){
      
      //back
      case "-1":
      case "Documents":
        setRootFolderOpen(true)
        // console.log("open root")
        break

      //games
      case "0":
      case "Games":
        setGamesFolderOpen(true)
        // console.log("open games")
        break

      //pictures
      case "1":
      case "Pictures":
        setPicturesFolderOpen(true)
        // console.log("open pictures")
        break

      //more games
      case "01":
      case "More Games":
        setMoreGamesFolderOpen(true)
        // console.log("open more games")
        break

      //new folder
      case "02":
      case "N3w fO1d3r":
        setNewFolderFolderOpen(true)
        // console.log("open N3w fO1d3r")
        break

      //heomework
      case "014":
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
    // console.log(moveDir)
    if(moveDir){ openFolder(moveDir) }
  }

  function getCurrentDirectory(fileID, returnType){
    
    //fileID will be literal if it's passed from the "backOneFolder()" method (this allows the user to go back by exactly one folder)
    if(fileID == "Documents"){ return "/Documents" }
      if(fileID == "Games"){ return "/Documents/Games" }
        if(fileID == "More Games"){ return "/Documents/Games/More Games" }
          if(fileID == "Heomework"){ return "/Documents/Games/Heomework" }
      if(fileID == "Pictures"){ return "/Documents/Pictures" }

    //slice the fileID into its seperate array indices
    const arrayLayer = fileID.toString().slice("")
    const arrayLayer0 = arrayLayer[0]
    const arrayLayer1 = arrayLayer[1]
    const arrayLayer2 = arrayLayer[2]
    const arrayLayer3 = arrayLayer[3]
    var currentDir = `/Documents`
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

    //arrays are in decending order due to process-of-elimination (and layer0 will always fire if it went in ascending order)
    if(returnType == "array"){
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

  return (
    <>
      <div className={styles.navbar}>
        <Button className={styles.button} disableRipple onClick={() => backOneFolder()}>
          <BackIcon fill="#9665ff" width={48} height={48}/>
        </Button>
        <div className={styles.text}>{currentReadableDirectory}</div>
      </div>
      <div className={styles.grid}>

        {rootFolderOpen && filesInFolder(rootFolder)}
          {gamesFolderOpen && filesInFolder(gamesFolder)}
            {moreGamesFolderOpen && filesInFolder(moreGamesFolder)}
            {newFolderFolderOpen && filesInFolder(newFolderFolder)}
              {heomeworkFolderOpen && filesInFolder(heomeworkFolder)}
          {picturesFolderOpen && filesInFolder(picturesFolder)}
      
      </div>
    </>
  )
}