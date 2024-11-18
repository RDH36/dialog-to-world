import { getPublicDialog } from "@/app/dashboard/dialogue/dialog.actions";
import DialogInfo from "@/components/feature/dialog-info/DialogInfo";
import { DialogHeader } from "@/components/feature/header/Header";
import { LanguageTabs } from "@/components/language-tabs-no-card";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export const revalidate = 60;

export default async function page({ params }: { params: Params }) {
  const { slug } = await params;
  const datas = await getPublicDialog(slug);
  if (!datas.dialog || !datas.dialog.vocabulary) {
    return notFound();
  }
  const dialoguedata = JSON.parse(datas.dialog?.content);
  const vocabularyData = JSON.parse(datas.dialog?.vocabulary);
  return (
    <div className="p-6">
      <DialogHeader
        title={datas.dialog.title}
        imageCover={datas.dialog.imageCover}
        access={datas.dialog.access}
        slug={slug}
        isPublic
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
    </div>
  );
}
