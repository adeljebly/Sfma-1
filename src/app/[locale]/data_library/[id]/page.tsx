// app/[locale]/institutions/[id]/page.tsx

import { createTranslator } from "next-intl";
import React from "react";
import Single from "./Components/Single";

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;

  const t = createTranslator({
    locale,
    messages,
    namespace: "Data_Library",
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
      <Single
        translation={{
          read_book: t("read_book"),
          show_book: t("show_book"),
        }}
        id={id}
      />
    </div>
  );
}
