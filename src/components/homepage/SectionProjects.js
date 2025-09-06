"use client";

import { HomeProjectCard } from "../cards";
import { projects } from "../../utils";
import Link from "next/link";
import { AnimatedContent } from "../reactbits";
import Image from "next/image";

export function SectionProjects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="py-5 sm:py-10 overflow-x-hidden mx-2 sm:mx-15 relative">
      <AnimatedContent
        distance={450}
        direction="horizontal"
        reverse={true}
        duration={1.2}
        ease="bounce3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.1}
      >
        <div className="w-full sm:w-2/5 group">
          <Link href="/projects">
            <div className="flex sm:justify-between justify-center items-center px-5 py-2 sm:py-5 sm:border-1 border-gray-800 rounded-lg cursor-pointer">
              <span className="absolute inset-0 bg-gradient-to-r from-green-600/0 sm:from-green-600/50 to-white/0 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0 w-2/5 rounded-lg"></span>
              <h1 className="text-start font-light text-3xl sm:text-5xl z-1 text-black">
                Projects
              </h1>
              <Image
                src="/assets/icons/arrow.png"
                alt="arrow"
                width={100}
                height={100}
                className="size-12 z-1 sm:block hidden"
              />
            </div>
          </Link>
        </div>
      </AnimatedContent>
      <AnimatedContent
        distance={450}
        direction="horizontal"
        reverse={true}
        duration={1}
        ease="bounce3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.1}
      >
        <hr className="sm:hidden mx-10 sm:mx-15" />
      </AnimatedContent>
      <div className="lg:grid lg:grid-cols-3 flex flex-col lg:flex-col gap-8 lg:gap-20 px-6 lg:px-15 py-6 lg:py-12">
        {featuredProjects.map((project, index) => (
          <AnimatedContent
            key={index}
            distance={800}
            direction="horizontal"
            reverse={false}
            duration={1.5}
            ease="bounce3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.2 * (index + 1)}
            className="overflow-y-visible"
          >
            <HomeProjectCard
              key={index}
              name={project.name}
              color={project.color}
              text={project.text}
              link={project.link}
            >
              {project.body}
            </HomeProjectCard>
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}
