import React from 'react'
import arrowBottom from '../../assets/down.png'
import './dropDownTitle.css'

function DropDownTitle({ toggle, title, classTitle, topArrow }) {
  return (
    <div className="title_content" onClick={toggle}>
      <h3 className={classTitle}>{title}</h3>
        <img className={topArrow?  "arrow_content rotate" : "arrow_content"} src={arrowBottom} alt="arrow dropdown" />
    </div>
  )
}
export default DropDownTitle