import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Microrobot from "../Microrobot/Microrobot";
import bacteria from "../../Images/bacterium-02.svg";
import LostBacteria1 from "../../Images/bac crying.svg";
import LostBacteria2 from "../../Images/bac exp 2.svg";
import LostBacteria4 from "../../Images/bac exp 4.svg";
import LostBacteria3 from "../../Images/bac exp 3.svg";
import LostBacteria5 from "../../Images/bac exp 5.svg";
import WonBacteria from "../../Images/bac-happy.svg";
import bacteriumDent from "../../Images/_bac w words 2.svg"
import bacteriaByeBye from "../../Images/bac w words3.svg"
import catchDialog from "../../Images/dia-catch.svg";
import "./background.css";

function Background(props) {
  const [posX, setPosX] = useState(550);
  const [visible, setVisible] = useState(true);
  const [bacteriaDentState, setBacteriaDentState] = useState(false)
  // const [aboutToLose, setAboutToLose] = useState(false)
  // const [userWin, setUserWin] = useState(false);
  // const [userLoss, setUserLoss] = useState(false)


  const controls = useAnimation();

  const src = "../..Images/microhappy-01.mp4";

  const check = () => {
    if (!visible) controls.stop();
    // await controls.start({
    //   // x: posX,
    //   // y: 0,
    //   // transition: {
    //   //   ease: "circInOut",
    //   //   duration: 1,
    //   // },
    // });

    if (
      posX - 210 <= props.pos + 100 ||
      (props.attack && posX - 210 <= props.pos + 250)
    ) {
      // console.log("Posx :" + (posX - 210) + "Props :" + (props.pos + 250));
       
      // setTimeout(setVisible(false), 3000);      
      // props.updateUserWin(true);
      // controls.stop();
      // // document.getElementById("bacteria").style.display = "none";
      // document.getElementById("lostBacteria1").style.visibility = "visible";
      // console.log("Entered: " + posX);   
      // loseAnimation()
      controls.stop();
      setTimeout(handleUserWin, 750);  
    } else if (!detectBacteriaWin()) {
      // console.log("sdadasdasdasd")
      if(props.focus)
        setPosX(posX + 5);
    } else if (detectBacteriaWin()) {
      setVisible(false);
      props.updateUserLoss(true);
    }
  };

  const handleUserWin = ()=>{
    setBacteriaDentState(true)
    console.log("Posx :" + (posX - 210) + "Props :" + (props.pos + 250));
    setVisible(false)   
    document.getElementById("lostBacteria1").style.visibility = "visible";
    console.log("Entered: " + posX);
    dentBacteria() 
    // loseAnimation()
  }

  const animationProps = {
    initial: { x: posX, y: 0, scale: "1.4" },
    show: {
      x: posX,
      y: 0,
      transition: {
        ease: "linear",
      },
    },
    // exit: {
    //   x: posX + 20,
    //   opacity: 0,
    //   scale: 2,
    // },
  };

  // const bacteriaByeByeProps = {
  //   initial: { x: posX, y: -10, scale: "1.75" },
  //   show: {
  //     x: posX,
  //     y: -10,
  //     transition: {
  //       ease: "linear",
  //     }
  //   }
  // };

  const lossAnimationProps = {
    initial: { x: posX, y: -130 },
    loss: {
      x: posX,
    },
  };
  const lossAnimationProps5 = {
    initial: { x: posX, y: -130 },
    loss: {
      x: posX,
      scale: 3,
      opacity: 0,
    },
  };
  const wonBacteriaProps = {
    initial: { x: posX, y: -130 },
    win: {
      x: posX,
      scale: 1.5,
    },
  };

  const dentBacteriaProps = {
    initial: { x: posX+20, y: -130, scale:2 },
    loss: {
      x: posX,
      scale: 1.75,
    },
  };

  function loseAnimation() {
    
    
    // document.getElementById("dentBacteria").style.display = "none";
    props.updateUserWin(true)
    let id = setInterval(frame, 400);
    let i = 1;

    function frame() {
      if (i == 6) {
        clearInterval(id);
      }
      else if(i==1){   
        // console.log('breakstart')
        // setInterval(console.log('break'), 1000)  
        // console.log('breakend')   
        document.getElementById("dentBacteria").style.display = "none";
        i++;
      }
      else {
        let k = i - 1;
        let cName1 = "lostBacteria" + k;
        let cName2 = "lostBacteria" + i;
        console.log(cName1 + "\n" + cName2);
        document.getElementById(cName1 + "").style.display = "none";
        document.getElementById(cName2 + "").style.display = "block";
        i++;
      }
    }
  }
  const dentBacteria = ()=>{ 
    document.getElementById("dentBacteria").style.display = "block";
    setTimeout(loseAnimation, 1000);
    // ()
  }

  const detectBacteriaWin = () => {
    let rect = document.getElementById("bacteriaSvg").getBoundingClientRect();
    let bacteriaPos = rect["left"];
    // console.log(bacteriaPos+" --------------- "+props.streamEnd)
    // console.log(props.streamEnd)
    if (bacteriaPos >= props.streamEnd-30 && props.streamEnd !== 0 && props.streamEnd>-1) {
      console.log("End");
      return true;
    }
    // else if (bacteriaPos >= props.streamEnd-130 && props.streamEnd !== 0 && props.streamEnd>-1) {
      // if(!flag){
        // setFlag(true)
        // setAboutToLose(true)
        // setTimeout(function update(){setAboutToLose(false)}, 1500)
      // }
      // return false;
    // }
    return false;
  };

  useEffect(()=>{
    check()
  }, [props.focus])

  return (
    <div id="background">
      <div className="bacteria" id="bacteria">
        <AnimatePresence>
          {visible  && (
            <motion.img
              id="bacteriaSvg"
              variants={animationProps}
              key="modal"
              initial="initial"
              src={bacteria}
              animate="show"
              // exit="exit"
              // onAnimationStart={() => check()}

              onAnimationComplete={() => {
                check();
              }}
              onAnimationEnd={() => {
                document.getElementById("bacteria").style.display = "flex";
              }}
            />
          )}
          {/* {visible && aboutToLose && (
            <motion.img
              id="bacteriaSvg"
              src={bacteriaByeBye}
              variants={bacteriaByeByeProps}
              key="modal"
              initial="initial"
              animate="show"
              // exit="exit"
              // onAnimationStart={() => check()}

              onAnimationComplete={() => {
                check();
              }}
              onAnimationEnd={() => {
                document.getElementById("bacteria").style.display = "flex";
              }}
            />
          )} */}
        </AnimatePresence>
      </div>
      <div>
        <span
            className="dentBacteria"
            id="dentBacteria"
            style={{ display: "none" }}
          >
            {bacteriaDentState && (
              <motion.img
                variants={dentBacteriaProps}
                src={bacteriumDent}
                initial="initial"
                animate="loss"
              />
            )}
          </span>
        <span
          className="lostBacteria1"
          id="lostBacteria1"
          style={{ display: "none" }}
        >
          {props.userWin && (
            <motion.img
              variants={lossAnimationProps}
              src={LostBacteria1}
              initial="initial"
              animate="loss"
            />
          )}
        </span>
        <span
          className="lostBacteria2"
          id="lostBacteria2"
          style={{ display: "none" }}
        >
          {props.userWin && (
            <motion.img
              variants={lossAnimationProps}
              src={LostBacteria2}
              initial="initial"
              animate="loss"
            />
          )}
        </span>
        <span
          className="lostBacteria3"
          id="lostBacteria3"
          style={{ display: "none" }}
        >
          {props.userWin && (
            <motion.img
              variants={lossAnimationProps}
              src={LostBacteria3}
              initial="initial"
              animate="loss"
            />
          )}
        </span>
        <span
          className="lostBacteria4"
          id="lostBacteria4"
          style={{ display: "none" }}
        >
          {props.userWin && (
            <motion.img
              variants={lossAnimationProps}
              src={LostBacteria4}
              initial="initial"
              animate="loss"
            />
          )}
        </span>
        <span
          className="lostBacteria5"
          id="lostBacteria5"
          style={{ display: "none" }}
        >
          {props.userWin && (
            <motion.img
              variants={lossAnimationProps5}
              src={LostBacteria5}
              initial="initial"
              animate="loss"
            />
          )}
        </span>
        <span className="wonBacteria" id="wonBacteria">
          {props.userLoss && (
            <motion.img
              variants={wonBacteriaProps}
              src={WonBacteria}
              initial="initial"
              animate="loss"
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default Background;
