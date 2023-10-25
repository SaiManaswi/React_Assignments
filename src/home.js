import React, { useEffect, useState } from 'react';
import Header from './header';

export default function Home(){
    const [name,setname] = useState('Manaswi')
    const [fact,setfact] = useState('cat facts')
    const [changefact,setchange] = useState(false)
    function changeName(){
        setname('Ganesh')
    }

    useEffect(()=>{
        fetch('https://catfact.ninja/fact').then((response)=>{
            if(response.ok){
                console.log('API response ok')
                response.json().then((data)=>{
                    setfact(data.fact)
                })
            }
        })
    },[changefact])
    return(
        <>
        <Header name={name}/>
        <h1>Change name</h1>
        <input type='text' placeholder='write some thing to change header' onChange={(e)=>setname(e.currentTarget.value)}/>
        <button onClick={changeName}> Click Me</button>
        <h1>Facts about cats</h1>
        <p>{fact}</p>
        <button onClick={()=>{setchange(!changefact)}}>click me for another cat fact</button>
        </>
    )
}