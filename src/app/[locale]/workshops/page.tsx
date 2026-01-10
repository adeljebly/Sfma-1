import { createTranslator } from "next-intl";
import React from "react";
import WorkshopPage from "./Components/WorkshopPage";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Training",
  });

  return (
    <div className="">
      <WorkshopPage />
    </div>
  );
};

export default Page;
