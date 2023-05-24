import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import microrobot1 from "../../Images/micro-01-refined.svg";
import microrobot2 from "../../Images/micro-02.svg";
import microrobot3 from "../../Images/micro-03.svg";
import microHappy1 from "../../Images/micro-happy01.svg";
import microHappy2 from "../../Images/micro-happy02.svg";
import microHappy3 from "../../Images/micro-happy03.svg";
import microSad1 from "../../Images/micro-sad01.svg";
import microSad2 from "../../Images/micro-sad02.svg";
import microSad3 from "../../Images/micro-sad03.svg";
import microrobotSpecial from "../../Images/bot with syringe.svg";
import syringe from "../../Images/syringe.svg";
import Background from "../Background/background";
import './Microbot.css'

function Microrobot(props) {
  const [leftRobotX, setLeftRobotX] = useState(100);
  const [leftRobotLock, setLeftRobotLock] = useState(false);
  const [rightRobotX, setRightRobotX] = useState(100);
  const [rightRobotLock, setRightRobotLock] = useState(false);
  const [middleRobotX, setMiddleRobotX] = useState(100);
  const [forwardMovement, setForwardMovement] = useState(false);
  const [backwardMovement, setBackwardMovement] = useState(false);
  const [attack, setAttack] = useState(false);
  const [focus, setFocus] = useState(false)
  const [timerStart, setTimerStart] = useState(false)
  const [begin, setBegin] = useState(false)
  const [pauseAttack, setPauseAttack] = useState(false)
  const [buttonText, setButtonText] = useState('START')

  const arenaRef = useRef(null);

  let userWin = props.userWin;

  const svgVariants = {
    leftHidden: {
      x: leftRobotX,
      y: 0,
    },
    middleHidden: {
      x: middleRobotX,
      y: 0,
    },
    rightHidden: {
      x: rightRobotX,
      y: 0,
    },
    leftVisible: {
      rotate: 0,
      transition: { duration: 0.5 },
      x: leftRobotX
    },
    middleVisible: {
      rotate: 0,
      transition: { duration: 0.5 },
      x: middleRobotX
    },
    rightVisible: {
      rotate: 0,
      transition: { duration: 0.5 },
      x: rightRobotX
    },
    attackMode: {
      rotate:60,
      scale:0.55,
      x: rightRobotX-100,
      y:-10,
      transition: { type: "spring" },
    },
    attackModeAnimate:{
      rotate: 30,
      transition: { duration: 0.5 },
      x:rightRobotX-35,
      y:10
    }
  };

  const disableAttack = () => {
    setAttack(false);
  };

  const handleKeyDown = (e)=>{
    console.log(e.keyCode)

    if (e.keyCode === 32 && !pauseAttack) {
      setAttack(!attack);
      setTimeout(disableAttack, 3000);
      // setAttack(false)
      return;
    }

    //left arrow-37, right arrow - 39;

    if(!leftRobotLock && !rightRobotLock){
      if(e.keyCode == 39){
        //Right Arrow pressed when both arms are expanded
        setMiddleRobotX(parseFloat((middleRobotX+13.53).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX-26.46).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX+13.53).toFixed(2)))
        setRightRobotLock(true)
        setBackwardMovement(true)
      }
      else if(e.keyCode === 37){
        //Left arrow pressed when both arms are expanded
        setMiddleRobotX(parseFloat((middleRobotX-13.53).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX-13.53).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX+26.46).toFixed(2)))
        setLeftRobotLock(true)
        setForwardMovement(true)
      }
    }
    if(leftRobotLock && !rightRobotLock){
      if(forwardMovement){
        if(e.keyCode === 39){
          //Right Arrow pressed when only right arm is expanded
          setMiddleRobotX(parseFloat((middleRobotX+14.39).toFixed(2)))
          setRightRobotX(parseFloat((rightRobotX-25.60).toFixed(2)))
          setLeftRobotX(parseFloat((leftRobotX+14.39).toFixed(2)))
          setRightRobotLock(true)
        }
        // if(e.keyCode == 37){
        //   //Left Arrow pressed when only left arm is expanded
        //   //forward movement starts
        // }
      }
      else if(backwardMovement){
        if(e.keyCode === 39){
          setMiddleRobotX(parseFloat((middleRobotX+14.39).toFixed(2)))
          setRightRobotX(parseFloat((rightRobotX-25.60).toFixed(2)))
          setLeftRobotX(parseFloat((leftRobotX+14.39).toFixed(2)))
          setRightRobotLock(true)
        }
      }
    }
    if(!leftRobotLock && rightRobotLock){
      if(forwardMovement){
        if(e.keyCode === 37){
          setMiddleRobotX(parseFloat((middleRobotX-14.39).toFixed(2)))
          setRightRobotX(parseFloat((rightRobotX-14.39).toFixed(2)))
          setLeftRobotX(parseFloat((leftRobotX+25.60).toFixed(2)))
          setLeftRobotLock(true)
        }
      }
      else if(backwardMovement){
        if(e.keyCode === 37){
          setMiddleRobotX(parseFloat((middleRobotX-14.39).toFixed(2)))
          setLeftRobotX(parseFloat((leftRobotX+25.60).toFixed(2)))
          setRightRobotX(parseFloat((rightRobotX-14.39).toFixed(2)))
          setLeftRobotLock(true)
        }
      }
    }
    
  }


