import React from "react";

const TimelineEntry = ({ date, company, role, location }) => {
  return (
    <div className="relative pl-12 pb-8 w-6xl">
      <div className="absolute left-0 top-12 w-8 h-8 rounded-full bg-white border-2 border-indigo-500 flex"></div>
      <div className="cursor-pointer bg-white shadow-md rounded-lg p-4 transition-all duration-300">
        <h3 className="text-lg font-bold text-gray-800">{company}</h3>
        <div className="font-semibold text-gray-700">{role}</div>
        <div className="italic text-gray-600">{location}</div>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
    </div>
  );
};

export function InteractiveResume() {
  const timelineEntries = [
    {
      date: "Jan 2020 - Present",
      company: "Company A",
      role: "Senior Developer",
      location: "New York, NY",
    },
    {
      date: "May 2017 - Dec 2019",
      company: "Company B",
      role: "Software Engineer",
      location: "San Francisco, CA",
    },
    // Add more entries as needed
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gradient-to-b from-blue-200 via-white to-red-50">
      <h1 className="text-5xl my-5">Resume</h1>
      <div className="flex justify-center pb-16">Download here</div>
      <div className="relative">
        <div className="absolute left-3 top-0 w-2 bg-gray-300 h-full"></div>
        {timelineEntries.map((entry, index) => (
          <TimelineEntry key={index} {...entry} />
        ))}
      </div>
    </div>
  );
}
