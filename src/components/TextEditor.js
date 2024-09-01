"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import styles from "@/styles/TextEditor.module.css"


export default function TextEditor({ isOpen, selectedText, selectedMdxFile }) {
    const [textUsing, setTextUsing] = useState()
    const [ImportedMdxFile, setImportedMdxFile] = useState(() => () => <p>Loading file contents...</p>)
    var selectedTextText = `${selectedText}`
    var selectedFile = `${selectedMdxFile}`

    useEffect(() => {
        setTextUsing(selectedTextText)
    }, [selectedTextText])

    //NOTE: this can be a bit slow, but i can't find another way to dynamically load files
    useEffect(() => {
        const importMdxFile = async () => {
            try{
                const SelectedMdxFile = await import(`@/components/mdxFiles/${selectedFile}.mdx`)
                setImportedMdxFile(() => dynamic(() => Promise.resolve(SelectedMdxFile)))
            } 
            catch(error){
                console.error("Mdx file not found: ", error)
                setImportedMdxFile(() => () => <p>Did a little oopsie~ Maybe the Mdx file name is incorrect?</p>)
            }
        }

        importMdxFile()
    }, [selectedMdxFile])

    //set default if text is undefined (check is specifically checking the string for "undefined" due to setting in selectedTextText var)
    if(textUsing == "undefined"){ setTextUsing("Lorem ipsum dolor sit amet consectetur adipisicing elit.") }


    return(
        <div className={styles.textEditorBody}>
            {textUsing == "undefined" && 
                <p className={styles.text}>
                    {textUsing}
                </p>
            }

            <div className={styles.text}>
                <ImportedMdxFile className={styles.text}/>
            </div>
        </div>
    )
}