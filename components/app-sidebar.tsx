"use client";

import {
  MessageSquare,
  MessagesSquare,
  Settings2,
  Sparkles,
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

const data = {
  navMain: [
    {
      title: "Create Dialog",
      url: "/dashboard",
      path: "/dashboard",
      icon: Sparkles,
      isActive: false,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "All Dialogs",
      url: "#",
      path: "/dialogs",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      url: "#",
      path: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
