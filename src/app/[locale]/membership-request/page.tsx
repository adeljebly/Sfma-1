import { createTranslator } from "next-intl";
import React from "react";
import MembershipRequestPage from "./Components/MembershipRequestPage";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Volunteers",
  });

  return (
    <div className="container mx-auto p-6 mt-6">
      <MembershipRequestPage />
    </div>
  );
};

export default Page;
