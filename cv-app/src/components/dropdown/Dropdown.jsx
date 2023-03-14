import React, { useState } from "react";
import DropDownTitle from "../dropDownTitle/dropDownTitle";
import DropDownContent from "../dropDownContent/dropDownContent";
import "./dropDown.css";
import "../dropDownTitle/dropDownTitle.css";
import "../dropDownContent/dropDownContent.css";

function DropDown({ title, content }) {
  // TOGGLE
  const [isOpen, setIsOpen] = useState(false);
  const [topArrow, setTopArrow] = useState(false);
  const toggleContent = () => {
    setIsOpen(!isOpen);
    setTopArrow(!topArrow);
  };

  return (
    <div className="dropDown_content">
      <DropDownTitle
        title={title}
        classTitle={`h3_DD`}
        toggle={toggleContent}
        topArrow={topArrow}
      />
      <DropDownContent
        isOpen={isOpen}
        content={content}
        classContent={`p_content`}
      />
    </div>
  );
}
DropDown.defaultProps = {
  content: "Content is not available",
};
export default DropDown;
