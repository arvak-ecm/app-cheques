import { FC, useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AppContext } from "../context/appContext";
import "./spinner.css";

const Spinner: FC = () => {
  const { appData } = useContext(AppContext);
  const nodeRef = useRef(null);
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={appData.showSpinner}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeRef} className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Procesando datos...</div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Spinner;
