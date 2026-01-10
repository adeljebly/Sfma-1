import { createTranslator } from "next-intl";
import React from "react";
import PaymentPage from "./Components/PaymentPage";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Volunteers",
  });

  // Fetch videos from API (server-side)
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}memberships/get-memberships?type=3`,
  //   {
  //     headers: {
  //       "Accept-Language": locale || "ar",
  //     },
  //     cache: "no-store",
  //   }
  // );

  // const data = await res.json();
  // const subscriptions = data?.data || [];

  return (
    <div className="container mx-auto p-6 mt-6">
      <PaymentPage />
    </div>
  );
};

export default Page;
