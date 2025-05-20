
import { Link, useLocation } from "react-router-dom";
import { BadgeIndianRupee, ChartBar, ChartPie, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      icon: ChartPie,
      path: "/",
    },
    {
      title: "Students",
      icon: Users,
      path: "/students",
    },
    {
      title: "Payments",
      icon: BadgeIndianRupee,
      path: "/payments",
    },
    {
      title: "Analytics",
      icon: ChartBar,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold text-white">
          <span className="text-blue-400">Edu</span>Fees
        </h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      location.pathname === item.path ? "bg-sidebar-accent" : ""
                    )}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-2">
        <div className="text-xs text-gray-400">
          College Fees Management v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
