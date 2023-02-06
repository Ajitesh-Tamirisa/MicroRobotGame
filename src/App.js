import "./App.css";
import Microrobot from "./Components/Microrobot/Microrobot";
import Background from "./Components/Background/background";
import BackgroundStream from "./Images/back-04.svg";
import DangerZone from "./Images/dangerwback.svg";
import { useEffect, useState } from "react";

function App() {
  const [focus, setFocus] = useState(false);
  const [streamEnd, setStreamEnd] = useState(0);
  const [userWin, setUserWin] = useState(false);
  const [userLoss, setUserLoss] = useState(false);

  const updateUserWin = (val)=>{
    console.log(val, " updateUserWin called")
    setUserWin(val)
  }
  const updateUserLoss = (val)=>{
    console.log(val, " updateUserLoss called")
    setUserLoss(val)
  }

  const detectStreamEdges = () => {
    let rect = document.getElementById('backgroundStream').offsetWidth;
    console.log(rect)
    setStreamEnd(rect)
    // for (const key in rect) {
    //   if (typeof rect[key] !== 'function') {
    //     console.log( `${key} : ${rect[key]}`);
    //     if(key=='right'){
    //       setStreamEnd(rect[ke])
    //     }
    //   }
    // }
  };
  useEffect(()=>{
    detectStreamEdges();
  }, [streamEnd]);

  return (
    <div className="App">
      <div className="arena"
            >
          <img
            id="backgroundStream"
            src={BackgroundStream}
            alt="Background Stream"
            className="backgroundStream"
          />
        <span>
          <img
            id="dangerZone"
            src={DangerZone}
            alt="DangerZone"
            className="backgroundStream"
          />
        </span>
        <div className="characters">
          <Microrobot focus={focus} streamEnd={streamEnd} userWin={userWin} updateUserWin={updateUserWin} userLoss={userLoss} updateUserLoss={updateUserLoss} />
        </div>
      </div>
    </div>
  );
}

export default App;
