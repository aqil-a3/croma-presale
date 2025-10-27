import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/header/public";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { FloatingContact } from "@/components/layout/FloatingContact";

export const metadata: Metadata = {
  title: {
    template: "%s | Cromachain Presale",
    default: "Cromachain Presale",
  },
  description:
    "The world's most advanced Layer 2 solution combining AI-powered development, quantum-resistant security, and lightning-fast performance.",
  verification: {
    google: "v-sqWkBQvxRQsX2MZ_yrSFKwE5qKNr9sNDetWsdhVWg",
  },
  robots: {
    index: true,
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black`}>
        <Header />
        {children}
        <Toaster position="top-center" richColors={true} />
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
