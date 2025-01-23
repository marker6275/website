import resume from "../assets/Mark_Li_Resume.pdf";

export function Resume() {
  return (
    <div className="bg-gradient-to-b from-blue-200 via-white to-sky-100 min-h-screen flex justify-center">
      <embed src={resume} width="100%" height="100%"></embed>
    </div>
  );
}
