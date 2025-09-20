import HomeTemplate from "@/components/templates/public/HomeTemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Home"
}

export default function Home() {
  return <HomeTemplate />;
}
