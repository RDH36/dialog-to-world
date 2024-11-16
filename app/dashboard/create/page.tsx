import { DialogueForm } from "@/components/dialogue-form";
export default function Page() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Let's Create amaizing Dialogue
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            simple and easy to use, enjoy the process
          </p>
        </div>
        <DialogueForm />
      </div>
    </div>
  );
}
