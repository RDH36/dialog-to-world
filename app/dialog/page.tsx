import DialogueGenereted from "@/components/dialogGenereted/DialogueGenereted";
import NewDialog from "@/components/dialogGenereted/NewDialog";
import DialogInfo from "@/components/dialogInfo/DialogInfo";
import SaveButton from "@/components/saveButton/SaveButton";
import { getAuthSession } from "@/lib/auth/auth";
import { Save } from "lucide-react";

export default async function page() {
  const session = await getAuthSession();
  return (
    <div className="flex flex-col gap-2 justify-center items-center w- p-4">
      <div className="flex justify-between w-full lg:w-[750px]">
        <div>
          <DialogInfo session={session} />
        </div>
        <div className="flex gap-2 self-end">
          {session?.user && (
            <SaveButton
              session={session}
              title="save"
              icon={<Save className="h-4 w-4" />}
            />
          )}
          <NewDialog session={session} />
        </div>
      </div>
      <DialogueGenereted />
    </div>
  );
}
