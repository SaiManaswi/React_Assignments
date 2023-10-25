import React, { useEffect, useState } from "react";
import "./spell.css"

export default function SpellC() {
    const [text, settext] = useState([])
    let data = text
    const [errors,seterrors] = useState([])
    useEffect(() => {
        console.log(text.join(' '))
        const getapi = async () => {

            await fetch('https://api.textgears.com/grammar', {
                method: "POST",
                body: JSON.stringify({
                    "text": text.join(' '),
                    "ai": 1,
                    "key": "id3JxqcKPRKAyEcA"
                })
            }).then(async (res) => {
                if (res.ok)
                    console.log('responce is OK')
                await res.json().then(async(e) => {
                    seterrors(await e.response.errors)
                    console.log(errors)
                }).catch((e) => { console.log("ERROR on DATA,", e) })
            }).catch((e) => { console.log("ERROR", e) })
        }
        getapi()
    }, [text])
    function preprocess() {
        let words = data
        settext(words)
    }
    return (
        <>
            <h1>Hello World</h1>
            <p contentEditable onInput={(e) => { data = e.currentTarget.innerText.split(' ') }} key={Math.random() * 1000}>{text.map((e) => {
                if(errors.some((val)=>{return val.bad === e}))
                return <span key={Math.random() * 100000} style={{color:'red'}}>{e} </span>
                else
                return <span key={Math.random() * 100000}>{e} </span>
            })}</p>
            <button style={{ margin: 'auto', display: 'block' }} onClick={preprocess}>Check grammer</button>
        </>
    )
}