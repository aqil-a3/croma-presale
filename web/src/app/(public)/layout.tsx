import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/header/public";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | Cromachain Presale",
    default: "Cromachain Presale",
  },
  description:
    "The world's most advanced Layer 2 solution combining AI-powered development, quantum-resistant security, and lightning-fast performance.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
        <Toaster position="top-center" richColors={true} />
        <Footer />
      </body>
    </html>
  );
}
