import type { ProjectPageButtonProps } from "../../types/components/buttons";

export function ProjectPageButton({ pageNumber, isActive, setPageNumber }: ProjectPageButtonProps) {
  return (
    <button
      onClick={() => setPageNumber(pageNumber)}
      className={`flex items-center justify-center px-2 py-1 w-8 md:h-10 rounded-md border-2 border-gray-500 cursor-pointer hover:bg-gray-200 ${
        isActive ? "bg-gray-200" : ""
      }`}
    >
      {pageNumber + 1}
    </button>
  );
}

