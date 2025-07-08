function ToastContainer({ toasts }) {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-gray-800 border border-green-400 text-green-300 px-4 py-2 rounded shadow"
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
