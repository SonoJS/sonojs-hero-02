"use client";
import { copy } from "@/content/copy";
import { contactLinks } from "../constants";

interface ContactMenuProps {
  themeColor: string;
  isMobile?: boolean;
}

export default function ContactMenu({ themeColor, isMobile }: ContactMenuProps) {
  return (
    <div
      className="absolute bottom-full mb-4 end-0 bg-white rounded-2xl shadow-lg overflow-hidden transform origin-bottom-right transition-all"
      style={{
        animation: "scaleIn 0.2s ease-out forwards",
        zIndex: 600,
        width: "auto",
      }}
    >
      <div className="p-3">
        <h3
          className={`font-semibold mb-2 text-center ${
            isMobile ? "text-sm" : ""
          }`}
          style={{ color: themeColor }}
        >
          {copy.contact.title}
        </h3>

        <div className="flex gap-2">
          {contactLinks.map(({ id, url, icon: Icon }) => {
            const label =
              copy.contact.links[id as keyof typeof copy.contact.links];

            return (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isMobile ? "w-10 h-10" : "w-12 h-12"
                } flex items-center justify-center rounded-full transition-opacity duration-300 hover:opacity-80`}
                style={{ backgroundColor: themeColor, color: "white" }}
                title={label}
                aria-label={label}
              >
                <Icon size={isMobile ? 20 : 24} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
