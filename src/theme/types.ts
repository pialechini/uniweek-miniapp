import { defaultTheme } from "@/theme/defaultTheme";

export type Theme = typeof defaultTheme;
export type ThemeColor = keyof typeof defaultTheme.colors;
