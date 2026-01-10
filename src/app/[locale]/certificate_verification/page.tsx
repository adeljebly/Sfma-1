import { createTranslator } from "next-intl";
import Link from "next/link";
import React from "react";
import Certificate_Verification from "./Components/Certificate_Verification";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "certificate_verification",
  });

  return <Certificate_Verification />;
};

export default Page;
