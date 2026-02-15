"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { formatDate } from "@/utils/formatDate";

const SingleEvent = ({ id }) => {
  const lang = useLocale();
  const t = useTranslations("SingleEvent");
  const [content, setContent]: any = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const getEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";

    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  useEffect(() => {
    const fetchSinglePath = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}sfma-events/get-sfma-event-details/${id}`;
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

  const formatTime = (isoTime) => {
    const dateObj = new Date(isoTime);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <section className="" dir={lang == "en" ? "ltr" : "rtl"}>
      <div className="container mx-auto lg:text-start text-center">
        <h1 className="lg:text-4xl text-2xl text-[#555555] font-bold lg:mt-12 mt-8">
          {content?.title}
        </h1>
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="lg:text-lg text-base text-[#555555] mt-4">
            {content?.sub_title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-x-7 lg:justify-start justify-center">
          <div className="flex items-center justify-start gap-3 mt-2">
            <div className="w-4">
              <Image
                src="/images/logos/Date_Icon.png"
                alt="About Us"
                width={50}
                height={50}
                className="w-full h-auto translate-y-1"
              />
            </div>
            <p className=" lg:text-lg text-[12px] mt-2">
              {formatDate(content?.date_from) +
                " - " +
                formatDate(content?.date_to)}
            </p>
          </div>
          <div className="flex items-center justify-start gap-3 my-1">
            <div className="w-4">
              <Image
                src="/images/logos/location_main.png"
                alt="About Us"
                width={50}
                height={50}
                className="w-full h-auto rounded-lg translate-y-1"
              />
            </div>
            <p className=" lg:text-lg text-[12px] mt-2">{content?.address}</p>
          </div>
        </div>
        {content?.event_url && (
          <Link
            href={`${content?.event_url}`}
            target="_blank"
            className="block cursor-pointer lg:-mx-0 mx-auto lg:text-base text-[12px] hover:opacity-85 mt-4 text-center bg-gradient-to-r from-[var(--main_gradiant)] to-[var(--main)] w-fit text-white px-3 py-2 rounded-lg font-semibold"
          >
            {t("visit_official_website")}
          </Link>
        )}
      </div>
      <div className="bg-[#F6F6F6] py-8 lg:mt-10 mt-6">
        <p className="text-[var(--main)] text-center lg:text-3xl text-xl font-bold">
          {t("about_the_event")}
        </p>
        <p className="text-[#555555] text-center mx-auto mt-2 leading-7 lg:text-base text-[13px]">
          {content?.sub_title}
        </p>
        <section
          className={`flex flex-col md:flex-row items-center justify-between gap-8 container mx-auto md:pt-4 pt-2 `}
        >
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p className="text-black text-justify lg:mb-6 lg:px-6 lg:leading-8 leading-6 lg:text-base text-[13px]">
              {content?.description}
            </p>
          </div>
          <div className="lg:w-1/2 lg:p-6 w-full">
            <img
              src={`https://sffma.fmexcon.com/storage/${content?.cover_image}`}
              alt="About Us"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </section>
      </div>
      <div className="mt-8 container mx-auto">
        <ImageSlider images={content?.images} />
      </div>
      {content?.video_url && (
        <>
          <div className="container mx-auto">
            <iframe
              src={getEmbedUrl(content?.video_url)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg w-full md:w-1/2 lg:min-h-[350px] min-h-[230px] mx-auto"
              style={{ display: "block" }}
            ></iframe>
          </div>
          {content?.event_url && (
            <Link
              href={`${content?.event_url}`}
              target="_blank"
              className="block mx-auto cursor-pointer lg:text-base text-[12px] hover:opacity-85 mt-4 text-center bg-gradient-to-r from-[var(--main_gradiant)] to-[var(--main)] w-fit text-white px-3 py-2 rounded-lg font-semibold"
            >
              {t("visit_official_website")}
            </Link>
          )}
        </>
      )}
    </section>
  );
};

export default SingleEvent;
