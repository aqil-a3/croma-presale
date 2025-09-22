import MyTransactionTemplate from "@/components/templates/dashboard/MyTransactionTemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"My Transactions"
}

export default function MyTransactionPage(){
    return <MyTransactionTemplate />
}