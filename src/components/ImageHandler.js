"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function ImageHandler({selectedImage, setOpen, setImage, imageWidth, imageHeight, setWidth, setHeight}) {
    const [isOpen, setIsOpen] = useState(false)
    const [imageUsing, setImageUsing] = useState()
    const [imageUsingWidth, setImageUsingWidth] = useState()
    const [imageUsingHeight, setImageUsingHeight] = useState()
    var selectedImageLocation = `${selectedImage}`
    var selectedImageWidth = `${imageWidth}`
    var selectedImageHeight = `${imageHeight}`

    function handleOpen(){
        // console.log("wait this could be it: " + imageUsing)
        setOpen()
        setIsOpen(true)
        handleImage(imageUsing)
        handleWidth(imageUsingWidth)
        handleHeight(imageUsingHeight)
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
    
    useEffect(() => {
        console.log("useEffect")
        // console.log(selectedImage)
        setImageUsing(selectedImageLocation)
        setImageUsingWidth(selectedImageWidth)
        setImageUsingHeight(selectedImageHeight)
    }, [selectedImage, selectedImageLocation])
    
    // console.log(isOpen)
    // console.log("ultimate: " + imageUsing)
    // console.log(selectedImageWidth)


    //set default if image is not defined (check is specifically checking the string of "undefined" due to setting in selectedImageWidth var)
    if(imageUsing == "undefined"){ setImageUsing("placeholderImage.webp") }
    if(imageUsingWidth == "undefined"){ setImageUsingWidth(100) }
    if(imageUsingHeight == "undefined"){ setImageUsingHeight(100) }


    //TODO: "isOpen" should be set to false upon closing
    //TODO: images should not be clickable once opened (or in the Image Viewer)
    return(
        //if the image is in the Image Viewer, don't open Image Viewer on click, otherwise, open Image Viewer on click
        // isOpen ?
        // //true / in Image Viewer
        //     <Image src={imageUsing} width={480} height={270} alt="img"/> 
        //     : 
        // //false / outside of Image Viewer
            <Image src={imageUsing} width={imageUsingWidth} height={imageUsingHeight} alt="img" onClick={handleOpen}/>
    )
}