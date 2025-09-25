import { fontOrbitron} from "@/config/fonts";

export function ProfileTitle() {
  return (
    <div className="relative z-10 flex justify-between items-center">
      <h1 className={`${fontOrbitron.className} font-semibold text-xl lg:text-3xl`}>Profile</h1>
    </div>
  );
}
