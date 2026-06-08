import { cn } from "@/lib/utils";

interface ThaiTextProps {
  thai: string;
  romanization?: string;
  translation?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  showRomanization?: boolean;
  showTranslation?: boolean;
}

const sizeMap = {
  sm: { thai: "text-lg", roman: "text-xs", trans: "text-xs" },
  md: { thai: "text-2xl", roman: "text-sm", trans: "text-sm" },
  lg: { thai: "text-4xl", roman: "text-base", trans: "text-base" },
  xl: { thai: "text-6xl", roman: "text-lg", trans: "text-base" },
  "2xl": { thai: "text-8xl", roman: "text-xl", trans: "text-lg" },
};

export function ThaiText({
  thai,
  romanization,
  translation,
  size = "md",
  className,
  showRomanization = true,
  showTranslation = true,
}: ThaiTextProps) {
  const sizes = sizeMap[size];
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <span className={cn("thai-text font-bold text-gray-900", sizes.thai)}>{thai}</span>
      {showRomanization && romanization && (
        <span className={cn("text-orange-500 font-medium", sizes.roman)}>{romanization}</span>
      )}
      {showTranslation && translation && (
        <span className={cn("text-gray-500", sizes.trans)}>{translation}</span>
      )}
    </div>
  );
}
