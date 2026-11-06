import { FaGithub, FaGlobe } from "react-icons/fa6";
import type { ContactLink } from "../types";

export const contactLinks: ContactLink[] = [
  {
    id: "website",
    url: "https://www.aniq-ui.com/en/templates",
    icon: FaGlobe,
  },
  {
    id: "github",
    url: "https://github.com/",
    icon: FaGithub,
  },
];
