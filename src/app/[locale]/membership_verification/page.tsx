import { createTranslator } from "next-intl";
import Link from "next/link";
import React from "react";
import Membership_Verification from "./Components/Membership_Verification";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "membership_verification",
  });

  return <Membership_Verification />;
};

export default Page;
