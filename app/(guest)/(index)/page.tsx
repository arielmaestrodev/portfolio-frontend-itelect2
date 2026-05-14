import { Metadata } from "next";
import { Contact } from "@/components/features/home/Contact";
import { Hero } from "@/components/features/home/Hero";
import { Projects } from "@/components/features/home/Projects";
import { Skills } from "@/components/features/home/Skills";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my professional portfolio. Explore my latest projects, skills, and experience in full-stack development.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}