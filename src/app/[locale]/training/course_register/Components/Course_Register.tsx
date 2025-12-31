"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Course_Register = () => {
  const t = useTranslations("course_register");
  const lang = useLocale();
  const router = useRouter();

  const [choosed_course, setChoosedCourse] = useState<any>(null);
  const [selectedValue, setSelectedValue] = useState("offline");
  const [selectedCity, setSelectedCity] = useState("الرياض");
  const [couponCode, setCouponCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const [equalHeight, setEqualHeight] = useState("auto");

  useEffect(() => {
    if (box1Ref.current && box2Ref.current) {
      const h1 = box1Ref.current.offsetHeight;
      const h2 = box2Ref.current.offsetHeight;
      const maxHeight: any = Math.max(h1, h2);
      setEqualHeight(maxHeight);
    }
  }, []);

  // ---------------------------
  // 1) Load course safely
  // ---------------------------
  useEffect(() => {
    try {
      const stored = localStorage.getItem("choosed_course");
      if (!stored) {
        router.push(`/${lang}/courses`);
        return;
      }

      const parsed = JSON.parse(stored);
      if (!parsed || !parsed.id) {
        router.push(`/${lang}/courses`);
        return;
      }

      setChoosedCourse(parsed);
      setDiscountValue(parsed?.discounted_price || 0);
    } catch (err) {
      router.push(`/${lang}/courses`);
    }
  }, []);

  if (!choosed_course) return null;

  const auth_token: any = localStorage.getItem("auth_token");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // ---------------------------
  // 2) Coupon handler
  // ---------------------------
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error(t("coupon_applied_failed"));
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}courses/get-courses-details/${choosed_course?.id}?coupon_code=${couponCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": lang || "ar",
          },
        }
      );

      const data = await res.json();

      setChoosedCourse(data.data);
      localStorage.setItem("choosed_course", JSON.stringify(data.data));

      if (data?.data?.coupon_applied) {
        toast.success(t("coupon_applied_success"));
      } else {
        toast.error(t("coupon_applied_failed"));
      }
    } catch (err) {
      toast.error(t("coupon_applied_failed"));
    }
  };

  // ---------------------------
  // 3) Payment Data
  // ---------------------------
  const payment_data = {
    type: "course",
    relative_id: choosed_course?.id,
    payment_method: "bank_transfer",
    attendance_type: selectedValue,
    coupon_code: couponCode,
  };

  // ---------------------------
  // 4) Dynamic pricing
  // ---------------------------
  const price =
    selectedValue === "offline"
      ? choosed_course?.price
      : choosed_course?.online_price;

  const total_due = price - (choosed_course?.coupon_discount || 0);

  const courseContent = [
    { title: t("start_date"), desc: choosed_course?.date_from },
    { title: t("course_fee"), desc: `${price} ${t("currency")}` },
    {
      title: t("discount"),
      desc: `${
        choosed_course?.coupon_discount ? choosed_course?.coupon_discount : 0.0
      } ${t("currency")}`,
    },
    { title: t("total_due"), desc: `${total_due} ${t("currency")}` },
  ];

  return (
    <section>
      <div className="container mx-auto">
        <div className="mt-12 text-center">
          <h1 className="text-xl lg:text-3xl font-bold mb-4 text-[var(--main)]">
            {t("register_heading")}
          </h1>
          <h1 className="text-xl lg:text-3xl font-bold mb-4">
            {choosed_course?.title}
          </h1>
          <h3 className="text-[#737373] font-semibold text-sm lg:text-base">
            {t("register_description")}
          </h3>
        </div>

        {/* Attendance Type */}
        <div className="mt-6 lg:mb-12 mb-8">
          <h1 className="text-xl lg:text-3xl font-bold mb-6 text-[var(--main)]">
            {t("attendance_type")}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(choosed_course?.type === "offline" ||
              choosed_course?.type === "hybrid") && (
              <div
                ref={box1Ref}
                style={{ height: equalHeight }}
                className="shadow-lg p-7 bg-[#F6F6F6] w-full"
              >
                <label className="flex items-start gap-x-3 lg:gap-x-5">
                  <input
                    type="radio"
                    value="offline"
                    checked={selectedValue === "offline"}
                    onChange={handleChange}
                    className="accent-black w-5 lg:w-6 h-5 lg:h-6"
                  />
                  <div className="-translate-y-1">
                    <p className="text-base lg:text-xl font-bold">
                      {t("offline_attendance", {
                        price: choosed_course?.price,
                      })}
                    </p>
                    <div className="lg:mt-2 mt-1">
                      <p className="text-[#555555] font-semibold text-sm lg:text-lg mb-1 lg:mb-2">
                        {t("select_city")}
                      </p>
                      {choosed_course?.location?.map((city, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-x-2 lg:gap-x-3 lg:my-0 my-2"
                        >
                          <input
                            type="radio"
                            value={city}
                            checked={selectedCity === city}
                            onChange={handleCityChange}
                            className="accent-black w-4 lg:w-5 h-4 lg:h-5"
                          />
                          <p className="text-sm lg:text-lg font-bold">{city}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                </label>
              </div>
            )}

            {(choosed_course?.type === "online" ||
              choosed_course?.type === "hybrid") && (
              <div
                ref={box2Ref}
                style={{ height: equalHeight }}
                className="shadow-lg p-7 bg-[#F6F6F6] w-full"
              >
                <label className="flex items-start gap-x-3 lg:gap-x-5">
                  <input
                    type="radio"
                    value="online"
                    checked={selectedValue === "online"}
                    onChange={handleChange}
                    className="accent-black w-5 lg:w-6 h-5 lg:h-6"
                  />
                  <div className="-translate-y-1">
                    <p className="text-base lg:text-xl font-bold">
                      {t("online_attendance", {
                        price: choosed_course?.online_price,
                      })}
                    </p>
                    <p className="text-[#555555] lg:mt-2 mt-1 font-semibold text-sm lg:text-lg mb-1 lg:mb-2">
                      {t("online_note")}
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Coupon */}
        <div className="mt-6">
          <h1 className="text-base lg:text-2xl font-bold text-[var(--main)] mb-3">
            {t("discount_code")}
          </h1>
          <div className="gap-3 rounded-lg flex justify-between">
            <input
              type="text"
              className="text-[12px] md:text-lg lg:text-xl px-4 font-bold bg-[#F4F4F4] rounded-lg w-full"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="text-[14px] lg:text-2xl cursor-pointer font-bold bg-[var(--second_main)] px-4 lg:px-8 py-[6px] lg:py-3 text-white rounded-lg"
            >
              {t("apply")}
            </button>
          </div>
        </div>

        {/* Payment Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("payment_data", JSON.stringify(payment_data));
            router.push(
              `${auth_token ? `/${lang}/payment` : `/${lang}/login`}`
            );
          }}
        >
          <div className="lg:mb-8 mb-4 xl:text-xl text-[15px] mt-5 flex items-center gap-x-3">
            <input type="checkbox" id="terms_checkbox" required />
            <label htmlFor="terms_checkbox">
              {t("agree_terms")}{" "}
              <Link
                href={`/${lang}/terms`}
                className="text-[var(--main)] underline"
              >
                {t("terms_link")}
              </Link>
            </label>
          </div>

          {/* Summary */}
          <div className="mt-6">
            <div className="bg-[#F6F6F6] p-6 flex flex-col items-center gap-6 mt-6 mb-8">
              {courseContent.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#DFDFDF] lg:w-2/3 w-full gap-3 px-2 lg:px-4 py-3 lg:py-5 rounded-lg flex justify-between"
                >
                  <div className="text-[12px] md:text-lg lg:text-xl font-bold">
                    {item.title}
                  </div>
                  <div className="text-[12px] md:text-lg lg:text-xl font-bold">
                    {item.desc}
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center text-center">
                <button
                  type="submit"
                  className="cursor-pointer hover:opacity-85 bg-gradient-to-r from-[#7ADEC2] to-[#61B8A0] text-white font-bold py-3 px-6 rounded-md text-base lg:text-xl"
                >
                  {t("confirm_and_continue")}
                </button>
                <p className="text-[14px] lg:text-xl mt-3 text-[#555555]">
                  {t("note_after_payment")}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Course_Register;
