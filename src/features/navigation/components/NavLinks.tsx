"use client";
import { copy } from "@/content/copy";
import type { NavItem } from "../types";

interface NavLinksProps {
  navItems: NavItem[];
  textColor: string;
}

export default function NavLinks({ navItems, textColor }: NavLinksProps) {
  return (
    <div className="hidden md:flex gap-8">
      {navItems.map((item) => (
        <span
          key={item.id}
          className="text-[15px] tracking-wide font-medium relative group cursor-default"
          style={{ color: textColor }}
        >
          {copy.nav.items[item.id as keyof typeof copy.nav.items]}
          <span
            className="absolute start-0 bottom-0 w-0 h-px group-hover:w-full transition-all duration-300"
            style={{ backgroundColor: textColor }}
          />
        </span>
      ))}
    </div>
  );
}
