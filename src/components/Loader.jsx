import React from "react";
import logoSpin from "../assets/loaderGif.gif";
import goibendoumalogo from "../assets/goibendouma-logo.png";
const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-go-gif">
        <img src={logoSpin} alt="goibendouma spinner" />
      </div>
      <div className="loader-logo-wrapper">
        <img src={goibendoumalogo} alt="goibendouma logo" />
        <span>Ressens la magie de go.ibendouma</span>
      </div>
    </div>
  );
};

export default Loader;
