import { createTranslator } from "next-intl";
import React from "react";
import CertifiedTrainers from "./Components/CertifiedTrainers";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Data_Library",
  });

  return (
    <section className="">
      <CertifiedTrainers />
    </section>
  );
};

export default Page;
