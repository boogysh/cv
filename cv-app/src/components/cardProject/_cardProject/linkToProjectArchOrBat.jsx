import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// export default function LinkToProjectArchOrBat(props) {
export default function LinkToProjectArchOrBat({uri,id,show_shareList,show_newCommentAndLastTwo,title, info}) {
  return (
    <Link to={`/${uri}/${id}`} className="card__link">
      <div
        className={
          show_shareList || show_newCommentAndLastTwo
            ? "card_content_container remove_border_bottom_right"
            : "card_content_container"
        }
      >
        <div className="card_bg_hover">
          <h2>Découvrir le projet...</h2>
        </div>
        <div className="card_content">
          <h2 className="card_title">{title}</h2>
          <ul>
            {info.map((item) => (
              <li key={uuidv4()}>
                <span className="span_li">✅</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
