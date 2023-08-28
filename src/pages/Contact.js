import Navbar from "../components/Navbar";

function copyClipboard(text) {
    navigator.clipboard.writeText(text)
}

export default function Contact() {
    return (
        <div className="bg-[#EBE8E2] h-screen flex flex-col font-inter">
            <Navbar/>
            <div className="flex justify-center p-20">
                <h1 className="font-medium text-6xl">CONTACT ME</h1>
            </div>
            <div className="flex justify-center">
                <div className="bg-white p-12 w-[660px]">
                   <div className="font-light text-4xl">
                        <div className="group h-20 w-28 overflow-hidden duration-1000 delay-800 ease-in-out hover:w-full relative cursor-pointer"
                        onClick={() => copyClipboard('markli2025@u.northwestern.edu')}
                        data-tooltip-target="tooltip-click" data-tooltip-trigger="click" type="button">
                            <span className="absolute whitespace-nowrap translate-x-0 transition duration-1000 group-hover:translate-x-[calc(100%-7rem-100%)] ease-out"> 
                            <span className="group-hover:text-white transition duration-300">EMAIL</span> markli2025@u.northwestern.edu</span>
                    </div>
                    
                    <div className="group h-20 w-32 overflow-hidden duration-1000 delay-800 ease-in-out hover:w-72 relative cursor-pointer"
                        onClick={() => copyClipboard('8324958288')}
                        data-tooltip-target="tooltip-click" data-tooltip-trigger="click" type="button">
                            <span className="absolute whitespace-nowrap translate-x-0 transition duration-1000 group-hover:translate-x-[calc(100%-8rem-100%)] ease-out"> 
                            <span className="group-hover:text-white transition duration-300">PHONE</span> (832) 945-8288</span>
                    </div>
                    <a href="https://www.linkedin.com/in/markli627554/">
                        <h1 className="h-20 text-[#0077B5]">
                            LINKEDIN
                        </h1>
                    </a>
                    <a href="https://github.com/marker6275/">
                        <h1 className="h-20">
                            GITHUB
                        </h1>
                    </a>
                    <h1 className="h-20 text-[#E1306C]">
                        INSTAGRAM
                    </h1>
                    <h1 className="text-[#FF0000]">
                        YOUTUBE
                    </h1>
                   </div>
                </div>
            </div>
        </div>
    )
}