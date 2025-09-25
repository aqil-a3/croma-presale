import { Separator } from "@/components/ui/separator";
import { fontOrbitron } from "@/config/fonts";

export function PersonalInformationTitle() {
  return (
    <div className="space-y-4">
      <h3 className={`${fontOrbitron.className} text-white font-semibold text-2xl lg:text-4xl`}>Personal Information</h3>
      <Separator className="bg-gray-600 border-gray-600" />
    </div>
  );
}
