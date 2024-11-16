import BetaInfo from "@/components/feature/betaInfo/BetaInfo";
import HeroBanner from "@/components/feature/hero/HeroBanner";
import Menu from "@/components/feature/menu/Menu";
import { getAuthSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/dashboard/create");
  }
  return (
    <div className="h-full w-full flex flex-col ">
      <Menu />
      <div className="h-full w-full flex flex-col items-center mt-10 gap-5">
        <BetaInfo />
        <HeroBanner />
      </div>
    </div>
  );
}
