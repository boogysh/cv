import React from "react";
import "./home.css";
import "../../components/header/header.css";
import Identity from "../../components/cv/Indentity";
import Studies from "../../components/cv/Studies";
import Experience from "../../components/cv/Experience";
import Characteristics from "../../components/cv/Characteristics";
import Aptitude from "../../components/cv/Aptitude";
import { useSelector } from "react-redux";

export default function Home() {
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
      <div className="h1-home_container">
        <h1 className="h1-home">Curriculum Vitae</h1>
        {/* <a href="https://boogysh.github.io/cv-file/CV-Buga-Victor.docx"> */}
        <a href={source} target="blank">
          <button>{t.download}</button>
        </a>
      </div>
      <Identity />
      <Studies />
      <Experience />
      <Characteristics />
      <Aptitude />
    </main>
  );
}
