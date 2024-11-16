import { DialogueThumbnailCard } from "@/components/dialogue-thumbnail-card";
import DialogueThumbnailCardSkelton from "@/components/feature/skeloton/DialogueThumbnailCardSkelton";
import { Suspense } from "react";
import { getUserDialogues } from "./dialog.actions";

export default async function page() {
  const { dialogues } = await getUserDialogues();

  if (!dialogues) {
    return <div>Error retrieving dialogs</div>;
  }
  return (
    <div className="min-h-scree">
      <section className="shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold ">Dialogue Gallery</h1>
        </div>
      </section>
      <div>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-wrap gap-6">
              <Suspense fallback={<DialogueThumbnailCardSkelton />}>
                {dialogues
                  .map((dialogue) => (
                    <DialogueThumbnailCard key={dialogue.id} {...dialogue} />
                  ))
                  .reverse()}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
