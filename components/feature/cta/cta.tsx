import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="rounded-2xl bg-gradient-to-r text-white from-purple-600 to-purple-800 p-12 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Boost your creativity.</span>
          <span className="block">Start using Dialogue to World today.</span>
        </h2>
        <p className="mb-8 text-lg">
          Join thousands of writers, game developers, and language learners who
          are already using DialogueGen to create amazing conversations.
        </p>
        <Button
          size="lg"
          className="bg-white text-purple-600 hover:bg-gray-100"
        >
          <Link href="/login"> Get Started Now</Link>
        </Button>
      </div>
    </section>
  );
}
