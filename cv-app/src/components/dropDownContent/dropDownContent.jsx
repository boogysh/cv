import React from 'react'
import './dropDownContent.css'



function DropDownContent({ content, classContent, isOpen }) {
  return (
    // <div className={`body_content ${display}`}>
    <div className={isOpen? "body_content" : "body_content hidden"}>
      {Array.isArray(content) ? (
        <ul className="list_content">
          {content.map((item, index) => (
            <li key={index} className={classContent}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className={classContent}>{content}</p>
      )}
    </div>
  )
}
export default DropDownContent