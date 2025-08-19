"use client";
import { useState } from "react";
import data from "../../info.json";
import { Toast } from "../popups";
import { HomeIcon, HomeIconButton } from "../buttons";
import { TiltedCard, AnimatedContent } from "../reactbits";
import { useSafeMediaQuery } from "../../hooks/useSafeMediaQuery";

export function SectionHeader() {
  const contact = data.contact;
  const smallScreen = useSafeMediaQuery("(max-width: 767px)");

  const [showToast, setShowToast] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  return (
    <div className="my-4 sm:my-8 mx-4">
      <div className="flex justify-center items-center duration-300">
        <AnimatedContent
          distance={300}
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
        <div className="sm:ml-8">
          <AnimatedContent
            distance={200}
            direction="horizontal"
            reverse={false}
            duration={1}
            delay={0.2}
            ease="bounce3.out"
          >
            <h1 className="text-black font-light text-4xl sm:text-6xl duration-300">
              Mark Li
            </h1>
          </AnimatedContent>
          <h2 className="ml-1 font-light text-sm sm:text-lg mt-1">
            <AnimatedContent
              distance={200}
              direction="horizontal"
              reverse={false}
              duration={1}
              delay={0.4}
              ease="bounce3.out"
            >
              <span className="text-gray-500">Software Developer</span>
            </AnimatedContent>
            <AnimatedContent
              distance={200}
              direction="horizontal"
              reverse={false}
              duration={1}
              delay={0.6}
              ease="bounce3.out"
            >
              <span className="text-gray-500">Amateur Musician</span>
            </AnimatedContent>
          </h2>
          <div className="flex gap-4 sm:gap-6 space-between mt-2 ml-1 duration-300">
            <AnimatedContent
              distance={100}
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
            <AnimatedContent
              distance={100}
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
            <AnimatedContent
              distance={100}
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
            <AnimatedContent
              distance={100}
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
          </div>
        </div>
      </div>
      {showToast && (
        <Toast message="Email copied to clipboard!" isFadingOut={isFadingOut} />
      )}
    </div>
  );
}
