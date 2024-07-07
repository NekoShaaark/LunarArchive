"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/TextEditor.module.css"

//--mdx file imports--//
import Hey from '@/components/mdxFiles/Hey.mdx'
import Test from '@/components/mdxFiles/Test.mdx'
import Something from '@/components/mdxFiles/Something.mdx'
import BlackHole from '@/components/mdxFiles/Rejected_ideas/blackHole.mdx'
import MissingChildren from '@/components/mdxFiles/accepted_Ideas/missingChildren.mdx'
import EvilNekoVirus from '@/components/mdxFiles/accepted_Ideas/evilNekoVirus.mdx'
import Navbar from '@/components/mdxFiles/Navbar.mdx'
import Credits from '@/components/mdxFiles/Credits.mdx'


export default function TextEditor({ isOpen, selectedText, selectedMdxFile }) {
    const [textUsing, setTextUsing] = useState()
    const [fileUsing, setFileUsing] = useState()
    var selectedTextText = `${selectedText}`
    var selectedFile = `${selectedMdxFile}`

    useEffect(() => {
        // console.log(useEffect)
        // console.log(selectedText)
        setTextUsing(selectedTextText)
        setFileUsing(selectedFile)
    }, [selectedTextText, selectedFile])


    //set default if text is undefined (check is specifically checking the string for "undefined" due to setting in selectedTextText var)
    if(textUsing == "undefined"){ setTextUsing("Lorem ipsum dolor sit amet consectetur adipisicing elit.") }

    switch(fileUsing){
        case "Hey.txt": return <div className={styles.text}><Hey/></div>
        case "Test.txt": return <div className={styles.text}><Test/></div>
        case "Something.txt": return <div className={styles.text}><Something/></div>
        case "blackHole.txt": return <div className={styles.text}><BlackHole/></div>
        case "missingChildren.txt": return <div className={styles.text}><MissingChildren/></div>
        case "evilNekoVirus.exe": return <div className={styles.text}><EvilNekoVirus/></div>
        case "Navbar.txt": return <div className={styles.text} style={{margin:"0"}}><Navbar/></div>
        case "Credits.txt": return <div className={styles.text}><Credits/></div>

        case "undefined": return <p className={styles.text}>{textUsing}</p>
    }
    console.log("fileUsing: " + fileUsing)


    return(
        <>
            <p className={styles.text}>
                {textUsing}
            </p>
        </>
    )
}