import type { IconType } from "react-icons";

export interface ContactLink {
  id: "website" | "github";
  url: string;
  icon: IconType;
}
