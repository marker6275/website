import React from "react";
import { T, ST, NL, BL, P, Line } from "../components/text";
import Link from "next/link";
import Image from "next/image";

function TC() {
  const githubURL = "https://github.com/marker6275/Text-Classifier";
  return (
    <div className="py-5">
      <T>Text Classifier</T>
      <Line />
      <ST>TLDR</ST>
      <P>
        A simple Naive Bayes algorithm that analyzes text and uses previous data
        to create a prediction of the sentiment of the text from 1 (strongly
        negative) to 5 (strongly positive).
      </P>
      <br />
      <P>
        <span className="font-medium">
          Project code:{" "}
          <a
            href={githubURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {githubURL}
          </a>
        </span>
      </P>
      <br />
      <P>
        I took all the functions off AWS since AWS kept charging me for some
        reason (please fix). I had to delete my entire AWS account so the
        functionality doesn't work anymore. The page still exists but nothing
        will happen if you try to upload a file. It might still let you upload
        files, but they don't go anywhere since the S3 bucket and lambda
        functions were deleted.
      </P>
      <span className="flex justify-center text-red-600 font-medium py-3">
        **Does not work anymore**
      </span>
      <div className="bg-purple-200 flex justify-center items-center mt-2 py-5">
        <Link href="/analyze">
          <h1 className="font-medium text-4xl text-center text-purple-800">
            CHECK IT OUT HERE (disabled)
          </h1>
          <p className="text-xs font-light text-center text-purple-800">
            Only looks good on web
          </p>
        </Link>
      </div>

      <ST>Client</ST>
      <P>
        Initially, it was run on a Python file that prompts the user for their
        action and performs the inputted action.
      </P>
      <div className="flex justify-center my-5">
        <Image
          src="/assets/project_images/TextClassifier/PythonClient.png"
          alt="Python Client"
          width={256}
          height={256}
        />
      </div>
      <P>Very basic.</P>
      <br />
      <P>
        But I adapted the Python code into React JS to be able to upload{" "}
        <i>.txt</i> files into AWS. Then, it can display the result of the
        analysis. There is also a line that shows the number of files currently
        in S3 and an option to clear those.
      </P>

      <ST>Server</ST>
      <P>
        The project uses a serverless design with functions deployed in AWS
        Lambda. These functions are then callable from the client using a REST
        API.
      </P>
      <br />
      <P>
        I've adapted all the functions more or less into Javascript from the
        original Python client. There wasn't too much to do since it was mostly
        making and handling API calls and responses. The only problem I seemed
        to run into was the time it would take to fully evaluate functions so
        there's lots of downtime on this, but overall it seems to work.
      </P>
      <br />
      <P>
        One issue that appears on occasion is when the call to the server fails
        with status 502, meaning there was an error in the evaluation or calling
        of the API. There are general solutions to it such as <i>try-catch</i>{" "}
        handling or running the call until it responds properly. I currently
        have neither of those implemented and when it errors with 502, it will
        simply log in the console and nothing will happen so you might just need
        to run it again for it to work.
      </P>

      <ST>Computation</ST>
      <P>
        The <i>naivebayes</i> function will be triggered when a file is placed
        into the S3 bucket into the <i>/files</i> folder. When this happens, the
        function will then train the classifier on prewritten data from{" "}
        <i>training_data/trainingdata.txt</i>. The reason the model trains on
        every call to the function is because the model also appends the
        currently inputted text into the training data for (ideally) more
        accuracy. Currently the training data is just made up of text and
        ratings made from ChatGPT and random movie reviews, so the analysis
        isn't perfect.
      </P>
      <br />
      <P>
        Using the trained data, the classifier will then analyze the text from
        the passed in file and run a custom, simplier Naive Bayes Algorithm to
        determine the sentiment of this text. The algorithm also uses Laplace
        Smoothing and removal of stop words for more accurate analysis.
      </P>
      <br />
      <P>
        When the model finishes classifying the text, it will write the file's
        sentiment (a value from 1 to 5) into the <i>output.txt</i> file that is
        then uploaded into the <i>output/</i> folder in the S3 bucket.
      </P>

      <ST>Diagram</ST>
      <div className="flex justify-center">
        <Image
          src="/assets/project_images/TextClassifier/diagram.png"
          alt="diagram"
          width={256}
          height={256}
          className="size-1/2"
        />
      </div>

      <ST>API</ST>
      <P>
        There are 4 API functions that the (original) client calls. All four of
        these are implemented{" "}
        <Link href="/analyze" className="text-blue-500 underline">
          here
        </Link>
        .
      </P>
      <NL>
        <li>
          <i>/upload</i> (POST)
          <BL>
            <li>
              Uploads a text file to S3, subsequently running the{" "}
              <i>naivebayes</i> lambda function to perform a computation on the
              text.
            </li>
          </BL>
        </li>
        <li>
          <i>/download</i> (GET)
          <BL>
            <li>
              Downloads the file at <i>output/output.txt</i> file from the S3
              bucket.
            </li>
          </BL>
        </li>
        <li>
          <i>/stats</i> (GET)
          <BL>
            <li>Gets the number of files the client has uploaded into S3.</li>
            <li>
              More specifically, reads the number of objects that begin with{" "}
              <i>files/</i>.
            </li>
          </BL>
        </li>
        <li>
          <i>/clear</i> (DELETE)
          <BL>
            <li>Deletes all files in the S3 bucket.</li>
            <li>
              Specificaly, deletes all files that begin with <i>files/</i>.
            </li>
          </BL>
        </li>
      </NL>
      <ST>Disabled</ST>
      <div className="bg-purple-200 flex justify-center items-center mt-2 py-5">
        <Link href="/analyze">
          <h1 className="font-medium text-4xl text-center text-purple-800">
            CHECK IT OUT HERE (disabled)
          </h1>
          <p className="text-xs font-light text-center text-purple-800">
            Only looks good on web
          </p>
        </Link>
      </div>
    </div>
  );
}

export const TextClassifier = {
  name: "Text Classifier",
  color: "border-white",
  text: "hover:text-gray-500",
  description: "Classify how words feel",
  image: "/assets/project_images/TextClassifier/aws.png",
  body: <TC />,
};
