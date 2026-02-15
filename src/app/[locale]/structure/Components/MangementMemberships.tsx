"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MangementMemberships = () => {
  const lang = useLocale();
  const [content, setContent]: any = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [activeTab, setActiveTab] = useState("board");
  const t = useTranslations();

  const tabs = [
    { id: 1, name: "board", label: t("common.members_images_2") },
    { id: 2, name: "general_assembly", label: t("common.members_images_3") },
  ];

  useEffect(() => {
    const fetchSinglePath = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}members/get-members?type=${activeTab}`;
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
  }, [lang, activeTab]);

  const Card = ({ membership }) => {
    return (
      <div className="flex flex-col bg-[#F6F6F6] shadow lg:col-span-1 md:col-span-2 col-span-3 border-b-4 border-[var(--second_main)] rounded-lg px-4 pt-4 pb-5 text-center overflow-visible">
        <div className="w-32 border-2 border-[var(--second_main)] rounded-lg mx-auto -translate-y-7 shrink-0">
          <img
            src={`https://sffma.fmexcon.com/storage/${membership?.image}`}
            alt="About Us"
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg "
          />
        </div>
        <p className="text-[#555555] font-bold text-xl mt-3 -translate-y-6 shrink-0">
          {membership?.name}
        </p>
        <p className="text-[#555555] text-base mt-1 mb-4 -translate-y-6 shrink-0">
          {membership?.position}
        </p>
        <Link
          href={`/${lang}/structure/${activeTab}/${membership?.id}`}
          className="block cursor-pointer mx-auto hover:opacity-85 mt-auto shrink-0 bg-gradient-to-r from-[var(--main_gradiant)] to-[var(--main)] w-fit text-white px-4 py-[6px] rounded-lg font-semibold text-[15px]"
        >
          {t("common.learn_more")}
        </Link>
      </div>
    );
  };

  return (
    <section dir={lang == "en" ? "ltr" : "rtl"}>
      <h2 className="lg:text-3xl text-xl  font-bold text-[#1DAEE5] mb-4 text-center mt-6">
        {t("common.members_images")}
      </h2>
      <div className="flex border-gray-200 flex-wrap mb-6 justify-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 font-bold focus:outline-none rounded-md min-w-[14rem] cursor-pointer  ${
              activeTab === tab.name
                ? "bg-[#61B8A0] text-white "
                : "text-black bg-[#D9D9D9] hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
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
          {content?.map((membership, index) => (
            <Card key={membership?.id} membership={membership} />
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

export default MangementMemberships;
