"use client"

import styles from '@/styles/Documents.module.css'
import { AlertIcon, ArchiveIcon, BackIcon, BugIcon, ChessIcon, FolderIcon, GamepadIcon, ImageIcon, ImagesIcon, NoteIcon } from '@/components/SvgHandler'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import TypewriterEffect from '@/components/TypewriterEffect'


export default function Documents({ 
  currentOpenDir, 
  ivyHandlers,
  notusHandlers,
  setHeaderName, 
  setArchiveOpen, 
  setAlertOpen, 
  setIvyOpen,
  setNotusOpen,
  setErrorDescription
}) {
  
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


  const dirToOpen = `${currentOpenDir}`
  const [currentReadableDirectory, setCurrentReadableDirectory] = useState("/Users/Neko/Sys/Documents")
  const [typewriterDelay, setTypewriterDelay] = useState(20)
  const [globalColor, setGlobalColor] = useState()
  const [folderContent, setFolderContent] = useState({
    bottomText: "? Misc, ? Images, ? Executables",
    misc: "?",
    images: "?",
    executables: "?", 
    total: "?",
    topText: "? Total Items"
  })


  useEffect(() => {
    closeAllFolders()
    setGlobalColor(getComputedStyle(document.querySelector(':root')).getPropertyValue('--globalColor'))
    // console.log("toOpen: " + dirToOpen)
    
    switch(dirToOpen){
      case "Documents": 
        setDocumentsFolderOpen(true)
        setCurrentReadableDirectory("/Users/Neko/Sys/Documents") 
        updateFolderContentText(0)
        break
      case "Pictures": 
        setPicturesFolderOpen(true)
        setCurrentReadableDirectory("/Users/Neko/Sys/Pictures")
        updateFolderContentText(1)
        break
    }
  }, [dirToOpen])

  //--SYSTEM DIRECTORY ARRAY--//
  const sysDir = 
  [
    {
      id: "0",
      name: "Documents",
      nameColor: "#e4c525",
      fileType: "Folder",
      icon: <FolderIcon fill="#e4c525" width={48} height={48}/>,
      files: [
        {
          id: "00",
          name: "Archives",
          fileType: "Folder",
          icon: <FolderIcon fill={globalColor} width={48} height={48}/>,
          files: [
            {
              id: "000",
              name: "Discord Stuffies",
              fileType: "Folder",
              icon: <FolderIcon fill={globalColor} width={48} height={48}/>,
              files: [
                {
                  id: "0000",
                  name: "accepted_Ideas",
                  fileType: "Folder",
                  icon: <FolderIcon fill={globalColor} width={48} height={48}/>,
                  files: [
                    {
                      id: "00000",
                      name: "missingChildren.txt",
                      fileType: "Text",
                      icon: <NoteIcon fill={globalColor} width={48} height={48}/>
                    },
                    {
                      id: "00001",
                      name: "evilNekoVirus.exe",
                      fileType: "Text",
                      icon: <NoteIcon fill={globalColor} width={48} height={48}/>
                    }
                  ]
                },
                {
                  id: "0001",
                  name: "Rejected_ideas",
                  fileType: "Folder",
                  icon: <FolderIcon fill={globalColor} width={48} height={48}/>,
                  files: [
                    {
                      id: "00010",
                      name: "blackHole.txt",
                      fileType: "Text",
                      icon: <NoteIcon fill={globalColor} width={48} height={48}/>
                    }
                  ]
                },
              ]
            },
            {
              id: "001",
              name: "Something.txt",
              fileType: "Text",
              icon: <NoteIcon fill={globalColor} width={48} height={48}/>
            }
          ]
        },
        {
          id: "01",
          name: "Games",
          nameColor: "#1e90ff",
          fileType: "Folder",
          icon: <GamepadIcon fill="#1e90ff" width={48} height={48}/>,
          files: [
            {
              id: "010",
              name: "Niko5.png",
              nameColor: "#e4c525",
              headerName: "Niko5",
              fileType: "Image",
              description: "Niko",
              height: 200,
              width: 200,
              icon: <Image unoptimized src="/Niko5.webp" alt="niko5" width={48} height={48}/>
            },
            {
              id: "011",
              name: "More Games",
              fileType: "Folder",
              icon: <FolderIcon fill={globalColor} width={48} height={48}/>,
              files: [
                {
                  id: "0110",
                  name: "Skadoodle.exe",
                  fileType: "Executable",
                  icon: <ChessIcon fill={globalColor} width={48} height={48}/>
                },
                {
                  id: "0111",
                  name: "ScoobyDoo2.exe",
                  fileType: "Executable",
                  icon: <BugIcon fill={globalColor} width={48} height={48}/>
                },
                {
                  id: "0112",
                  name: "HomeWwo.png",
                  headerName: "HomeWwo",
                  fileType: "Image",
                  description: `"I always used to hate algebra..."`,
                  height: 420,
                  width: 380,
                  icon: <ImageIcon fill={globalColor} width={48} height={48}/>
                },
                {
                  id: "0113",
                  name: "MathSolver3.2.exe",
                  fileType: "Executable",
                  icon: <BugIcon fill={globalColor} width={48} height={48}/>,
                },
                {
                  id: "0114",
                  name: "Heomework",
                  fileType: "Folder",
                  icon: <FolderIcon fill={globalColor} width={48} height={48}/>,
                  files: [
                    {
                      id: "01140",
                      name: "Skadoodle2.exe",
                      fileType: "Executable",
                      icon: <ChessIcon fill={globalColor} width={48} height={48}/>
                    },
                    {
                      id: "01141",
                      name: "Sharkness.exe",
                      nameColor: "#1e59ff",
                      fileType: "Executable",
                      icon: <BugIcon fill="#1e59ff" width={48} height={48}/>
                    },
                  ]
                },
                {
                  id: "0115",
                  name: "MathSolver.exe",
                  fileType: "Executable",
                  icon: <BugIcon fill={globalColor} width={48} height={48}/>,
                }
              ]
            },
            {
              id: "012",
              name: "N3w fO1d3r",
              fileType: "Folder",
              icon: <FolderIcon fill={globalColor} width={48} height={48}/>,
              files: [
                {
                  id: "0120",
                  name: "sakhduh23.exe",
                  fileType: "Executable",
                  icon: <BugIcon fill={globalColor} width={48} height={48}/>
                },
                {
                  id: "0121",
                  name: "alula7.png",
                  headerName: "alula7",
                  fileType: "Image",
                  description: "Hehehhehehehehe hi there~",
                  height: 160,
                  width: 160,
                  icon: <Image unoptimized src="/alula7.webp" alt="niko5" width={48} height={48}/>
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
          fileType: "Folder",
          icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>,
          files: [
            {
              id: "020",
              name: "prototype_07",
              nameColor: "#c31c1c",
              fileType: "Folder",
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
              name: "",
              fileType: "None"
            },
            {
              id: "022",
              name: "pl██s2.txt",
              nameColor: "#c31c1c",
              fileType: "Executable",
              icon: <NoteIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "023",
              name: "plans4.txt",
              nameColor: "#c31c1c",
              fileType: "Executable",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "024",
              name: "old.jpeg",
              nameColor: "#c31c1c",
              fileType: "Image",
              icon: <ImageIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "025",
              name: "prototype_04.png.exe",
              nameColor: "#c31c1c",
              fileType: "Executable",
              icon: <ImageIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "026",
              name: "",
              fileType: "Something?"
            },
            {
              id: "027",
              name: "exter█al██og█am.exe",
              nameColor: "#c31c1c",
              fileType: "Executable",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "028",
              name: "01101000_01100101_01111001",
              nameColor: "#c31c1c",
              fileType: "Image",
              icon: <AlertIcon fill="#c31c1c" width={48} height={48}/>
            },
            {
              id: "029",
              name: "pr██ec█Lun█r",
              nameColor: "#c31c1c",
              fileType: "Folder",
              icon: <FolderIcon fill="#c31c1c" width={48} height={48}/>
            },
          ]
        },
        {
          id: "03",
          name: "Archive.exe",
          nameColor: "#8a2be2",
          fileType: "Executable",
          icon: <ArchiveIcon fill="#8a2be2" width={48} height={48}/>,
        },
      ]
    },
    {
      id: "1",
      name: "Pictures",
      nameColor: "#228b22",
      fileType: "Folder",
      icon: <ImagesIcon fill="#228b22" width={48} height={48}/>,
      files: [
        {
          id: "10",
          name: "Beach.png",
          headerName: "Beach",
          fileType: "Image",
          description: `"Our time at the Beach."`,
          height: 270,
          width: 480,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
        {
          id: "11",
          name: "Sunset.jpeg",
          headerName: "Sunset",
          fileType: "Image",
          description: `"I love this Sunset.."`,
          height: 400,
          width: 720,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
        {
          id: "12",
          name: "worldMachine.png",
          headerName: "eRrOR",
          fileType: "Image",
          description: `"Wonder how The Machine was made..."`,
          height: 500,
          width: 500,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
        {
          id: "13",
          name: "Waterfall.jpeg",
          headerName: "Waterfall",
          fileType: "Image",
          description: `"I used to love this waterfall... until it dried up."`,
          height: 500,
          width: 400,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
        {
          id: "14",
          name: "Forest.jpeg",
          headerName: "Where are we",
          fileType: "Image",
          description: `"How did we get here..."`,
          height: 400,
          width: 500,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
        {
          id: "15",
          name: "MyCat.jpeg",
          headerName: "My Cat",
          fileType: "Image",
          description: `"I love kats."`,
          height: 500,
          width: 750,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
        {
          id: "16",
          name: "waiting.png",
          headerName: "waiting",
          fileType: "Image",
          description: `"Waiting for something to happen?"`,
          height: 400,
          width: 320,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
        {
          id: "17",
          name: "Another.png",
          headerName: "Another",
          fileType: "Image",
          description: `"..."`,
          height: 350,
          width: 400,
          icon: <ImageIcon fill={globalColor} width={48} height={48}/>
        },
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
      headerName: "Swimming",
      fileType: "Image",
      description: `"I wonder what happened to her.."`,
      height: 480,
      width: 380,
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

  const idToFolderTable = {
    "-1": "Sys",
      "0": "Documents",

        "00": "Archives",
          "000": "Discord Stuffies",
            "0000": "accepted_Ideas",
            "0001": "Rejected_ideas",

        "01": "Games",
          "011": "More Games",
          "012": "N3w fO1d3r",
            "0114": "Heomework",

        "02": "Real Archive",
          "020": "protoype_07",

      "1": "Pictures",
  }

  const folderHandlers = {
    "Sys": setSysFolderOpen,
      "Documents": setDocumentsFolderOpen,

        "Archives": setArchivesFolderOpen,
          "Discord Stuffies": setDiscordStuffiesFolderOpen,
            "accepted_Ideas": setAcceptedIdeasFolderOpen,
            "Rejected_ideas": setRejectedIdeasFolderOpen,

        "Games": setGamesFolderOpen,
          "More Games": setMoreGamesFolderOpen,
          "N3w fO1d3r": setNewFolderFolderOpen,
            "Heomework": setHeomeworkFolderOpen,
              
        "Real Archive": setRealArchiveFolderOpen,
          "protoype_07": setPrototype07FolderOpen,

      "Pictures": setPicturesFolderOpen,
  }


  function filesInFolder(folder){
    return(
      <ThemeProvider theme={theme}>
        <AnimatePresence>
          {/* map all files in folder */}
          {folder.map((file, mapId) => (
            <motion.div 
              key={mapId} 
              className={styles.icon}
              initial={{ opacity: 0, scale: 0.75, z: 16, y: 16 }}
              animate={{ opacity: 1, scale: 1, z: 0, y: 0  }}
              transition={{ duration: (mapId*0.2) + 0.4 }}
            >
              {/* button to interact with files/folder */}
              <Button disableRipple key={mapId} className={styles.iconButton} id={file.id} onClick={e => openFileOrFolder(e.currentTarget, file.fileType)}>
                <div className={styles.iconContents}>
                  {/* set custom color for name (icon is done within' the file array) */}
                  {file.icon}
                  <span style={{color: file.nameColor}}>
                    {file.name}
                  </span>
                </div>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </ThemeProvider>
    )
  }

  function openFileOrFolder(file, fileType){
    setTypewriterDelay(40)
    // console.log(getFilesInCurrentDirectory(file, "All"))

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
          const currentFilesInDir = getFilesInCurrentDirectory(file, "Image")
          const fileNamesArray = convertFileArray(currentFilesInDir, "Names")
          const fileHeaderNamesArray = convertFileArray(currentFilesInDir, "HeaderNames")
          const fileDescriptionsArray = convertFileArray(currentFilesInDir, "Descriptions")
          const fileHeightArray = convertFileArray(currentFilesInDir, "Heights")
          const fileWidthArray = convertFileArray(currentFilesInDir, "Widths")

          const fileNamesArrayIndex = fileNamesArray.findIndex((name) => name == file.textContent)
          const webpFileNamesArray = renameFileExtensions(fileNamesArray, ".webp")
          
          const imagesObject = {
            webp: webpFileNamesArray,
            header: fileHeaderNamesArray,
            descriptions: fileDescriptionsArray,
            height: fileHeightArray,
            width: fileWidthArray,
            index: fileNamesArrayIndex
          }
          // console.log(imagesObject)
          
          //set ivy settings, and open
          handleIvyImage(imagesObject.webp, imagesObject.width, imagesObject.height, imagesObject.descriptions, imagesObject.header, fileNamesArrayIndex)
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

    //check if is going up or down, and handle accordingly
    //up = directory (eg. Documents)
    //down = number  (eg. 001)
    var folderToOpen = idToFolderTable[folderID]
    if(folderToOpen == undefined){ folderToOpen = folderID }
    
    //actually open the folder
    const folderOpener = folderHandlers[folderToOpen]
    folderOpener(true)
    
    //update navabr directory
    updateCurrentDirectory(folderID)
  }

  function closeAllFolders(){
    Object.values(folderHandlers).forEach(handler => {
      handler(false)
    })    
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

    //when updating the folder properties, id will be -1, so just return the system directory's array
    if(fileID == -1){ return sysDir }

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
    updateFolderContentText(fileID)
  }

  function fileOrFolder(fileID){
    var dir = getCurrentDirectory(fileID, "array")
    
    if(!dir.files){ return "file"}
    return "folder"
  }
  
  function getFilesInCurrentDirectory(file, fileTypeToFind){

    //slice the fileID into its seperate array indices (used to find where the user is in the system/documents)
    var folderId = file.id.slice(0, file.id.length - 1)
    const folderIdArray = folderId.split("")
    // console.log(`folderId: ${folderId}`)
    // console.log(`folderIdArray: [${folderIdArray}]`)

    var currentIdString = ""
    var layer0
    var layer1
    var layer2
    var layer3
    var layer4
    var layer5 //not used yet (as of current the furtherest the user can go from Sys to Heomework)
    var filesFound

    //arrays are handled in ascending order according to what layer the user is on
    //layer0 handler
    if(folderIdArray){
      layer0 = sysFolder
      filesFound = layer0.filter((file) => file.fileType == fileTypeToFind)
    }

    //layer1 handler
    if(folderIdArray[0]){ 
      currentIdString += `${folderIdArray[0]}`
      layer1 = sysFolder.filter((folder) => folder.id == folderIdArray[0])
      filesFound = layer1[0].files.filter((file) => file.fileType == fileTypeToFind)
    }
    
    //layer2 handler
    if(folderIdArray[1]){ 
      currentIdString += `${folderIdArray[1]}`
      layer2 = layer1[0].files.filter((folder) => folder.id == currentIdString)
      filesFound = layer2[0].files.filter((file) => file.fileType == fileTypeToFind)
    }

    //layer3 handler
    if(folderIdArray[2]){ 
      currentIdString += `${folderIdArray[2]}`
      layer3 = layer2[0].files.filter((folder) => folder.id == currentIdString)
      filesFound = layer3[0].files.filter((file) => file.fileType == fileTypeToFind)
    }

    //layer4 handler
    if(folderIdArray[3]){ 
      currentIdString += `${folderIdArray[3]}`
      layer4 = layer3[0].files.filter((folder) => folder.id == currentIdString)
      filesFound = layer4[0].files.filter((file) => file.fileType == fileTypeToFind)
    }

    //layer5 handler
    if(folderIdArray[4]){ 
      currentIdString += `${folderIdArray[4]}`
      layer5 = layer4[0].files.filter((folder) => folder.id == currentIdString)
      filesFound = layer5[0].files.filter((file) => file.fileType == fileTypeToFind)
    }

    // console.log(`currentIdString: ${currentIdString}`)
    // console.log(`CWD Name: ${layer4[0].name}`)
    // console.log(filesFound)
    
    return filesFound
  }
  
  function convertFileArray(array, convertTo){
    let index
    var newArray = []

    for(index in array){
      if(convertTo == "Names"){ newArray.push(array[index].name) }
      if(convertTo == "HeaderNames"){ newArray.push(array[index].headerName) }
      if(convertTo == "FileTypes"){ newArray.push(array[index].fileType) }
      if(convertTo == "Descriptions"){ newArray.push(array[index].description) }
      if(convertTo == "Heights"){ newArray.push(array[index].height) }
      if(convertTo == "Widths"){ newArray.push(array[index].width) }
    }
    
    // console.log(newArray)
    return newArray
  }

  function renameFileExtensions(array, extension){
    let index
    var newArray = []
    
    for(index in array){
      if(array[index].includes(".png")){ newArray.push(`${array[index].slice(0, -4)}${extension}`) }
      if(array[index].includes(".jpeg")){ newArray.push(`${array[index].slice(0, -5)}${extension}`) }
    }

    // console.log(newArray)
    return newArray
  }

  function updateFolderContentText(fileID){

    //convert the folder name to an id (using the idToFolderTable) 
    var newFileID = getKeyByValue(idToFolderTable, fileID)
    if(newFileID == undefined){ newFileID = fileID }
    
    //get all files in the current directory (Sys directory doesn't have an array, so we don't get the .files object of it)
    const filesInCurrentDirectory = getCurrentDirectory(newFileID, "array")
    var allFiles = filesInCurrentDirectory.files
    if(!allFiles){ allFiles = filesInCurrentDirectory }
    
    //convert above array into an array of fileTypes
    const fileTypeArray = convertFileArray(allFiles, "FileTypes")
    // console.log(fileTypeArray)

    //count fileTypes, and set variables accordingly
    const totalItems = fileTypeArray.filter(x => x != "None").length
    const contentMisc = fileTypeArray.filter(x => x != undefined && x != "Folder" && x != "Image" && x != "Executable" && x != "None" && x != "Something?").length
    const contentImages = fileTypeArray.filter(x => x == "Image").length
    const contentExecutables = fileTypeArray.filter(x => x == "Executable").length

    setFolderContent({ 
      bottomText: `${contentMisc} Misc, ${contentImages} Images, ${contentExecutables} Executables`,
      misc: contentMisc,
      images: contentImages,
      executables: contentExecutables, 
      total: totalItems,
      topText: `${totalItems} Total Items`
    })
  }

  function getKeyByValue(object, value){
    return Object.keys(object).find(key => object[key] === value);
  }


  //--HANDLERS & METHODS--
  function handleArchiveOpen(){
    setArchiveOpen()
  }

  function handleAlertOpen(){
    setAlertOpen()
  }

  function handleIvyOpen(){
    setIvyOpen()
  }

  function handleIvyImage(imageLocation, imageWidth, imageHeight, imageDescription, imageName, imageArrayIndex){
    ivyHandlers.setIvyImage(imageLocation)
    ivyHandlers.setIvyImageWidth(imageWidth)
    ivyHandlers.setIvyImageHeight(imageHeight)
    ivyHandlers.setIvyImageDescription(imageDescription)
    ivyHandlers.setIvyImageHeaderName(imageName)
    ivyHandlers.setIvyImageArrayIndex(imageArrayIndex)
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
    notusHandlers.setNotusHeaderName(txtName)
    notusHandlers.setNotusText(txtText)
    notusHandlers.setNotusFile(txtFile)
  }

  //TODO: function to put in a dynamic/specific directory path
  //TODO: when hovering over icons, they should be bordered with a different color

  return (
    <>
      <div className={styles.navbar}>
        <Button disableRipple onClick={() => backOneFolder()}>
          <BackIcon className={styles.backButton} width={48} height={48}/>
        </Button>
        <div className={styles.text}><TypewriterEffect text={currentReadableDirectory} delay={typewriterDelay}/></div>
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
      <div className={styles.folderContent}>
        <span>{folderContent.topText}</span>
        <span>{folderContent.bottomText}</span>
      </div>
    </>
  )
}