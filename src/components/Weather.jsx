import React, { useEffect, useRef, useState } from "react";
import PersianDate from "./PersianDate";
import { useDispatch, useSelector } from "react-redux";
import { sendWeatherRequest } from "../redux/weather/weatherSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Weather = () => {
  const inputRef = useRef();
  const { data, loading, error } = useSelector((state) => state.weather);
  const dispath = useDispatch();

  const [backMode, setBackMode] = useState("usual");
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    //هرچقدر کاربر اینتر بزنه فقط یه بار ریکوست میره در شرایط پایین
    // if (inputRef.current.value !== city) {
    //   let nowCity = inputRef.current.value;
    //   setCity(nowCity);
    //   dispath(sendWeatherRequest(nowCity));
    // }
    let nowCity = inputRef.current.value;
    setCity(nowCity);
    dispath(sendWeatherRequest(nowCity));
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!data.main) {
      return;
    }
    let temp = Math.round(data.main.temp - 273.15);
    setTemp(temp);
    if (temp <= 12) {
      setBackMode("cold");
    } else if (temp <= 24) {
      setBackMode("usual");
    } else if (temp <= 50) {
      setBackMode("warm");
    }
  }, [data]);

  function handleError() {
    toast.error(
      "یا فیلترشکن نداری یا اطلاعات این مکانو نداریم بیا دوباره امتحان کنیم",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: true,
        progress: undefined,
        theme: "light",
      }
    );

    setTimeout(() => {
      window.location.reload();
    }, 4500);
  }

  return (
    <div className={`app pt-4 container-fluid back_${backMode}`}>
      <ToastContainer />
      <div className="row justify-content-center py-3 pt-4">
        <div className="col-10 col-md-6 col-lg-4 col-xl-3">
          <form onSubmit={submitHandler}>
            <input
              ref={inputRef}
              type="text"
              className="search_input w-100 text_color placeholder_color placeholder"
              placeholder={data.main ? data.name : "نام شهر یا کشور"}
            />
          </form>
        </div>
      </div>

      <div className="row justify-content-center py-3 pt-4">
        <div className="col-11 col-md-8 col-lg-4 col-xl-3">
          <h3 className="text-center">
            <PersianDate />
          </h3>
        </div>
      </div>

      {data?.cod === 200 ? (
        <>
          <div className="row justify-content-center py-3">
            <div className="col-9 col-md-6 col-lg-4 col-xl-3">
              <div className="temprature_box pt-3">
                <span>{temp}</span> °C
              </div>
            </div>
          </div>

          <div className="row justify-content-center py-3 pt-4">
            <div className="col-11 col-md-8 col-lg-4 col-xl-3">
              <h1 className="text-center fa-3x lathin_text text_color">
                {data.weather[0].description}
              </h1>
            </div>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          {loading ? (
            <div
              style={{ color: "#ff9300" }}
              class="spinner-grow"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : !error ? (
            toast.info("لطفا نام شهر را وارد و بعد اینتر بزنید", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: { marginTop: "7rem" },
            }) && ""
          ) : (
            handleError() && ""
          )}
        </p>
      )}
    </div>
  );
};

export default Weather;
