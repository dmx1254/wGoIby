import React, { useState } from "react";

import { AiFillCloseSquare } from "react-icons/ai";
import { IoLogoDiscord } from "react-icons/io5";
import { BsInstagram, BsFacebook, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaSkype } from "react-icons/fa";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { NavLink } from "react-router-dom";

import logo from "../assets/goibendouma-logo.png";

const SideDrawer = ({ show, click }) => {
  const { language } = useSelector((state) => state.language);
  const [activeClassHome, setActiveClassHome] = useState(true);
  const [activeClassSell, setActiveClassSell] = useState(false);
  const [activeClassExchange, setActiveClassExchange] = useState(false);
  const [activeClassBuySolde, setActiveClassBuySolde] = useState(false);
  const sideDrawerClass = ["sidedrawer"];
  if (show) {
    sideDrawerClass.push("show");
  }
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

  return (
    <div className={sideDrawerClass.join(" ")}>
      <div className="sidedrawer-first">
        <Link to="/">
          <img src={logo} alt="ibbendouma logo" />
        </Link>
        <span className="sidedrawer-closeIcon" onClick={click}>
          <AiFillCloseSquare />
        </span>
      </div>
      <div className="sidedrawer-second">
        <ul>
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
          <li>
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
              className={activeClassSell && "nav-active"}
            >
              {language === "anglais" ? "Sell kamas" : "Vendre des Kamas"}
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to={
                language === "anglais" ? "/kamas-exchange" : "/echange-de-kamas"
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
                language === "anglais" ? "/sell-currencies" : "/vendre-soldes"
              }
              id="solde-buy"
              value={activeClassBuySolde}
              onClick={handleToggleActiveClassName}
              className={activeClassBuySolde && "nav-active"}
            >
              {language === "anglais" ? "Sell balance" : "Vendre des soldes"}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidedrawer-third">
        {language === "anglais" ? (
          <p>
            On <span className="sidedrawer-third-go">go.iBendouma</span>, you
            can sell your Dofus Kamas (Retro, touch and official) at the best
            price. Minimum quantity: 20 Euro of value in kamas (Paypal, Skrill,
            Bank transfer) and others. 200e of value for SEPA and CNY
          </p>
        ) : (
          <p>
            Sur <span className="sidedrawer-third-go">Go.iBendouma</span>, vous
            pouvez vendre vos Kamas Dofus (Retro, touch, officiel) à de
            meilleurs prix. Quantité minimale : 20 Euro de valeur en kamas
            (Paypal, Skrill, Virement bancaire) et autres.{" "}
          </p>
        )}
      </div>
      <div className="sidedrawer-fourth">
        <a
          href="https://discordapp.com/users/993596419950792724/"
          target="__blank"
        >
          <span className="insta">
            <IoLogoDiscord />
          </span>
        </a>
        <a href="https://www.facebook.com/ibendouma/" target="__blank">
          <span className="face">
            <BsFacebook />
          </span>
        </a>
        <a href="skype:ilyass bendouma?chat" target="__blank">
          <span className="twitt">
            <FaSkype />
          </span>
        </a>
        <a href="https://wa.me/212617972929" target="__blank">
          <span className="link">
            <BsWhatsapp />
          </span>
        </a>
      </div>
    </div>
  );
};

export default SideDrawer;
