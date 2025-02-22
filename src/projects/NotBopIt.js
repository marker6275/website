import React from "react";
import microbit from "../assets/project_images/NotBopIt/microbit.png";
import task from "../assets/project_images/NotBopIt/task.png";
import losingscreen from "../assets/project_images/NotBopIt/losingscreen.png";
import completedtask from "../assets/project_images/NotBopIt/completedtask.png";
import notbopit from "../assets/project_images/NotBopIt/notbopit.png";
import microbitLogo from "../assets/project_images/NotBopIt/microbitLogo.png";

class BopIt extends React.Component {
  render() {
    return (
      <div className="py-5">
        <h1 className="text-5xl mb-5 font-semibold">Not Bop-It</h1>
        <hr className="mb-5" />
        <h1 className="font-semibold text-2xl pb-2 pt-5">Description</h1>
        <p>
          A summary of the project description was that we wanted to make a
          thing that took in inputs and produced outputs given to those inputs.
          All it really needed was an actuator and at least 5 sensors.
          Originally we thought our idea of Bop-It was simple enough, but turns
          out at least 2 other groups did it as well... So we decided to make it
          a little different. Rather than the classic Bop-It, we wanted to
          change up how the game worked, mainly to make it seem more complex
          than it actually was.
        </p>
        <h1 className="font-semibold text-2xl pb-2 pt-5">Hardware</h1>
        <img src={microbit} alt="Microbit" className="w-1/6 mx-auto" />
        <p>
          The hardware we used was the nRF52833 on the Microbit. The device
          itself already included three buttons, including a reset button and an
          LED grid matrix on the surface. It also included a build in
          accelerometer. We added a potentiometer, a capacitive touch sensor, a
          light sensor, and a water sensor. All of these sensors were connected
          to the device through the GPIO pins that we wired together on a
          breadboard.
        </p>
        <br />
        <p>
          The premise of the game of our device was like Bop-It, there would be
          a UI that told the player what to do. Our options were listed as
          follows:
          <li>
            <b>Button:</b> Press a button
          </li>
          <li>
            <b>Flip:</b> Flip the device
          </li>
          <li>
            <b>Light:</b> Cover the light sensor
          </li>
          <li>
            <b>Touch:</b> Touch the capacitive touch sensor
          </li>
          <li>
            <b>Twist:</b> Twist the potentiometer
          </li>
          <li>
            <b>Water:</b> Put the device in water
          </li>
        </p>
        <h1 className="font-semibold text-2xl pb-2 pt-5">Game Logic</h1>
        <p>
          However, the logic behind the game was a little different. For each
          round, the user would be prompted to do one of the tasks and be given
          a certain amount of time to complete it. Except that the player would
          not only have to do the new task that was on the board, but they would
          also have to complete all previous tasks, in order, by memory, within
          the time limit for each task.
        </p>
        <br />
        <p>
          This time limit decreased by 5% each round. If the player failed to do
          it in time, they would lose and it would show a losing screen with the
          final score. Otherwise, it would continue to the next round where they
          need to do a new task along with all previous ones. There was no
          penalty for doing the wrong task, just that you had to do the correct
          one before the time limit. The highest score we saw was 14 rounds.
        </p>
        <br />
        <p>
          Originally we wanted to add a speaker element that would read out
          pre-recorded instructions, but we weren't able to implement clean
          audio. So we just got our terminal to display text text:
        </p>
        <div className="grid grid-cols-3 p-10 gap-10">
          <div>
            <img src={task} alt="Task" />
            <p className="flex items-center justify-center font-bold text-sm">
              New Task Screen
            </p>
          </div>
          <div>
            <img src={completedtask} alt="Completed Task" />
            <p className="flex items-center justify-center font-bold text-sm">
              Repeat Task Screen
            </p>
          </div>
          <div>
            <img src={losingscreen} alt="Losing Screen" />
            <p className="flex items-center justify-center font-bold text-sm">
              Losing Screen
            </p>
          </div>
        </div>
        <div>
          <i>
            <p>I am not an text artist.</p>
            <p>Or maybe I am.</p>
            <p>Your call.</p>
          </i>
        </div>
        <h1 className="font-semibold text-2xl pb-2 pt-5">Software</h1>
        <p>
          After the game logic, we needed a way to read sensor inputs. The
          Microbit communicated with the sensors through I2C, and we used the
          GPIO pins to read the inputs. The inputs themselves were just raw
          voltage values from 0 - 3.3 V. We did a little logic to determine what
          was enough for each of the sensors.
        </p>
        <br />
        <p>
          For example, when the water sensor read a value greater than 2.5 V, we
          would consider it as being in water. Similarly, when the potentiometer
          was turned about 45 degrees, or about 0.5 V, we would consider it as
          twisted. For the rest of the sensors, we followed some similar logic.
        </p>
        <h1 className="font-semibold text-2xl pb-2 pt-5">Final Product</h1>
        <p>
          So now we had to build the actual device. We assembled our sensors
          across two breadboards and intended it to be a two-player game, with
          each player holding one breadboard with different sensors on each one.
        </p>
        <img src={notbopit} alt="Not Bop-It" className="w-1/2 mx-auto pt-5" />
        <p className="flex items-center justify-center font-bold text-sm">
          Sensors in order as you see them from left to right: touch, button,
          flip, light, twist, water
        </p>
      </div>
    );
  }
}

export const NotBopIt = {
  name: "Not Bop-It",
  color: "bg-teal-400",
  text: "hover:text-teal-500",
  skills: ["C", "MicroBit", "Sensors"],
  description: "Bop It wishes it was this",
  image: microbitLogo,
  body: <BopIt />,
};
