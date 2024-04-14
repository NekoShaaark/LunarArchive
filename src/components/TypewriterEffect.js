"use client"

import { useState, useEffect } from 'react'

export default function TypewriterEffect({ text, delay }) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const textUsing = `${text}`

  // var newText = currentText.slice(textUsing.length, currentText.length)
  // console.log("using: " + textUsing)
  // console.log("current: " + currentText)
  // console.log("index: " + currentIndex)
  // console.log("remove: " + newText)
  // console.log(currentText.slice(0, currentIndex))


  useEffect(() => {

    //remove text
    if(textUsing.length < currentText.length && currentIndex > textUsing.length){
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText.slice(0, currentIndex - 1))
        setCurrentIndex(prevIndex => prevIndex - 1)
      }, delay)
  
      return () => clearTimeout(timeout)
    }

    //add text
    if(currentIndex < textUsing.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + textUsing[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)
  
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, currentText, textUsing, delay])

  
  //return final text
  return currentText
}