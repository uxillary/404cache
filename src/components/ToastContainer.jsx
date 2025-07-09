import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastContainer() {
  return (
    <ReactToastContainer
      position="bottom-left"
      hideProgressBar
      closeOnClick
      className="z-50"
      toastClassName="bg-black text-lime-400 border border-green-500 shadow-md"
    />
  );
}

export default ToastContainer;
