import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import logo from "../assets/goibendouma-logo.png";

import { NavLink } from "react-router-dom";

import { CgChevronDown } from "react-icons/cg";

// import defaultUser from "../assets/default-user.png";

import french from "../assets/french.png";

import english from "../assets/english.png";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoLogoDiscord } from "react-icons/io5";
import { FaWhatsappSquare, FaSkype } from "react-icons/fa";
// import { Ri24HoursLine } from "react-icons/ri";
import { VscChevronRight } from "react-icons/vsc";

import { removeUser } from "../features/userSlice";

import { addUrl } from "../features/urlSlices";

import { MdMenu } from "react-icons/md";

import { addLanguage } from "../features/languageSliceSelected";

import { Link, useLocation } from "react-router-dom";

const Navbar = ({ click, toggleArrowProfile, handleToggleArrow }) => {
  const handleRemoveUser = () => {
    try {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_CLIENT_URL}/users/${user?.user}`,
      }).then((res) => {
        console.log(res.data);
        dispatch(removeUser());
        window.location = "/";
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  const [activeClassHome, setActiveClassHome] = useState(true);
  const [activeClassSell, setActiveClassSell] = useState(false);
  const [activeClassExchange, setActiveClassExchange] = useState(false);
  const [activeClassBuySolde, setActiveClassBuySolde] = useState(false);
  const [toggleChevron, setToggleChevron] = useState(false);
  // const [toggleArrowProfile, setToggleArrowProfile] = useState(false);
  const [lang, setLang] = useState("");
  // const [profil, setProfil] = useState("");

  const location = useLocation();

  const handleToggleActiveClassName = (e) => {
    if (e.target.id === "home") {
      setActiveClassHome(true);
      setActiveClassSell(false);
      setActiveClassExchange(false);
      setActiveClassBuySolde(false);
    } else if (e.target.id === "sell-kamas") {
      setActiveClassSell(true);
      setActiveClassHome(false);
      setActiveClassExchange(false);
      setActiveClassBuySolde(false);
    } else if (e.target.id === "kamas-exchange") {
      setActiveClassExchange(true);
      setActiveClassHome(false);
      setActiveClassSell(false);
      setActiveClassBuySolde(false);
    } else if (e.target.id === "solde-buy") {
      setActiveClassBuySolde(true);
      setActiveClassHome(false);
      setActiveClassSell(false);
      setActiveClassExchange(false);
    } else {
      setActiveClassHome(true);
      setActiveClassSell(false);
      setActiveClassExchange(false);
      setActiveClassBuySolde(false);
    }
  };

  const notyFyAlertDeleteUser = () =>
    toast.info(
      <div>
        {language === "anglais" &&
          "We are sad to see you go. Are you sure you want to delete your account?"}
        {language === "francais" &&
          "Etes vous sur de vouloir supprimer votre compte? Nous sommes tristes de vous voir partir !"}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <button
            style={{
              background: "#1652f0",
              color: "#ffffff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={handleRemoveUser}
          >
            {language === "anglais" && "Yes"}
            {language === "francais" && "Oui"}
          </button>
          <button
            style={{
              background: "#cb011b",
              color: "#ffffff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            {language === "anglais" && "No"}
            {language === "francais" && "Non"}
          </button>
        </div>
      </div>
    );

  // const handleToggleArrow = () => {
  //   setToggleArrowProfile((prevToggleProfile) => !prevToggleProfile);
  // };

  const handleToggleChevron = () => {
    setToggleChevron(true);
  };

  const handleRemoveToggleChevron = () => {
    setToggleChevron(false);
  };

  const handleSelectLanguage = (e) => {
    dispatch(addLanguage(e.target.value));
    setLang(e.target.value);
  };

  const handleLogout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CLIENT_URL}/users/logout`,
      withCredentials: true,
    })
      .then(() => {
        dispatch(removeUser());
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleRemoveAccount = () => {
    notyFyAlertDeleteUser();
  };

  const handleAddUrl = (e) => {
    dispatch(addUrl(e.target.id));
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="ibytrade" />
        </Link>
      </div>
      {location.pathname === "/login" ||
        location.pathname === "/resetpassword" || (
          <div className="navbar-pages-link">
            <ul className="navbar-pages-link-link">
              <li>
                <NavLink
                  exact
                  to="/"
                  id="home"
                  value={activeClassHome}
                  onClick={handleToggleActiveClassName}
                  className={activeClassHome && "nav-active"}
                >
                  {language === "anglais" ? "Home" : "Accueil"}
                </NavLink>
              </li>
              <li>
                <a href="https://ibendouma.com/" target="__blank">
                  {language === "anglais" ? "Buy kamas" : "Acheter des Kamas"}
                </a>
              </li>
              <li
                className="sell-kamas-toggle"
                style={{
                  position: "relative",
                }}
              >
                <NavLink
                  exact
                  to={
                    language === "anglais"
                      ? "/sell-kamas-dofus"
                      : "/vendre-des-kamas-dofus"
                  }
                  id="sell-kamas"
                  value={activeClassSell}
                  onClick={handleToggleActiveClassName}
                  className={`navlink-link ${activeClassSell && "nav-active"}`}
                >
                  {language === "anglais" ? "Sell kamas" : "Vendre des Kamas"}
                </NavLink>
                <span
                  style={{
                    color: "#F4F4F4",
                    position: "absolute",
                    left: "92%",
                    top: "17%",
                    cursor: "pointer",
                    fontWeight: 900,
                  }}
                  onMouseEnter={handleToggleChevron}
                  onMouseLeave={handleRemoveToggleChevron}
                  className={`sell-kamas-icon ${
                    toggleChevron && "icon-toggle-sub"
                  }`}
                >
                  <VscChevronRight />
                </span>
                {toggleChevron && (
                  <div
                    className="sell-kamas-subnav"
                    onMouseEnter={handleToggleChevron}
                    onMouseLeave={handleRemoveToggleChevron}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "absolute",
                      top: "78%",
                      background: "#2e2e2e",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      zIndex: 99,
                      minWidth: "300px",
                    }}
                  >
                    <li>
                      <Link
                        to={
                          language === "anglais"
                            ? "/sell-kamas-dofus"
                            : "/vendre-des-kamas-dofus"
                        }
                        style={{
                          color: "#F4F4F4",
                        }}
                      >
                        Dofus
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={
                          language === "anglais"
                            ? "/sell-kamas-dofustouch"
                            : "/vendre-des-kamas-dofustouch"
                        }
                        style={{
                          color: "#F4F4F4",
                        }}
                      >
                        Dofus Touch
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={
                          language === "anglais"
                            ? "/sell-kamas-dofusretro"
                            : "/vendre-des-kamas-dofusretro"
                        }
                        style={{
                          color: "#F4F4F4",
                        }}
                      >
                        Dofus Retro
                      </Link>
                    </li>
                  </div>
                )}
              </li>
              <li>
                <NavLink
                  exact
                  to={
                    language === "anglais"
                      ? "/kamas-exchange"
                      : "/echange-de-kamas"
                  }
                  id="kamas-exchange"
                  value={activeClassExchange}
                  onClick={handleToggleActiveClassName}
                  className={activeClassExchange && "nav-active"}
                >
                  {language === "anglais" ? "Trade kamas" : "Echanges de Kamas"}
                </NavLink>
              </li>

              <li>
                <NavLink
                  exact
                  to={
                    language === "anglais"
                      ? "/sell-currencies"
                      : "/vendre-soldes"
                  }
                  id="solde-buy"
                  value={activeClassBuySolde}
                  onClick={handleToggleActiveClassName}
                  className={activeClassBuySolde && "nav-active"}
                >
                  {language === "anglais"
                    ? "Buy balances"
                    : "Vendre des soldes"}
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      {location.pathname === "/login" ||
        location.pathname === "/resetpassword" || (
          <div className="language-wrapper">
            {lang === "anglais" ? (
              <img src={english} alt="english language" />
            ) : (
              <img src={french} alt="french language" />
            )}

            <select
              className="navbar-language"
              value={lang}
              onChange={handleSelectLanguage}
              style={{
                fontSize: "10px",
              }}
            >
              <option value="francais">
                {language === "anglais" ? "French" : "Francais"}
              </option>
              <option value="anglais">
                {language === "anglais" ? "English" : "Anglais"}
              </option>
            </select>
            <span className="cg-abso">
              <CgChevronDown />
            </span>
          </div>
        )}
      {location.pathname === "/login" ||
        location.pathname === "/resetpassword" || (
          <div className="navbar-icons">
            <a
              href="https://discordapp.com/users/993596419950792724/"
              target="__blank"
            >
              <span className="navbar-icons-fa-discord">
                <IoLogoDiscord />
              </span>
            </a>
            <a href="https://wa.me/212617972929" target="__blank">
              <span className="navbar-icons-fa-whatsapp">
                <FaWhatsappSquare />
              </span>
            </a>
            <a href="skype:ilyass bendouma?chat" target="__blank">
              <span className="navbar-icons-fa-skype">
                <FaSkype />
              </span>
            </a>
            {/* <a href="javascript:void(Tawk_API.toggle())">
              <span className="navbar-icons-fa-online">
                <Ri24HoursLine />
              </span>
            </a> */}
          </div>
        )}
      {location.pathname === "/login" ||
        location.pathname === "/resetpassword" || (
          <li className="navbar-fa-user">
            <img
              src={user?.person?.profil ? user?.person?.profil : logo}
              alt="user profile"
              className="navbar-fa-user-icon"
              onClick={handleToggleArrow("non")}
            />

            {toggleArrowProfile && (
              <ul className="sub-menu-list">
                {user?.user && (
                  <>
                    <li onClick={handleAddUrl}>
                      <NavLink to="/profil" id="edit-profil">
                        {language === "anglais" ? "Profil" : "Profile"}
                      </NavLink>
                    </li>

                    <li>
                      <span
                        className="delete-account"
                        onClick={handleRemoveAccount}
                      >
                        {language === "anglais"
                          ? "Delete account"
                          : "Supprimer compte"}
                      </span>
                    </li>
                  </>
                )}
                {!user?.user && (
                  <li>
                    <NavLink to="/register">
                      {language === "anglais" ? "Sign Up" : "Inscription"}
                    </NavLink>
                  </li>
                )}
                {!user?.user && (
                  <li>
                    <NavLink to="login">
                      {language === "anglais" ? "Sign In" : "Connexion"}
                    </NavLink>
                  </li>
                )}

                {user?.user && (
                  <li
                    className="logout"
                    onClick={handleLogout}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {language === "anglais" ? "Logout" : "Déconnexion"}
                  </li>
                )}
              </ul>
            )}
          </li>
        )}
      {location.pathname === "/login" ||
        location.pathname === "/resetpassword" || (
          <span className="hamburger-menu" onClick={click}>
            <MdMenu />
          </span>
        )}

      {(location.pathname === "/login" ||
        location.pathname === "/resetpassword") && (
        <div className="logintrue">
          {" "}
          <Link
            to="/"
            style={{
              color: "#F4F4F4",
              fontSize: "22px",
            }}
          >
            ibytrade.com
          </Link>{" "}
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Navbar;
