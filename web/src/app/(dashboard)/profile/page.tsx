import ProfileTemplate from "@/components/templates/dashboard/ProfileTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage(){
    return <ProfileTemplate />
}