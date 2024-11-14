import { Dialog } from "@/components/dialogGenereted/DialogueGenereted";
import jsPDF from "jspdf";
export type DownloadPdfButtonProps = {
  dialogue: Dialog[];
  creator: {
    prompt: string;
    model: string;
    language: string;
    level: string;
  } | null;
};

export default function generatePDF(
  dialogue: Dialog[],
  creator: DownloadPdfButtonProps["creator"]
) {
  const doc = new jsPDF();

  // Set title styles
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Language: ${creator?.language}`, 10, 10);
  doc.text(`Level: ${creator?.level}`, 10, 20);
  doc.text(`Theme: ${creator?.prompt}`, 10, 30);

  // Dialogue content

  // Set dialogue text styles
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  let yPosition = 50; // increased yPosition to add gap between title and dialogue
  dialogue.forEach((item) => {
    // Set personnage name styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14); // increased font size for personnage name
    doc.text(`${item.personnage}:`, 10, yPosition);

    // Set message text styles
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12); // increased font size for message text
    doc.setTextColor(0, 0, 0); // black color for message text

    // Split the message into lines if it's too long
    const splitText = doc.splitTextToSize(item.message, 160);
    splitText.forEach((line: string) => {
      doc.text(line, 30, yPosition);
      yPosition += 9; // move down the line for each entry
    });

    yPosition += 10; // additional space between dialogues
  });

  // Save the PDF
  doc.save("dw.pdf");
}
