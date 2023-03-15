import ListPictures from "../../components/listPictures/ListPictures";
import Dropdown from "../../components/dropdown/Dropdown";
import "./oneProject.css";
import "../../components/header/header.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function OneProject() {
  const { t } = useSelector((state) => state.langReducer);
  const { id } = useParams();
  const hrefArch = window.location.href.includes(t.archNav);
  const hrefBat = window.location.href.includes(t.batNav);

  let data;

  hrefArch && (data = t.cardArch.find((product) => product.id === id));
  hrefBat && (data = t.cardBat.find((product) => product.id === id));

  console.log("data", data);
  const { pictures, title, info } = data;
  return (
    <main className="main_oneProjectBtm main-scroll">
      <div className="DD_wrapper">
        <Dropdown title={title} classTitle="h3_DD" content={info} />
      </div>
      <ListPictures pictures={pictures} />
    </main>
  );
}
