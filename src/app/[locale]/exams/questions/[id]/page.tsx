// app/[locale]/institutions/[id]/page.tsx

import { createTranslator } from "next-intl";
import React from "react";
import QuestionsPage from "./Components/QuestionsPage";

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;

  const t = createTranslator({
    locale,
    messages,
    namespace: "Exams",
  });

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"}>
      <QuestionsPage id={id} />
    </div>
  );
}
