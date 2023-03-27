import React from "react";
import "../cv/cv.css";
// import myself from "../../assets/eu/eu2.png";
import myself from "../../assets/eu/me-gr-1.png";
import { useSelector } from "react-redux";



export default function Indentity() {
const { t } = useSelector((state) => state.langReducer);

  return (
    <section id="identity">
      {/* <div className="myself"></div> */}
      <h3 className="h3_cv h3_cv_identity">
      {t.identity}:
      <img src={myself} alt="myself" />
        </h3>
      <div>
        <div className="container_p">
          <p className="col1">{t.lastName}:</p>
          <p className="col2">Buga</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.firstName}:</p>
          <p className="col2">Victor </p>
        </div>
        <div className="container_p">
          <p className="col1">{t.birthDay}:</p>
          <p className="col2">10/05/1986 </p>
        </div>
        <div className="container_p">
          <p className="col1">{t.birthPlace}:</p>
          <p className="col2">Gura Bicului</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.countryOfBirth}:</p>
          <p className="col2">{t.country}</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.nationalities}:</p>
          <p className="col2">{t.nationalities_val}</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.ssNumber}</p>
          <p className="col2">1 86 05 99 151 027</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.adress}:</p>
          <p className="col2">2B rue Jean Becquerel, 77300 Fontainebleau</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.tel}:</p>
          <p>07 53 75 81 64</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.email}:</p>
          <p className="col2">bugavictor86@gmail.com</p>
        </div>
        <div className="container_p">
          <p className="col1">{t.civilStatus}</p>
          <p className="col2">{t.civilStatus_val}</p>
        </div>
      </div>
    </section>
  );
}
