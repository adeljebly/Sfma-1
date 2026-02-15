"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CertifiedTrainers = () => {
  const lang = useLocale();
  const [content, setContent]: any = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const fetchSinglePath = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}courses/get-instructors`;
      try {
        setLoadingContent(true);
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Accept-Language": lang || "ar",
          },
          cache: "no-store",
        });
        const data = await res.json();
        setContent(data?.data || {});
        setLoadingContent(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingContent(false);
      }
    };

    fetchSinglePath();
  }, [lang]);

  const getTrainerName = (user: any) => {
    if (lang === "en") {
      return user?.full_name_en || user?.name;
    }
    return user?.full_name_ar || user?.name;
  };

  const Card = ({ trainer }) => {
    return (
      <div className="bg-[#F6F6F6] shadow lg:col-span-1 md:col-span-2 col-span-3 border-b-4 border-[var(--second_main)] rounded-md px-4 text-center">
        <div className="w-fit border-2 border-[var(--second_main)] rounded-md mx-auto -translate-y-8">
          <img
            src={`${process.env.NEXT_PUBLIC_URL}${trainer?.user?.avatar}`}
            alt="About Us"
            width={500}
            height={500}
            className="w-24 h-24 object-cover rounded-md "
          />
        </div>
        <p className="text-[#555555] font-bold text-xl my-3 -translate-y-7">
          {getTrainerName(trainer?.user)}
        </p>
        <Link
          href={`/${lang}/certified_trainers/${trainer?.id}`}
          className="block cursor-pointer mx-auto hover:opacity-85 -translate-y-7 bg-gradient-to-r from-[var(--main_gradiant)] to-[var(--main)] w-fit text-white px-4 py-[6px] rounded-lg font-semibold text-[15px]"
        >
          {t("common.learn_more")}
        </Link>
      </div>
    );
  };

  return (
    <section dir={lang == "en" ? "ltr" : "rtl"}>
      <div className="relative" dir={lang == "en" ? "ltr" : "rtl"}>
        <Image
          src="/images/training/banner_bg.png"
          alt="About Us"
          width={500}
          height={500}
          className="w-full object-cover min-h-52 md:h-60 lg:h-72 xl:h-80 xl:max-h-96"
        />
        <div className="absolute top-1/2 left-1/2 -translate-1/2 lg:px-20 px-3 lg:py-5 py-3 lg:text-[24px] text-[14px] font-semibold md:leading-[3rem] leading-relaxed text-white text-center w-full container mx-auto">
          <p className="lg:text-4xl text-xl font-bold">
            {t("certified_trainers.title")}
          </p>
          <p className="lg:text-xl text-sm font-semibold lg:mt-6 mt-4 lg:leading-10 lg:max-w-2/3 mx-auto">
            {t("certified_trainers.sub_title")}
          </p>
        </div>
      </div>
      {loadingContent ? (
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-[#F6F6F6] p-4 rounded-lg shadow-md w-64 text-center animate-pulse"
            >
              <div className="bg-[#EDEDED] text-white font-bold text-lg rounded-lg p-20 relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-white/30" />
                </div>
              </div>
              <div className="mt-4 h-4 bg-gray-300 rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : content?.length ? (
        <div className="grid grid-cols-3 gap-x-8 gap-y-16 container mx-auto lg:mt-24 mt-16 mb-12">
          {content?.map((trainer, index) => (
            <Card key={trainer?.id} trainer={trainer} />
          ))}
        </div>
      ) : (
        <p className="text-center lg:text-3xl text-2xl lg:mt-16 mt-8">
          {t("common.no_image")}
        </p>
      )}
    </section>
  );
};

export default CertifiedTrainers;
