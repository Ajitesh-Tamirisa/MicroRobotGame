import { Fragment } from "react";
import "./CreditsOverlay.css";

export function CreditsOverlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay__container">
            <div className="overlay__controls">
              
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default CreditsOverlay;