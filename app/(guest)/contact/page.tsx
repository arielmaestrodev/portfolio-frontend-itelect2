import { Metadata } from "next";
import { ContactForm } from "@/components/features/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me for collaborations, job opportunities, or just to say hello.",
};

export default function ContactPage() {
	return (
		<ContactForm />
	);
}