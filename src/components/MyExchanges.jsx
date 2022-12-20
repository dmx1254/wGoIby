import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { exchangeData } from "../constants/exchange";

const MyExchanges = ({ toggleSaleExchangeAndBalance }) => {
  const { language } = useSelector((state) => state.language);

  const { products } = useSelector((state) => state.exchanges);


  const [dataOrder, setDataOrder] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const convertDate = (date) => {
    const dateConverted = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return dateConverted;
  };

  // console.log(dataOrder);

  //   useEffect(() => {
  //     if (dataOrder.length === 1) {
  //       setTotalPrice(dataOrder[0].totalPrice);
  //     } else if (dataOrder.length > 1) {
  //       setTotalPrice(orderData.reduce((a, b) => a + b.totalPrice, 0));
  //     } else {
  //       setTotalPrice(0);
  //     }
  //   }, [dataOrder]);

  return (
    <div className="myexchanges">
      <div className="mysales-alert">
        <span className="mysales-alert-title">
          {language === "anglais" ? "Warning: " : "Attention: "}
        </span>
        {language === "anglais" ? (
          <p>
            Wait for the agent to talk to you in-game. In case of delays, talk
            to us in chat to be delivered faster.
          </p>
        ) : (
          <p>
            Attendre que l’agent vous parle dans le jeu. En cas de lenteurs,
            parlez-nous dans le chat pour accélérer votre commande.
          </p>
        )}
      </div>
      <div className="mysales-fakes">
        <span>
          {language === "anglais" ? "Beware of fakes:" : "Attention aux fakes:"}
        </span>
        {language === "anglais" ? (
          <p>
            Scammers can use the same nickname as us with a letter difference.
          </p>
        ) : (
          <p>
            des arnaqueurs peuvent utiliser le même pseudo avec une lettre de
            différence.
          </p>
        )}
      </div>
      <div className="mysales-menu-list" onClick={toggleSaleExchangeAndBalance}>
        <span id="salesingle">
          {language === "anglais" ? "My sales" : "Mes ventes"}
        </span>
        <span id="exchangesingle" onClick={toggleSaleExchangeAndBalance}>
          {language === "anglais" ? "My trade" : "Mes échanges"}
        </span>
        <span id="balancesingle">
          {language === "anglais" ? "My balances" : "Mes soldes"}
        </span>
      </div>
      <div className="mysales-search">
        <span>
          <FiSearch />
        </span>{" "}
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            language === "anglais" ? "exchange code..." : "code d'echanges..."
          }
        />{" "}
      </div>
      <div className="myexcahnges-table">
        <table>
          <thead>
            {language === "anglais" ? (
              <tr>
                <th>N° Order</th>
                <th>Code</th>
                <th>Server to trade</th>
                <th> Quantity to exchange</th>
                <th>Character's name</th>
                <th> Server to receive</th>
                <th>Qty to receive</th>
                <th>Character's name</th>
                <th>Date</th>
                <th>Status</th>
                {/* <th>Date de paiement</th> */}
              </tr>
            ) : (
              <tr>
                <th>N° Commande</th>
                <th>Code</th>
                <th>Serveur actuel</th>
                <th>Qté à échanger</th>
                <th>Nom du personage</th>
                <th>Serveur désiré</th>
                <th>Qté à recevoir</th>
                <th>Nom du personnage</th>
                <th>Date</th>
                <th>Status</th>
                {/* <th>Date de paiement</th> */}
              </tr>
            )}
          </thead>
          <tbody>
            {dataOrder
              .filter((data) =>
                data.numExchange
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              )
              .map((exchange) => (
                <tr key={exchange.id}>
                  <td>{exchange.numExchange}</td>
                  <td>{exchange.codeToExchange}</td>
                  <td>{exchange.serverOut}</td>
                  <td>{exchange.qtyToPay}M</td>
                  <td>{exchange.characterToPay}</td>
                  <td>{exchange.serverIn}</td>
                  <td>{exchange.qtyToReceive}M</td>
                  <td>{exchange.characterToReceive}</td>
                  <td>{convertDate(exchange.createdAt)}</td>
                  {language === "anglais" ? (
                    <td
                      className={
                        exchange.status === "Terminée"
                          ? "success"
                          : exchange.status === "Annulée"
                          ? "no-success"
                          : exchange.status === "En attente"
                          ? "pending"
                          : "no-pending"
                      }
                    >
                      {exchange.status === "Terminée"
                        ? "Completed"
                        : exchange.status === "Annulée"
                        ? "Canceled"
                        : exchange.status}
                      {exchange.status === "En cours" && "Pending"}
                    </td>
                  ) : (
                    <td
                      className={
                        exchange.status === "Terminée"
                          ? "success"
                          : exchange.status === "Annulée"
                          ? "no-success"
                          : exchange.status === "En attente"
                          ? "pending"
                          : "no-pending"
                      }
                    >
                      {exchange.status}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="lorem-nosying">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        animi aperiam blanditiis nemo itaque optio nostrum saepe debitis quod
        illo id repellendus neque ipsam nobis fugit, minima libero, sapiente
        quia in quibusdam! Ad repellendus culpa minima, esse ratione molestiae
        dignissimos in sunt, vero aspernatur exercitationem eos explicabo itaque
        inventore debitis.
      </div>
    </div>
  );
};

export default MyExchanges;
