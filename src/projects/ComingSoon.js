import React from "react";
class Coming extends React.Component {
    render() {
        return (
            <div className="py-5">
                <h1 className="text-5xl mb-5 font-semibold">Coming Soon...</h1>
                <hr className="mb-5"/>
                <p>
                    So that's it for now :(
                </p>
                <br/>
                <p>
                    If you're reading this then it probably means you think my projects are cool :D (or at least I hope so) but I think I'm going to just be putting projects that 
                    I've worked on along with a little description. 
                    There are lots of things I want to create and I'll list them down below. 
                    It's likely that I've already started and just haven't completed them so come back another time and maybe this list will expand.
                </p>
                <br/>
                <p>
                    I don't exactly know what I want to do with this website, but it is really fun to add to and work on.
                    I think I'm likely to just end up putting any of my homework assignments that are cool or I think were interesting (or more likely the ones that took the most work).
                </p>
                <h1 className="font-semibold text-2xl pb-2 pt-5">Future projects</h1>
                <p>
                    I'd love to create a chatbot that helps with translation and language learning. I've thought into it a little with Twilio messaging and the ChatGPT API, 
                    but other than that I don't have anything for it yet.
                </p>
                <br/>
                <p>
                    Something else I'd love to build would be a sports betting algorithm that could more accurately predict sports games, but this would involve large data sets,
                    I have started working on it but probably want to hold off on it until I know what I'm doing. However, since I am interested in machine learning and AI,
                    this is something I'm going to revisit eventually, possibly after taking a Machine Learning class.
                </p>
                <h1 className="font-semibold text-2xl pb-2 pt-5">Website</h1>
                <p>
                    My biggest goal here would just be to improve the UI, since a lot of how this website looks is bland and old-school,
                    which is mostly what I had in mind when I created it but I think I enjoy the modern look much more.
                </p>
                <br/>
                <p>
                    The first would probably be to make the header navbar look nicer, and then add more animations. 
                    Then, I want to do a lot of file cleanup, such as making separate JSON files for all the info. 
                    Eventually, I hope I can put all the info into AWS or some other database so that there are no JSON files anymore. 
                    I don't exactly know how that would work or how much it may cost (hopefully nothing) but that's something for the future.
                </p>
            </div>
        )
    }
}

const ComingSoon = {
    name: "Coming Soon",
    color: "bg-gray-300",
    body: <Coming/>
}

export default ComingSoon;