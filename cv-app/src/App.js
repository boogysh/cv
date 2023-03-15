import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Error404 from "./components/errors/Error404";
import Home from "./pages/home/Home";
import Architecture from "./pages/architecture/Architecture";
import Developpement from "./pages/developpement/Developpement";
import OneProject from "./pages/oneProject/OneProject";
import Building from "./pages/building/Building";
import { useSelector } from "react-redux";

function App() {
  const { t } = useSelector((state) => state.langReducer);
  return (
    // <Router basename="/cv/">
    <Router>
      <Header />
      <Routes>
        <Route index element={<Navigate replace to={t.localeNav} />} />
        <Route path={`/${t.locale}`} element={<Home />} />
        <Route path={`/${t.locale}/${t.archNav}`} element={<Architecture />} />
        <Route path={`/${t.locale}/${t.archNav}/:id`} element={<OneProject />} />
        <Route path={`/${t.locale}/${t.batNav}`} element={<Building />} />
        <Route path={`/${t.locale}/${t.batNav}/:id`} element={<OneProject />} />
         <Route path={`/${t.locale}/${t.devNav}`} element={<Developpement />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
