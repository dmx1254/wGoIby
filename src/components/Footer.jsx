import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import skrill from "../assets/skrill.png";
import paypal from "../assets/paypal.png";
import payeer from "../assets/payeer.png";
import bank from "../assets/bank.png";

const Footer = () => {
  const { language } = useSelector((state) => state.language);
  return (
    <div className="footer">
      <div>
        Copyright © 2019/{new Date().getFullYear()}, Outblaze Hong Kong,{" "}
        {language === "anglais"
          ? "All rights reserved."
          : "Tous les droits sont réservés."}
      </div>
      <div className="footer-bank-payment">
        <Link to="/secure-payment">
          <img src={paypal} alt="paypal bank" className="paypal" />
        </Link>
        <Link to="/secure-payment">
          <img src={skrill} alt="skrill bank" className="skrill" />
        </Link>
        <Link to="/secure-payment">
          <img src={payeer} alt="alipay bank" className="payeer" />
        </Link>
        <Link to="/secure-payment">
          <img src={bank} alt=" bank" className="bank" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
