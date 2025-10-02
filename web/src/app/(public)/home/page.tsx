import HomeTemplate from "@/components/templates/public/HomeTemplate";
import { getActivePresale } from "@/services/db/presale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const activePresale = await getActivePresale();

  return <HomeTemplate activePresale={activePresale} />;
}
