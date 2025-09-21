import AirdropTemplate from "@/components/templates/public/AirdropTemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Airdrop"
}

export default function AirdropPage(){
    return <AirdropTemplate />
}