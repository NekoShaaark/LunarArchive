"use client"

import { useState, useEffect } from 'react'

export default function TypewriterEffect({ text, delay, effectType }) {
  const [currentText, setCurrentText] = useState('')
  const [currentNumber, setCurrentNumber] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const textUsing = `${text}`
  var numberUsing

  //set numberUsing variable if is a number
  if(!isNaN(text)){ numberUsing = text }

  // var newText = currentText.slice(textUsing.length, currentText.length)
  // console.log("using: " + textUsing)
  // console.log("current: " + currentText)
  // console.log("index: " + currentIndex)
  // console.log("remove: " + newText)
  // console.log(currentText.slice(0, currentIndex))


  useEffect(() => {
    
    //determine if to use text or number effectType
    if(effectType == "Number"){

      //subtract number
      if(currentNumber > numberUsing){
        const timeout = setTimeout(() => {
          setCurrentNumber(prevNum => prevNum - 1)
          console.log("minus one using: " + numberUsing)
          console.log("minus one prev: " + currentNumber)
        }, delay)

        return () => clearTimeout(timeout)
      }

      //add number
      if(currentNumber <= (numberUsing-1)){
        const timeout = setTimeout(() => {
          // console.log("plus one using: " + numberUsing)
          // console.log("plus one prev: " + currentNumber)
          setCurrentNumber(prevNum => prevNum + 1)
        }, delay)
        
        return () => clearTimeout(timeout)
      }
    }


    //remove text
    if(textUsing.length < currentText.length && currentTextIndex > textUsing.length){
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText.slice(0, currentTextIndex - 1))
        setCurrentTextIndex(prevIndex => prevIndex - 1)
      }, delay)
  
      return () => clearTimeout(timeout)
    }

    //add text
    if(currentTextIndex < textUsing.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + textUsing[currentTextIndex])
        setCurrentTextIndex(prevIndex => prevIndex + 1)
      }, delay)
  
      return () => clearTimeout(timeout)
    }
  }, [currentTextIndex, currentText, currentNumber, textUsing, delay])


  //return final text/number
  if(numberUsing){ return currentNumber }
  return currentText
}