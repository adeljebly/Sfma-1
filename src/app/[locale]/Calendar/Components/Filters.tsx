"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useLocale, useTranslations } from "next-intl";

const Filters = ({ onChange }) => {
  const t = useTranslations();
  const lang = useLocale();
  const [paths, setPaths] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}courses/get-courses-category`;

      try {
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Accept-Language": lang || "ar",
          },
          cache: "no-store",
        });

        const data = await res.json();
        setPaths(data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCourses();
  }, [lang]);

  const categories = [
    { value: "courses", label: t("categories.training_courses") },
    { value: "workshop", label: t("categories.workshops") },
  ];

  const attendance_state = [
    { value: "hybrid", label: t("attendance_state.both") },
    { value: "offline", label: t("attendance_state.in_person") },
    { value: "online", label: t("attendance_state.online") },
  ];

  const cities = [
    { value: "all_cities", label: t("cities.all_cities") },
    { value: "Riyadh", label: t("cities.riyadh") },
    { value: "Jeddah", label: t("cities.jeddah") },
    { value: "Dammam", label: t("cities.dammam") },
  ];

  const [filters, setFilters] = useState({
    category: "",
    path: "",
    attendance: "",
    city: "",
  });

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  return (
    <section className="container mx-auto mt-8 ">
      <div className="flex flex-wrap gap-x-3 justify-center mt-7 mb-3 lg:gap-y-0 gap-y-6">
        <Select
          options={categories}
          placeholder={t("placeholders.category")}
          onChange={(option) =>
            setFilters((prev) => ({ ...prev, category: option?.value || "" }))
          }
          className="md:w-[24%] w-full z-40"
          isClearable
        />
        <Select
          options={attendance_state}
          placeholder={t("placeholders.attendance")}
          onChange={(option) =>
            setFilters((prev) => ({ ...prev, attendance: option?.value || "" }))
          }
          className="md:w-[24%] w-full z-40"
          isClearable
        />
        <Select
          options={cities}
          placeholder={t("placeholders.city")}
          onChange={(option) =>
            setFilters((prev) => ({ ...prev, city: option?.value || "" }))
          }
          className="md:w-[24%] w-full z-40"
          isClearable
        />
        <Select
          options={paths}
          placeholder={t("placeholders.path")}
          onChange={(option: any) =>
            setFilters((prev) => ({ ...prev, path: option?.id || "" }))
          }
          className="md:w-[24%] w-full z-40"
          isClearable
          getOptionLabel={(option: any) => option.title}
          getOptionValue={(option: any) => option.id}
        />
      </div>
    </section>
  );
};

export default Filters;
