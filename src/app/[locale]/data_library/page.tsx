import { createTranslator } from "next-intl";
import React from "react";
import Data_Library from "./Components/Data_Library";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Data_Library",
  });

  return (
    <div className="container mx-auto p-6 mt-6">
      <Data_Library
        translation={{
          title: t("title"),
          digital_books: t("digital_books"),
          articles: t("articles"),
          research: t("research"),
          read_book: t("read_book"),
          show_blog: t("show_blog"),
        }}
        lang={locale}
      />
    </div>
  );
};

export default Page;
