import { useState, useEffect } from "react";
import "./banner.css";
import { useSelector } from "react-redux";

function Banner({ src, title }) {
  const [className, setClassName] = useState("banner_title");
  const { t } = useSelector((state) => state.langReducer);


  useEffect(() => {

    const hrefBat = window.location.href.includes(t.batNav);
    const hrefDev = window.location.href.includes(t.devNav);

    hrefDev && setClassName("banner_title_dev");
    hrefBat && setClassName("banner_title_dev");
  }, [t.batNav,t.devNav]);

  return (
    <div className="banner">
      <img className="bannerImg" src={src} alt="banner home" />
      <h1 className={className}>{title}</h1>
    </div>
  );
}
export default Banner;
