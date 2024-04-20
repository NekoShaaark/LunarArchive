"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/ImageViewer.module.css"
import { Button } from "@mui/material"
import { LeftIcon, RightIcon } from "./SvgHandler"

export default function ImageHandler({ selectedImage, isOpen, imageWidth, imageHeight, imageDescription, imageArrayIndex, imageHeader, setHeaderName }) {
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
    
    var selectedImageLocation = `${selectedImage}`
    var selectedImageWidth = `${imageWidth}`
    var selectedImageHeight = `${imageHeight}`
    var selectedImageDescription = `${imageDescription}`
    var selectedImageHeader = `${imageHeader}`
    

    useEffect(() => {
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
        }
        else{ setUsingArray(false) }

        // console.log("useEffect")
        // console.log(selectedImageLocation)
        setImageUsing(selectedImageLocation)
        setImageUsingWidth(selectedImageWidth)
        setImageUsingHeight(selectedImageHeight)
        setImageUsingDescription(selectedImageDescription)
        setImageUsingHeader(selectedImageHeader)
        setHeaderName(selectedImageHeader) //setting default header due to it - by default - being set as the passed array
    }, [selectedImageLocation, selectedImageWidth, selectedImageHeight, selectedImageDescription, imageArrayIndex])
    
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
        setHeaderName(headerArray[newArrayIndex])
        // console.log(array[newArrayIndex])
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
                    { usingArray && <Button className={styles.icon} style={{left:15}} disableRipple onClick={() => cycleArrays("downwards")}>
                      <LeftIcon width="3vh" height="3vh"/>
                    </Button> }

                    <Image src={imageUsing} width={imageUsingWidth} height={imageUsingHeight} alt="img"/> 

                    { usingArray && <Button className={styles.icon} style={{right:15}} disableRipple onClick={() => cycleArrays("upwards")}>
                        <RightIcon width="3vh" height="3vh"/>
                    </Button> }
                </div>

                <h1 className={styles.text}>{imageUsingDescription}</h1>
            </>
            : 
            //false / outside of Image Viewer  (this is technically never used)
            <Image src={"placeholderImage.webp"} width={imageUsingWidth} height={imageUsingHeight} alt="NULL_IMAGE"/>
    )
}