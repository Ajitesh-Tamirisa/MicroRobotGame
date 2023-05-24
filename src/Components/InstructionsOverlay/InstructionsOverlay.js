import React from 'react'
import instructions from "../../Images/instruction_MAY7.svg"
import name from "../../Images/Name.svg"
import './InstructionsOverlay.css'

function InstructionsOverlay({setOverlay, arenaRef}) {

    const handleClick = ()=>{
        setOverlay(false)
        arenaRef.current && arenaRef.current.focus(); 
    }
    return (
    <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
        {/* <img
            style={{width:'35%', marginTop:'15px'}}
            src={name}
            /> */}
        <img
            src={instructions}
            style={{width:'90%', height:'82vh'}}
        />
        <div>
            <button onClick={handleClick} className='button'>Play Now</button>
        </div>
    </div>
    )
}

export default InstructionsOverlay