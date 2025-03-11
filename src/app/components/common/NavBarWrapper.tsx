"use client";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function NavBarWrapper() {
  const pathname = usePathname();
  const bgColor = pathname.includes("/services") || pathname.includes("/dienstleistungen") ? "bg-accentLow" : "bg-lightNeutral";

  return <NavBar bgColor={bgColor} />;
}