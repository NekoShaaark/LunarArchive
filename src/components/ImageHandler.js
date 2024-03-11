"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/ImageViewer.module.css"

export default function ImageHandler({selectedImage, isOpen, setOpen, setImage, imageWidth, imageHeight, setWidth, setHeight, imageDescription, setDescription}) {
    const [imageUsing, setImageUsing] = useState()
    const [imageUsingWidth, setImageUsingWidth] = useState()
    const [imageUsingHeight, setImageUsingHeight] = useState()
    const [imageUsingDescription, setImageUsingDescription] = useState()
    var selectedImageLocation = `${selectedImage}`
    var selectedImageWidth = `${imageWidth}`
    var selectedImageHeight = `${imageHeight}`
    var selectedImageDescription = `${imageDescription}`

    function handleOpen(){
        // console.log("wait this could be it: " + imageUsing)
        setOpen()
        handleImage(imageUsing)
        handleWidth(imageUsingWidth)
        handleHeight(imageUsingHeight)
        handleDescription(imageUsingDescription)
    }
    
    function handleImage(e){
        setImage(e)
        // console.log("handle: " + e)
    }

    function handleWidth(e){
        setWidth(e)
    }

    function handleHeight(e){
        setHeight(e)
    }

    function handleDescription(e){
        setDescription(e)
    }
    
    useEffect(() => {
        // console.log("useEffect")
        // console.log(selectedImage)
        setImageUsing(selectedImageLocation)
        setImageUsingWidth(selectedImageWidth)
        setImageUsingHeight(selectedImageHeight)
        setImageUsingDescription(selectedImageDescription)
    }, [selectedImageLocation, selectedImageWidth, selectedImageHeight, selectedImageDescription])
    
    // console.log("isOpen: " + isOpen)
    // console.log("ultimate: " + imageUsing)
    // console.log(selectedImageWidth)


    //set default if image is not defined (check is specifically checking the string of "undefined" due to setting in selectedImageWidth var)
    if(imageUsing == "undefined"){ setImageUsing("placeholderImage.webp") }
    if(imageUsingWidth == "undefined"){ setImageUsingWidth(100) }
    if(imageUsingHeight == "undefined"){ setImageUsingHeight(100) }


    return(
        //if the image is in the Image Viewer, don't open Image Viewer on click, otherwise, open Image Viewer on click
        isOpen ?
            //true / in Image Viewer
            <>
                <Image src={imageUsing} width={imageUsingWidth} height={imageUsingHeight} alt="img"/> 
                <h1 className={styles.text}>{imageUsingDescription}</h1>
            </>
            : 
            //false / outside of Image Viewer
            <Image src={imageUsing} width={imageUsingWidth} height={imageUsingHeight} alt="img" onClick={handleOpen}/>
    )
}