import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { orderData } from "../constants/order";

const MySales = ({ toggleSaleExchangeAndBalance }) => {
  const { orders } = useSelector((state) => state.orders);

  const { language } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.user);
  const [dataOrder, setDataOrder] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (dataOrder.length === 1) {
      if (dataOrder[0].status === "Payée") {
        setTotalPrice(dataOrder[0].totalPrice);
      } else {
        setTotalPrice(0);
      }
    } else if (dataOrder.length > 1) {
      let myTab = orderData.filter((data) => data.status === "Payée");
      if (myTab.length === 1) {
        setTotalPrice(myTab[0].totalPrice);
      } else {
        setTotalPrice(orderData.reduce((a, b) => a + b.totalPrice, 0));
      }
    } else {
      setTotalPrice(0);
    }
  }, [dataOrder]);

  const convertDate = (date) => {
    const dateConverted = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateConverted;
  };

  const convertDateAndAddDay = (date) => {
    const myDate = new Date(date);
    const day = myDate.getDate();
    myDate.setDate(day === 5 ? myDate.getDate() + 2 : myDate.getDate() + 1);
    const dateConverted = new Date(myDate).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateConverted;
  };

  return (
    <div className="mysales">
      <div className="mysales-alert">
        <span className="mysales-alert-title">
          {language === "anglais" ? "Warning: " : "Attention: "}
        </span>

        {language === "anglais" ? (
          <p>
            iBendouma will never ask you to return your kamas or Dofus items in
            the game, we will always ask you to come to the "Live Chat" to
            discuss any problem. Never give your kamas or Dofus items to someone
            who claims to be iBendouma.
          </p>
        ) : (
          <p>
            iBendouma ne vous demandera jamais de rendre vos kamas ou objets
            dofus dans le jeu, nous vous demanderons toujours de venir sur le
            “Chat en Direct” pour discuter de n’importe quel problème. Ne donnez
            jamais vos kamas ou objets dofus à quelqu’un qui prétend être
            iBendouma.
          </p>
        )}
      </div>
      <div className="mysales-fakes">
        <span>
          {language === "anglais" ? "Beware of fakes:" : "Attention aux fakes:"}
        </span>
        {language === "anglais" ? (
          <p>Scammers can use the same nickname with a letter difference.</p>
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
            language === "anglais" ? "N° order..." : "N° de commande..."
          }
        />{" "}
      </div>
      <div className="mysales-total">
        <span className="mysales-total-title">Total:</span>
        <span className="mysales-total-price">{totalPrice} DH</span>
      </div>
      <div className="mysales-table">
        <table>
          <thead>
            {language === "anglais" ? (
              <tr>
                <th>N° Order</th>
                <th>Game</th>
                <th>Server</th>
                <th>Qte</th>
                <th>UP</th>
                <th>Total</th>
                {/* {user?.person?.isAdmin && <th>payment details</th>} */}
                <th>Status</th>
                <th>Date</th>
                <th>Payment date</th>
              </tr>
            ) : (
              <tr>
                <th>N° Commande</th>
                <th>Jeu</th>
                <th>Serveur</th>
                <th>Qte</th>
                <th>PU</th>
                <th>Total</th>
                {/* {user?.person?.isAdmin && <th>Coordonnées de paiement</th>} */}
                <th>Status</th>
                <th>Date</th>
                <th>Date de paiement</th>
              </tr>
            )}
          </thead>
          <tbody>
            {dataOrder
              .filter((data) => data.numBuy.includes(searchTerm))
              .map((order) => (
                <tr key={order.id}>
                  <td>
                    <p className="order-sales">{order.numBuy}</p>
                  </td>
                  <td
                    className={
                      order.jeu === "dofus-kamas"
                        ? "dofuskamas"
                        : order.jeu === "dofus-touch"
                        ? "dofustouch"
                        : "dofusretro"
                    }
                  >
                    {order.jeu}
                  </td>
                  <td>{order.server}</td>
                  <td>{order.qte}</td>
                  <td>{order.pu}</td>
                  <td>{order.totalPrice}</td>
                  {/* {user?.person?.isAdmin && (
                      <td className="details-of-payment">
                        {user?.person?.currencymethod}:{" "}
                        {user?.person?.currency === "dhs"
                          ? user?.person?.dhsRib
                          : user?.person?.currency === "euro"
                          ? user?.person?.emailCurrencyEuro
                          : user?.person?.currency === "usdt"
                          ? user?.person?.usdtAdressTrx
                          : user?.person?.cnyacount}
                      </td>
                    )} */}

                  {language === "anglais" ? (
                    <td
                      className={
                        order.status === "Payée"
                          ? "success"
                          : order.status === "Annule"
                          ? "no-success"
                          : order.status === "En Cours de payment"
                          ? "payment-success"
                          : order.status === "En attente"
                          ? "pending"
                          : "no-pending"
                      }
                    >
                      {order.status === "Payée"
                        ? "Paid"
                        : order.status === "Annulée"
                        ? "Canceled"
                        : order.status === "En cours de paiement"
                        ? "In payment"
                        : order.status === "En attente"
                        ? "Pending"
                        : "No Status"}
                    </td>
                  ) : (
                    <td
                      className={
                        order.status === "Payée"
                          ? "success"
                          : order.status === "Annulée"
                          ? "no-success"
                          : order.status === "En attente"
                          ? "pending"
                          : "no-pending"
                      }
                    >
                      {order.status}
                    </td>
                  )}
                  <td>{convertDate(order.createdAt)}</td>
                  <td>{convertDateAndAddDay(order.createdAt)}</td>
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

export default MySales;
