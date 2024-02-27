"use client"

import styles from '@/styles/Documents.module.css'
import { ArchiveIcon, BackIcon, BugIcon, ChessIcon, FolderIcon, GamepadIcon, ImageIcon, ImagesIcon } from '@/components/SvgHandler'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'


export default function Documents({ archiveOpen }) {
  const [rootFolderOpen, setRootFolderOpen] = useState(true)

  const [gamesFolderOpen, setGamesFolderOpen] = useState(false)
  const [pewFolderOpen, setPewFolderOpen] = useState(false)

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
          icon: <Image unoptimized src="/niko5.png" alt="niko5" width={48} height={48}/>
        },
        {
          id: "01",
          name: "Pew",
          icon: <FolderIcon fill="#9665ff" width={48} height={48}/>,
          files: [
            {
              id: "010",
              name: "Skadoodle.exe",
              icon: <ChessIcon fill="#9665ff" width={48} height={48}/>
            },
            {
              id: "011",
              name: "Scooby Doo 2.exe",
              icon: <BugIcon fill="#9665ff" width={48} height={48}/>
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
          icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
        },
        {
          id: "11",
          name: "Sunset.jpeg",
          icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
        },
        {
          id: "12",
          name: "worldMachine.png",
          icon: <ImageIcon fill="#9665ff" width={48} height={48}/>
        }
      ]
    },
    {
      id: "2",
      name: "Archive.exe",
      icon: <ArchiveIcon fill="#9665ff" width={48} height={48}/>,
      fileType: "exe"
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
      const pewFolder = gamesFolder[1].files
    const picturesFolder = rootDir[1].files


  function filesInFolder(folder){
    return(
      folder.map((file, mapId) => (
        <ThemeProvider key={mapId} theme={theme}>
          <Button disableRipple className={styles.iconButton} key={mapId} id={file.id} onClick={e => openFileOrFolder(e.currentTarget)}>
            <div className={styles.icon}>
              {file.icon}
              {file.name}
            </div>
          </Button>
        </ThemeProvider>
      ))
    )
  }

  function openFileOrFolder(file){
    switch(fileOrFolder(file.id)){
      case "file":
        // console.log("file")
        if(file.textContent == "Archive.exe"){ handleArchiveOpen() } //TODO: check file type and handle accordingly
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
    setPewFolderOpen(false)

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

      //pew
      case "01":
      case "Pew":
        setPewFolderOpen(true)
        // console.log("open pew")
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
        if(fileID == "Pew"){ return "/Documents/Games/Pew" }
      if(fileID == "Pictures"){ return "/Documents/Pictures" }

    //slice the fileID into its seperate array indices
    const arrayLayer = fileID.toString().slice("")
    const arrayLayer0 = arrayLayer[0]
    const arrayLayer1 = arrayLayer[1]
    const arrayLayer2 = arrayLayer[2]
    var currentDir = `/Documents`
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

    //arrays are in decending order due to process-of-elimination (and layer0 will always fire if it went in ascending order)
    if(returnType == "array"){
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
            {pewFolderOpen && filesInFolder(pewFolder)}
          {picturesFolderOpen && filesInFolder(picturesFolder)}
      
      </div>
    </>
  )
}