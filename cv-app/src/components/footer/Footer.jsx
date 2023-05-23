import React, { useState, useEffect } from "react";
import "../footer/footer.css";
import logo_tel from "../../assets/logos/telephone.png";
import logo_gmail from "../../assets/logos/gmail.png";
import logo_linkedin from "../../assets/logos/linkedin.png";
import { useSelector } from "react-redux";

function Footer() {
  const { t } = useSelector((state) => state.langReducer);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 400);
  }, [show]);
  return (
    show && (
      <footer>
        <div className="contact_container">
          <h3 className="h3_footer">Contact:</h3>
          <div className="footer_contact_list">
            <a className="footer_contact_item" href="tel:+33753758164">
              <img className="logo_footer" src={logo_tel} alt="telephone" />
            </a>
            <a
              className="footer_contact_item"
              href="mailto:bugavictor86@gmail.com?subject=Message_Buga_Victor"
            >
              <img className="logo_footer" src={logo_gmail} alt="gmail" />
            </a>
            <a
              className="footer_contact_item"
              href="https://www.linkedin.com/in/buga-victor-540913245/"
              target="blank"
            >
              <img className="logo_footer" src={logo_linkedin} alt="linkedin" />
            </a>
          </div>
        </div>
        <h5 className="h5_footer">
          &copy; {t.footer_p1}
          <span className="h5_footer_span">v_1.14</span>
        </h5>
        <h5 className="h6_footer">
          {t.footer_p2} : <span className="h5_footer_span">23/05/2023</span>{" "}
        </h5>
      </footer>
    )
  );
}
export default Footer;
