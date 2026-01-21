"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const ActivitiesSection = () => {
  const t = useTranslations("HomePage.ActivitiesSection");
  const lang = useLocale();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      // Try the home event endpoint first, fallback to show_on_home filter
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}sfma-events/get-home-event`;
      try {
        setLoading(true);
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Accept-Language": lang || "ar",
          },
          cache: "no-store",
        });
        const data = await res.json();
        console.log("Home event response:", data);
        const payload = data?.data;

        if (Array.isArray(payload)) {
          // Prefer `show_on_home`, then featured, then highest priority (bigger first), then first item.
          const sorted = [...payload].sort((a: any, b: any) => {
            const aHome = a?.show_on_home ? 1 : 0;
            const bHome = b?.show_on_home ? 1 : 0;
            if (aHome !== bHome) return bHome - aHome;

            const aFeatured = a?.is_featured ? 1 : 0;
            const bFeatured = b?.is_featured ? 1 : 0;
            if (aFeatured !== bFeatured) return bFeatured - aFeatured;

            const aPriority = Number(a?.priority ?? 0);
            const bPriority = Number(b?.priority ?? 0);
            if (aPriority !== bPriority) return bPriority - aPriority;

            return 0;
          });

          console.log("Selected event:", sorted[0]);
          setEvent(sorted[0] || null);
        } else if (payload && typeof payload === "object") {
          console.log("Event data:", payload);
          setEvent(payload);
        } else {
          console.log("No valid event data");
          setEvent(null);
        }
      } catch (error) {
        console.error("Error fetching featured event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvent();
  }, [lang]);

  const eventEmbedUrl = useMemo(() => {
    const url: string | undefined = event?.video_url;
    console.log("Video URL from event:", url);
    if (!url) return "";

    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0] ?? "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] ?? "";
    }

    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    console.log("Embed URL:", embedUrl);
    return embedUrl;
  }, [event?.video_url]);

  const eventDateText = useMemo(() => {
    const from = event?.date_from;
    const to = event?.date_to;
    if (!from || !to) return "";

    try {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const locale = lang === "en" ? "en-US" : "ar-EG";
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const fromText = fromDate.toLocaleDateString(locale, options);
      const toText = toDate.toLocaleDateString(locale, options);
      return fromText === toText ? fromText : `${fromText} - ${toText}`;
    } catch {
      return "";
    }
  }, [event?.date_from, event?.date_to, lang]);

  const coverImageSrc = useMemo(() => {
    const cover = event?.cover_image;
    if (!cover) return "";
    const base = process.env.NEXT_PUBLIC_URL || "";
    // Follow existing project pattern used in events list pages.
    return `${base}${cover}`;
  }, [event?.cover_image]);

  return (
    <section
      dir={lang == "en" ? "ltr" : "rtl"}
      className="bg-[#F6F6F6] pb-10 pt-8"
    >
      <h2 className="lg:text-3xl text-xl font-bold text-[#1DAEE5] lg:mb-3 mb-2 text-center">
        {t("title")}
      </h2>
      <p className="text-[#555555] text-center lg:text-base text-sm xl:mb-12 sm:mb-4 mb-2">
        {t("description")}
      </p>
      <div
        className={`flex flex-col xl:flex-row items-center container mx-auto text-start`}
        dir={lang == "en" ? "ltr" : "rtl"}
      >
        <div className="w-full md:w-8/12 xl:w-6/12">
          <h2 className="text-base sm:text-xl font-bold sm:mb-2 mb-1 leading-relaxed xl:text-start text-center">
            {loading ? "..." : event?.title ?? t("p_1")}
          </h2>

          <p className="font-semibold sm:text-lg text-[15px] xl:mb-6 mb-3 xl:text-start text-center">
            {loading ? "" : event?.sub_title ?? t("p_2")}
          </p>

          <div className="flex flex-col md:flex-row md:justify-start justify-center gap-4 xl:mb-6 mb-4">
            <div className="flex items-center sm:justify-start justify-center gap-2 bg-[var(--main)] text-white md:px-1 px-2 py-[11px] lg:w-1/2 w-full xl:mx-0 mx-auto ">
              <FaMapMarkerAlt className=" text-lg" />
              <span className="xl:text-sm text-xs ">
                {loading ? "" : event?.address ?? t("location")}
              </span>
            </div>
            <div className="flex items-center sm:justify-start justify-center gap-2 bg-[var(--main)] text-white md:px-1 px-2 py-[11px] lg:w-1/2 w-full xl:mx-0 mx-auto ">
              <FaCalendarAlt className=" text-lg" />
              <span className="xl:text-sm text-xs ">
                {loading ? "" : eventDateText || t("date")}
              </span>
            </div>
          </div>

          {!loading && event?.event_url && (
            <a
              href={event.event_url}
              className="block bg-[#013047] hover:bg-[#014b6d] text-white py-[11px] px-3 font-semibold text-center transition-all duration-300 transform hover:scale-[104%] xl:mb-0 mb-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("visit_site")}
            </a>
          )}
        </div>
        <div className="w-full sm:w-8/12 xl:w-[500px] md:h-[350px] h-[250px] mx-auto overflow-hidden rounded-lg">
          {eventEmbedUrl ? (
            <iframe
              src={eventEmbedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-lg"
              style={{ display: "block" }}
            ></iframe>
          ) : coverImageSrc ? (
            <img
              src={coverImageSrc}
              alt={event?.title ?? "event cover"}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>
      <Link
        href={`/${lang}/events`}
        className="mt-6 block cursor-pointer hover:opacity-85 bg-gradient-to-r from-[var(--main_gradiant)] to-[var(--main)] w-fit text-white lg:px-12 px-6 lg:py-3 py-[6px] rounded-lg font-semibold lg:text-base text-[12px] mx-auto"
      >
        {t("read_more")}
      </Link>
      {/* <button className="cursor-pointer flex items-center mx-auto bg-[#61B8A0] text-white py-[2px] px-[2px] pe-4 rounded-full gap-3 hover:bg-[#5d9887] transition w-fit my-4 mt-7">
        <div className="w-12 h-12 bg-[#1DAEE5] text-white flex items-center justify-center rounded-full border-2 border-white">
          {lang == "en" ? (
            <BsArrowLeft className="font-bold" />
          ) : (
            <BsArrowRight className="font-bold" />
          )}
        </div>
        <span className="text-lg font-bold text-center">{t("read_more")}</span>
      </button> */}
    </section>
  );
};

export default ActivitiesSection;
