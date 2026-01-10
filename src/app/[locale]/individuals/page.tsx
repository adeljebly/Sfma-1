import { createTranslator } from "next-intl";
import React from "react";
import Individuals from "./Components/Individuals";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Individuals",
  });

  // Fetch videos from API (server-side)
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}memberships/get-memberships?type=1`,
  //   {
  //     headers: {
  //       "Accept-Language": locale || "ar", // optional
  //     },
  //     cache: "no-store", // you can use "force-cache" if you want caching
  //   }
  // );

  // const data = await res.json();
  // const subscriptions = data?.data || [];

  return (
    <div className="container mx-auto p-6 mt-6">
      <Individuals
        translation={{
          title: t("title"),
          sub_title: t("sub_title"),
          no_data_available: t("no_data_available"),
          currency: t("currency"),
          memberships_advantages: t("memberships_advantages"),
        }}
        lang={locale}
        // subscriptions={subscriptions}
      />
    </div>
  );
};

export default Page;
