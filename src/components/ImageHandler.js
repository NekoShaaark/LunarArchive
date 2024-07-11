"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/ImageViewer.module.css"
import { LeftIcon, RightIcon } from "./SvgHandler"
import { AnimatePresence, motion, useAnimate } from "framer-motion"

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

    const [outerRightImage, setOuterRightImage] = useState("placeholderImage.webp")
    const [innerRightImage, setInnerRightImage] = useState("placeholderImage.webp")
    const [showPreviewImages, setShowPreviewImages] = useState(true)
    const [innerLeftImage, setInnerLeftImage] = useState("placeholderImage.webp")
    const [outerLeftImage, setOuterLeftImage] = useState("placeholderImage.webp")

    const [outerLeftImageAnimation, outerLeftImageAnimate] = useAnimate()
    const [innerLeftImageAnimation, innerLeftImageAnimate] = useAnimate()
    const [middleImageAnimation, middleImageAnimate] = useAnimate()
    const [innerRightImageAnimation, innerRightImageAnimate] = useAnimate()
    const [outerRightImageAnimation, outerRightImageAnimate] = useAnimate()
    
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
        updateOuterLeftImage("upwards", selectedImage, imageArrayIndex)
        updateInnerLeftImage("upwards", selectedImage, imageArrayIndex)
        updateInnerRightImage("upwards", selectedImage, imageArrayIndex)
        updateOuterRightImage("upwards", selectedImage, imageArrayIndex)
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


    const scrollRightAnimation = async () => {

        if(!isMaximized){
            //first reposition the new image preview
            innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 102, y: -14 }, { duration: 0.0, delay: 0 })
                middleImageAnimate(middleImageAnimation.current, { x: 102, y: 0 }, { duration: 0.0, delay: 0 })
            await innerRightImageAnimate(innerRightImageAnimation.current, { x: -204, y: 0 }, { duration: 0.0, delay: 0 })

            //then animate back to its original position 
            //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
            innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
                middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14 }, { duration: 0.6, delay: 0 })
            await innerRightImageAnimate(innerRightImageAnimation.current, { x: -218, y: 0, opacity: 0 }, { duration: 0.2, delay: 0 })
            await innerRightImageAnimate(innerRightImageAnimation.current, { x: 14, y: 0 }, { duration: 0.0, delay: 0 })
            innerRightImageAnimate(innerRightImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.4, delay: 0 })
        }
        else{
            //first reposition the new image preview
            outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 102, y: 0 }, { duration: 0.0, delay: 0 })
                innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 102, y: -14 }, { duration: 0.0, delay: 0 })
                    middleImageAnimate(middleImageAnimation.current, { x: 102, y: 0 }, { duration: 0.0, delay: 0 })
                innerRightImageAnimate(innerRightImageAnimation.current, { x: 102, y: 14 }, { duration: 0.0, delay: 0 })
            await outerRightImageAnimate(outerRightImageAnimation.current, { x: -408, y: 14 }, { duration: 0.0, delay: 0 })     
            //then animate back to its original position 
            //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
            outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 0, y: 14, opacity: 0.5 }, { duration: 0.6, delay: 0 })
                innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
                    middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14 }, { duration: 0.6, delay: 0 })
                innerRightImageAnimate(innerRightImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
            await outerRightImageAnimate(outerRightImageAnimation.current, { x: -422, opacity: 0 }, { duration: 0.3, delay: 0 })
            await outerRightImageAnimate(outerRightImageAnimation.current, { x: 14 }, { duration: 0.0, delay: 0 })
            outerRightImageAnimate(outerRightImageAnimation.current, { x: 0, opacity: 0.5 }, { duration: 0.2, delay: 0 })
        }
    }

    const scrollLeftAnimation = async () => {

        if(!isMaximized){
            //first reposition the new image preview
            innerRightImageAnimate(innerRightImageAnimation.current, { x: -102, y: -14 }, { duration: 0.0, delay: 0 })
                middleImageAnimate(middleImageAnimation.current, { x: -102, y: 0 }, { duration: 0.0, delay: 0 })
            await innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 204, y: 0 }, { duration: 0.0, delay: 0 })
        
            //then animate back to its original position 
            //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
            innerRightImageAnimate(innerRightImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
                middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14 }, { duration: 0.6, delay: 0 })
            await innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 218, y: 0, opacity: 0 }, { duration: 0.2, delay: 0 })
            await innerLeftImageAnimate(innerLeftImageAnimation.current, { x: -14, y: 0 }, { duration: 0.0, delay: 0 })
            innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.4, delay: 0 })
        }
        else{
            //first reposition the new image preview
            outerRightImageAnimate(outerRightImageAnimation.current, { x: -102, y: 0 }, { duration: 0.0, delay: 0 })
                innerRightImageAnimate(innerRightImageAnimation.current, { x: -102, y: -14 }, { duration: 0.0, delay: 0 })
                    middleImageAnimate(middleImageAnimation.current, { x: -102, y: 0 }, { duration: 0.0, delay: 0 })
                innerLeftImageAnimate(innerLeftImageAnimation.current, { x: -102, y: 14 }, { duration: 0.0, delay: 0 })
            await outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 408, y: 14 }, { duration: 0.0, delay: 0 })

            //then animate back to its original position 
            //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
            outerRightImageAnimate(outerRightImageAnimation.current, { x: 0, y: 14, opacity: 0.5 }, { duration: 0.6, delay: 0 })
                innerRightImageAnimate(innerRightImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
                    middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14 }, { duration: 0.6, delay: 0 })
                innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
            await outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 422, opacity: 0 }, { duration: 0.3, delay: 0 })
            await outerLeftImageAnimate(outerLeftImageAnimation.current, { x: -14 }, { duration: 0.0, delay: 0 })
            outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 0, opacity: 0.5 }, { duration: 0.2, delay: 0 })
        }
    }

    const scrollRightTwiceAnimation = async () => {
        
        //first reposition the new image preview
        outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 204, y: -14 }, { duration: 0.0, delay: 0 })
            innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 204, y: 0 }, { duration: 0.0, delay: 0 })
                middleImageAnimate(middleImageAnimation.current, { x: 204, y: 14 }, { duration: 0.0, delay: 0 })
            innerRightImageAnimate(innerRightImageAnimation.current, { x: -306, y: 14 }, { duration: 0.0, delay: 0 })
        await outerRightImageAnimate(outerRightImageAnimation.current, { x: -306, y: -14 }, { duration: 0.0, delay: 0 })

        //then animate back to its original position 
        //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
        outerLeftAnimate()
            innerLeftAnimate()
                middleAnimate()
            innerRightAnimate()
        outerRightAnimate()

        async function middleAnimate(){
            await middleImageAnimate(middleImageAnimation.current, { x: 102, y: 0, opacity: 0.75 }, { duration: 0.2, delay: 0 })
            middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14, opacity: 1 }, { duration: 0.4, delay: 0 })
        }

        async function innerLeftAnimate(){
            await innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 102, y: -14, opacity: 0.5 }, { duration: 0.2, delay: 0 })
            innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.4, delay: 0 })
        }

        async function innerRightAnimate(){
            await innerRightImageAnimate(innerRightImageAnimation.current, { x: -320, y: 14, opacity: 0 }, { duration: 0.1, delay: 0 })
            await innerRightImageAnimate(innerRightImageAnimation.current, { x: 116, y: 14, opacity: 0 }, { duration: 0.0, delay: 0 })
            await innerRightImageAnimate(innerRightImageAnimation.current, { x: 102, y: 14, opacity: 0.5 }, { duration: 0.1, delay: 0 })
            innerRightImageAnimate(innerRightImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.4, delay: 0 })
        }

        async function outerLeftAnimate(){
            await outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 102, y: 0, opacity: 0.75 }, { duration: 0.2, delay: 0 })
            outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 0, y: 14, opacity: 0.5 }, { duration: 0.4, delay: 0 })
        }

        async function outerRightAnimate(){
            await outerRightImageAnimate(outerRightImageAnimation.current, { x: -408, y: 14 }, { duration: 0.2, delay: 0 })
            await outerRightImageAnimate(outerRightImageAnimation.current, { x: -422, y: 14, opacity: 0 }, { duration: 0.1, delay: 0 })
            await outerRightImageAnimate(outerRightImageAnimation.current, { x: 14, y: 14, opacity: 0 }, { duration: 0.0, delay: 0 })
            outerRightImageAnimate(outerRightImageAnimation.current, { x: 0, y: 14, opacity: 0.5 }, { duration: 0.3, delay: 0 })
        }
    }

    const scrollLeftTwiceAnimation = async () => {

        //first reposition the new image preview
        outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 306, y: 0 }, { duration: 0.0, delay: 0 })
            innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 306, y: 14 }, { duration: 0.0, delay: 0 })
                middleImageAnimate(middleImageAnimation.current, { x: -204, y: 14 }, { duration: 0.0, delay: 0 })
            innerRightImageAnimate(innerRightImageAnimation.current, { x: -204, y: 0 }, { duration: 0.0, delay: 0 })
        await outerRightImageAnimate(outerRightImageAnimation.current, { x: -204, y: -14 }, { duration: 0.0, delay: 0 })

        //then animate back to its original position 
        //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
        outerLeftAnimate()
            innerLeftAnimate()
                middleAnimate()
            innerRightAnimate()
        outerRightAnimate()

        async function middleAnimate(){
            await middleImageAnimate(middleImageAnimation.current, { x: -102, y: 0, opacity: 0.75 }, { duration: 0.2, delay: 0 })
            middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14, opacity: 1 }, { duration: 0.4, delay: 0 })
        }

        async function innerRightAnimate(){
            await innerRightImageAnimate(innerRightImageAnimation.current, { x: -102, y: -14, opacity: 0.5 }, { duration: 0.2, delay: 0 })
            innerRightImageAnimate(innerRightImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.4, delay: 0 })
        }

        async function innerLeftAnimate(){
            await innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 320, y: 14, opacity: 0 }, { duration: 0.1, delay: 0 })
            await innerLeftImageAnimate(innerLeftImageAnimation.current, { x: -118, y: 14, opacity: 0 }, { duration: 0.0, delay: 0 })
            await innerLeftImageAnimate(innerLeftImageAnimation.current, { x: -104, y: 14, opacity: 0.5 }, { duration: 0.1, delay: 0 })
            innerLeftImageAnimate(innerLeftImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.4, delay: 0 })
        }

        async function outerRightAnimate(){
            await outerRightImageAnimate(outerRightImageAnimation.current, { x: -102, y: 0, opacity: 0.5 }, { duration: 0.2, delay: 0 })
            outerRightImageAnimate(outerRightImageAnimation.current, { x: 0, y: 14, opacity: 0.5 }, { duration: 0.4, delay: 0 })
        }

        async function outerLeftAnimate(){
            await outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 408, y: 14 }, { duration: 0.2, delay: 0 })
            await outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 422, y: 14, opacity: 0 }, { duration: 0.1, delay: 0 })
            await outerLeftImageAnimate(outerLeftImageAnimation.current, { x: -14, y: 14, opacity: 0 }, { duration: 0.0, delay: 0 })
            outerLeftImageAnimate(outerLeftImageAnimation.current, { x: 0, y: 14, opacity: 0.5 }, { duration: 0.3, delay: 0 })
        }
    }


      //--MOTION VARIANTS--//
    const middleMotion = {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: -14 },
        whileHover: { y: -20, scale: 1.08, transition: 0.4 },
        transition: { duration: 0.2 }
    }
    const innerSidesMotion = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 0.75, y: 0 },
        whileHover: { y: -6, scale: 1.05, transition: 0.6 },
        transition: { duration: 0.4 }
    }
    const outerSidesMotion = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 0.5, y: 14 },
        whileHover: { y: 8, scale: 1.03, transition: 0.8 },
        transition: { duration: 0.6 }
    }

    
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

        //update preview images
        updateOuterLeftImage(direction, imageArray)
        updateInnerLeftImage(direction, imageArray)
        updateInnerRightImage(direction, imageArray)
        updateOuterRightImage(direction, imageArray)

        //play scroll animation
        if(direction == "upwards"){ scrollRightAnimation() }
        if(direction == "downwards"){ scrollLeftAnimation() }
    }

    function cycleArraysByTwo(direction){
        //determine direction and handle array wrapping
        var newArrayIndex
        if(direction == "upwards"){ 
            newArrayIndex = currentArrayIndex + 2
            newArrayIndex = (newArrayIndex + imageArray.length) % imageArray.length
        }
        if(direction == "downwards"){ 
            newArrayIndex = currentArrayIndex - 2
            if(newArrayIndex < 0){ newArrayIndex = imageArray.length + newArrayIndex }
        }

        //set new current arrayIndex
        setCurrentArrayIndex(newArrayIndex)
        // console.log("currentArrayIndex: " + currentArrayIndex)
        // console.log("newArrayIndex: " + newArrayIndex)

        //update selection
        setImageUsing(imageArray[newArrayIndex])
        setImageUsingDescription(descriptionArray[newArrayIndex])
        setImageUsingHeight(heightArray[newArrayIndex])
        setImageUsingWidth(widthArray[newArrayIndex])
        setImageUsingHeader(headerArray[newArrayIndex])
        setHeaderName(headerArray[newArrayIndex])

        //update preview images
        updateOuterLeftImage("upwards", imageArray, newArrayIndex)
        updateInnerLeftImage("upwards", imageArray, newArrayIndex)
        updateInnerRightImage("upwards", imageArray, newArrayIndex)
        updateOuterRightImage("upwards", imageArray, newArrayIndex)

        //play scroll animation
        if(direction == "upwards"){ scrollRightTwiceAnimation() }
        if(direction == "downwards"){ scrollLeftTwiceAnimation() }
    }


    function updateInnerRightImage(direction, array, initIndex){
        var oldArrayIndex
        var newArrayIndex
        
        //decide whether to use init value or state
        if(initIndex || initIndex == 0){ oldArrayIndex = initIndex - 1 }
        else{ oldArrayIndex = currentArrayIndex }

        //determine direction
        //downwards works a bit weirdly, since the first if statement overwrites the needed index
        if(direction == "upwards"){ newArrayIndex = oldArrayIndex + 2 }
        if(direction == "downwards"){ 
            setInnerRightImage(array[oldArrayIndex]) 
            return 
        }

        //go to the other side of the array, if goes outside of array length
        if(oldArrayIndex == array.length - 1){ newArrayIndex = 1 }
        if(newArrayIndex < 0){ newArrayIndex = array.length - 1 }
        if(newArrayIndex >= array.length){ newArrayIndex = 0 }
        
        // console.log("arrayIndex: " + newArrayIndex)
        // console.log("newImage: " + array[newArrayIndex])
        setInnerRightImage(array[newArrayIndex])
    }

    function updateInnerLeftImage(direction, array, initIndex){
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
        setInnerLeftImage(array[newArrayIndex])
    }

    function updateOuterRightImage(direction, array, initIndex){
        var oldArrayIndex
        var newArrayIndex
        
        //decide whether to use init value or state
        if(initIndex || initIndex == 0){ oldArrayIndex = initIndex - 1 }
        else{ oldArrayIndex = currentArrayIndex }
        // console.log("oldArrayIndex: " + oldArrayIndex)

        //determine direction
        if(direction == "upwards"){ 
            newArrayIndex = oldArrayIndex + 3 
            //go to the other side of the array, if goes outside of array length
            newArrayIndex = (newArrayIndex + array.length) % array.length
            setOuterRightImage(array[newArrayIndex])
        }
        
        if(direction == "downwards"){ 
            newArrayIndex = oldArrayIndex + 1
            //go to the other side of the array, if goes outside of array length
            if(oldArrayIndex == array.length - 1){ newArrayIndex = 0 }
            setOuterRightImage(array[newArrayIndex])
        }
    }

    function updateOuterLeftImage(direction, array, initIndex){
        var oldArrayIndex
        var newArrayIndex
        
        //decide whether to use init value or state
        if(initIndex || initIndex == 0){ oldArrayIndex = initIndex - 1 }
        else{ oldArrayIndex = currentArrayIndex }
        
        //determine direction
        if(direction == "upwards"){ 
            newArrayIndex = oldArrayIndex - 1 
            //go to the other side of the array, if goes outside of array length
            if(oldArrayIndex <= 0){ newArrayIndex = (array.length + oldArrayIndex) - 1 }
            setOuterLeftImage(array[newArrayIndex])
        }

        if(direction == "downwards"){ 
            newArrayIndex = oldArrayIndex - 3
            //go to the other side of the array, if goes outside of array length
            if(newArrayIndex < 0){ newArrayIndex = array.length + newArrayIndex }
            setOuterLeftImage(array[newArrayIndex])
        }
    }


    //set default if image is not defined (check is specifically checking the string of "undefined" due to setting in selectedImageWidth var)
    if(imageUsing == "undefined"){ setImageUsing("placeholderImage.webp") }
    if(imageUsingWidth == "undefined"){ setImageUsingWidth(100) }
    if(imageUsingHeight == "undefined"){ setImageUsingHeight(100) }


    return(
        //if the image is in the Image Viewer, don't open Image Viewer on click, otherwise, open Image Viewer on click
        isOpen ?
            //true / in Image Viewer
            <div className={styles.imageViewerBody}>
                <div className={styles.image}>
                    { usingArray && 
                        <motion.div 
                            className={styles.icon} 
                            style={{left:15}} 
                            whileHover={{ x: -4, scale: 1.05 }}
                            onClick={() => cycleArrays("downwards")}
                        >
                            <LeftIcon width="3vh" height="3vh"/>
                        </motion.div> }

                    {/* normal image */}
                    { !isMaximized && 
                        <div className={styles.image}>
                            <AnimatePresence>
                                <motion.div>
                                    <Image src={imageUsing} width={imageUsingWidth} height={imageUsingHeight} alt="img"/>
                                </motion.div>
                            </AnimatePresence>
                            { showPreviewImages && 
                                <AnimatePresence>
                                    <motion.div 
                                        className={styles.previewImages}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <motion.section
                                            ref={innerLeftImageAnimation}
                                            variants={innerSidesMotion}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="whileHover"
                                            transition="transition"
                                        ><Image src={innerLeftImage} width={90} height={60} alt="prevImg" onClick={() => cycleArrays("downwards")}/></motion.section>
                                        
                                        <motion.section
                                            ref={middleImageAnimation}
                                            variants={middleMotion}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="whileHover"
                                            transition="transition"
                                        ><Image src={imageUsing} width={90} height={60} alt="currImg"/></motion.section>

                                        <motion.section
                                            ref={innerRightImageAnimation}
                                            variants={innerSidesMotion}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="whileHover"
                                            transition="transition"
                                        ><Image src={innerRightImage} width={90} height={60} alt="nextImg" onClick={() => cycleArrays("upwards")}/></motion.section>
                                    </motion.div> 
                                </AnimatePresence>
                            }
                        </div>
                    }

                    {/* maximized image */}
                    { isMaximized && 
                        <div className={styles.maximizedImage}>
                            <Image src={imageUsing} style={{objectFit:"contain"}} fill={true} alt="img"/>
                            { showPreviewImages && 
                                <div className={styles.previewImages}>
                                    <AnimatePresence>
                                        <motion.div 
                                            className={styles.previewImages}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <motion.section
                                                ref={outerLeftImageAnimation}
                                                variants={outerSidesMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={outerLeftImage} width={90} height={60} alt="outerPrevImg" onClick={() => cycleArraysByTwo("downwards", 2)}/></motion.section>

                                            <motion.section
                                                ref={innerLeftImageAnimation}
                                                variants={innerSidesMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={innerLeftImage} width={90} height={60} alt="innerPrevImg" onClick={() => cycleArrays("downwards")}/></motion.section>

                                            <motion.section
                                                ref={middleImageAnimation}
                                                variants={middleMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={imageUsing} width={90} height={60} alt="currImg"/></motion.section>

                                            <motion.section
                                                ref={innerRightImageAnimation}
                                                variants={innerSidesMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={innerRightImage} width={90} height={60} alt="innerNextImg" onClick={() => cycleArrays("upwards")}/></motion.section>

                                            <motion.section
                                                ref={outerRightImageAnimation}
                                                variants={outerSidesMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={outerRightImage} width={90} height={60} alt="outerNextImg" onClick={() => cycleArraysByTwo("upwards", 2)}/></motion.section>
                                        </motion.div> 
                                    </AnimatePresence>
                                </div>
                            }
                        </div>
                    }

                    { usingArray && 
                        <motion.div 
                            className={styles.icon} 
                            style={{right:15}} 
                            whileHover={{ x: 4, scale: 1.05 }}
                            onClick={() => cycleArrays("upwards")}
                        >
                            <RightIcon width="3vh" height="3vh"/>
                        </motion.div> }
                </div>

                <h1 className={styles.text}>{imageUsingDescription}</h1>
            </div>
            : 
            //false / outside of Image Viewer  (this is technically never used)
            <Image src={"placeholderImage.webp"} width={imageUsingWidth} height={imageUsingHeight} alt="NULL_IMAGE"/>
    )
}