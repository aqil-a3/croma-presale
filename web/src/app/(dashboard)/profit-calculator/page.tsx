import ProfitCalculatorTemplate from "@/components/templates/dashboard/ProfitCalculatorTemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Profit Calculator"
}

export default function ProfitCalculatorPage(){
    return <ProfitCalculatorTemplate />
}