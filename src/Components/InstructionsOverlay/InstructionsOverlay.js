import React from 'react'
import instructions from "../../Images/instruction.svg"
import './InstructionsOverlay.css'

function InstructionsOverlay({setOverlay, arenaRef}) {

    const handleClick = ()=>{
        setOverlay(false)
        arenaRef.current && arenaRef.current.focus(); 
    }
    return (
    <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
        <img
            src={instructions}
        />
        <div>
            <button onClick={handleClick} className='button'>Play Now</button>
        </div>
    </div>
    )
}

export default InstructionsOverlay