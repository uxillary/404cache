import { ToastContainer as ReactToastifyContainer } from 'react-toastify';

function ToastContainer() {
  return (
    <ReactToastifyContainer
      position="bottom-left"
      hideProgressBar
      newestOnTop
      toastClassName="bg-black/80 backdrop-blur-sm text-lime-400 border border-green-500 shadow-md px-3 py-2 font-mono"
      bodyClassName="flex items-center gap-2"
    />
  );
}

export default ToastContainer;
