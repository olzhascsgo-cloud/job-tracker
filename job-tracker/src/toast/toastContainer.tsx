import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import "./toast.css"

type Props =
{
      position: string
}

function ToastContainer({position}: Props) {
  const context = useContext(ToastContext);
  if (!context) return null
  const { list, removeToast } = context;
  return (
    <div className={`toast-container ${position}`}>
      {list.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)}>✖</button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;