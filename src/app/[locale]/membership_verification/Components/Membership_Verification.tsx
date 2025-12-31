"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";

const Membership_Verification = () => {
  const locale = useLocale();
  const t = useTranslations("membership_verification");
  const [serialNumber, setSerialNumber] = useState("");
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    if (!serialNumber.trim()) {
      setError(t("serial_required"));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}memberships/check-by-serial`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": locale || "ar",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ serial_number: serialNumber }),
        }
      );
      const data = await res.json();
      if (res.ok || data.success || data?.status == 200) {
        setVerificationData(data.data); // Assuming data.data contains the response
      } else {
        setError(data.message || t("verification_failed"));
      }
    } catch (err) {
      console.error("Error verifying membership:", err);
      setError(t("verification_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="container mx-auto lg:pt-0 pt-5 lg:pb-0 pb-1"
      dir={locale === "en" ? "ltr" : "rtl"}
    >
      <p className="text-[var(--main)] text-center lg:text-3xl text-xl font-bold mt-10">
        {t("membership_verification")}
      </p>
      <p className="text-[#555555] text-center mx-auto mt-2 leading-7 lg:text-base text-[13px] mb-4">
        {t("enter_serial_instruction")}
      </p>
      <div className="bg-[#F6F6F6] lg:w-fit mx-auto lg:py-7 py-3 lg:px-20 px-4 rounded-lg">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="certificate-input"
            className="font-semibold lg:text-lg text-[14px]"
          >
            {t("enter_membership_number")}
          </label>
          <div className="lg:min-w-[600px] w-[97%] flex mx-auto justify-between items-center gap-3">
            <input
              id="certificate-input"
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="bg-[#DFDFDF] outline-0 border-[1px] border-[#EDEDED] px-2 lg:py-3 py-[6px] rounded-lg w-full lg:text-base text-[13px]"
            />
            <div
              onClick={handleVerify}
              className={`cursor-pointer hover:opacity-85 bg-gradient-to-r from-[var(--main_gradiant)] to-[var(--main)] w-fit min-w-[170px] text-white lg:px-12 px-6 lg:py-3 py-[6px] rounded-lg font-semibold lg:text-base text-[12px] text-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? t("verifying") : t("verify_button")}
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-center lg:mt-2 lg:text-[18px] text-[13px]">
              {error}
            </p>
          )}
        </div>

        {verificationData && (
          <div className="bg-[#61B8A03D] mt-6 rounded-lg p-4 font-bold lg:text-[14px] text-[12px] lg:leading-7 leading-[22px]">
            <p>{t("valid_certificate")}</p>
            <p>
              {t("name")}: {verificationData?.membership_name || "N/A"}
            </p>
            <p>
              {t("membership_user_name")}: {verificationData.user_name || "N/A"}
            </p>
            <p>
              {t("membership_expire")}:{" "}
              {verificationData.remaining_days || "N/A"}
            </p>
            <p>
              {t("issue_date")}:{" "}
              {verificationData?.enrollment_date
                ? new Date(
                    verificationData?.enrollment_date
                  ).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        )}
      </div>

      <p className="text-[#898989] text-center mx-auto mt-2 leading-7 lg:text-lg text-[13px] mb-10 font-bold">
        {t("contact_support")}{" "}
        <Link
          href="mailto:info@sfma.sa"
          className="inline-block underline text-[var(--main)] mx-3"
        >
          info@sfma.sa
        </Link>
      </p>
    </section>
  );
};

export default Membership_Verification;
