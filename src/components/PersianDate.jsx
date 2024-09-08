import moment from "moment-jalaali";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const weekDays = [
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

const yearMonth = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const PersianDate = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      let m = moment();
      let finalDate = `${weekDays[m.day()]} ${m.jDate()} ${
        yearMonth[m.jMonth()]
      } ماه ${m.jYear()}`;
      setDate(finalDate);
      setTime(moment().format("HH:mm"));
    }, 1000);
  }, []);

  return (
    <>
      {date && time ? (
        <div style={{ backgroundColor: "#d8722647" }} className="text_color">
          <span className="mb-3 d-block text-center">{date}</span>
          <span className="d-block text-center">ساعت {time}</span>
        </div>
      ) : (
        <div style={{ color: "#ff9300" }} class="spinner-grow" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};

export default PersianDate;
