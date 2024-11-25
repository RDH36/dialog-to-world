import { auth } from "@/auth";
import BetaInfo from "@/components/feature/betaInfo/BetaInfo";
import Cta from "@/components/feature/cta/cta";
import Faq from "@/components/feature/faq/faq";
import { Feature } from "@/components/feature/feat/feature";
import Footer from "@/components/feature/footer/footer";
import HeroBanner from "@/components/feature/hero/HeroBanner";
import Menu from "@/components/feature/menu/Menu";
import { Work } from "@/components/feature/works/work";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard/create");
  }
  return (
    <div>
      <Menu />
      <div className="h-full w-full flex flex-col items-center mt-24 gap-5">
        <BetaInfo />
        <HeroBanner />
        <Feature />
        <Work />
        <Faq />
        <Cta />
        <Footer />
      </div>
    </div>
  );
}
