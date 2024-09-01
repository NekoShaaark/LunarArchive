"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import styles from "@/styles/TextEditor.module.css"


export default function TextEditor({ isOpen, selectedText, selectedMdxFile }) {
    const [textUsing, setTextUsing] = useState()
    var selectedTextText = `${selectedText}`
    var selectedFile = `${selectedMdxFile}`

    useEffect(() => {
        setTextUsing(selectedTextText)
    }, [selectedTextText])

    //dynamically load the mdx file(s)
    const SelectedMdxFile = dynamic(() => import(`@/components/mdxFiles/${selectedFile}.mdx`), {
        loading: () => <p>Loading file contents...</p>
    })

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
                <SelectedMdxFile/>
            </div>
        </div>
    )
}