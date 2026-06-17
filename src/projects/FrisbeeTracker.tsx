import { T, ST, ST2, P, BL, NL, Line, C } from '@/components/text';

function Frisbee() {
  return (
    <div className="py-5">
      <T>Frisbee Tracker</T>
      <Line />

      <div className="flex justify-center py-3">
        <video controls preload="metadata" className="w-1/2">
          <source
            src="/assets/project_images/FrisbeeTracker/v1_demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <C>V1 (USA vs. Belgium 2025 U24 Mens World Championship)</C>

      <ST>Overview</ST>
      <P>
        This is a system that tracks players throughout the duration of an
        ultimate frisbee game. I built it with the goal to turn simple footage
        into trackable and analyzable data.
      </P>
      <br />
      <P>
        I've had this thought for sports tracking for players and analytics for
        a while. This isn't a <i>new</i> and <i>revolutionary</i> idea, but
        still has a ways to go. Also since beginning to use Claude Code, I've
        been able to put these larger projects into life.
      </P>

      <ST>Motivation</ST>
      <P>
        I saw a video where{' '}
        <a
          href="https://www.youtube.com/watch?v=aBVGKoNZQUw&t=297s"
          target="_blank"
          className="text-blue-500 underline"
        >
          someone created tracking for soccer
        </a>{' '}
        (yes soccer), and I figured why not try making this for other sports.
        Since ultimate frisbee is actually quite similar in structure to soccer,
        this felt quite repeatable.
      </P>
      <br />
      <P>
        Right now, it just tracks the players and occasionally the disc, but my
        goal for the future is to eventually convert the broadcast camera view
        into a top-down 2D visualization of the field, also track other nuances
        of the game such as how open/defended a player is, and play structure.
        I'm going to update this page as I make updates.
      </P>

      <ST>Approach</ST>
      <P>V1:</P>
      <NL>
        <li>
          A quite pass through the video and learn the two team colors (k-means
          on jersey color), also identifies referees/observers (third-party
          color).
        </li>
        <li>
          Each frame runs one high-resolution YOLO segmentation pass to find
          players and the disc. Skip non-field images (replays, close-ups) are
          skipped.
        </li>
        <li>
          Every player is classified and drawn with a colored silhouette (red or
          blue). Players not in the game are drawn with gray.
        </li>
        <li>
          The disc is tracked by pinning it to the holder's hands and whoever
          holds it is highlighted as the thrower (orange or green) until a
          throw, to avoid falsely detecting the holder.
        </li>
      </NL>

      <ST>Implementation</ST>
      <BL>
        <li>Python</li>
        <li>YOLO11 for image detection</li>
        <li>OpenCV for video analysis</li>
      </BL>

      <ST>Next Steps</ST>
      <P>
        One thing to keep of note are false positives with the bench. It still
        hasn't perfectly figured out players on the bench vs. players on the
        field. It picks up the interior yard lines fairly reliably, but
        struggles to draw bounding boxes around the field of play. Also, which
        you can see in the demo footage above, with the frisbee
        detection/tracking, there are false positives on bright, round things
        off the field.
      </P>

      <NL>
        <li>Improve player/disc tracking</li>
        <li>Convert image to top-down 2D view/field representation</li>
        <li>Identify and determine player openness</li>
      </NL>
    </div>
  );
}

export const FrisbeeTracker = {
  name: 'Frisbee Tracker',
  color: {
    border: {
      image: 'border-blue-300',
      outer: 'hover:border-blue-300',
    },
    text: 'hover:text-blue-400',
  },
  description: 'Player tracking a frisbee game',
  image: '/assets/project_images/FrisbeeTracker/logo.png',
  body: <Frisbee />,
  tags: ['Computer Vision', 'OpenCV', 'YOLO'],
  inProgress: true,
};
