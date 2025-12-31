"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Link from "next/link";
import { useLocale } from "next-intl";

moment.locale("en");
const localizer = momentLocalizer(moment);

const CustomCalendar = ({ filters }) => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const lang = useLocale();

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const month = moment(currentDate).month() + 1;
      const year = moment(currentDate).year();
      const params = {
        type: filters.category || "",
        month,
        year,
        location: filters.city || "",
        course_category_id: filters.path || "",
        attendance: filters.attendance || "",
      };

      const res = await axios.get(
        "https://sffma.fmexcon.com/api/v1/courses/filter-courses",
        {
          params,
          headers: {
            "Accept-Language": lang || "ar",
          },
        }
      );

      const data = res.data.data || [];

      const formattedEvents = data
        .filter((c) => c.date_from && c.date_to)
        .map((course) => ({
          id: course.id,
          title: course.title,
          start: new Date(course.date_from),
          end: new Date(course.date_to),
          allDay: true,
          course,
        }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, currentDate]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // 🎨 تصميم البادج مع منع الكسر
  const EventBadge = ({ event }) => (
    <Link
      href={`/${lang}/training/${event.id}`}
      className="group block"
      title={event.title} // ← tooltip عند المرور بالماوس
    >
      <div
        className="rounded-md shadow-md text-center px-3 py-2 text-xs sm:text-sm font-semibold 
        bg-[#0671E0] text-white hover:bg-[#1e82eb] transition-all 
        group-hover:scale-[1.05] overflow-hidden whitespace-nowrap text-ellipsis"
        style={{
          backgroundColor: "var(--second_main, #0671E0)",
          fontSize: "0.85rem",
          maxWidth: "100%", // ← مهم جدًا مع ellipsis
        }}
      >
        {event.title}
      </div>
    </Link>
  );

  return (
    <div className="rounded-2xl bg-white shadow p-4 border border-gray-200 mt-6 relative z-10">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0671E0]"></div>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        style={{ height: "75vh" }}
        components={{
          event: EventBadge,
        }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: "transparent",
            border: "none",
          },
        })}
      />
    </div>
  );
};

export default CustomCalendar;
