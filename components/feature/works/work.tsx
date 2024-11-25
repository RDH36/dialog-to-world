import { MessageCircle, Settings2, Sparkles } from "lucide-react";

export function Work() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
              <Settings2 className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-bold">1. Choose Your Level</h3>
          <p className="text-gray-400">
            Select your current language proficiency
          </p>
        </div>
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-bold">2. Start Conversations</h3>
          <p className="text-gray-400">Engage in AI-generated dialogues</p>
        </div>
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-bold">3. Learn Naturally</h3>
          <p className="text-gray-400">
            Improve through practical conversations
          </p>
        </div>
      </div>
    </section>
  );
}
