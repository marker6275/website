export function NumberButton({ children, onClick }) {
  return (
    <div
      className="bg-gray-200 p-4 flex items-center justify-center w-20 h-20 cursor-pointer hover:bg-gray-300 transition-all duration-300"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
