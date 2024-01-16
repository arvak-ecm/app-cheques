import { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";
interface toasProps {
  msg: string;
  typeMsg: "success" | "error";
  trigger: boolean;
}

const Toast: FC<toasProps> = ({ msg, typeMsg, trigger }) => {
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
        <div
          ref={nodeRef}
          className="absolute bottom-2 right-2 text-white font-bold text-[15px] bg-red-600 border p-4 rounded-md transition  ease-in-out duration-300"
        >
          <p>{msg}</p>
        </div>
      </CSSTransition>
    </>
  );
};

export default Toast;
