import { createTranslator } from "next-intl";
import React from "react";
import Paths from "./Components/Paths";

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
      <Paths from_home={false} />
    </div>
  );
};

export default Page;
