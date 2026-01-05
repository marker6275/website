export function Toast({ isFadingOut, message = "message" }) {
  return (
    <div
      className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-slate-200 border-2 rounded-md shadow-lg px-6 py-3 text-center transition-all duration-300 ease-in-out ${
        isFadingOut ? "opacity-0" : "opacity-100 animate-fade-in"
      }`}
    >
      {message}
    </div>
  );
}
