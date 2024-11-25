import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="rounded-2xl bg-gradient-to-r text-white from-purple-600 to-purple-800 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
        <p className="mb-8 text-lg">
          Join thousands of language learners using DW today.
        </p>
        <Button
          size="lg"
          className="bg-white text-purple-600 hover:bg-gray-100"
        >
          Get Started Now
        </Button>
      </div>
    </section>
  );
}
