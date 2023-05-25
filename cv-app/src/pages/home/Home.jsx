import React, { useState } from "react";
import "./home.css";
import "../../components/header/header.css";
import Identity from "../../components/cv/Indentity";
import Studies from "../../components/cv/Studies";
import Experience from "../../components/cv/Experience";
import Characteristics from "../../components/cv/Characteristics";
import Aptitude from "../../components/cv/Aptitude";
import { useSelector } from "react-redux";
import Developpement from "../developpement/Developpement";
import arrow from "../../assets/down.png";

export default function Home() {
  const [show, setShow] = useState(false);
  const [topArrow, setTopArrow] = useState(false);
  const toggle = () => {
    setShow(!show);
    setTopArrow(!topArrow);
  };

  const { t } = useSelector((state) => state.langReducer);

  const Fr = window.location.href.includes("/fr");
  const En = window.location.href.includes("/en");
  const Ro = window.location.href.includes("/ro");

  let source;

  Fr && (source = "https://boogysh.github.io/cv-file/cv-buga-victor-fr.pdf");
  En && (source = "https://boogysh.github.io/cv-file/cv-buga-victor-en.pdf");
  Ro && (source = "https://boogysh.github.io/cv-file/cv-buga-victor-ro.pdf");

  return (
    <main className="main-home main-scroll">
      <div className="new_title_container">
        <h2 className="new_title">New</h2>
        <img
          onClick={() => toggle()}
          src={arrow}
          className={topArrow ? "arrow_content rotate" : "arrow_content"}
          alt="arrow"
        />
      </div>
      <section className="new_home">
        {show && (
          <div>
            <h2 className="new_title">New Projects</h2>
            <Developpement />
          </div>
        )}
      </section>
      <section className="section_home">
        <div className="h1-home_container">
          <h1 className="h1-home">Curriculum Vitae</h1>

          {/* <a href="https://boogysh.github.io/cv-file/CV-Buga-Victor.docx"> */}
          <a href={source} target="blank">
            <button className="home_btn">{t.download}</button>
          </a>
        </div>

        <Identity />
        <Studies />
        <Experience />
        <Characteristics />
        <Aptitude />
      </section>
    </main>
  );
}
