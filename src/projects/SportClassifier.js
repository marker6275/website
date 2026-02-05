import React from "react";
import { T, ST, P, Line, BL, NL, ST2 } from "../components/text";

function Sports() {
  const githubURL = "https://github.com/marker6275/sports-classifier";
  return (
    <div className="py-5">
      <T>Sport Classifier</T>
      <Line />
      <ST>Motivation</ST>
      <P>
        The whole point of this project was that I could watch TV while working on my
        laptop without having to constantly check if we're on commercial or not. There's
        not much more reason than that. The only sports it can classify are basketball
        and football, as well as commercials.
      </P>
      <br />
      <P>
        The classifier is built with Python using torch to read the images and train the model.
        The frontend is React and Next.js with Electron, which is just one big overlay that sits on your
        screen with a border displaying green (sport is on) or red (commercial).
      </P>
      <br />
      <P>
        <span className="font-medium">
          Project code:{" "}
          <a href={githubURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {githubURL}
          </a>
        </span>
      </P>
      <ST>Classifier</ST>
      <P>
        The classifier uses a Convolutional Neural Network to classify the sport based on
        the image. The parameters I used to train with were:
      </P>

      <BL>
        <li><i>Epochs</i>: 30</li>
        <li><i>Learning Rate</i>: 0.003</li>
        <li><i>Batch Size</i>: 8</li>
        <li><i>Image Size</i>: 224x224</li>
      </BL>
      <br />
      <P>
        Initially, I used 10 epochs and a learning rate of 0.001, which worked quite
        well. I tried to get higher accuracy by increasing these parameters and the
        returns were really not worth it for an overnight training session.
      </P>

      <ST>Images</ST>
      <P>
        For the final product, to read the images, I set up a webcam and the program
        would read the image every second and classify it. It would then display the
        result on the screen and send it to the frontend via a websocket connection.
        Since this could all just be run locally, it didn't need to be hosted on a
        server. Additionally, every 5 seconds, the program would screenshot the screen
        and save it to be used later.
      </P>
      <br />
      <P>I captured every image myself. Initially, I would screen record games on my
        laptop,  using those to train the model. However, there were two flaws with
        this method.
      </P>
      <NL>
        <li>
          <span className="font-semibold">It took an absurd amount of time. </span>
          Considering the average NBA/NFL game is around1.5 hours (if you exclude
          commercials), I would get around 700 or so usable images. This is plenty of
          data, but I didn't have time to burn for this.
        </li>
        <li>
          <span className="font-semibold">The images were too clean. </span>Since
          realistically, any camera I have set up would have a background, include
          false positives, and not perfectly capture a TV. I realized this when I
          tried to do a test run on a live game playing on my TV. There was too much
          noise in the image, so the model wouldn't even tell what was happening.
          (I fixed this later).
        </li>
      </NL>
      <br />
      <ST2>YOLO Classifier</ST2>
      <P>
        To address the image background noise issue, I would set up a webcam pointed
        at my TV and take images, as described. But I also used a YOLO classifier to
        detect the TV in the frame. So, every five seconds, the program would check
        where the TV was, and adjust the screenshot frame accordingly. This way, our
        images would only capture the TV with minimal background noise. This actually
        worked quite well.
      </P>
      <ST>Sports</ST>
      <P>
        Since the only two sports I spent time watching were football and basketball,
        I only trained the model on those two sports. There was plenty of full games
        on YouTube, so I just recorded those to train with. For commercials, again,
        there are plenty of commercial compilations on YouTube. My live test was on
        an NFL game, so the data points are heavier for football and commercials (as
        you can see below).
      </P>
      <br />
      <BL>
        <li>
          There are <span className="font-semibold">576</span> data points for
          basketball. (Split <span className="font-semibold">349/227</span> for
          training/validation)
        </li>
        <li>
          here are <span className="font-semibold">2,768</span> data points for
          football. (Split <span className="font-semibold">1,883/885</span> for
          training/validation)
        </li>
        <li>
          There are <span className="font-semibold">987</span> data points for
          commercials. (Split <span className="font-semibold">657/330</span> for
          training/validation)
        </li>
      </BL>
      <ST>Frontend</ST>
      <P>
        The frontend is a just one big border to your screen. I built it with Electron
        since it's pretty lightweight and easy to use (I don't think I used the full
        power of Electron). This overlay lets you use your laptop normally and doesn't
        get in the way of anything. It changes color depending on the classification
        result, green for commercial and red for sport.
      </P>
      <br />
      <ST2>Overlays</ST2>
      <P>
        On an unrelated note, I think the idea of overlays are super cool and useful.
        The only places you see them currently are in interview cheating apps such
        and AI notetakers (think Cluely). But I think there's lots of potential for
        how we can use them.
      </P>
      <ST>Results</ST>
      <P>
        The model was able to work with a pretty high accuracy at around 98% training
        accuracy and 97% validation accuracy. The commercials were more of a <i>if it
          doesn't fit a sport, it's a commercial</i> situation. Regardless, I was
        impressed with how well it worked.
      </P>
      <br />
      <ST2>False Positives</ST2>
      <P>
        One issue I kept running into was false positives for commercials. Since it was
        easier to determine when the game was on, even as humans, visually, we can tell
        if there's a court/field on vs. something else. But, there was a bit of noise in
        my training data, since it would include images such as shots of players' faces,
        the broadcast booth, transition screens, etc. These are present in both the NBA
        and NFL, and would occasionally show up as commercials. The model would tend to
        classify these as commercials.
      </P>
      <br />
      <P>
        To fix this, I just set a delay before the program updates the classification.
        It would need 5 straight classifications of commercials before updating as a
        commercial, and 2 straight classifications of a specific sport before updating
        the classification. I allowed it more leeway between sports since on the frontend,
        a binary decision between sport vs. commercial allowed more room for error.
      </P>
      <ST>Conclusion</ST>
      <P>
        This was pretty cool for me since this is my first ML project that wasn't a
        homework assignment. I thought this idea was really cool and could actually
        showcase my skills. Also, it was cool to mostly understand what was happening.
        This wasn't a <i>I'm just gonna copy a tutorial and call it a day</i> project.
      </P>
    </div>
  );
}

export const SportClassifier = {
  name: "Sport Classifier",
  color: {
    border: {
      solid: "border-blue-700",
      hover: "hover:border-blue-700",
    },
    text: "hover:text-blue-700",
  },
  description: "Which sport is on TV?",
  image: "/assets/project_images/SportClassifier/sports.png",
  body: <Sports />,
};
