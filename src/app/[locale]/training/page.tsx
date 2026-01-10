import { createTranslator } from "next-intl";
import React from "react";
import TrainingPage from "./Components/TrainingPage";

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
      <TrainingPage
        translation={{
          title: t("title"),
          digital_books: t("digital_books"),
          articles: t("articles"),
          research: t("research"),
          read_book: t("read_book"),
        }}
        lang={locale}
      />
    </div>
  );
};

export default Page;
