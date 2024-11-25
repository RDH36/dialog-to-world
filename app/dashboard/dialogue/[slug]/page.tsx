import { AiChatPopover } from "@/components/feature/chat-Ai/ai-chat-popover";
import DialogInfo from "@/components/feature/dialog-info/DialogInfo";
import { DialogHeader } from "@/components/feature/header/Header";
import { LanguageTabs } from "@/components/language-tabs-no-card";
import { notFound } from "next/navigation";
import { getDialog } from "../dialog.actions";
type Params = Promise<{ slug: string }>;

export const revalidate = 60;

export default async function page({ params }: { params: Params }) {
  const { slug } = await params;
  const datas = await getDialog(slug);
  if (!datas.dialog || !datas.dialog.vocabulary) {
    return notFound();
  }
  const dialoguedata = JSON.parse(datas.dialog?.content);
  const vocabularyData = JSON.parse(datas.dialog?.vocabulary);
  return (
    <div className="relative">
      <DialogHeader
        title={datas.dialog.title}
        imageCover={datas.dialog.imageCover}
        access={datas.dialog.access}
        slug={slug}
      />
      <DialogInfo
        createdAt={datas.dialog.createdAt}
        language={datas.dialog.language}
        level={datas.dialog.level}
        name={datas.dialog.user.name}
      />
      <LanguageTabs
        dialogueData={dialoguedata}
        vocabularyData={vocabularyData}
      />
      <AiChatPopover />
    </div>
  );
}
