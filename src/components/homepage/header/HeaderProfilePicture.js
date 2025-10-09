import { TiltedCard, AnimatedContent } from "../../reactbits";
import { useSafeMediaQuery } from "../../../hooks/useSafeMediaQuery";
import Image from "next/image";

export function HeaderProfilePicture() {
  const smallScreen = useSafeMediaQuery("(max-width: 767px)");

  return (
    <AnimatedContent
      distance={50}
      direction="horizontal"
      reverse={true}
      duration={1}
      delay={0.2}
      ease="bounce3.out"
    >
      <Image
        src="assets/profile_pic.jpg"
        alt="Profile Picture"
        width={220}
        height={220}
        className={`rounded-full ${
          smallScreen ? "size-36" : "size-56"
        } object-cover`}
        priority
      />
    </AnimatedContent>
  );
}
