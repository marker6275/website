import React from "react";
import { Link } from "react-router-dom";
import PythonClient from '../assets/project_images/TextClassifier/PythonClient.png';
import diagram from '../assets/project_images/TextClassifier/diagram.png';

class TC extends React.Component {
    render() {
        return (    
            <div className="py-5">
                <h1 className="text-5xl mb-5 font-semibold">Text Classifier</h1>
                <hr className="mb-5"/>
                <h1 className="font-semibold text-2xl pb-2 pt-5">TLDR</h1>
                <p>
                    A Naive Bayes algorithm that analyzes text and uses previous data to create a prediction of the sentiment of the text from 1 (strongly negative) to 5 (strongly positive)
                </p>
                {/* <div className="bg-purple-200 flex justify-center items-center mt-2">
                    <Link to="/analyze">
                        <h1 className="font-bold text-4xl py-5 text-center text-purple-800">CHECK IT OUT HERE</h1>
                    </Link>
                </div> */}
                <h1 className="font-semibold text-2xl pb-2 pt-5">Longer TLDR</h1>
                <p>
                    This was the final project for the class <i>CS 310: Scalable Software Architectures</i> that I took in Fall 2023. I also just recycled one of the previous homeworks I did for <i>CS 348: Intro to Artificial Intelligence</i>, so I guess this was really two projects in one. The original homework simply used Naive Bayes to classify movie reviews as positive or negative - so I expanded on it and just to have a range from 1 to 5. 
                </p>
                
                <h1 className="font-semibold text-2xl pb-2 pt-5">Client</h1>
                <p>
                    When I first submitted this project, it was run on a Python file that prompts the user for their action and performs the inputted action.
                    <div className="flex justify-center my-5">
                        <img src={PythonClient} alt='Python Client'/>
                    </div>
                    Very basic.
                </p>
                <br/>
                <p>
                    But I adapted the Python code into React JS to be able to upload <i>.txt</i> files into AWS. Then, it can display the result of the analysis. There is also a line that shows the number of files currently in S3 and an option to clear those.
                </p>

                <h1 className="font-semibold text-2xl pb-2 pt-5">Server</h1>
                <p>
                    The project uses a serverless design with functions deployed in AWS Lambda. These functions are then callable from the client using a REST API.
                </p>
                <br/>
                <p>
                    I've adapted all the functions more or less into Javascript from the original Python client. There wasn't too much to do since it was mostly making and handling API calls and responses. The only problem I seemed to run into was the time it would take to fully evaluate functions so there's lots of downtime on this, but overall it seems to work.
                </p>
                <br/>
                <p>
                    One issue that appears on occasion is when the call to the server fails with status 502, meaning there was an error in the evaluation or calling of the API. There are general solutions to it such as <i>try-catch</i> handling or running the call until it responds properly. I currently have neither of those implemented and when it errors with 502, it will simply log in the console and nothing will happen so you might just need to run it again for it to work.
                </p>
                
                <h1 className="font-semibold text-2xl pb-2 pt-5">Computation</h1>
                <p>
                    The <i>naivebayes</i> function will be triggered when a file is placed into the S3 bucket into the <i>/files</i> folder. When this happens, the function will then train the classifier on prewritten data from <i>training_data/trainingdata.txt</i>. The reason the model trains on every call to the function is because the model also appends the currently inputted text into the training data for (ideally) more accuracy.
                    Currently the training data is just made up of text and ratings made from ChatGPT and random movie reviews, so the analysis isn't perfect.
                </p>
                <br/>
                <p>
                    Using the trained data, the classifier will then analyze the text from the passed in file and run a Naive Bayes Algorithm to determine the sentiment of this text. The algorithm also uses Laplace Smoothing and removal of stop words for more accurate analysis.
                </p>
                <br/>
                <p>
                    When the model finishes classifying the text, it will write the file's sentiment (a value from 1 to 5) into the <i>output.txt</i> file that is then uploaded into the <i>output/</i> folder in the S3 bucket.
                </p>
                
                <h1 className="font-semibold text-2xl pb-2 pt-5">Diagram</h1>
                <div className="flex justify-center">
                    <img src={diagram} alt='diagram' className="w-1/2 h-1/2"/>
                </div>
                
                <h1 className="font-semibold text-2xl pb-2 pt-5">API</h1>
                <p>
                    There are 4 API functions that the (original) client calls. All four of these are implemented <Link to="/analyze" className="text-blue-500 underline">here</Link>.
                </p>
                <ul className="pl-10 list-decimal list-outside">
                    <li>
                        <i>/upload</i> (POST)
                        <ul className="pl-10 list-disc list-outside">
                            <li>
                                Uploads a text file to S3, subsequently running the <i>naivebayes</i> lambda function to perform a computation on the text.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <i>/download</i> (GET)
                        <ul className="pl-10 list-disc list-outside">
                            <li>
                                Downloads the file at <i>output/output.txt</i> file from the S3 bucket.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <i>/stats</i> (GET)
                        <ul className="pl-10 list-disc list-outside">
                            <li>
                                Gets the number of files the client has uploaded into S3.
                            </li>
                            <li>
                                More specifically, reads the number of objects that begin with <i>files/</i>.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <i>/clear</i> (DELETE)
                        <ul className="pl-10 list-disc list-outside">
                            <li>
                                Deletes all files in the S3 bucket.
                            </li>
                            <li>
                                Specificaly, deletes all files that begin with <i>files/</i>.
                            </li>
                        </ul>
                    </li>
                </ul>
                {/* <div className="bg-purple-200 flex justify-center items-center mt-2">
                    <Link to="/analyze">
                        <h1 className="font-bold text-4xl py-5 text-center text-purple-800">CHECK IT OUT HERE</h1>
                    </Link>
                </div> */}
                <br/>
                <p className="font-bold">
                    Unfortunately, this no longer works (mostly because of unwanted charges incurred by AWS)
                </p>
                <p>Maybe if I ever get it sorted out, I'll put it back up</p>
            </div>
        )
    }
}

const TextClassifier = {
    name: "Text Classifer",
    color: "bg-white",
    body: <TC/>
}
export default TextClassifier;