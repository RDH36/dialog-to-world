"use client";

import {
  MessageSquare,
  MessagesSquare,
  Send,
  Sparkles,
  Telescope,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";

const data = {
  navMain: [
    {
      title: "Create",
      url: "/dashboard/create",
      path: "/create",
      icon: Sparkles,
      isActive: false,
    },
    {
      title: "Dialogues",
      url: "/dashboard/dialogue",
      path: "/dialogue",
      icon: MessageSquare,
    },
    {
      title: "Explore",
      url: "/explore",
      path: "/explore",
      icon: Telescope,
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export type AppSidebarProps = {
  name: string | null;
  email: string | null;
  avatar: string | null;
};

export function AppSidebar({
  name,
  email,
  avatar,
  ...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  const user = {
    name,
    email,
    avatar,
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-500">
                  <MessagesSquare
                    width={20}
                    height={20}
                    className="text-white"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DW</span>
                  <span className="truncate text-xs">Application</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
