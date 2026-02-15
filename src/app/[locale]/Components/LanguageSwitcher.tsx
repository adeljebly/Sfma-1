"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Avoid hydration issues
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  if (!mounted) return null;

  const getLabelAndFlag = () => {
    return locale === "ar"
      ? { label: t("language_english"), flag: "🇺🇸" }
      : { label: t("language_arabic"), flag: "🇸🇦" };
  };

  const { label, flag } = getLabelAndFlag();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-4 right-4 z-50 bg-[var(--main)] cursor-pointer text-white px-4 py-2 rounded-full shadow-lg transition-all text-sm font-semibold flex items-center gap-2"
    >
      <span className="text-lg">{flag}</span>
      {label}
    </button>
  );
};

export default LanguageSwitcher;
