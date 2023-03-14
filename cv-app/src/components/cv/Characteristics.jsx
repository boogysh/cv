import React from "react";
import "../cv/cv.css";
import { useSelector } from "react-redux";


export default function Characteristics() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <section id="characteristics">
      <h3 className="h3_cv">{t.characteristics}:</h3>
      <div>
        <div className="container_p">
          <p className="col3">
           {t.characteristics_val}
          </p>
        </div>
      </div>
    </section>
  );
}
