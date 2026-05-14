import { Metadata } from "next";
import { AboutHero } from "@/components/features/about/AboutHero";
import { Experience } from "@/components/features/about/Experience";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about my background, experience, and the technologies I use to build modern web applications.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Experience />
    </>
  );
}