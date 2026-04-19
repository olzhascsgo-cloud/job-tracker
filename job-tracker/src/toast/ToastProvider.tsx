import { ReactNode, useState } from "react";
import { ToastContext } from "./ToastContext";
import ToastContainer from "./toastContainer";
import { ToastItem, ToastType } from "./types";


type Props = {
  children: ReactNode
}
function ToastProvider({ children }: Props) {
  const [list, setList] = useState<ToastItem[]>([]);
    const position = "top-right";

    const removeToast = (id: number) => {
    setList(prev => prev.filter(t => t.id !== id));
  };

 const addToast = (type: ToastType, message: string, duration?: number | null): void => {
    const durations: Record<ToastType, number> ={
       success: 3000,
      info: 3000,
      error: 5000,
    }


  let finalDuration: number | null
  if (duration === null ){
      finalDuration = null
  } else if (typeof duration === "number"){
    finalDuration = duration
  } else {
    finalDuration = durations[type] 
  }
  const newToast: ToastItem = {
    id: Date.now(),
    type,
    message,
    duration: finalDuration
  }

  

  setList(prev => [...prev, newToast]);

  if (finalDuration !== null) {
    setTimeout(() => {
      removeToast(newToast.id);
    }, finalDuration);
  }
};

  


  return (
    <ToastContext.Provider value={{ list, addToast, removeToast }}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;