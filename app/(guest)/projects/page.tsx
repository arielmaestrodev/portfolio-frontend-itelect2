import { Metadata } from "next";
import { ProjectList } from "@/components/features/projects/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse through my portfolio of web development projects, including full-stack applications, UI/UX designs, and more.",
};

export default function ProjectsPage() {
  return (
    <ProjectList />
  );
}