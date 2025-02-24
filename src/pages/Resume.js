import resume from "../assets/Mark_Li_Resume.pdf";

export function Resume() {
  return (
    <div className="sm:h-screen flex justify-center">
      <embed src={resume} width="100%" height="100%"></embed>
    </div>
  );
}
