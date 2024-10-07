import { FormToGenerate } from "@/components/form-generate/FormToGenerate";
import HeroBanner from "@/components/hero/HeroBanner";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center mt-10 gap-10">
      <HeroBanner />
      <FormToGenerate />
    </div>
  );
}
