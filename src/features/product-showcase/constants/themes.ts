import type { JuiceId } from "@/types/juice";
import type { JuiceTheme } from "../types";

export const juiceThemes: Record<JuiceId, JuiceTheme> = {
  lemonGinger: {
    mainBgColor: "#82AF38",
    blurColor: "#E5F985",
    textColor: "#ffffff",
    accentColor: "rgba(255, 255, 255, 0.92)",
    buttonBgColor: "#ffffff",
    buttonTextColor: "#82AF38",
  },
  blueberryAcai: {
    mainBgColor: "#385dd2",
    blurColor: "#B6B6F9",
    textColor: "#ffffff",
    accentColor: "rgba(255, 255, 255, 0.92)",
    buttonBgColor: "#ffffff",
    buttonTextColor: "#385dd2",
  },
  mangoBurst: {
    mainBgColor: "#FFA500",
    blurColor: "#FFF3B6",
    textColor: "#222",
    accentColor: "rgba(34, 34, 34, 0.78)",
    buttonBgColor: "#ffffff",
    buttonTextColor: "#FFA500",
  },
  raspberryRose: {
    mainBgColor: "#FF6B81",
    blurColor: "#FFD6DE",
    textColor: "#ffffff",
    accentColor: "rgba(255, 255, 255, 0.92)",
    buttonBgColor: "#ffffff",
    buttonTextColor: "#FF6B81",
  },
};

export const DEFAULT_JUICE_ID: JuiceId = "lemonGinger";
