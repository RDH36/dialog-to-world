import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does DW work?</AccordionTrigger>
          <AccordionContent>
            DW uses advanced AI to generate natural conversations in your target
            language, allowing you to practice in real-world scenarios.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Which languages are supported?</AccordionTrigger>
          <AccordionContent>
            We currently support major languages including English, Spanish,
            French, German, and more. Were constantly adding new languages.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is DW suitable for beginners?</AccordionTrigger>
          <AccordionContent>
            Yes! DW adapts to your proficiency level, whether youre a beginner
            or advanced learner.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
