// app/[locale]/institutions/[id]/page.tsx

import { createTranslator } from "next-intl";
import React from "react";
import SingleNew from "./Components/SingleNew";

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;

  const t = createTranslator({
    locale,
    messages,
    namespace: "Paths",
  });

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}library/get-book/${id}`,
  //   {
  //     headers: {
  //       "Accept-Language": locale || "ar",
  //     },
  //     cache: "no-store",
  //   }
  // );

  // const data = await res.json();
  // const single_book = data?.data || {};

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"}>
      <SingleNew id={id} />
    </div>
  );
}
