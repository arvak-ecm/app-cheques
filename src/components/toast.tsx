import { FC, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
interface toasProps {
  msg: string;
  //typeMsg: "success" | "error";
  trigger: boolean;
}

const Toast: FC<toasProps> = ({ msg, trigger }) => {
  const [triggerr, setTriggerr] = useState(trigger);
  const nodeRef = useRef(null);
  useEffect(() => {
    if (trigger === false) return;
    setTimeout(() => {
      console.log("trigger");
      setTriggerr(false);
    }, 3000);
  }, [trigger]);
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={triggerr}
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
