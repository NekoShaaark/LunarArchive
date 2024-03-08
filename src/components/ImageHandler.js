"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function ImageHandler({selectedImage, setOpen, setImage, documentsOrPortfolio}) {
    const [isOpen, setIsOpen] = useState(false)
    const [imageUsing, setImageUsing] = useState()
    var selectedImageLocation = `${selectedImage}`

    function handleOpen(){
        // console.log("wait this could be it: " + imageUsing)
        setOpen()
        handleImage(imageUsing)
    }
    
    function handleImage(e){
        setImage(e)
        setIsOpen(true)
        // console.log("handle: " + e)
    }
    
    useEffect(() => {
        console.log("useEffect")
        // console.log(selectedImage)
        setImageUsing(selectedImageLocation)
    }, [selectedImage, selectedImageLocation])
    
    console.log(isOpen)
    // console.log("ultimate: " + imageUsing)


    //TODO: "isOpen" should be set to false upon closing
    //TODO: images should not be clickable once opened (or in the Image Viewer)
    //TODO: add handling for documents "thumbnails"

    // if(documentsOrPortfolio == "documents"){
    //     return( 
    //         <Image src={imageUsing} width={24} height={24} alt="img" onClick={handleOpen}/>
    //     )
    // }
    // else{
        return(
            //if the image is in the Image Viewer, don't open Image Viewer on click, otherwise, open Image Viewer on click
            // isOpen ?
            //     <Image src={imageUsing} width={480} height={270} alt="img"/>  //true / in Image Viewer
            //     : 
                <Image src={imageUsing} width={480} height={270} alt="img" onClick={handleOpen}/>  //false / outside of Image Viewer
        )
    // }
}