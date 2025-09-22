import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fontPoppins } from "@/config/fonts";
import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="relative">
      <Input
        placeholder="Search Your Transaction Here"
        className={`${fontPoppins.className} text-[#B7B7B7] border-gray-600 w-[400px]`}
      />
      <Button variant={"ghost"} size={"icon"} className="text-[#B7B7B7] absolute right-0 top-0" >
        <Search />
      </Button>
    </div>
  );
}