const handleKeyUp = async (e) => {

  //left arrow-37, right arrow - 39;
  console.log(e.keyCode)

  if(!leftRobotLock && !rightRobotLock){
    //Both arms are expanded
    if(e.keyCode == 39){
      //Right Arrow released when both the arms are expanded
      //forward movement starts
    }
    if(e.keyCode == 37){
      //Left Arrow released when both the arms are expanded
      //backward movement starts
    }
  }
  if(leftRobotLock && rightRobotLock){
    if(forwardMovement){
      if(e.keyCode == 39){
        //Right Arrow released when both the arms are locked and forwardMovement
        setMiddleRobotX(parseFloat((middleRobotX-14.39).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+25.60).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-14.39).toFixed(2)))
        setRightRobotLock(false)
      }
      if(e.keyCode == 37){
        //left arrow released when both arms are locked and forwardMovement
        setMiddleRobotX(parseFloat((middleRobotX+14.39).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+14.39).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-25.60).toFixed(2)))
        setLeftRobotLock(false)
      }
    }
    else if (backwardMovement){
      if(e.keyCode == 37){
        //Left Arrow pressed when both the arms are locked and backwardMovement
        //undo backward movement
        setMiddleRobotX(parseFloat((middleRobotX+14.39).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-25.60).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+14.39).toFixed(2)))
        setLeftRobotLock(false)
      }
      else if(e.keyCode === 39){
        //Right Arrow released when both arms are locked and backwardMovement
        setMiddleRobotX(parseFloat((middleRobotX-14.39).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-14.39).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+25.60).toFixed(2)))
        setRightRobotLock(false)
      }
    }
  }
  if(leftRobotLock && !rightRobotLock){
    if(forwardMovement){
      //if(e.keyCode === 39){
        //Right arrow key released when only the left arm is locked and forwardMovement
      //}
      if(e.keyCode === 37){
        //Left arrow key released when only the left arm is locked and forwardMovement
        setMiddleRobotX(parseFloat((middleRobotX+13.53).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+13.53).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-26.46).toFixed(2)))
        setLeftRobotLock(false)
        setForwardMovement(false)
      }
    }
    else if(backwardMovement){
      if(e.keyCode === 37){
        setBackwardMovement(false)
        setLeftRobotX(parseFloat((leftRobotX - 39.99).toFixed(2)));
        setMiddleRobotX(parseFloat(middleRobotX.toFixed(2)));
        setRightRobotX(parseFloat((rightRobotX).toFixed(2)));
        setLeftRobotLock(false);
      }
    }
  }
  if(!leftRobotLock && rightRobotLock){
    if(forwardMovement){
      if(e.keyCode === 39){
        //Right arrow key released when only the right arm is locked and forwardMovement
        //End of forward movement cycle
        setLeftRobotX(parseFloat(leftRobotX.toFixed(2)));
        setMiddleRobotX(parseFloat(middleRobotX.toFixed(2)));
        setRightRobotX(parseFloat((rightRobotX + 39.99).toFixed(2)));
        setRightRobotLock(false);
        setForwardMovement(false)
      }
      // if(e.keyCode === 37){
      //   //Left arrow key released when only the right arm is locked and forwardMovement
      //   leftArrowKeyUp1()
      // }
    }
    else if(backwardMovement){
      if(e.keyCode === 39){
        setMiddleRobotX(parseFloat((middleRobotX-13.53).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+26.46).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-13.53).toFixed(2)))
        setRightRobotLock(false)
        setBackwardMovement(false)
      }
    }
  }
};

