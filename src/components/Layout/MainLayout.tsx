
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            <div className="flex justify-between">
              <SidebarTrigger 
                className="bg-white hover:bg-gray-100 text-blue-600 p-2 rounded-lg shadow-sm mb-4 lg:hidden"
              />
            </div>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
