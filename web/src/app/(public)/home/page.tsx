import HomeTemplate from "@/components/templates/public/HomeTemplate";
import { apiPresale } from "@/services/db/presale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const { getActivePresale } = apiPresale;
  const activePresale = await getActivePresale();

  return <HomeTemplate activePresale={activePresale} />;
}
