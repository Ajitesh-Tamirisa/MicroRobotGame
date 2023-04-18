import "./App.css";
import Microrobot from "./Components/Microrobot/Microrobot";
import BackgroundStream from "./Images/back-04.svg";
import DangerZone from "./Images/danger03.svg";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import settingIcon from "./Images/setting icon.svg";
import playerWinVideo from "./Images/Comp 1_02.mp4";
import playerLossVideo from "./Images/microbot_sad_animepre 2_3.mp4";
import InstructionsOverlay from "./Components/InstructionsOverlay/InstructionsOverlay";

function App() {
  const [focus, setFocus] = useState(false);
  const [streamEnd, setStreamEnd] = useState(-1);
  const [userWin, setUserWin] = useState(false);
  const [userLoss, setUserLoss] = useState(false);
  const [playUserWinVid, setPlayUserWinVid] = useState(false)
  const [playUserLossVid, setPlayUserLossVid] = useState(false)
  const [overlay, setOverlay] = useState(true)
  const [shouldRenderRef, setShouldRenderRef] = useState(false);

  const backgroundStreamRef = useRef(null);

  const arenaRef = useRef(null)

  const updateUserWin = (val)=>{
    console.log(val, " updateUserWin called")
    setUserWin(val)
    if(val){
      setTimeout(handleUserWinVid, 4000)
      console.log('setTimeout called') 
    }
  }
  const updateUserLoss = (val)=>{
    console.log(val, " updateUserLoss called")
    setUserLoss(val)
    if(val){      
      setTimeout(handleUserLossVid, 3000)
    }
  }

  const handleUserWinVid = function(){
    setPlayUserWinVid(true)
    console.log(playUserWinVid)
  }

  const handleUserLossVid = function(){
    setPlayUserLossVid(true)
    console.log(playUserLossVid)
  }

  const handleClick = () => {
    console.log("handling")
    // document.getElementById('gameplay')
  };

  const detectStreamEdges = ()=>{
    const myImage = document.getElementById("backgroundStream");
    const computedStyle = window.getComputedStyle(myImage);
    const width = computedStyle.width;
    let r = backgroundStreamRef.current ? backgroundStreamRef.current.getBoundingClientRect().width : -1;   
    setStreamEnd(r) 
    console.log(r)
     
    console.log('width - ',width)
    console.log(backgroundStreamRef.current)
  }

  // useEffect(()=>{
  //   // if(!overlay)
  //   //   setShouldRenderRef(true)
  //   setTimeout(() => {
  //   let rect = backgroundStreamRef.current ? backgroundStreamRef.current.offsetWidth : -1;
  //   // while(rect<1 && !overlay)
  //   //   detectStreamEdges();
  //   console.log('OffsetWidth - ',rect)
  //   setStreamEnd(rect)
  //   if (backgroundStreamRef.current) {
  //     setStreamEnd(backgroundStreamRef.current.offsetWidth);
  //   }
  //   },0)
  // }, [overlay]);

  useEffect(() => {
    if(!overlay){
      if (backgroundStreamRef.current && backgroundStreamRef.current.complete) {
        const computedStyle = window.getComputedStyle(backgroundStreamRef.current);
        setStreamEnd(parseFloat(computedStyle.width.split('p')[0]));
      } else {
        const onImageLoad = () => {
          const computedStyle = window.getComputedStyle(backgroundStreamRef.current);
          setStreamEnd(parseFloat(computedStyle.width.split('p')[0]));
        };
        backgroundStreamRef.current.addEventListener("load", onImageLoad);
        return () => {
          backgroundStreamRef.current.removeEventListener("load", onImageLoad);
        };
      }
      console.log('streamEnd - ',streamEnd)
    }
  }, [backgroundStreamRef, overlay]);

  // useLayoutEffect(()=>{
  //   setTimeout(() => {
  //     detectStreamEdges()
  //   },0)
  // }, [overlay])

  return (
    <div className="App">      
      {playUserWinVid && 
      <div style={{width:'100%', height:'100%'}}>
        <video id="userWinVid" width="100%" height="100%" autoPlay={true} muted loop>
          <source src={playerWinVideo} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>}
      {playUserLossVid && 
      <div style={{width:'100%', height:'100%'}}>
        <video id="userLossVid" width="100%" height="100%" autoPlay={true} muted loop>
          <source src={playerLossVideo} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>}
      {
        overlay && 
        <InstructionsOverlay arenaRef={arenaRef} setOverlay = {setOverlay}/>
      }
      {!playUserWinVid && !playUserLossVid && !overlay && 
      <div className="arena" style={{overflowX: "auto"}}>
        <div >
          <img
            id="backgroundStream"
            src={BackgroundStream}
            alt="Background Stream"
            className="backgroundStream"
            ref={backgroundStreamRef}
          />
        </div>
        <div>
          <img
            id="dangerZone"
            src={DangerZone}
            alt="DangerZone"
            className="dangerZone"
          />
        </div>
        {/* <div className="settingsPanel">
          <div className="settings">
            <img className="icons" src={settingIcon} />
            
          </div>
        </div> */}
        {streamEnd && (<div className="characters">
          <Microrobot focus={focus} arenaRef={arenaRef} streamEnd={streamEnd} userWin={userWin} updateUserWin={updateUserWin} userLoss={userLoss} updateUserLoss={updateUserLoss} overlay={overlay}/>
        </div>)}
      </div>
    }
    </div>
  );
}

export default App;
