import { useState, useEffect, useRef } from "react"
import { themes, type ThemeName } from "@/theme/theme"
import { useTheme } from "@/contexts/ThemeContext"

type ThemeSelectorProps = {
  theme?: ThemeName
  onThemeChange?: (theme: ThemeName) => void
}

export default function ThemeSelector(props: ThemeSelectorProps) {
  const context = useTheme()
  const theme = props.theme ?? context.theme
  const onThemeChange = props.onThemeChange ?? context.setTheme
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentTheme = themes[theme]
  const CurrentIcon = currentTheme.icon

  const themeEntries = Object.entries(themes) as [
    ThemeName,
    (typeof themes)[ThemeName],
  ][]

  const currentIndex = themeEntries.findIndex(([name]) => name === theme)
  const totalThemes = themeEntries.length

  const rotationDegrees = -currentIndex * (360 / totalThemes)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative z-50">
      <button
        type="button"
        aria-label="Escolher tema"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          h-9
          w-9
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          border-(--border)
          bg-(--surface)
          transition-colors
          hover:bg-(--soft)
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-(--accent)
        "
      >
        <CurrentIcon className="h-4 w-4" style={{ color: currentTheme.accent }} />
      </button>

      {open && (
        <div
          style={{
            transform: `translateX(-50%) rotate(${rotationDegrees}deg)`,
          }}
          className="
            absolute
            left-1/2
            top-full
            z-50
            mt-3
            h-56
            w-56
            rounded-full
            border
            border-(--border)
            bg-(--surface)
            shadow-2xl
            transition-transform
            duration-500
            ease-out
          "
        >
          {themeEntries.map(([themeName, option], index) => {
            const Icon = option.icon
            const angle =
              (index / totalThemes) * Math.PI * 2 - Math.PI / 2

            const radius = 78
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            const isSelected = theme === themeName

            return (
              <button
                key={themeName}
                type="button"
                title={option.label}
                aria-label={`Usar tema ${option.label}`}
                onClick={() => {
                  onThemeChange(themeName)
                }}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  backgroundColor: option.bg,
                  borderColor: isSelected ? option.accent : option.border,
                  /* Anula a rotação no ícone para mantê-lo sempre em pé */
                  transform: `translate(-50%, -50%) rotate(${-rotationDegrees}deg)`,
                }}
                className={`
                  absolute
                  z-50
                  flex
                  h-9
                  w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  shadow-md
                  transition-transform
                  duration-500
                  hover:scale-[1.15]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-(--accent)
                  ${
                    isSelected
                      ? "ring-2 ring-offset-2 ring-offset-(--surface)"
                      : ""
                  }
                `}
              >
                <Icon className="h-4 w-4" style={{ color: option.accent }} />
              </button>
            )
          })}

          <div
            style={{
              backgroundColor: currentTheme.bg,
              borderColor: currentTheme.border,
              transform: `translate(-50%, -50%) rotate(${-rotationDegrees}deg)`,
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              flex
              h-18
              w-18
              items-center
              justify-center
              rounded-full
              border
              shadow-inner
              transition-all
              duration-500
            "
          >
            <CurrentIcon
              className="h-7 w-7 transition-all duration-300"
              style={{ color: currentTheme.accent }}
            />
          </div>
        </div>
      )}
    </div>
  )
}