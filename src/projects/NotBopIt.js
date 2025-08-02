import React from "react";
import { T, D, ST, P, Line, C } from "../components/text";
import Image from "next/image";

export function BopIt() {
  const githubURL = "https://github.com/marker6275/Bop-It";
  return (
    <div className="py-5">
      <D>MAR 2024</D>
      <T>Not Bop-It</T>
      <Line />
      <ST>Description</ST>
      <P>
        A summary of the project description was that we wanted to make a thing
        that took in inputs and produced outputs given to those inputs. All it
        really needed was an actuator and at least 5 sensors. Originally we
        thought our idea of Bop-It was simple enough, but turns out at least 2
        other groups did it as well... So we decided to make it a little
        different. Rather than the classic Bop-It, we wanted to change up how
        the game worked, mainly to make it seem more complex than it actually
        was.
      </P>
      <ST>Hardware</ST>
      <Image
        src="/assets/project_images/NotBopIt/microbit.png"
        alt="Microbit"
        width={256}
        height={256}
        className="mx-auto"
      />
      <P>
        The hardware we used was the nRF52833 on the Microbit. The device itself
        already included three buttons, including a reset button and an LED grid
        matrix on the surface. It also included a build in accelerometer. We
        added a potentiometer, a capacitive touch sensor, a light sensor, and a
        water sensor. All of these sensors were connected to the device through
        the GPIO pins that we wired together on a breadboard.
      </P>
      <br />
      <P>
        The premise of the game of our device was like Bop-It, there would be a
        UI that told the player what to do. Our options were listed as follows:
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
      </P>
      <ST>Game Logic</ST>
      <P>
        However, the logic behind the game was a little different. For each
        round, the user would be prompted to do one of the tasks and be given a
        certain amount of time to complete it. Except that the player would not
        only have to do the new task that was on the board, but they would also
        have to complete all previous tasks, in order, by memory, within the
        time limit for each task.
      </P>
      <br />
      <P>
        This time limit decreased by 5% each round. If the player failed to do
        it in time, they would lose and it would show a losing screen with the
        final score. Otherwise, it would continue to the next round where they
        need to do a new task along with all previous ones. There was no penalty
        for doing the wrong task, just that you had to do the correct one before
        the time limit. The highest score we saw was 14 rounds.
      </P>
      <br />
      <P>
        Originally we wanted to add a speaker element that would read out
        pre-recorded instructions, but we weren't able to implement clean audio.
        So we just got our terminal to display text text:
      </P>
      <div className="grid grid-cols-3 p-10 gap-10 justify-items-center items-center">
        <div>
          <Image
            src="/assets/project_images/NotBopIt/task.png"
            alt="Task"
            width={256}
            height={256}
            className="mb-2"
          />
          <C>New Task Screen</C>
        </div>
        <div>
          <Image
            src="/assets/project_images/NotBopIt/completedtask.png"
            alt="Completed Task"
            width={256}
            height={256}
            className="mb-2"
          />
          <C>Repeat Task Screen</C>
        </div>
        <div>
          <Image
            src="/assets/project_images/NotBopIt/losingscreen.png"
            alt="Losing Screen"
            width={256}
            height={256}
            className="mb-2"
          />
          <C>Losing Screen</C>
        </div>
      </div>
      <div>
        <i>
          <P>I am not an artist.</P>
          <P>Or maybe I am.</P>
          <P>Your call.</P>
        </i>
      </div>
      <ST>Software</ST>
      <P>
        All the software for our project is located in this{" "}
        <a
          href={githubURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Github repo
        </a>
      </P>
      <br />
      <P>
        After the game logic, we needed a way to read sensor inputs. The
        Microbit communicated with the sensors through I2C, and we used the GPIO
        pins to read the inputs. The inputs themselves were just raw voltage
        values from 0 - 3.3 V. We did a little logic to determine what was
        enough for each of the sensors.
      </P>
      <br />
      <P>
        For example, when the water sensor read a value greater than 2.5 V, we
        would consider it as being in water. Similarly, when the potentiometer
        was turned about 45 degrees, or about 0.5 V, we would consider it as
        twisted. For the rest of the sensors, we followed some similar logic.
      </P>
      <ST>Final Product</ST>
      <P>
        So now we had to build the actual device. We assembled our sensors
        across two breadboards and intended it to be a two-player game, with
        each player holding one breadboard with different sensors on each one.
      </P>
      <Image
        src="/assets/project_images/NotBopIt/notbopit.png"
        alt="Not Bop-It"
        width={128}
        height={128}
        className="w-1/2 mx-auto pt-5 mb-2"
      />
      <C>
        Sensors in order as you see them from left to right: touch, button,
        flip, light, twist, water
      </C>
    </div>
  );
}

export const NotBopIt = {
  name: "Not Bop-It",
  color: "border-teal-400",
  text: "hover:text-teal-500",
  description: "Bop It wishes it was this",
  image: "/assets/project_images/NotBopIt/microbitLogo.png",
  body: <BopIt />,
};
