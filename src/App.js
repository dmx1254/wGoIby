import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import {
  BackDrop,
  Footer,
  MyBalances,
  MyExchanges,
  MySales,
  Navbar,
  ResetPassword,
  SideDrawer,
  Signin,
  Signup,
} from "./components";
// import Loader from "./components/Loader";
import PaymentDescription from "./components/PaymentDescription";
import { BuySolde, Home, KamasExchange, Profil, SellKamas } from "./pages";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const [sideToggle, setSideToggle] = useState(false);
  const { language } = useSelector((state) => state.language);

  const [toggleArrowProfile, setToggleArrowProfile] = useState(false);

  const handleToggleArrow = (para) => (e) => {
    if (para === "yes") {
      setToggleArrowProfile(false);
    } else {
      setToggleArrowProfile(true);
    }
  };

  // console.log(toggleArrowProfile)

  return (
    <div className="app">
      <div>
        <Navbar
          click={() => setSideToggle(!sideToggle)}
          toggleArrowProfile={toggleArrowProfile}
          handleToggleArrow={handleToggleArrow}
        />
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <BackDrop show={sideToggle} click={() => setSideToggle(false)} />
      </div>
      {language === "anglais" ? (
        <div onClick={handleToggleArrow("yes")}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sell-kamas-dofus" element={<SellKamas />} />
            <Route path="/sell-kamas-dofustouch" element={<SellKamas />} />
            <Route path="/sell-kamas-dofusretro" element={<SellKamas />} />
            <Route path="/kamas-exchange" element={<KamasExchange />} />
            <Route path="/sell-currencies" element={<BuySolde />} />
            <Route path="/profil/mes-ventes" element={<Profil />} />
            <Route path="/profil/mes-soldes" element={<Profil />} />
            <Route path="profil/mes-echanges" element={<Profil />} />
            <Route path="/profil" element={user.user ? <Profil /> : <Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/secure-payment" element={<PaymentDescription />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      ) : (
        <div onClick={handleToggleArrow("yes")}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendre-des-kamas-dofus" element={<SellKamas />} />
            <Route
              path="/vendre-des-kamas-dofustouch"
              element={<SellKamas />}
            />
            <Route
              path="/vendre-des-kamas-dofusretro"
              element={<SellKamas />}
            />
            <Route path="/echange-de-kamas" element={<KamasExchange />} />
            <Route path="/vendre-soldes" element={<BuySolde />} />
            <Route path="/profil/mes-ventes" element={<Profil />} />
            <Route path="/profil/mes-soldes" element={<Profil />} />
            <Route path="/profil/mes-echanges" element={<Profil />} />
            <Route path="/profil" element={user.user ? <Profil /> : <Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/secure-payment" element={<PaymentDescription />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
