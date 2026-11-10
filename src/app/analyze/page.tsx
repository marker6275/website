"use client";
import { FormEvent } from "react";

// The backend for this page has been shut down, so it's display-only
function AnalyzePage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div>
      <div className="flex justify-center p-5 bg-red-700 text-white text-2xl animate-pulse">
        DOES NOT WORK ANYMORE!
      </div>
      <div className="flex justify-center mt-16 mb-10">
        <div>
          <div className="bg-gray-800 h-[24rem] min-w-[48rem] max-w-fit cursor-pointer text-white py-5 px-12 flex justify-center items-center hover:bg-indigo-900 duration-500 transition relative">
            <p className="text-4xl">Upload to see result</p>
            <p className="text-xs absolute inset-x-0 bottom-0 text-gray-300">
              Click to update
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="mt-5">
          <p className="font-semibold text-2xl">Upload file here</p>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between items-center p-5 border-2 border-black w-[40rem] mb-2"
          >
            <input type="file" />
            <input
              type="submit"
              className="py-3 px-5 w-32 bg-gray-700 cursor-pointer hover:bg-gray-500 duration-300 rounded-lg text-white"
            />
          </form>
          <div className="flex justify-between items-center">
            <div className="text-lg flex items-center">
              <p>
                There are <b>0</b> file(s) uploaded currently.
              </p>
              <button className="text-center text-xs bg-gray-700 text-white w-16 h-8 rounded-lg ml-4">
                Refresh
              </button>
            </div>
            <button className="text-center bg-gray-700 hover:bg-gray-500 duration-300 py-3 px-5 w-32 text-white mx-5 rounded-lg">
              Clear files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyzePage;
