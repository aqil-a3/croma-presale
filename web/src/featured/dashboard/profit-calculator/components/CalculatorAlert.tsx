import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { AlertTriangle } from "lucide-react";

export function CalculatorAlert() {
  return (
    <Alert
      variant="default"
      style={{ background: PANEL_BG }}
      className={`${fontPoppins.className} text-[#FFFFFFCC] backdrop-blur-3xl`}
    >
      <AlertTriangle />
      <AlertTitle>Disclaimer</AlertTitle>
      <AlertDescription>
        This calculator provides estimates for educational purposes only.
        Cryptocurrency investments carry significant risks and past performance
        does not guarantee future results.
      </AlertDescription>
    </Alert>
  );
}
