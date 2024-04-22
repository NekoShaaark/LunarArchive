"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/ImageViewer.module.css"
import { LeftIcon, RightIcon } from "./SvgHandler"

export default function ImageHandler({ selectedImage, isOpen, isMaximized, imageWidth, imageHeight, imageDescription, imageArrayIndex, imageHeader, setHeaderName }) {
    const [imageUsing, setImageUsing] = useState()
    const [imageUsingWidth, setImageUsingWidth] = useState()
    const [imageUsingHeight, setImageUsingHeight] = useState()
    const [imageUsingDescription, setImageUsingDescription] = useState()
    const [imageUsingHeader, setImageUsingHeader] = useState()

    const [usingArray, setUsingArray] = useState(true)
    const [imageArray, setImageArray] = useState([])
    const [descriptionArray, setDescriptionArray] = useState([])
    const [heightArray, setHeightArray] = useState([])
    const [widthArray, setWidthArray] = useState([])
    const [headerArray, setHeaderArray] = useState([])
    const [currentArrayIndex, setCurrentArrayIndex] = useState(0)

    const [showPreviewImages, setShowPreviewImages] = useState(true)
    const [rightImage, setRightImage] = useState("placeholderImage.webp")
    const [leftImage, setLeftImage] = useState("placeholderImage.webp")
    
    var selectedImageLocation = `${selectedImage}`
    var selectedImageWidth = `${imageWidth}`
    var selectedImageHeight = `${imageHeight}`
    var selectedImageDescription = `${imageDescription}`
    var selectedImageHeader = `${imageHeader}`


    useEffect(() => {

        //set states/variables based on current array index
        if(selectedImage instanceof Array && selectedImage[1]){ 
            // console.log("yup array")
            // console.log(selectedImage)
            // console.log("arrayIndex: " + imageArrayIndex)
            if(imageArrayIndex == undefined){ imageArrayIndex = 0 }
            selectedImageLocation = selectedImage[imageArrayIndex]
            selectedImageDescription = imageDescription[imageArrayIndex]
            selectedImageHeight = imageHeight[imageArrayIndex]
            selectedImageWidth = imageWidth[imageArrayIndex]
            selectedImageHeader = imageHeader[imageArrayIndex]
            setUsingArray(true)
            setImageArray(selectedImage)
            setDescriptionArray(imageDescription)
            setHeightArray(imageHeight)
            setWidthArray(imageWidth)
            setHeaderArray(imageHeader)
            setCurrentArrayIndex(imageArrayIndex)
            console.log("initIndex: " + imageArrayIndex)
        }
        else{ 
            setUsingArray(false)
            setShowPreviewImages(false)
        }
        
        //set image states
        // console.log("useEffect")
        // console.log(selectedImageLocation)
        setImageUsing(selectedImageLocation)
        setImageUsingWidth(selectedImageWidth)
        setImageUsingHeight(selectedImageHeight)
        setImageUsingDescription(selectedImageDescription)
        setImageUsingHeader(selectedImageHeader)
        setHeaderName(selectedImageHeader) //setting default header due to it - by default - being set as the passed array
        
        //set image previews
        //NOTE: have to pass in initialArrayIndex due to the currentArrayIndex state not being available when this function is run
        getRightImage("upwards", selectedImage, imageArrayIndex)
        getLeftImage("upwards", selectedImage, imageArrayIndex)
    }, [selectedImageLocation, selectedImageWidth, selectedImageHeight, selectedImageDescription, imageArrayIndex])


    //handle arrow keys input
    //NOTE: this is stoped/detatched when closed (handled in imageViewerHandleClose method in home page)
    useEffect(() => {
        document.onkeyup = handleKeyUp

        function handleKeyUp(e){
            e.preventDefault()
            if(!usingArray){ return }
            if(!imageUsing){ return }
            if(e.key == "ArrowLeft"){ cycleArrays("downwards") }
            if(e.key == "ArrowRight"){ cycleArrays("upwards") }
        }
    })

    
    // console.log("isOpen: " + isOpen)
    // console.log("ultimate: " + imageUsing)
    // console.log(selectedImageWidth)

    function cycleArrays(direction){
        //determine array direction
        var newArrayIndex
        if(direction == "upwards"){ newArrayIndex = currentArrayIndex + 1 }
        if(direction == "downwards"){ newArrayIndex = currentArrayIndex - 1 }
    
        //go to the other side of the array, if goes outside of array length
        //using imageArray because all arrays will always be the same length
        if(newArrayIndex < 0){ newArrayIndex = imageArray.length - 1 }
        if(newArrayIndex >= imageArray.length){ newArrayIndex = 0 }
        setCurrentArrayIndex(newArrayIndex)
        // console.log("newArray: " + newArrayIndex)
    
        //update selection
        setImageUsing(imageArray[newArrayIndex])
        setImageUsingDescription(descriptionArray[newArrayIndex])
        setImageUsingHeight(heightArray[newArrayIndex])
        setImageUsingWidth(widthArray[newArrayIndex])
        setImageUsingHeader(headerArray[newArrayIndex])
        setHeaderName(headerArray[newArrayIndex])
        getRightImage(direction, imageArray)
        getLeftImage(direction, imageArray)
    }

    function getRightImage(direction, array, initIndex){
        var oldArrayIndex
        var newArrayIndex
        
        //decide whether to use init value or state
        if(initIndex || initIndex == 0){ oldArrayIndex = initIndex - 1 }
        else{ oldArrayIndex = currentArrayIndex }

        //determine direction
        //downwards works a bit weirdly, sicne the first if statement overwrites the needed index
        if(direction == "upwards"){ newArrayIndex = oldArrayIndex + 2 }
        if(direction == "downwards"){ 
            setRightImage(array[oldArrayIndex]) 
            return 
        }

        //go to the other side of the array, if goes outside of array length
        if(oldArrayIndex == array.length - 1){ newArrayIndex = 1 }
        if(newArrayIndex < 0){ newArrayIndex = array.length - 1 }
        if(newArrayIndex >= array.length){ newArrayIndex = 0 }
        
        // console.log("arrayIndex: " + newArrayIndex)
        // console.log("newImage: " + array[newArrayIndex])
        setRightImage(array[newArrayIndex])
    }

    function getLeftImage(direction, array, initIndex){
        var oldArrayIndex
        var newArrayIndex
        
        //decide whether to use init value or state
        if(initIndex || initIndex == 0){ oldArrayIndex = initIndex - 1 }
        else{ oldArrayIndex = currentArrayIndex }
        
        //determine direction
        if(direction == "upwards"){ newArrayIndex = oldArrayIndex }
        if(direction == "downwards"){ newArrayIndex = oldArrayIndex - 2 }
        // console.log("currentIndex: " + oldArrayIndex)
        // console.log("startIndex: " + newArrayIndex)

        //go to the other side of the array, if goes outside of array length
        // if(oldArrayIndex == 0){ newArrayIndex = oldArrayIndex + 1 }
        if(oldArrayIndex == 0 && direction == "downwards"){ newArrayIndex = array.length - 2 }
        if(oldArrayIndex == 0 && direction == "upwards"){ newArrayIndex = oldArrayIndex }
        if(newArrayIndex < 0){ newArrayIndex = array.length - 1 }
        if(newArrayIndex >= array.length){ newArrayIndex = 0 }
        
        // console.log("endIndex: " + newArrayIndex)
        // console.log("newImage: " + imageArray[newArrayIndex])
        setLeftImage(array[newArrayIndex])
    }


    //set default if image is not defined (check is specifically checking the string of "undefined" due to setting in selectedImageWidth var)
    if(imageUsing == "undefined"){ setImageUsing("placeholderImage.webp") }
    if(imageUsingWidth == "undefined"){ setImageUsingWidth(100) }
    if(imageUsingHeight == "undefined"){ setImageUsingHeight(100) }


    return(
        //if the image is in the Image Viewer, don't open Image Viewer on click, otherwise, open Image Viewer on click
        isOpen ?
            //true / in Image Viewer
            <>
                <div className={styles.image}>
                    { usingArray && <div className={styles.icon} style={{left:15}} onClick={() => cycleArrays("downwards")}>
                      <LeftIcon width="3vh" height="3vh"/>
                    </div> }

                    {/* normal image */}
                    { !isMaximized && 
                        <div className={styles.image}>
                            <Image src={imageUsing} width={imageUsingWidth} height={imageUsingHeight} alt="img"/>
                            { showPreviewImages && 
                                <div className={styles.previewImages}>
                                    <Image src={leftImage} width={80} height={80} alt="prevImg"/>
                                    <Image src={imageUsing} width={80} height={80} alt="currImg"/>
                                    <Image src={rightImage} width={80} height={80} alt="nextImg"/>
                                </div> 
                            }
                        </div>
                    }

                    {/* maximized image */}
                    { isMaximized && 
                        <div className={styles.maximizedImage}>
                            <Image src={imageUsing} style={{objectFit:"contain"}} fill={true} alt="img"/>
                            { showPreviewImages && 
                                <div className={styles.previewImages}>
                                    <Image src={leftImage} width={80} height={80} alt="prevImg"/>
                                    <Image src={imageUsing} width={80} height={80} alt="currImg"/>
                                    <Image src={rightImage} width={80} height={80} alt="nextImg"/>
                                </div>
                            }
                        </div>
                    }

                    { usingArray && <div className={styles.icon} style={{right:15}} onClick={() => cycleArrays("upwards")}>
                        <RightIcon width="3vh" height="3vh"/>
                    </div> }
                </div>

                <h1 className={styles.text}>{imageUsingDescription}</h1>
            </>
            : 
            //false / outside of Image Viewer  (this is technically never used)
            <Image src={"placeholderImage.webp"} width={imageUsingWidth} height={imageUsingHeight} alt="NULL_IMAGE"/>
    )
}