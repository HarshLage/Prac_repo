import React from "react";
import { useRef } from "react";



export default function set_Prac(){
   const refvar = useRef(null);
   
   const HandleExport = () =>{
    if(!refvar.current) return;

    const HtmlContent = refvar.current.innerText();

    const fullHtml = `
    <D
    `
   }

    return (
    <div ref={refvar}>
        <p>my name is Harsh </p>
        <div>this is the page for practice</div>
        <div>this is the another page just for the fun </div>
        <div>i Need to commit to the main branch and do the practice for kind of things </div>
        <div onClick={HandleExport}>submithtings </div>
        <p>change for the github </p>
    </div>
    );
}