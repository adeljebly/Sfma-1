import { createTranslator } from "next-intl";
import React from "react";
import PoliciesSearch from "./Components/PoliciesSearch";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "PoliciesSearch",
  });

  return (
    <div className="mt-6">
      <div className="container mx-auto p-6">
        <PoliciesSearch
          translation={{
            head: t("head"),
            search_placeholder_1: t("search_placeholder_1"),
            search_placeholder_2: t("search_placeholder_2"),
            title: t("title"),
            view_profile: t("view_profile"),
          }}
          lang={locale}
          // policies={policiesData}
        />
      </div>
    </div>
  );
};

export default Page;
