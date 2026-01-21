// app/[locale]/institutions/[id]/page.tsx

import { createTranslator } from "next-intl";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import EventPlanning from "./Components/EventPlanning";
import Events from "./Components/Events";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const t = createTranslator({
    locale,
    messages,
    namespace: "EventsPage",
  });

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"}>
      <div className="relative w-full" dir={locale === "en" ? "ltr" : "rtl"}>
        <div className=" text-white flex flex-col relative bg-[#1DAEE5D9]">
          <div className="w-full" dir={locale === "en" ? "ltr" : "rtl"}>
            <div className="absolute top-0 left-0 w-full -z-10">
              <Image
                src="/images/common/events_bg_2.jpg"
                alt="About Us"
                width={1920}
                height={1080}
                className="w-full h-52 md:h-60 lg:h-72 xl:h-80 xl:max-h-96 object-cover"
              />
            </div>
          </div>
          <div className="container mx-auto h-52 md:h-60 lg:h-72 xl:min-h-80 flex flex-col justify-end">
            <p className="text-lg md:text-2xl lg:text-4xl font-bold ">
              {t("title")}
            </p>
            <p className="lg:text-xl md:text-lg text-[11px] font-semibold lg:my-6 my-3">
              {t("description")}
            </p>
            <div className="flex gap-4 mb-10">
              <Link href={`/${locale}/events/all`} className="inline-block">
                <div className="bg-white w-fit text-[var(--main)] font-bold lg:p-2 p-1 text-md rounded-lg mb-[18px] mt-[2px] border-2 border-white text-[10px] md:text-[14px] transition-all duration-300  hover:scale-105">
                  {t("explore_button")}
                </div>
              </Link>
              <Link href="mailto:example@sfma.org" className="inline-block">
                <div className="bg-transparent w-fit text-white font-bold lg:p-2 p-1 text-md rounded-lg mb-[18px] mt-[2px] border-2 border-white text-[10px] md:text-[14px] transition-all duration-300 hover:border-[var(--main)] hover:bg-white hover:text-[var(--main)] hover:scale-105">
                  {t("request_button")}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <EventPlanning />
      <Events />
    </div>
  );
}
