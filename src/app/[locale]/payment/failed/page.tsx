"use client";
import { use } from "react";
import { XCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FailedPage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params);
  const choosed_course: any = JSON.parse(
    localStorage.getItem("choosed_course")
  );
  const choosed_workshop: any = JSON.parse(
    localStorage.getItem("choosed_workshop")
  );
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const t = useTranslations("RegistrationStatus");
  const lang = useLocale();

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center bg-white px-4 text-center"
      dir={locale === "en" ? "ltr" : "rtl"}
    >
      <div className="max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-black">
          {t("failed_title")}
        </h2>
        <p className="text-[#333] mb-6 text-sm lg:text-base">
          {t("registered_in")}
          <br />
          {source === "workshop"
            ? choosed_workshop?.title
            : `${t("course")} ${choosed_course?.title}`}
        </p>

        <div className="flex flex-col items-center text-center">
          <Link
            href={`/${lang}`}
            className=" flex items-center gap-x-3 cursor-pointer hover:opacity-85 bg-gradient-to-r from-[#7ADEC2] to-[#61B8A0] text-white font-bold py-2 px-6 rounded-md text-base lg:text-2xl"
          >
            {t("back")}
            {lang == "en" ? (
              <FaArrowRight className="text-lg" />
            ) : (
              <FaArrowLeft className="text-lg" />
            )}{" "}
          </Link>
        </div>

        {/* Buttons */}
        {/* <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/course-details">
            <button className="cursor-pointer border border-red-500 text-red-500 font-semibold px-4 py-2 rounded-md text-sm hover:bg-red-50">
              إعادة المحاولة
            </button>
          </Link>
          <Link href="/support">
            <button className="cursor-pointer bg-red-500 text-white font-semibold px-4 py-2 rounded-md text-sm hover:opacity-90">
              تواصل مع الدعم
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default FailedPage;
