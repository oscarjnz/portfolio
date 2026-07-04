import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-stroke bg-bg p-0.5 text-[11px] font-medium">
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={code === "es" ? "Español" : "English"}
          className={cn(
            "rounded-full px-2 py-1 uppercase transition-colors",
            lang === code
              ? "bg-stroke/70 text-text-primary"
              : "text-muted hover:text-text-primary",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
