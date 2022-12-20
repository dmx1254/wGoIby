import React, { useEffect, useState } from "react";
import dofus from "../assets/dofus-exchange.jpg";

import { useSelector, useDispatch } from "react-redux";

import { orderNumGenerated } from "../utils";

import { carousel } from "../constants/data";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Helmet } from "react-helmet";

import { getAllOrders } from "../features/ordersSlice";

import { getAllExchanges } from "../features/kamasExchangeSlices";

import { getAllSoldes } from "../features/soldeSlices";

const KamasExchange = () => {
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { servers } = useSelector((state) => state.servers);

  const { rate } = useSelector((state) => state.rate);

  const [serverOut, setServerOut] = useState("");
  const [qtyToPay, setQtyToPay] = useState();
  const [characterToPay, setCharacterToPay] = useState("");
  const [serverIn, setServerIn] = useState("");
  const [qtyToReceive, setQtyToReceive] = useState();
  const [characterToReceive, setCharacterToReceive] = useState("");
  const [codeToExchange, setCodeToExchange] = useState("");
  const [serverFilteredPrice, setServerFilteredPrice] = useState(0);
  let [numToRate, setNumToRate] = useState(1 - rate);
  // const [serverFilteredPriceToReceive, setServerFilteredPriceToReceive] =
  //   useState(0);

  // console.log(serverFilteredPriceToReceive)

  // console.log(servers);
  // console.log(rate);
  // console.log(serverFilteredPrice);

  const handleReceiveServer = (e) => {
    setServerIn(e.target.value);
    // setServerFilteredPriceToReceive(

    // );

    // let priceToCalculate = servers.filter(
    //   (server) => server.serverName === e.target.value
    // )[0]?.serverPriceDh;
    // let qtyToRecei = (Number(qtyToPay) * numToRate).toFixed(2);

    // let priceToPaying = (
    //   (qtyToRecei * serverFilteredPrice) /
    //   priceToCalculate
    // ).toFixed(2);
    // setQtyToReceive(priceToPaying);
    // console.log(serverFilteredPrice);
    // console.log(serverFilteredPriceToReceive);
  };

  const handleServerOut = (e) => {
    setServerOut(e.target.value);
    setServerFilteredPrice(
      servers.filter((server) => server.serverName === e.target.value)[0]
        ?.serverPriceDh
    );
  };

  useEffect(() => {
    let priceToCalculate = servers.filter(
      (server) => server.serverName === serverOut
    )[0]?.serverPriceDh;
    let serverPriceIn = servers.filter(
      (server) => server.serverName === serverIn
    )[0]?.serverPriceDh;
    let qtyToRecei = (Number(qtyToPay) * numToRate * priceToCalculate).toFixed(
      2
    );
    let priceToPaying = (qtyToRecei / serverPriceIn).toFixed(2);
    // console.log(qtyToRecei);
    // console.log(serverPriceIn);
    setQtyToReceive(priceToPaying);
    // console.log(priceToPaying);
  }, [servers, serverFilteredPrice, numToRate, qtyToPay, serverOut, serverIn]);

  const notifyExchangeOrderError = () =>
    toast.error("Veuillez remplir tous les champs avant de commander");

  const notifyExchangeOrderSuccess = () =>
    toast.success(
      "Votre commande a été créée avec succès, vous pouvez vérifier sur votre profil"
    );

  const notifyExchangeQtyPayError = () =>
    toast.error("Votre commande doit atteindre au minimum 200 dhs");

  const handleSetQtyToPay = (e) => {
    setQtyToPay(e.target.value);
  };

  const handleAddExchange = () => {
    if (
      serverOut &&
      qtyToPay &&
      characterToPay &&
      serverIn &&
      qtyToReceive &&
      characterToReceive &&
      codeToExchange
    ) {
      if (qtyToPay * serverFilteredPrice < 200) {
        return notifyExchangeQtyPayError();
      }
      const data = {
        userId: user?.user,
        numExchange: orderNumGenerated(),
        serverOut,
        qtyToPay,
        characterToPay,
        serverIn,
        qtyToReceive,
        characterToReceive,
        codeToExchange,
        nameExchanger: user.person.lastname,
        emailExchanger: user.person.email,
        profilExchanger: user.person.profil,
        detailUser: user.person,
      };

      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/exchange`,
          data: data,
        }).then((res) => {
          // console.log(res.data);
          notifyExchangeOrderSuccess();
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      notifyExchangeOrderError();
    }
  };

  useEffect(() => {
    const getExchanges = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/exchange/user/${user?.user}`)
        .then((res) => dispatch(getAllExchanges(res.data)));
    };
    getExchanges();
  }, [user?.user, dispatch]);

  useEffect(() => {
    const getUsersBuys = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/buy/user/${user?.user}`)
        .then((res) => dispatch(getAllOrders(res.data)));
    };
    getUsersBuys();
  }, [user?.user, dispatch]);

  useEffect(() => {
    const getSoldes = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_CLIENT_URL}/soldeorder/user/${user?.user}`
        )
        .then((res) => dispatch(getAllSoldes(res.data)));
    };
    getSoldes();
  }, [user?.user, dispatch]);

  return (
    <div className="kamas-exchange-container">
      <Helmet>
        <title>Passez d'un serveur à un autre en toute facilité</title>
      </Helmet>
      <div className="kamas-exchange">
        {language === "anglais" ? (
          <div className="kamas-exchange-alert">
            <p className="alert-exchange">
              We will send you a private message in-game with the exchange code
              that you provided, in order to confirm that the trader is a member
              of our staff.
            </p>
            <p className="alert-attent">
              <span>Warning: </span> Do not tell anyone else your exchange code.
              If someone tells you an incorrect code. Block them!!
            </p>
          </div>
        ) : (
          <div className="kamas-exchange-alert">
            <p className="alert-exchange">
              Nous vous enverrons des messages privés en jeu avec le code
              d'échange que vous aviez fourni, afin de confirmer que le
              destinataire qui échange avec vous fait partie de notre staff.
            </p>
            <p className="alert-attent">
              <span>Attention: </span> Ne dites à personne d'autre votre Code.
              Si quelqu'un vous donne un Code incorrecte, bloquez le!!
            </p>
          </div>
        )}

        <div className="kamas-exchange-content">
          <div className="exchange-image-wrapper">
            <img src={dofus} alt="dofus exchange" />
          </div>
          <div className="exchange-dofus">
            <h1 className="exchange-title">
              {language === "anglais" ? "KAMAS EXCHANGE" : "ECHANGE DE KAMAS"}
            </h1>
            <div>
              <label htmlFor="">
                {language === "anglais" ? "Server to pay" : "Serveur à payer"}
              </label>
              <select
                name="servertopay"
                id="servertopay"
                value={serverOut}
                onChange={handleServerOut}
              >
                <option value="" style={{ color: "gray" }}>
                  {language === "anglais"
                    ? "Choose the server"
                    : "Choisir le serveur"}
                </option>
                {servers.map((server) => (
                  <option value={server.serverName} key={server._id}>
                    {server.serverName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="qtytopay">
                {language === "anglais"
                  ? "Quantity to pay(M)"
                  : "Quantité à payer(M)"}
              </label>
              <input
                type="Number"
                id="qtytopay"
                placeholder={
                  language === "anglais"
                    ? "Quantity to pay(M)"
                    : "Quantité à payer(M)"
                }
                value={qtyToPay}
                onChange={handleSetQtyToPay}
              />
            </div>
            <div>
              <label htmlFor="charactertopay">
                {language === "anglais"
                  ? "Character's name"
                  : "Personnage à payer"}
              </label>
              <input
                type="text"
                id="charactertopay"
                placeholder={
                  language === "anglais"
                    ? "Character's name"
                    : "Personnage à payer"
                }
                value={characterToPay}
                onChange={(e) => setCharacterToPay(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">
                {language === "anglais"
                  ? "Server to receive in"
                  : "Serveur à recevoir"}
              </label>
              <select
                name="servertoreceive"
                id="servertoreceive"
                value={serverIn}
                onChange={handleReceiveServer}
              >
                <option value="" style={{ color: "gray" }}>
                  {language === "anglais"
                    ? "Choose the server"
                    : "Choisir le serveur"}
                </option>
                {servers.map((server) => (
                  <option value={server.serverName} key={server._id}>
                    {server.serverName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="qtytoreceive">
                {language === "anglais"
                  ? "Quantity to receive(M)"
                  : "Quantité à recevoir(M)"}
              </label>
              <input
                type="Number"
                id="qtytoreceive"
                placeholder={
                  language === "anglais"
                    ? "Quantity to receive(M)"
                    : "Quantité à recevoir(M)"
                }
                className="input-receive-long"
                value={qtyToReceive > 0 && qtyToReceive}
              />
            </div>
            <div>
              <label htmlFor="charactertoreceive">
                {language === "anglais"
                  ? "Character's name"
                  : "Personnage à recevoir"}
              </label>
              <input
                type="text"
                id="charactertoreceive"
                placeholder={
                  language === "anglais"
                    ? "Character's name"
                    : "Personnage à recevoir"
                }
                value={characterToReceive}
                onChange={(e) => setCharacterToReceive(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="codeexchange">
                {language === "anglais" ? "Exchange code" : "Code d'Echange"}
              </label>
              <input
                type="text"
                id="codeexchange"
                placeholder={
                  language === "anglais" ? "Exchange code" : "Code d'Echange"
                }
                value={codeToExchange}
                onChange={(e) => setCodeToExchange(e.target.value)}
              />
            </div>
            <button className="exchange-btn" onClick={handleAddExchange}>
              {language === "anglais" ? "Order" : "Commander"}
            </button>
          </div>
        </div>
      </div>
      {language === "anglais" ? (
        <div className="kamas-exchange-extra">
          {carousel?.map((carous, i) => (
            <div className="carousel-container" key={i}>
              <span className="carousel-icon">{carous.icon}</span>
              <h3 className="carousel-title">{carous.titleEn}</h3>
              <p className="carousel-desc">{carous.contentEn}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="kamas-exchange-extra">
          {carousel?.map((carous, i) => (
            <div className="carousel-container" key={i}>
              <span className="carousel-icon">{carous.icon}</span>
              <h3 className="carousel-title">{carous.title}</h3>
              <p className="carousel-desc">{carous.content}</p>
            </div>
          ))}
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

export default KamasExchange;
