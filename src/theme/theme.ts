import type { CSSProperties } from "react"
import { Sun, Moon, Sparkles, Skull, Snowflake, Trees, Flower2, Coffee, type LucideIcon } from "lucide-react"

export type ThemeConfig = {
    label: string
    icon: LucideIcon
    bg: string
    surface: string
    soft: string
    text: string
    muted: string
    subtle: string
    border: string
    accent: string
    accentHover: string
    warm: string
}

export const themes = {
    light: {
        label: "Claro",
        icon: Sun,
        bg: "#f8fafc",
        surface: "#ffffff",
        soft: "#f1f5f9",
        text: "#1e293b",
        muted: "#64748b",
        subtle: "#94a3b8",
        border: "#e2e8f0",
        accent: "#4f46e5",
        accentHover: "#4338ca",
        warm: "#f59e0b",
    },
    dark: {
        label: "Escuro",
        icon: Moon,
        bg: "#0f172a",
        surface: "#1e293b",
        soft: "#273449",
        text: "#f8fafc",
        muted: "#94a3b8",
        subtle: "#64748b",
        border: "#334155",
        accent: "#6366f1",
        accentHover: "#818cf8",
        warm: "#f59e0b",
    },
    midnight: {
        label: "Midnight",
        icon: Sparkles,
        bg: "#030712",
        surface: "#111827",
        soft: "#182131",
        text: "#f9fafb",
        muted: "#9ca3af",
        subtle: "#6b7280",
        border: "#1f2937",
        accent: "#38bdf8",
        accentHover: "#7dd3fc",
        warm: "#fbbf24",
    },
    dracula: {
        label: "Dracula",
        icon: Skull,
        bg: "#21222c",
        surface: "#282a36",
        soft: "#343746",
        text: "#f8f8f2",
        muted: "#bd93f9",
        subtle: "#6272a4",
        border: "#44475a",
        accent: "#ff79c6",
        accentHover: "#ff92d0",
        warm: "#ffb86c",
    },
    nord: {
        label: "Nord",
        icon: Snowflake,
        bg: "#2e3440",
        surface: "#3b4252",
        soft: "#434c5e",
        text: "#eceff4",
        muted: "#88c0d0",
        subtle: "#81a1c1",
        border: "#4c566a",
        accent: "#88c0d0",
        accentHover: "#8fbcbb",
        warm: "#ebcb8b",
    },
    emerald: {
        label: "Emerald",
        icon: Trees,
        bg: "#064e3b",
        surface: "#047857",
        soft: "#05866a",
        text: "#ecfdf5",
        muted: "#a7f3d0",
        subtle: "#6ee7b7",
        border: "#059669",
        accent: "#34d399",
        accentHover: "#6ee7b7",
        warm: "#fbbf24",
    },
    sakura: {
        label: "Sakura",
        icon: Flower2,
        bg: "#fdf2f4",
        surface: "#ffffff",
        soft: "#fce7f3",
        text: "#831843",
        muted: "#be185d",
        subtle: "#db6b98",
        border: "#fbcfe8",
        accent: "#db2777",
        accentHover: "#be185d",
        warm: "#f59e8b",
    },
    sepia: {
        label: "Sépia",
        icon: Coffee,
        bg: "#f4ebd9",
        surface: "#fdf6e3",
        soft: "#eee3ce",
        text: "#433422",
        muted: "#8c7b6c",
        subtle: "#aa9987",
        border: "#e0d5c1",
        accent: "#b45309",
        accentHover: "#92400e",
        warm: "#d97706",
    },
} as const satisfies Record<string, ThemeConfig>

export type ThemeName = keyof typeof themes

export function getThemeStyle(theme: (typeof themes)[ThemeName]): CSSProperties {
    return {
        "--bg": theme.bg,
        "--surface": theme.surface,
        "--soft": theme.soft,
        "--text": theme.text,
        "--muted": theme.muted,
        "--subtle": theme.subtle,
        "--border": theme.border,
        "--accent": theme.accent,
        "--accent-hover": theme.accentHover,
        "--warm": theme.warm,
    } as CSSProperties
}