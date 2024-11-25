import { MessagesSquare } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex gap-2 items-center">
              <div className="p-1 rounded-lg  bg-gradient-to-r from-primary to-blue-500">
                <MessagesSquare width={20} height={20} className="text-white" />
              </div>
              <p className="text-xl hidden lg:block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                DW
              </p>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Learn languages naturally with AI-powered conversations.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Features</li>
              <li>Pricing</li>
              <li>Use Cases</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DW. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
