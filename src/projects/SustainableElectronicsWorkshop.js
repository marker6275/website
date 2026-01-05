import { T, ST, P, Line, NL } from "../components/text";

function SEW() {
  const projectReport =
    "https://github.com/marker6275/Sustainable-Electronics-Workshop/blob/main/Project_Report.pdf";
  const githubURL =
    "https://github.com/marker6275/Sustainable-Electronics-Workshop";
  return (
    <div className="py-5">
      <T>Sustainable Electronics Workshop</T>
      <Line />
      <ST>Background</ST>
      <P>
        This was my master's project at Northwestern University, where I was
        part of VAK Lab, led by Professor Nivedita Arora. I designed a course on
        sustainability in computing and electronics. I wanted to make a workshop
        that would teach college undergraduates about how sustainability fits in
        our technology. I chose to focus on the key issues of sustainability and
        what we, as engineers, can do to make technology more sustainable.
      </P>
      <br />
      <P>
        Initially, I wanted to make a sustainability hackathon, where we could
        provide students with discarded electronics and have them design
        something new using old parts. However, there were many problems that
        arose with this idea - there was too much to do in too short of a time
        for students, there were many prerequisites to fill, and
        inter-electronic compatability was difficult to handle. So this idea got
        scrapped pretty quick.
      </P>
      <br />
      <P>
        The second idea was less of a workshop, but focused more on
        sustainability with electronics. I wanted to create a work of art using
        discarded PCBs to recycle a usually unrecyclable material. The idea was
        to use PCBs as capacitance touch sensors, as to where you could tap on
        the PCB and a light would turn on or a note would play. I was able to
        achieve proof of concept for this to work, but since we wanted to focus
        more on education, we pivoted this idea to a traditional workshop,
        although I may revisit this idea in the future.
      </P>

      <ST>Workshop Materials</ST>
      <P>
        <span className="font-semibold">
          All workshop materials are available on this Github repo:
        </span>{" "}
        <a
          href={githubURL}
          className="underline text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {githubURL}
        </a>
      </P>
      <br />
      <P>
        Also in this repo is a{" "}
        <a
          href={projectReport}
          className="underline text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          full project report
        </a>
        . Everything following this is a rough summary of the project.
      </P>

      <ST>Course Design</ST>
      <P>
        This workshop was meant to be an 80-minute workshop, where we would
        cover the key concepts of sustainability in computing. The target
        audience of the workshop was college undergraduates, and while we
        focused on students studying computer science, computer engineering, and
        electrical engineering, this course would be accessible to all
        engineers, and potentially even non-engineers. The only real
        prerequities are a basic understanding of circuits so students could
        take this at all levels of study. We never quite nailed down the
        specific grade levels we wanted to target since there were arguments for
        all. I would have liked to target younger students, such as freshmen who
        had recently took introductory courses so this idea of sustainability in
        design would be introduced early on.
      </P>

      <ST>Workshop Goals</ST>
      <NL>
        <li>Understand embodied and operational carbon in electronics</li>
        <li>Learn the basics of life cycle assessment as a tool</li>
        <li>
          Recognize how material choices and energy use affect a device's
          environmental footprint
        </li>
        <li>
          Apply sustainable thinking to consider a product's entire life cycle
        </li>
      </NL>

      <ST>Topics Covered</ST>
      <NL>
        <li>Embodied and operational carbon</li>
        <li>Life Cycle Assessment</li>
        <li>Material and Energy Analysis</li>
      </NL>

      <ST>Workshop Flow</ST>
      <P>
        The workshop started with a quick lecture on the main ideas of
        sustainability and how they relate to electronics. It covers the carbon
        footprint, embodied and operational carbon, and how to calculate and
        discover these numbers. Then, we cover the concept of a life cycle
        assessment and how to use it to quantify how the environmental impact of
        a product. Then, we jump to an activity where students created circuits
        to consider the tradeoffs of different materials and how they affect the
        carbon footprint of a product. We wrapped up with examples as to how
        these tradeoffs are applied in industry.
      </P>

      <ST>Activity</ST>
      <P>
        The activity, which was the main highlight of the workshop, was a
        circuit design activity. We provided students with cardstock, carbon
        paint, copper tape, and a battery. Students were tasked with creating a
        circuit that would turn on a light using the provided materials, but
        focusing on producting the least amount of carbon. We had a worksheet
        that guided students through the process of designing the circuit and
        calculating the carbon footprint of the circuit.
      </P>

      <ST>Results</ST>
      <P>
        We weren't able to formally run the workshop, but we did get to do a
        pilot with a few students. The feedback was positive, and everything
        seemed to make sense and run smoothly. Students were able to understand
        the concepts and apply them to the activity. Students were also able to
        create circuits according to the instructions and understand the
        tradeoffs of different materials. I would love to run the workshop for
        real some day. I think this would be a great way to introduce
        sustainability to engineering students, so I would love to see this
        truly taught in a college setting.
      </P>
    </div>
  );
}

export const SustainabilityWorkshop = {
  name: "Green Electronics Workshop",
  color: "border-green-600",
  text: "hover:text-green-600",
  description: "How to make electronics sustainable",
  image: "/assets/project_images/SustainableElectronicsWorkshop/fern.png",
  body: <SEW />,
};
