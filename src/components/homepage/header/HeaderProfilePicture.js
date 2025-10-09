import { TiltedCard, AnimatedContent } from "../../reactbits";
import { useSafeMediaQuery } from "../../../hooks/useSafeMediaQuery";

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
      <TiltedCard
        imageSrc="../../assets/profile_pic.jpg"
        altText="Mark Li"
        containerHeight="220px"
        containerWidth="220px"
        imageHeight={smallScreen ? "190px" : "220px"}
        imageWidth={smallScreen ? "190px" : "220px"}
        rotateAmplitude={20}
        scaleOnHover={1}
        showMobileWarning={false}
        showTooltip={false}
      />
    </AnimatedContent>
  );
}
