import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

export default function LinkToProjectDev(props) {
  const { t } = useSelector((state) => state.langReducer);
  return (
    <a
      href={props.urlProject}
      target="blank"
      id={props.id}
      title={props.urlProject}
      className="card__link"
    >
      <div
        className={
          props.show_shareList || props.show_newCommentAndLastTwo
            ? "card_content_container remove_border_bottom_right"
            : "card_content_container"
        }
      >
        <div className="card_bg_hover">
          <h2>{t.discoverProject}</h2>
        </div>
        <div className="card_content">
          <h2 className="card_title">{props.title}</h2>
          <h2
            href="https://github.com/boogysh/la-panthere_initial/"
            className="card_title urlExistent"
          >
            {props.urlExistent}
          </h2>

          <ul>
            {props.info.map((item) => (
              <li key={uuidv4()}>
                <span className="span_li">✅</span>
                <p className="text-description"> {item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </a>
  );
}
