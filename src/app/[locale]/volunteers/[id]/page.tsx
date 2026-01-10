import { createTranslator } from "next-intl";
import Image from "next/image";
import ContentCard from "./Components/ContentCard";
import React from "react";
import SinglePage from "./Components/SinglePage";

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;

  const t = createTranslator({
    locale,
    messages,
    namespace: "Institutions",
  });

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}memberships/get-membership-details/${id}`,
  //   {
  //     headers: {
  //       "Accept-Language": locale || "ar",
  //     },
  //     cache: "no-store",
  //   }
  // );

  // const data = await res.json();
  // const subscription = data?.data || [];

  return <SinglePage id={id} />;
}
