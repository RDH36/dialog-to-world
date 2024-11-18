import { Explore } from "@/components/explore-page";
import { getPublicDialogues } from "../dashboard/dialogue/dialog.actions";

export const revalidate = 60;

export default async function Explorartion() {
  const { dialogues } = await getPublicDialogues();

  if (!dialogues) {
    return <div>Error retrieving dialogs</div>;
  }

  return <Explore dialogues={dialogues} />;
}
