import { AnimatedContent } from "../../reactbits";
import { HomeIcon, HomeIconButton } from "../../buttons";
import data from "../../../info.json";

const contact = data.contact;

export function HeaderEmailIcon({ showToast, setShowToast, setIsFadingOut }) {
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={false}
      duration={1}
      delay={0.4}
      ease="bounce3.out"
    >
      <div
        onClick={() => {
          navigator.clipboard.writeText(contact.email);
          if (!showToast) {
            setShowToast(true);
            setIsFadingOut(false);
            setTimeout(() => {
              setIsFadingOut(true);
              setTimeout(() => setShowToast(false), 300);
            }, 2200);
          }
        }}
        style={{ cursor: "pointer", position: "relative" }}
        title="Click to copy email"
      >
        <HomeIcon src="/assets/icons/email.png" alt="email" />
      </div>
    </AnimatedContent>
  );
}

export function HeaderInstagramIcon() {
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={false}
      duration={1}
      delay={0.5}
      ease="bounce3.out"
    >
      <HomeIconButton
        src="/assets/icons/instagram.png"
        alt="instagram"
        link={contact.instagram}
      />
    </AnimatedContent>
  );
}

export function HeaderGithubIcon() {
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={false}
      duration={1}
      delay={0.6}
      ease="bounce3.out"
    >
      <HomeIconButton
        src="/assets/icons/github.png"
        alt="github"
        link={contact.github}
      />
    </AnimatedContent>
  );
}

export function HeaderLinkedinIcon() {
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={false}
      duration={1}
      delay={0.7}
      ease="bounce3.out"
    >
      <HomeIconButton
        src="/assets/icons/linkedin.png"
        alt="linkedin"
        link={contact.linkedin}
      />
    </AnimatedContent>
  );
}
