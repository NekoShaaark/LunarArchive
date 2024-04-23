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

    const [showPreviewImages, setShowPreviewImages] = useState(true)
    const [rightImage, setRightImage] = useState("placeholderImage.webp")
    const [leftImage, setLeftImage] = useState("placeholderImage.webp")

    const [leftImageAnimation, leftImageAnimate] = useAnimate()
    const [middleImageAnimation, middleImageAnimate] = useAnimate()
    const [rightImageAnimation, rightImageAnimate] = useAnimate()
    
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


    const scrollRightAnimation = async () => {

        //first reposition the new image preview
        leftImageAnimate(leftImageAnimation.current, { x: 102, y: -14 }, { duration: 0.0, delay: 0 })
        middleImageAnimate(middleImageAnimation.current, { x: 102, y: 0 }, { duration: 0.0, delay: 0 })
        await rightImageAnimate(rightImageAnimation.current, { x: -204, y: 0 }, { duration: 0.0, delay: 0 })

        //then animate back to its original position 
        //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
        leftImageAnimate(leftImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
        middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14 }, { duration: 0.6, delay: 0 })
        await rightImageAnimate(rightImageAnimation.current, { x: -218, opacity: 0 }, { duration: 0.3, delay: 0 })
        await rightImageAnimate(rightImageAnimation.current, { x: 14 }, { duration: 0.0, delay: 0 })
        rightImageAnimate(rightImageAnimation.current, { x: 0, opacity: 0.75 }, { duration: 0.2, delay: 0 })
    }


    //STUB: the animation looks so nice, but it would be so much better if it was with five (like the concept art)
    const scrollLeftAnimation = async () => {

        //first reposition the new image preview
        rightImageAnimate(rightImageAnimation.current, { x: -102, y: -14 }, { duration: 0.0, delay: 0 })
        middleImageAnimate(middleImageAnimation.current, { x: -102, y: 0 }, { duration: 0.0, delay: 0 })
        await leftImageAnimate(leftImageAnimation.current, { x: 204, y: 0 }, { duration: 0.0, delay: 0 })

        //then animate back to its original position 
        //NOTE: (this prevents the image previews from getting mixed up, and keeps it dynamic)
        rightImageAnimate(rightImageAnimation.current, { x: 0, y: 0, opacity: 0.75 }, { duration: 0.6, delay: 0 })
        middleImageAnimate(middleImageAnimation.current, { x: 0, y: -14 }, { duration: 0.6, delay: 0 })
        await leftImageAnimate(leftImageAnimation.current, { x: 218, opacity: 0 }, { duration: 0.3, delay: 0 })
        await leftImageAnimate(leftImageAnimation.current, { x: -14 }, { duration: 0.0, delay: 0 })
        leftImageAnimate(leftImageAnimation.current, { x: 0, opacity: 0.75 }, { duration: 0.2, delay: 0 })
    }

      //--MOTION VARIANTS--//
    const middleMotion = {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: -14 },
        whileHover: { y: -20, scale: 1.08, transition: 0.4 },
        transition: { duration: 0.2 }
    }
    const sidesMotion = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 0.75, y: 0 },
        whileHover: { y: -6, scale: 1.05, transition: 0.6 },
        transition: { duration: 0.4 }
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

        getRightImage(direction, imageArray)
        getLeftImage(direction, imageArray)

        if(direction == "upwards"){ scrollRightAnimation() }
        if(direction == "downwards"){ scrollLeftAnimation() }
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
                                            ref={leftImageAnimation}
                                            variants={sidesMotion}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="whileHover"
                                            transition="transition"
                                        ><Image src={leftImage} width={90} height={60} alt="prevImg" onClick={() => cycleArrays("downwards")}/></motion.section>
                                        
                                        <motion.section
                                            ref={middleImageAnimation}
                                            variants={middleMotion}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="whileHover"
                                            transition="transition"
                                        ><Image src={imageUsing} width={90} height={60} alt="currImg"/></motion.section>

                                        <motion.section
                                            ref={rightImageAnimation}
                                            variants={sidesMotion}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="whileHover"
                                            transition="transition"
                                        ><Image src={rightImage} width={90} height={60} alt="nextImg" onClick={() => cycleArrays("upwards")}/></motion.section>
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
                                                ref={leftImageAnimation}
                                                variants={sidesMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={leftImage} width={90} height={60} alt="prevImg" onClick={() => cycleArrays("downwards")}/></motion.section>

                                            <motion.section
                                                ref={middleImageAnimation}
                                                variants={middleMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={imageUsing} width={90} height={60} alt="currImg"/></motion.section>

                                            <motion.section
                                                ref={rightImageAnimation}
                                                variants={sidesMotion}
                                                initial="initial"
                                                animate="animate"
                                                whileHover="whileHover"
                                                transition="transition"
                                            ><Image src={rightImage} width={90} height={60} alt="nextImg" onClick={() => cycleArrays("upwards")}/></motion.section>
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
            </>
            : 
            //false / outside of Image Viewer  (this is technically never used)
            <Image src={"placeholderImage.webp"} width={imageUsingWidth} height={imageUsingHeight} alt="NULL_IMAGE"/>
    )
}