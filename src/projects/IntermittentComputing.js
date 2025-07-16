import React from "react";
import { T, D, NL, ST, P, Line } from "../components/text";
import msp430Launchpad from "../assets/project_images/IntermittentComputing/msp430launchpad.png";

class Intermittent extends React.Component {

  hashcashLink = "https://en.wikipedia.org/wiki/Hashcash";
  WARioPaperLink = "https://dl.acm.org/doi/10.1145/3519939.3523454";
  render() {
    return (
      <div className="py-5">
        <D>NOV 2024</D>
        <T>Intermittent Computing</T>
        <Line />
        <ST>Description</ST>
        <P>
          This project was originally for the 2024 International Conference on
          Embedded Wireless Systems and Networks (EWSN) Call For Competitors.
          The goal of this competition was to implement and evaluate different
          approaches to designing efficient intermittently-powered sensing
          systems. Ideally, this would advance the field of battery-free
          computing and energy harvesting research.
        </P>
        <ST>Objectives (from the official website)</ST>
        <P>
          The winning team will be the one maximizing the number of challenges
          solved over a predefined time window, during which the competition
          organizers will emulate varying degrees of available energy. To solve
          a challenge, contestants have to utilize hashcash, a SHA1-based
          proof-of-work algorithm for which a reference implementation is
          provided by the organizers.
        </P>
        <br />
        <P>
          <b>Example:</b> Using a challenge ‘EWSN2024‘ and a difficulty of
          16-bit, we first create a starting string with a well-known format,
          e.g., <i>1:16:240403:EWSN2024::WXhnFeDleN:1</i>. The segments of the
          string separated by a colon are: version (always 1), bits (16 as per
          difficulty), date (6 digits, fixed for the competition), resource (the
          challenge word given), extension (empty), random (a user-chosen random
          string), and a counter. We now need to check if this string’s SHA1
          hash has 16 (as per the chosen difficulty) leading zeros (most
          significant bits). Our string (with the counter of 1) has a SHA1 hash
          of <i>20db26cb6b1e17a2079fc3daf05fd01a7ed08cb5</i>, which only has two
          leading zeros. Thus, we increment the counter to 2 and hash the
          updated string and keep incrementing the counter until we find a
          string that has a hash with the required leading zeros. In this
          example, after 96620 attempts, the string with counter 96620{" "}
          <i>1:16:240403:EWSN2024::WXhnFeDleN:96620</i> has a hash of{" "}
          <i>0000babe195c81d00ecec4cd8f0dc1572ebd46d4</i> with 16 leading zeros
          (0x0000) as required. The string{" "}
          <i>1:16:240403:EWSN2024::WXhnFeDleN:96620</i> is hence the solution to
          the challenge.
        </P>
        <br />
        <P>
          At the start of an experiment, an external I2C FRAM memory will
          contain a list of challenges similar to the above example, to which
          contestants need to supply a solution despite the intermittent energy
          supply. At the end of an experiment, the computed solutions are
          automatically collected by E-Cube, the number of correct solutions is
          tallied against any incorrect solutions, and points awarded
          accordingly. Additional technical details, a reference solution, as
          well as the evaluation procedure will be posted on the competition’s
          website.
        </P>
        <ST>Introduction</ST>
        <P>
          In Embedded and Wireless Systems, using energy harvesting devices with
          non-trivial compute performance demands new thinking on call stack and
          memory management. The core complexity resides not in a lack of
          available power but rather in the uncertainty of whether power will
          remain steady in the next clock cycle. We want to practice
          implementing novel approaches in scenarios that may corrupt the system
          or compromise the validity of output data.
        </P>
        <ST>Constraints</ST>
        <P>
          In this competition, we're constrained to the MSP430FR5994 MCU and
          subjected to power shutoff that can be observed and handled by the
          firmware. We addressed these challenges through a structured approach:
          modular functions, state-saving in non-volatile memory (NVM), and
          optimized compiler-level control over memory and operations.
        </P>
        <ST>Hashcash</ST>
        <P>
          <b>TLDR</b>: Hashcash is a proof-of-work algorithm that uses a SHA-1
          hashing algorithm. The goal is to find a string that, when hashed, has
          a certain number of leading zeros. When this string is found, the
          algorithm ends. Otherwise, the produced hash will be run through the
          SHA-1 algorithm again. This process is repeated until the desired hash
          is found.
        </P>
        <P>
          <b>Long</b>: Just go to{" "}
          <a
            href={this.hashcashLink}
            className="underline text-blue-500"
          >
            Wikipedia
          </a>
          .
        </P>
        <ST>Approach</ST>
        <P>
          Our approach aims to be a hybrid inspired by many works in the area.
          Initially approaching the problem’s literature review, we recognized
          several trends:
        </P>
        <NL>
          <li>
            <b>Write After Read (WAR) hazards:</b> WAR hazards are easily the
            primary inhibitor to intermittent computing, i.e. how can we design
            a system that will remain consistent through power failures? We were
            really inspired by{" "}
            <a
              href={this.WARioPaperLink}
              className="underline text-blue-500"
            >
              WARio
            </a>
            , the custom compiler instruction approach by{" "}
            <i>Kortbeek, et.al.</i>
          </li>
          <li>
            <b>Energy-efficient code:</b> Similar to how high-performance
            computing focuses on optimizing performance, our code had to be
            optimized to reduce energy consumption.
          </li>
          <li>
            <b>State Saving:</b> We know ahead of time that the system is going
            to have a power failure by design. Therefore, the code needs to have
            a reliable method to continue computations without completely
            restarting from the top.
          </li>
        </NL>
        <ST>Handling WAR Hazards</ST>
        <P>
          Due to the importance of consistency, Write After Read (WAR) hazards
          are at the heart of the intermittent computing challenge. WAR hazards
          occur when a subsequent write operation modifies a value that has not
          been fully read by a prior operation, leading to inconsistent states
          following a power loss. To overcome these hazards, we used customized
          compiler instructions to minimize WAR occurrences. We restructured the
          code to minimize WAR operations by grouping them into atomic function
          blocks to ensure that a block either runs to completion or not at all.
          This design guarantees a consistent recovery state by preventing
          partially updated variables.
        </P>
        <br />
        <P>
          <b>Compiler Control:</b> By customizing compiler flags and reordering
          instructions, we ensured that memory and register operations were
          executed in an optimized sequence to avoid read-write conflicts and
          memory corruption.
        </P>
        <ST>Code Efficiency</ST>
        <P>
          Ensuring efficient reads and writes in our program involved managing
          the program state effectively and saving at crucial moments. Managing
          the state of the system across power interruptions required a robust
          state-saving mechanism in non-volatile memory (NVM). We implemented a
          checkpoint system that checks significant amounts of information at
          once, rather than as data is updated.
        </P>
        <br />
        <P>
          <b>Context Structure:</b> A custom <code>context_t</code> struct was
          used to store key variables, such as SHA-1 state values, message, and
          iterations. This structure was saved to NVM in batches after each
          atomic function to try and keep the variables as updated as possible.
        </P>
        <br />
        <P>
          <b>Checkpointing:</b> It is common practice to checkpoint, or save the
          current state of the program after key computations or expensive
          operations to avoid excessive computations and maintain important
          information in memory. We implemented this through function atomicity.
          After completing a function, all the data from that computation were
          stored in NVM before continuing.
        </P>
        <ST>Function Modularity and Atomic Design</ST>
        <P>
          Our system was designed with modular functions, isolating portions of
          the SHA-1 computation to complete before continuing to the next step
          in the algorithm.
        </P>
        <br />
        <P>
          <b>Atomic Function Execution:</b> Each function was designed to be
          completed before updating the context, ensuring that the system could
          resume from any function call without reprocessing previously
          completed work. We also aimed to minimize work within each function to
          promote frequent variable updates.
        </P>
        <br />
        <P>
          <b>Instruction Pointer Flag:</b> An instruction pointer flag is used
          to check which function was currently running when power was shut off.
          On startup, the program will continue the algorithm from the last
          function to ensure minimal data loss and avoid unnecessary computing.
        </P>
        <ST>Results</ST>
        <P>
          Our implementation worked (<i>for the most part</i>). We were able to
          get a working implementation of hashcash. We also had a sample
          intermittent computing program running that continuously when power is
          cut. But we weren't able to integrate intermittent computing into the
          hashcash algorithm, so we didn't get a submission in to the
          competition.
        </P>
        <br />
        <P>
          Overall, I'm a little sad we didn't get to actually participate but I
          had a decent idea that we weren't going to have a shot, especially
          since we're going to be competing against full time PhD students and
          researchers. But I'm glad for the experience and it was fun, at least
          getting it implemented.
        </P>
      </div>
    );
  }
}

export const IntermittentComputing = {
  name: "Intermittent Computing",
  color: "bg-red-700",
  text: "hover:text-red-600",
  skills: ["C", "Embedded Programming", "Hashcash"],
  description: "Battery-free computing",
  image: msp430Launchpad,
  body: <Intermittent />,
};
