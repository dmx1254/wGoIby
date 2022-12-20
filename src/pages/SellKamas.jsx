import React, { useState, useEffect } from "react";
import { DofusKamas, DofusRetro, DofusTouch } from "../components";

import { Helmet } from "react-helmet";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { addServers } from "../features/serverSlices";

import { carousel } from "../constants/data";

import LoaderServer from "../components/LoaderServer";

const SellKamas = () => {
  const dispatch = useDispatch();

  const [servers, setServers] = useState([]);
  const [loadingSell, setLoadingSell] = useState(false);

  useEffect(() => {
    const getServers = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/server`)
        .then((res) => {
          setServers(res.data);
          setLoadingSell(true);
        });
    };
    getServers();
  }, [dispatch]);
  return !loadingSell ? (
    <LoaderServer />
  ) : (
    <div className="sellkamas">
      <Helmet>
        <title>Vendez vos kamas aux meilleurs taux du marché</title>
      </Helmet>
      <DofusKamas servers={servers} id="kamas" />
      <DofusRetro servers={servers} id="retro" />
      <DofusTouch servers={servers} id="touch" />
      <div className="kamas-sell-security">
        {carousel?.map((carous, i) => (
          <div className="carousel-container" key={i}>
            <span className="carousel-icon">{carous.icon}</span>
            <h3 className="carousel-title">{carous.title}</h3>
            <p className="carousel-desc">{carous.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellKamas;
