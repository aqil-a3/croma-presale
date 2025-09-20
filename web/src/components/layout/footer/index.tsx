"use client";
import { Credits } from "./Credits";
import { Staytuned } from "./StayTuned";

export default function Footer() {
  return (
    <footer className="py-12 bg-black/90">
      <Staytuned />
      <Credits />
    </footer>
  );
}
