import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthButton() {
  return (
    <Button className="bg-primary text-white rounded-sm font-medium">
      <Link href="/login"> Sign in</Link>
    </Button>
  );
}
