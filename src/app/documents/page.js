import styles from '@/styles/Documents.module.css'
import { ArchiveIcon, LogsIcon, MoonStarIcon, NoteIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { useState } from 'react'


export default function Documents() {
  const [rootFolderOpen, setRootFolderOpen] = useState(true)

  const [gamesFolderOpen, setGamesFolderOpen] = useState(false)
  const [pewFolderOpen, setPewFolderOpen] = useState(false)

  const [picturesFolderOpen, setPicturesFolderOpen] = useState(false)

  const [currentReadableDirectory, setCurrentReadableDirectory] = useState("/")


  const files = 
  [
    {
      id: "0",
      name: "Games",
      icon: <MoonStarIcon fill="#fff" width={48} height={48}/>,
      files: [
        {
          id: "00",
          name: "OneShot",
          icon: <ArchiveIcon fill="#fff" width={48} height={48}/>
        },
        {
          id: "01",
          name: "Pew",
          icon: <NoteIcon fill="#fff" width={48} height={48}/>,
          files: [
            {
              id: "010",
              name: "Skadoodle",
              icon: <ArchiveIcon fill="#fff" width={48} height={48}/>
            },
            {
              id: "011",
              name: "Scooby Doo",
              icon: <ArchiveIcon fill="#fff" width={48} height={48}/>
            }
          ]
        }
      ],
    },
    {
      id: "1",
      name: "Pictures",
      icon: <LogsIcon fill="#fff" width={48} height={48}/>,
      files: [
        {
          id: "10",
          name: "Beach"
        },
        {
          id: "11",
          name: "Sunset"
        },
        {
          id: "12",
          name: "Castle"
        }
      ]
    }
  ]
  
  const rootFolder = files
    const gamesFolder = files[0].files
      const pewFolder = gamesFolder[1].files
    const picturesFolder = files[1].files


  function filesInFolder(folder){
    // console.log(folder)

    return(
      folder.map((file, mapId) => (
        <Button key={mapId} id={file.id} onClick={e => openFileOrFolder(e.currentTarget.id)}>
          {file.name}{file.icon}
        </Button>
      ))
    )
  }

  function openFileOrFolder(fileID){
    if(fileOrFolder(fileID) == "file"){
      console.log("file")
      return
    }

    if(fileOrFolder(fileID) == "folder"){
      console.log("folder")
      openFolder(fileID)
      return
    }
  }

  //TODO: "-1" should dynamically go back/up once in the current array
  //TODO: all of these cases should be dynamic
  function openFolder(folderID){
    switch(folderID){
      case "-1":
        setRootFolderOpen(true)
        setGamesFolderOpen(false)
        setPicturesFolderOpen(false)
        setPewFolderOpen(false)
        console.log("open root")
        break

      case "0":
        setRootFolderOpen(false)
        setGamesFolderOpen(true)
        setPicturesFolderOpen(false)
        setPewFolderOpen(false)
        console.log("open games")
        break

      case "1":
        setRootFolderOpen(false)
        setGamesFolderOpen(false)
        setPicturesFolderOpen(true)
        setPewFolderOpen(false)
        console.log("open pictures")
        break

      case "01":
        setRootFolderOpen(false)
        setGamesFolderOpen(false)
        setPicturesFolderOpen(false)
        setPewFolderOpen(true)
        console.log("open pew")
        break
    }

    updateCurrentDirectory(folderID)
  }

  function getCurrentDirectory(fileID, returnType){
    if(fileID == "-1"){ return("/") }

    //slice the fileID into its seperate array indices
    const arrayLayer = fileID.toString().slice("")
    const arrayLayer0 = arrayLayer[0]
    const arrayLayer1 = arrayLayer[1]
    const arrayLayer2 = arrayLayer[2]
    var currentDir = ``
    var layer2
    var layer1
    var layer0

    //arrays are handled in ascending order due to adding on currentDir to itself each layer
    //layer0 handler
    if(arrayLayer0){ 
      layer0 = files[arrayLayer0]
      currentDir = `/${layer0.name}`
    }

    //layer1 handler
    if(arrayLayer1){ 
      layer1 = files[arrayLayer0].files[arrayLayer1]
      currentDir += `/${layer1.name}`
    }

    //layer2 handler
    if(arrayLayer2){ 
      layer2 = files[arrayLayer0].files[arrayLayer1].files[arrayLayer2]
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


  return (
    <>
      <div className={styles.navbar}>
        <Button disableRipple onClick={() => openFolder("-1")}>
          Back
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