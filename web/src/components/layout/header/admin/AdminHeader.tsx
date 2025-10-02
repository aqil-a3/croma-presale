import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderLogo } from "./Logo";

export function AdminHeader() {
  return (
    <header className="w-full bg-orange-900 px-8 flex gap-4 items-center py-2">
      <SidebarTrigger className="text-white size-12" />
      <HeaderLogo />
    </header>
  );
}
