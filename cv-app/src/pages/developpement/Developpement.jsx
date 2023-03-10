import React from "react";
// import "./developpement.css";
import "../architecture/architecture.css";
import "../building/building.css";
import "../../components/header/header.css";
import Banner from "../../components/banner/Banner";
import banner_dev from "../../assets/pr-dev/banner1_dev.png";
import CardProject from "../../components/cardProject/CardProject";
import {useSelector} from 'react-redux'

export default function Developpement() {
  
  const  {t} =
    useSelector((state) => state.langReducer);


  return  (
    <main className="main_architecture main-scroll">
      <Banner title={t.devTitle} src={banner_dev} />
      <section id="cards">
        {t.cardDev.map((item) => {
          const { id, pictures, title, info, urlProject, urlExistent } = item;
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
        })}
      </section>
    </main>
  );
}
