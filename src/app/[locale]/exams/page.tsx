import { createTranslator } from "next-intl";
import React from "react";
import TrainingPage from "./Components/ExamsPage";
import ExamsPage from "./Components/ExamsPage";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Exams",
  });

  return (
    <div className="">
      <ExamsPage />
    </div>
  );
};

export default Page;
