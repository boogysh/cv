import React from "react";
import "./lang.css"
import { useDispatch } from "react-redux";

export default function LangSelect() {
  const dispatch = useDispatch();
  const langChange = () => {
    const el = document.getElementById("lang-change");
    el.value === "fr" && dispatch({ type: "FR" });
    el.value === "en" && dispatch({ type: "EN" });
    el.value === "ro" && dispatch({ type: "RO" });
    // el.value === "ru" && dispatch({ type: "RU" });
  };

  return (
    <>
      <select className="langSelect" onChange={langChange} id="lang-change">
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="ro">RO</option>
        {/* <option value="ru">RU</option> */}
      </select>
    </>
  );
}
