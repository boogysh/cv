import "./architecture.css";
import "../../components/header/header.css";
import CardProject from "../../components/cardProject/CardProject";
import Banner from "../../components/banner/Banner";
import banner from "../../assets/pr-arch/front-1200.jpg";
import { useSelector } from "react-redux";

export default function Architecture() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <main className="main_architecture main-scroll">
      <Banner src={banner} title={t.archTitle} />
      <section id="cards">
        {t.cardArch.map((item) => {
          const { id, pictures, title, info } = item;

          return (
            <CardProject
              key={id}
              images={pictures}
              title={title}
              info={info}
              id={id}
            />
          );
        })}
      </section>
    </main>
  );
}
