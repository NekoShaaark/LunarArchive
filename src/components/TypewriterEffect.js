"use client"

import { useState, useEffect } from 'react'

export default function TypewriterEffect({ text, delay, effectType }) {
  const [currentText, setCurrentText] = useState('')
  const [currentNumber, setCurrentNumber] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  var textUsing = `${text}`
  var numberUsing

  //set numberUsing variable if is a number
  if(!isNaN(text)){ numberUsing = text }

  // console.log("using: " + textUsing)
  // console.log("current: " + currentText)
  // console.log("index: " + currentIndex)

  //remove overlapping text, then rewrite it (rewritting is done automatically, due to overwritting "textUsing" variable)
  const commonParts = getCommonPart(textUsing, currentText)
  const partToRemove = commonParts.commonPrefix
  if(partToRemove != currentText){ textUsing = partToRemove }


  //get common part between two strings
  function getCommonPart(str1, str2){
    let commonPrefix = ''
    let minLength = Math.min(str1.length, str2.length)
  
    // Find the common prefix
    for(let i = 0; i < minLength; i++){
      if(str1[i] === str2[i]){ commonPrefix += str1[i] }
      else{ break }
    }
  
    // Find the common suffix
    let commonSuffix = ''
    for(let i = 0; i < minLength; i++){
      if(str1[str1.length - 1 - i] === str2[str2.length - 1 - i]){
        commonSuffix = str1[str1.length - 1 - i] + commonSuffix
      }
      else{ break }
    }
  
    return {
      commonPrefix,
      commonSuffix,
      str1UniquePart: str1.slice(commonPrefix.length, str1.length - commonSuffix.length),
      str2UniquePart: str2.slice(commonPrefix.length, str2.length - commonSuffix.length)
    }
  }


  useEffect(() => {
    
    //determine if to use text or number effectType
    if(effectType == "Number"){

      //subtract number
      if(currentNumber > numberUsing){
        const timeout = setTimeout(() => {
          setCurrentNumber(prevNum => prevNum - 1)
          // console.log("minus one using: " + numberUsing)
          // console.log("minus one prev: " + currentNumber)
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