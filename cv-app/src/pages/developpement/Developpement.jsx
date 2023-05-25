import React, { useMemo, useState } from "react";
// import "./developpement.css";
import "../architecture/architecture.css";
import "../building/building.css";
import "../../components/header/header.css";
import Banner from "../../components/banner/Banner";
import banner_dev from "../../assets/pr-dev/banner1_dev.png";
import CardProject from "../../components/cardProject/CardProject";
import { useSelector } from "react-redux";

export default function Developpement() {
  const [uri, setUri] = useState();
  const { t } = useSelector((state) => state.langReducer);

  useMemo(() => {
    const hrefDev = window.location.href.includes(t.devNav);
    hrefDev && setUri(t.devNav);
  }, [t.devNav]);

  return (
    <main className="main_architecture main-scroll">
      {uri === t.devNav && <Banner title={t.devTitle} src={banner_dev} />}
      <section id="cards">
        {uri === t.devNav
          ? t.cardDev.map((item) => {
              const { id, pictures, title, info, urlProject, urlExistent } =
                item;
              return (
                <CardProject
                  key={id}
                  images={pictures}
                  title={title}
                  info={info}
                  id={id}
                  urlProject={urlProject}
                  urlExistent={urlExistent}
                />
              );
            })
          : t.cardDev
              .map((item) => {
                const { id, pictures, title, info, urlProject, urlExistent } =
                  item;
                return (
                  <CardProject
                    key={id}
                    images={pictures}
                    title={title}
                    info={info}
                    id={id}
                    urlProject={urlProject}
                    urlExistent={urlExistent}
                  />
                );
              })
              .slice(0, 3)}
      </section>
    </main>
  );
}
