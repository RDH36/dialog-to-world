import { DialogueForm } from "@/components/dialogue-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Page() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Let's Create amaizing Dialogue</CardTitle>
        <CardDescription>Customize your dialogue parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <DialogueForm />
      </CardContent>
    </Card>
  );
}
