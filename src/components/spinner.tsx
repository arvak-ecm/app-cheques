import { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./spinner.css";

interface spinnerProps {
  trigger: boolean;
}

const Spinner: FC<spinnerProps> = ({ trigger }) => {
  const nodeRef = useRef(null);
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={trigger}
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
