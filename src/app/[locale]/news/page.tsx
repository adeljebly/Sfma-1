import { createTranslator } from "next-intl";
import React from "react";
import NewsSection from "../Components/NewsSection";
import Image from "next/image";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "common",
  });

  return (
    <div className="">
      <div className="relative w-full" dir={locale === "en" ? "ltr" : "rtl"}>
        <div className=" text-white flex flex-col relative bg-[#1DAEE5D9]">
          <div className="w-full" dir={locale === "en" ? "ltr" : "rtl"}>
            <div className="absolute top-0 left-0 w-full -z-10">
              <Image
                src="/images/common/news-bg.png"
                alt="About Us"
                width={1920}
                height={1080}
                className="w-full h-52 md:h-60 lg:h-72 xl:h-80 xl:max-h-96 object-cover"
              />
            </div>
          </div>
          <div className="xl:text-start text-center container mx-auto h-52 md:h-60 lg:h-72 xl:min-h-80 flex flex-col justify-end pb-12">
            <p className="text-lg md:text-2xl lg:text-4xl font-bold">
              {t("latest_updates_title")}
            </p>
            <p className="lg:text-xl md:text-lg text-[11px] font-semibold lg:my-6 my-3">
              {t("latest_updates_description")}
            </p>
          </div>
        </div>
      </div>
      <NewsSection from_home={false} />
    </div>
  );
};

export default Page;
