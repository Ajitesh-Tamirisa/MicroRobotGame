import "./App.css";
import Microrobot from "./Components/Microrobot/Microrobot";
import BackgroundStream from "./Images/background.3.30.svg";
import DangerZone from "./Images/danger03.svg";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import settingIcon from "./Images/setting icon.svg";
import playerWinVideo from "./Images/Comp 1_02.mp4";
import playerLossVideo from "./Images/microbot_sad_animepre 2_3.mp4";
import InstructionsOverlay from "./Components/InstructionsOverlay/InstructionsOverlay";
import name from "./Images/Name.svg"
import CreditsOverlay from "./Components/CreditsOverlay/CreditsOverlay";

function App() {
  const [focus, setFocus] = useState(false);
  const [streamEnd, setStreamEnd] = useState(-1);
  const [userWin, setUserWin] = useState(false);
  const [userLoss, setUserLoss] = useState(false);
  const [playUserWinVid, setPlayUserWinVid] = useState(false)
  const [playUserLossVid, setPlayUserLossVid] = useState(false)
  const [overlay, setOverlay] = useState(true)
  const [shouldRenderRef, setShouldRenderRef] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  
  const isFirefox = typeof InstallTrigger !== 'undefined';
  // console.log('isFirefox - ', isFirefox);
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

  const handleTryAgain = ()=>{
    window.location.reload(false);
  }

  const showCredits = ()=>{
    setCreditsOpen(!creditsOpen)
  }

  useEffect(() => {
    if(!overlay){
      if (backgroundStreamRef.current && backgroundStreamRef.current.complete) {
        const computedStyle = window.getComputedStyle(backgroundStreamRef.current);
        setStreamEnd(parseFloat(computedStyle.width.split('p')[0])-200);
      } else {
        const onImageLoad = () => {
          const computedStyle = window.getComputedStyle(backgroundStreamRef.current);
          setStreamEnd(parseFloat(computedStyle.width.split('p')[0])-200);
        };
        backgroundStreamRef.current.addEventListener("load", onImageLoad);
        return () => {
          backgroundStreamRef.current.removeEventListener("load", onImageLoad);
        };
      }
      console.log('streamEnd - ',streamEnd)
    }
  }, [backgroundStreamRef, overlay]);

  return (
    <div className="App"> 
      {/* <div style={{width:'99%', height:'99%'}}>      */}
      <span style={{position:'relative', top:'5%', left:'34%'}}>
        <img
            src={name}
            style={{width:'35%',marginTop:'25px'}}
          />
      </span>      
      {(overlay || playUserLossVid || playUserWinVid) && 
        <span onClick={showCredits} style={{position:'relative',left:'60%', color:'#7c6c5d', cursor:'pointer'}}>
          <strong>Credits</strong>
        </span>
      }
        <CreditsOverlay isOpen={creditsOpen} onClose={showCredits}>
          <h3 style={{textAlign:'center'}}>Credits</h3>
          <div>
          <strong>Student Team</strong>
          <ul>
            <li>Sathyasai Ajitesh Tamirisa</li>
            <li>Adria Yujing Yang</li>
            <li>Anand Santosh Kulkarni</li>
          </ul>
          <strong>Research and Mentorship</strong>
          <ul>
            <li>On Shun Pak</li>
            <li>Qiuwen Li</li>
          </ul>
          </div>
        </CreditsOverlay>
      {playUserWinVid && 
      <div>
        <button className="tryAgain" onClick={handleTryAgain}>Try Again</button>
        <div style={{width:'100%', height:'100%'}}>
          <video id="userWinVid" width="100%" height="100%" autoPlay={true} muted loop>
            <source src={playerWinVideo} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>}
      {playUserLossVid && 
      <div>
        <button className="tryAgain" onClick={handleTryAgain}>Try Again</button>
        <div style={{width:'100%', height:'100%'}}>        
          <video id="userLossVid" width="100%" height="100%" autoPlay={true} muted loop>
            <source src={playerLossVideo} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>}
      {
        overlay && 
        <InstructionsOverlay arenaRef={arenaRef} setOverlay = {setOverlay}/>
      }
      {!playUserWinVid && !playUserLossVid && !overlay && 
      <div className="arena" style={{overflowX: "auto"}}>
        
        {/* <div> */}
          {/* <span> */}
            <img
              id="backgroundStream"
              src={BackgroundStream}
              alt="Background Stream"
              className="backgroundStream"
              ref={backgroundStreamRef}
            />
          {/* </span> */}
        {/* </div> */}
        {/* <div>
          <img
            id="dangerZone"
            src={DangerZone}
            alt="DangerZone"
            className="dangerZone"
          />
        </div> */}
        {/* <div className="settingsPanel">
          <div className="settings">
            <img className="icons" src={settingIcon} />
            
          </div>
        </div> */}
        {streamEnd && (<div className="characters">
          <Microrobot focus={focus} arenaRef={arenaRef} streamEnd={streamEnd} userWin={userWin} updateUserWin={updateUserWin} userLoss={userLoss} updateUserLoss={updateUserLoss} overlay={overlay} isFirefox={isFirefox}/>
        </div>)}
        
        <div style ={{position:'absolute', padding:'15px', fontSize:'14px', left:'5%', color:'#7c6c5d'}} className="instructions">
          <strong><p>Left arrow controls the left sphere</p>
          Right arrow controls the right sphere<p>Use spacebar for special attack</p></strong>
        </div>
      </div>
    }
    {/* </div> */}
    </div>
  );
}

export default App;
