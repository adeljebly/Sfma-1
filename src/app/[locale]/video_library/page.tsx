import { createTranslator } from "next-intl";
import React from "react";
import Video_Library from "./Components/Video_Library";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  // Load translations
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Video_Library",
  });

  // // Fetch videos from API (server-side)
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}library/get-vedios`,
  //   {
  //     headers: {
  //       "Accept-Language": locale || "ar", // optional
  //     },
  //     cache: "no-store", // you can use "force-cache" if you want caching
  //   }
  // );

  // const data = await res.json();
  // const videos = data?.data || [];

  return (
    <div className="container mx-auto p-6 mt-6">
      <Video_Library
        translation={{
          title: t("title"),
        }}
        lang={locale}
        // videos={videos} // pass videos to component
      />
    </div>
  );
};

export default Page;