const startMovement = ()=>{
  arenaRef.current.blur();
  startMovementChild()
  
}

const startMovementChild = ()=>{
  if(!begin){
    setBegin(true)
    setFocus(true) 
    setLeftRobotX(100)
    setRightRobotX(100)
    setMiddleRobotX(100)  
    setLeftRobotLock(false)
    setRightRobotLock(false)
    setAttack(false)
    arenaRef.current.focus();
    document.getElementById('restart').blur();
    setPauseAttack(true);
    setTimeout(()=>{setPauseAttack(false)}, 3500);
  }
}

  const handleStart = () => {
    if(begin){      
      window.location.reload(false);
      return;
    }
    // wait for 10sec
    setTimerStart(true)
    arenaRef.current.focus();
    setTimeout(startMovement, 10000)   
  };

  const handleRestart = ()=>{
    
  }

  useEffect(()=>{
    console.log('L X-',leftRobotX,"M X-",middleRobotX, "R X-", rightRobotX, "Forward Movement-", forwardMovement, "Backward Movement-",backwardMovement, "\nL Lock-",leftRobotLock, "\nR Lock-",rightRobotLock);
  },[leftRobotX, rightRobotX, middleRobotX])

  useEffect(()=>{    
    console.log("PauseAttack - ",pauseAttack)
  }, [pauseAttack])

  return (
    <div>
      {(!props.userWin && begin)? 
        <button class="start" id='restart' onClick={handleRestart}>
          RESTART
        </button> : <span></span>
        
      }
      <div id='gamearea' onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} style={{ display: "flex", flexDirection:'row' }} autoFocus ref={arenaRef} tabindex="-1">
        {/* <p><strong>LeftX-{leftRobotX}, MiddleX-{middleRobotX}, RightX-{rightRobotX}</strong></p>
          <p><strong>{leftRobotLock?"Left Extend-false":"Left Extend-true"}, {rightRobotLock?"Right Extend-false":"Right Extend-true"}</strong></p> */}
        
        
        {(!props.userWin) && 
          (
          <button class="start" id='start' onClick={handleStart}>
            {(!props.userWin && begin)? "RESTART": "START"}
          </button>
          )
        }
        {/* <button hidden={true}>Dummy</button> */}
        
        {!userWin && !props.userLoss && (
          <div className="spheres">
            <motion.img
              variants={svgVariants}
              initial="leftHidden"
              animate="leftVisible"
              src={microrobot1}
            />
            <motion.img
              variants={svgVariants}
              initial="middleHidden"
              animate="middleVisible"
              src={microrobot2}
            />
            <motion.img
              variants={svgVariants}
              initial="rightHidden"
              animate="rightVisible"
              src={microrobot3}
            />
            {attack && (
              <motion.img
                variants={svgVariants}
                initial="attackMode"
                animate="attackModeAnimate"
                src={syringe}
              />
            )}
          </div>
        )}
        {props.userWin && (
          <div  className="spheres">
            <motion.img
              variants={svgVariants}
              initial="leftHidden"
              animate="leftVisible"
              src={microHappy1}
            />
            <motion.img
              variants={svgVariants}
              initial="middleHidden"
              animate="middleVisible"
              src={microHappy2}
            />
            <motion.img
              variants={svgVariants}
              initial="rightHidden"
              animate="rightVisible"
              src={microHappy3}
            />
          </div>
        )}
        {props.userLoss && (
          <div className="spheres">
            <motion.img
              variants={svgVariants}
              initial="leftHidden"
              animate="leftVisible"
              src={microSad1}
            />
            <motion.img
              variants={svgVariants}
              initial="middleHidden"
              animate="middleVisible"
              src={microSad2}
            />
            <motion.img
              variants={svgVariants}
              initial="rightHidden"
              animate="rightVisible"
              src={microSad3}
            />
          </div>
        )}
        <Background
          pos={leftRobotX}
          streamEnd={props.streamEnd}
          userWin={props.userWin}
          updateUserWin={props.updateUserWin}
          userLoss={props.userLoss}
          updateUserLoss={props.updateUserLoss}
          attack={attack}
          focus={focus}
          timerStart={timerStart}
          isFireFox = {props.isFireFox}
        />
      </div>
    </div>
  );
}

export default Microrobot;
