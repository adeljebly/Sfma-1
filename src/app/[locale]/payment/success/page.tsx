"use client";
import { use } from "react";
import { CheckCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SuccesPage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params);
  const lang = useLocale();
  const choosed_course: any = JSON.parse(
    localStorage.getItem("choosed_course")
  );
  const choosed_exam: any = JSON.parse(localStorage.getItem("choosed_exam"));
  const choosed_workshop: any = JSON.parse(
    localStorage.getItem("choosed_workshop")
  );
  const choosed_membership: any = JSON.parse(
    localStorage.getItem("choosed_membership")
  );
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const t = useTranslations("RegistrationStatus");
  return (
    <div
      className="min-h-[85vh] flex items-center justify-center bg-white px-4 text-center"
      dir={locale === "en" ? "ltr" : "rtl"}
    >
      <div className="max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-[#61B8A0]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-black">
          {t("success_title")}
        </h2>
        <p className="text-[#333] text-base">
          {t("registered_in")}{" "}
          {source === "workshop"
            ? choosed_workshop?.title
            : source === "course"
            ? `${choosed_course?.title}`
            : source === "exam"
            ? `${choosed_exam?.title}`
            : source === "membership"
            ? `${choosed_membership?.name}`
            : "العملية بنجاح"}
        </p>
        <p className="text-[#333] mb-6 mt-1 text-base">
          {t("success_membership_sub_title")}{" "}
        </p>

        <div className="flex flex-col items-center text-center">
          <Link
            href={`/${lang}/profile`}
            className=" flex items-center gap-x-3 cursor-pointer hover:opacity-85 bg-gradient-to-r from-[#7ADEC2] to-[#61B8A0] text-white font-bold py-2 px-6 rounded-md text-base lg:text-2xl"
          >
            {t("go_to_profile")}
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
            <button className="cursor-pointer border border-[#61B8A0] text-[#61B8A0] font-semibold px-4 py-2 rounded-md text-sm hover:bg-[#f3fefc]">
              عرض هذه الدورة
            </button>
          </Link>
          <Link href="/my-courses">
            <button className="cursor-pointer bg-[var(--second_main)] text-white font-semibold px-4 py-2 rounded-md text-sm hover:opacity-90">
              عرض الدورات الخاصة بك
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SuccesPage;
