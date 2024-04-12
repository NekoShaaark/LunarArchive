"use client"

import { useState, useEffect } from 'react'

export default function TypewriterEffect({ text, delay }) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const textUsing = `${text}`

  useEffect(() => {
    if(currentIndex < textUsing.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + textUsing[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)
  
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, currentText, textUsing, delay])

  return currentText
}