"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/ImageViewer.module.css"
import { Button } from "@mui/material"
import { LeftIcon, RightIcon } from "./SvgHandler"

export default function ImageHandler({ selectedImage, isOpen, imageWidth, imageHeight, imageDescription, imageArrayIndex }) {
    const [imageUsing, setImageUsing] = useState()
    const [imageUsingWidth, setImageUsingWidth] = useState()
    const [imageUsingHeight, setImageUsingHeight] = useState()
    const [imageUsingDescription, setImageUsingDescription] = useState()

    const [usingArray, setUsingArray] = useState(true)
    const [imageArray, setImageArray] = useState([])
    const [currentArrayIndex, setCurrentArrayIndex] = useState(0)
    
    var selectedImageLocation = `${selectedImage}`
    var selectedImageWidth = `${imageWidth}`
    var selectedImageHeight = `${imageHeight}`
    var selectedImageDescription = `${imageDescription}`
    

    useEffect(() => {
        if(selectedImage instanceof Array){ 
            // console.log("yup array")
            // console.log(selectedImage)
            // console.log("arrayIndex: " + imageArrayIndex)
            if(imageArrayIndex == undefined){ imageArrayIndex = 0 }
            selectedImageLocation = selectedImage[imageArrayIndex]
            setImageArray(selectedImage)
            setUsingArray(true)
        }
        else{ setUsingArray(false) }

        // console.log("useEffect")
        // console.log(selectedImageLocation)
        setImageUsing(selectedImageLocation)
        setImageUsingWidth(selectedImageWidth)
        setImageUsingHeight(selectedImageHeight)
        setImageUsingDescription(selectedImageDescription)
    }, [selectedImageLocation, selectedImageWidth, selectedImageHeight, selectedImageDescription, imageArrayIndex])
    
    // console.log("isOpen: " + isOpen)
    // console.log("ultimate: " + imageUsing)
    // console.log(selectedImageWidth)

    function cycleArray(array, direction){
        //determine array direction
        var newArrayIndex
        if(direction == "upwards"){ newArrayIndex = currentArrayIndex + 1 }
        if(direction == "downwards"){ newArrayIndex = currentArrayIndex - 1 }
    
        //go to the other side of the array, if goes outside of array length
        if(newArrayIndex < 0){ newArrayIndex = array.length - 1 }
        if(newArrayIndex >= array.length){ newArrayIndex = 0 }
        setCurrentArrayIndex(newArrayIndex)
        // console.log("newArray: " + newArrayIndex)
    
        //update selection
        setImageUsing(array[newArrayIndex])
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
                { usingArray && <Button className={styles.icon} disableRipple onClick={() => cycleArray(imageArray, "downwards")}>
                  <LeftIcon width="3vh" height="3vh"/>
                </Button> }

                <Image src={imageUsing} width={imageUsingWidth} height={imageUsingHeight} alt="img"/> 
                
                { usingArray && <Button className={styles.icon} disableRipple onClick={() => cycleArray(imageArray, "upwards")}>
                    <RightIcon width="3vh" height="3vh"/>
                </Button> }

                <h1 className={styles.text}>{imageUsingDescription}</h1>
            </>
            : 
            //false / outside of Image Viewer  (this is technically never used)
            <Image src={"placeholderImage.webp"} width={imageUsingWidth} height={imageUsingHeight} alt="NULL_IMAGE"/>
    )
}