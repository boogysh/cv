import React, { useState } from "react";
import DropDownTitle from "../dropDownTitle/dropDownTitle";
import "./dropDown.css";
import "../dropDownTitle/dropDownTitle.css";
import "../dropDownContent/dropDownContent.css";

// function DropDown2({ title, children }) {
//   // TOGGLE
//   const [isOpen, setIsOpen] = useState(false);
//   const [topArrow, setTopArrow] = useState(false);
//   //   const [show, setShow] = useState(false);

//   const toggleContent = () => {
//     setIsOpen(!isOpen);
//     setTopArrow(!topArrow);
//   };

//   return (
//     <div className="dropDown_content">
//       <DropDownTitle
//         title={title}
//         classTitle={`h3_DD`}
//         toggle={toggleContent}
//         topArrow={topArrow}
//       />
//       {isOpen && children}
//     </div>
//   );
// }

// export default DropDown2;



const DropDown2 = (props) => {
  // TOGGLE
  const [isOpen, setIsOpen] = useState(false);
  const [topArrow, setTopArrow] = useState(false);
  //   const [show, setShow] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
    setTopArrow(!topArrow);
  };
  return (
    <div className="dropDown_content">
    <DropDownTitle
      title={props.title}
      classTitle={`h3_DD`}
      toggle={toggleContent}
      topArrow={topArrow}
    />
    {isOpen && props.children}
  </div>
  )
}

export default DropDown2
