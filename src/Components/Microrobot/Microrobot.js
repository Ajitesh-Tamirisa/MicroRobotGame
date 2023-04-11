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

function Microrobot(props) {
  const [leftRobotX, setLeftRobotX] = useState(100);
  const [leftRobotLock, setLeftRobotLock] = useState(false);
  const [rightRobotX, setRightRobotX] = useState(100);
  const [rightRobotLock, setRightRobotLock] = useState(false);
  const [middleRobotX, setMiddleRobotX] = useState(100);
  const [forwardMovement, setForwardMovement] = useState(false);
  const [backwardMovement, setBackwardMovement] = useState(false);
  const [attack, setAttack] = useState(false);
  // const [f, setF] = useState(props.focus)

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

  const handleKeyUp = async (e) => {
    //spacebar to toggle attack
    if (e.keyCode === 32) {
      setAttack(!attack);
      setTimeout(disableAttack, 3000);
      // setAttack(false)
      return;
    }

    // w-87, a-65, s-83 , d-68;
    //left arrow-37, right arrow - 39;
    //A, D control the movements of the left sphere of the robot
    //Arrow keys control the movements of the right sphere of the robot

    //Forward movement - D, left arrow, A, right arrow   | 68, 37, 65, 39
    //Backward movement - left arrow, D, right arrow, A  | 37, 68, 39, 65


    if(!leftRobotLock && !rightRobotLock){

      //Both arms are expanded

      if(e.keyCode == 37){
        //Left Arrow pressed when both the arms are expanded
        setMiddleRobotX(parseFloat((middleRobotX+13.53).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX+13.53).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX-26.46).toFixed(2)))
        setRightRobotLock(true)
        setBackwardMovement(true)
      }
      if(e.keyCode == 68){
        //D is pressed when both the arms are expanded
        setMiddleRobotX(parseFloat((middleRobotX-13.53).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX-13.53).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX+26.46).toFixed(2)))
        setLeftRobotLock(true)
        setForwardMovement(true);
      }
    }

    if(leftRobotLock && !rightRobotLock){

      //left arm is locked and right arm is expanded

      if(e.keyCode == 37){
        //left arrow pressed when left arm is locked and right arm is expanded
        setMiddleRobotX(parseFloat((middleRobotX+14.39).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX+14.39).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX-25.60).toFixed(2)))
        setRightRobotLock(true)
      }
      if(e.keyCode == 65){
        //A is pressed when left arm is locked and right arm is expanded
        if(backwardMovement){
          setBackwardMovement(false)
          setLeftRobotX(parseFloat((leftRobotX - 39.99).toFixed(2)));
          setMiddleRobotX(parseFloat(middleRobotX.toFixed(2)));
          setRightRobotX(parseFloat((rightRobotX).toFixed(2)));
          setLeftRobotLock(false);
        }
        else{
          setMiddleRobotX(parseFloat((middleRobotX+13.53).toFixed(2)))
          setRightRobotX(parseFloat((rightRobotX+13.53).toFixed(2)))
          setLeftRobotX(parseFloat((leftRobotX-26.46).toFixed(2)))
          setLeftRobotLock(false)
          setForwardMovement(false);
        }
      }
    }

    if(!leftRobotLock && rightRobotLock){

      //left arm is expanded and right arm is locked

      if(e.keyCode == 39){
        //Right arrow is pressed when left arm is expanded and right arm is locked
        if(forwardMovement){
          setLeftRobotX(parseFloat(leftRobotX.toFixed(2)));
          setMiddleRobotX(parseFloat(middleRobotX.toFixed(2)));
          setRightRobotX(parseFloat((rightRobotX + 39.99).toFixed(2)));
          setRightRobotLock(false);
          setForwardMovement(false)
        }
        else{
          setMiddleRobotX(parseFloat((middleRobotX-13.53).toFixed(2)))
          setLeftRobotX(parseFloat((leftRobotX-13.53).toFixed(2)))
          setRightRobotX(parseFloat((rightRobotX+26.46).toFixed(2)))
          setRightRobotLock(false)
          setBackwardMovement(false)
        }
        
      }
      if(e.keyCode == 68){
        //D is pressed when left arm is expanded and right arm is locked
        setMiddleRobotX(parseFloat((middleRobotX-14.39).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX+25.60).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX-14.39).toFixed(2)))
        setLeftRobotLock(true)
      }

    }

    if(leftRobotLock && rightRobotLock){

      //both arms are locked

      if(e.keyCode == 39){
        //Right arrow is pressed when both arms are locked
        setMiddleRobotX(parseFloat((middleRobotX-14.39).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-14.39).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+25.60).toFixed(2)))
        setRightRobotLock(false)
      }
      if(e.keyCode == 65){
        //A is pressed when both arms are locked
        setMiddleRobotX(parseFloat((middleRobotX+14.39).toFixed(2)))
        setLeftRobotX(parseFloat((leftRobotX-25.60).toFixed(2)))
        setRightRobotX(parseFloat((rightRobotX+14.39).toFixed(2)))
        setLeftRobotLock(false)
      }
    }
};

  const handleClick = () => {
    // console.log("handling")
    arenaRef.current.focus();
  };

  // useEffect(()=>{
    // if(!f)
    //   handleClick()  
    // console.log('L X-',leftRobotX,"M X-",middleRobotX, "R X-", rightRobotX, "Forward Movement-", forwardMovement, "Backward Movement-",backwardMovement)
  // },[])

  return (
    <div id='gamearea' onKeyUp={handleKeyUp} style={{ display: "flex", flexDirection:'row' }} autoFocus ref={arenaRef}>
      {/* <p><strong>LeftX-{leftRobotX}, MiddleX-{middleRobotX}, RightX-{rightRobotX}</strong></p>
        <p><strong>{leftRobotLock?"Left Extend-false":"Left Extend-true"}, {rightRobotLock?"Right Extend-false":"Right Extend-true"}</strong></p> */}
      <button onClick={handleClick} style={{ display: "flex", height: 20 }}>
        Start
      </button>
      {!userWin && !props.userLoss && (
        <div style={{ width: 80, height: 100, display: "flex" }}>
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
        <div style={{ width: 80, height: 100, display: "flex" }}>
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
        <div style={{ width: 80, height: 100, display: "flex" }}>
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
      />
    </div>
  );
}

export default Microrobot;
