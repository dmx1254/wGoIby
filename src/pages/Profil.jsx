import React, { useState, useEffect } from "react";

import { ModifyProfil, MyBalances, MyExchanges, MySales } from "../components";
import { useSelector, useDispatch } from "react-redux";

import { getAllSoldes } from "../features/soldeSlices";

import { getAllExchanges } from "../features/kamasExchangeSlices";

import { getAllOrders } from "../features/ordersSlice";

import axios from "axios";

const Profil = () => {
  const dispatch = useDispatch();

  const { urlToSend } = useSelector((state) => state.urlToSend);

  const { user } = useSelector((state) => state.user);
  const [exchanges, setExchanges] = useState([]);
  const [myBuy, setMyBuy] = useState([]);
  const [balance, setBalance] = useState([]);
  const { language } = useSelector((state) => state.language);
  const [setProfil, setSetProfil] = useState(false);
  const [mySale, setMySale] = useState(false);
  const [myExchange, setMyExchange] = useState(false);
  const [myBalance, setMyBalance] = useState(false);
  const [saleSin, setSaleSin] = useState(false);
  const [balanceSin, setBalanceSin] = useState(false);
  const [exchangeSin, setExchangeSin] = useState(false);
  const [urlLink, setUrlLink] = useState(urlToSend);

  useEffect(() => {
    setUrlLink(urlToSend);
  }, [urlToSend]);

  const toggleSaleExchangeAndBalance = (e) => {
    if (urlLink === "mes-ventes") {
      setSaleSin(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
    } else if (urlLink === "mes-soldes") {
      setSaleSin(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
    } else if (urlLink === "mes-echanges") {
      setSaleSin(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
    } else if (urlLink === "edit-profil") {
      setSetProfil(true);
      setSaleSin(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setUrlLink("");
    } else if (e.target.id === "salesingle") {
      setSaleSin(true);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setUrlLink("");
    } else if (e.target.id === "balancesingle") {
      setBalanceSin(true);
      setSaleSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setUrlLink("");
    } else if (e.target.id === "exchangesingle") {
      setExchangeSin(true);
      setBalanceSin(false);
      setSaleSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setUrlLink("");
    } else {
      setSetProfil(true);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setUrlLink("");
    }
  };

  const handleDisplay = (e) => {
    if (urlLink === "mes-ventes") {
      setSetProfil(false);
      setMySale(false);
      setMyExchange(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
    } else if (urlLink === "mes-soldes") {
      setSetProfil(false);
      setMySale(false);
      setMyExchange(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
    } else if (urlLink === "mes-echanges") {
      setSetProfil(false);
      setMySale(false);
      setMyExchange(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
    } else if (urlLink === "edit-profil") {
      setSetProfil(true);
      setMySale(false);
      setMyExchange(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
      setUrlLink("");
    } else if (e.target.id === "profil") {
      setSetProfil(true);
      setMySale(false);
      setMyExchange(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
      setUrlLink("");
    }
    if (e.target.id === "sale") {
      setMySale(true);
      setSetProfil(false);
      setMyExchange(false);
      setMyBalance(false);
      setSaleSin(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setUrlLink("");
    } else if (e.target.id === "exchange") {
      setMyExchange(true);
      setMySale(false);
      setSetProfil(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
      setUrlLink("");
    } else if (e.target.id === "balance") {
      setMyBalance(true);
      setMySale(false);
      setSetProfil(false);
      setMyExchange(false);
      setUrlLink("");
    } else {
      setSetProfil(true);
      setMyExchange(false);
      setMyBalance(false);
      setMySale(false);
      setBalanceSin(false);
      setSaleSin(false);
      setExchangeSin(false);
      setUrlLink("");
    }
  };

  // useEffect(() => {
  //   const getExchanges = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_CLIENT_URL}/exchange/user/${user?.user}`)
  //       .then((res) => setExchanges(res.data));
  //   };
  //   getExchanges();
  // }, [user?.user]);

  // useEffect(() => {
  //   const getUsersBuys = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_CLIENT_URL}/buy/user/${user?.user}`)
  //       .then((res) => setMyBuy(res.data));
  //   };
  //   getUsersBuys();
  // }, [user?.user]);

  // useEffect(() => {
  //   const getSoldes = async () => {
  //     await axios
  //       .get(
  //         `${process.env.REACT_APP_CLIENT_URL}/soldeorder/user/${user?.user}`
  //       )
  //       .then((res) => setBalance(res.data));
  //   };
  //   getSoldes();
  // }, [user?.user]);

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

  // const handleLogout = () => {
  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_CLIENT_URL}/users/logout`,
  //     withCredentials: true,
  //   })
  //     .then(() => {
  //       dispatch(removeUser());
  //       window.location.reload();
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="profil">
      <div className="profil-component">
        {(setProfil || urlLink === "edit-profil") && <ModifyProfil />}
        {(mySale || saleSin || urlLink === "mes-ventes") && (
          <MySales
            myBuy={myBuy}
            toggleSaleExchangeAndBalance={toggleSaleExchangeAndBalance}
          />
        )}
        {(myExchange || exchangeSin || urlLink === "mes-echanges") && (
          <MyExchanges
            exchanges={exchanges}
            toggleSaleExchangeAndBalance={toggleSaleExchangeAndBalance}
          />
        )}
        {(myBalance || balanceSin || urlLink === "mes-soldes") && (
          <MyBalances
            balance={balance}
            toggleSaleExchangeAndBalance={toggleSaleExchangeAndBalance}
          />
        )}
      </div>

      <div className="profil-menu">
        <ul>
          <li onClick={handleDisplay}>
            <span id="profil">
              {language === "anglais" ? "profil" : "profile"}
            </span>
          </li>
          <li onClick={handleDisplay}>
            <span id="sale">
              {language === "anglais" ? "My sales" : "Mes ventes"}
            </span>
          </li>
          <li onClick={handleDisplay}>
            <span id="balance">
              {language === "anglais" ? "My balances" : "Mes soldes"}
            </span>
          </li>
          <li id="exchange" onClick={handleDisplay}>
            <span id="exchange">
              {language === "anglais" ? "My trades" : "Mes Echanges"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profil;
