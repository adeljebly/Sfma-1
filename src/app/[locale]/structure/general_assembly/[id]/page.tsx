import { createTranslator } from "next-intl";
import Image from "next/image";
import React from "react";
import Single from "./Components/Single";

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Data_Library",
  });

  return (
    <section
      className="container mx-auto p-6 mt-6"
      dir={locale == "en" ? "ltr" : "rtl"}
    >
      <Single id={id} />
    </section>
  );
}
