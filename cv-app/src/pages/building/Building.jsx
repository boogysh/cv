import React from "react";
import "./building.css";
import "../../components/header/header.css";
import CardProject from "../../components/cardProject/CardProject";
import Banner from "../../components/banner/Banner";
import banner_bat from "../../assets/pr-bat/7.png";
import { useSelector } from "react-redux";

export default function Building() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <main className="main_building main-scroll">
      <Banner title={t.batTitle} src={banner_bat} />
      <section id="cards" className="cards_bat">
        {t.cardBat.map((item) => {
          const { id, pictures, title, info } = item;
          return (
            <CardProject
              key={id}
              images={pictures}
              title={title}
              info={info}
              id={id}
            />
          );
        })}
      </section>
    </main>
  );
}
