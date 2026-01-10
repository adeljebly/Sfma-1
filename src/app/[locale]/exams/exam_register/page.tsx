// app/[locale]/institutions/[id]/page.tsx

import { createTranslator } from "next-intl";
import React from "react";
import Exam_Register from "./Components/Exam_Register";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;

  const t = createTranslator({
    locale,
    messages,
    namespace: "Exams",
  });

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"}>
      <Exam_Register />
    </div>
  );
}
