import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import ReactTooltip from "react-tooltip";

import { TiUserDelete } from "react-icons/ti";

import { updateUser } from "../features/userSlice";

import FileBase from "react-file-base64";
import profilUser from "../assets/default-user.png";

import axios from "axios";

import { removeUser } from "../features/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-step-progress-bar/styles.css";

import { useSelector, useDispatch } from "react-redux";

const ModifyProfil = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [currency, setCurrency] = useState("euro");
  const [currencymethod, setCurrencyMethod] = useState("");
  const [emailCurrencyEuro, setEmailCurrencyEuro] = useState("");
  const [ibanCurrency, setIbanCurrency] = useState("");
  const [paylibcurencyLastname, setPaylibCurencyLastname] = useState("");
  const [paylibcurencyFirstname, setPaylibCurencyFirstname] = useState("");
  const [paylibcurencyTel, setPaylibCurencyTel] = useState("");
  const [dhsBank, setDhsBank] = useState("");
  const [dhsBankFirstname, setDhsBankFirstname] = useState("");
  const [dhsBankLastname, setDhsBankLastname] = useState("");
  const [dhsRib, setDhsRib] = useState("");
  const [usdtAdressTrx, setUsdtAdressTrx] = useState("");
  const [cnyacount, setCnyAccount] = useState("");
  const [payeeraccount, setPayeerAccount] = useState("");

  const [profil, setProfil] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [modifProfil, setModifProfil] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  let [paymentSelected, setPaymentSelected] = useState({
    paymentEuro: "",
    paymentDhs: "",
    paymentUsdt: "",
    paymentCny: "",
  });

  const lastnameError = useRef();
  const firstnameError = useRef();
  const phoneError = useRef();
  const addressError = useRef();
  const currencyError = useRef();
  const paymentMethodError = useRef();
  const emailCurrencyEuroError = useRef();
  const ibanCurrencyError = useRef();
  const paylibcurencyLastnameError = useRef();
  const paylibcurencyFirstnameError = useRef();
  const paylibcurencyTelError = useRef();
  const dhsBankError = useRef();
  const dhsBankFirstnameError = useRef();
  const dhsBankLastnameError = useRef();
  const dhsRibError = useRef();
  const usdtAdressTrxError = useRef();
  const cnyacountError = useRef();
  const payeeraccountError = useRef();

  const { language } = useSelector((state) => state.language);

  const handleSelectCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const handleSelectPayment = (e) => {
    setPaymentSelected(([e.target.name] = e.target.value));
  };

  // const notifyEmail = () =>
  //   toast.success(
  //     "Vérifier votre adresse e-mail, le code de vérification vous est envoyé"
  //   );

  // const notifyFirstStep = () =>
  //   toast.success(
  //     "Premiere etape réussie, il ne vous reste qu'une seule étape pour valider votre inscription"
  //   );

  const notyFySuccessRegister = () =>
    toast.success("Inscription réussie, veuillez vous connecter");

  // const notyFyAlertDeleteUser = () =>
  //   toast.error(
  //     "Etes vous sur de vouloir supprimer votre compte ? Nous sommes tristes de vous voir partir"
  //   );

  // console.log(emailCurrencyEuro)
  // console.log(usdtAdressTrx)
  // console.log(currency)
  const { user } = useSelector((state) => state.user);

  const handleSignupForm = (e) => {
    e.preventDefault();
    let data = {};
    if (currency === "euro") {
      if (paymentSelected === "skrill" || paymentSelected === "paypal") {
        if (!emailCurrencyEuro) {
          if (!emailCurrencyEuro) {
            emailCurrencyEuroError.current.innerHTML =
              "Ce champ ne doit pas être vide";
          }
        } else {
          data.cnyacount = cnyacount;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.currency = currency;
          data.currencymethod = paymentSelected;
          data.emailCurrencyEuro = emailCurrencyEuro;
          emailCurrencyEuroError.current.innerHTML = "";
        }
      }

      if (paymentSelected === "payeer") {
        if (!payeeraccount) {
          cnyacountError.current.innerHTML = "Ce champ est requis";
        } else {
          data.email = email;
          data.password = password;
          data.cnyacount = cnyacount;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.currency = currency;
          data.currencymethod = paymentSelected;
          data.payeeraccount = payeeraccount;
          payeeraccountError.current.innerHTML = "";
        }
      }

      if (paymentSelected === "paylib") {
        if (
          !paylibcurencyLastname ||
          !paylibcurencyFirstname ||
          !paylibcurencyTel
        ) {
          if (!paylibcurencyLastname) {
            paylibcurencyLastnameError.current.innerHTML =
              "Ce champ est requis";
          }
          if (!paylibcurencyFirstname) {
            paylibcurencyFirstnameError.current.innerHTML =
              "Ce champ ne doit pas être vide";
          }
          if (!paylibcurencyTelError) {
            paylibcurencyTelError.current.innerHTML =
              "Veuillez remplir ce champ avant de continuer";
          }
        } else {
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.currency = currency;
          data.currencymethod = paymentSelected;
          data.paylibcurencyLastname = paylibcurencyLastname;
          data.paylibcurencyFirstname = paylibcurencyFirstname;
          data.paylibcurencyTel = paylibcurencyTel;
          paylibcurencyLastnameError.current.innerHTML = "";
          paylibcurencyFirstnameError.current.innerHTML = "";
          paylibcurencyTelError.current.innerHTML = "";
        }
      }

      if (paymentSelected === "sepa") {
        if (!ibanCurrency) {
          ibanCurrencyError.current.innerHTML =
            "Ce champ ne doit pas être vide";
        } else {
          data.ibanCurrency = ibanCurrency;
          ibanCurrencyError.current.innerHTML = "";
        }
      }
    } else if (currency === "dhs") {
      if (paymentSelected === "virement bancaire") {
        if (
          !dhsBank ||
          !dhsBankLastname ||
          !dhsBankFirstname ||
          dhsRib.length < 24 ||
          dhsRib.length > 24
        ) {
          if (!dhsBank) {
            dhsBankError.current.innerHTML =
              "Vous devez choir une banque avant de continuer";
          }
          if (!dhsBankLastname) {
            dhsBankLastnameError.current.innerHTML = "Ce champ est obligatoire";
          }

          if (!dhsBankFirstname) {
            dhsBankFirstnameError.current.innerHTML =
              "Ce champ est, vous devez le remplir";
          }
          if (dhsRib.length < 24) {
            dhsRibError.current.innerHTML =
              "Ce champ doit avoir exactement 24 chiffres";
          }
          if (dhsRibError.length > 24) {
            dhsRibError.current.innerHTML =
              "Ce champ doit avoir exactement 24 chiffres";
          }
        } else {
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.currency = currency;
          data.currencymethod = paymentSelected;
          data.dhsBank = dhsBank;
          data.dhsBankLastname = dhsBankLastname;
          data.dhsBankFirstname = dhsBankFirstname;
          data.dhsRib = dhsRib;
          dhsBankError.current.innerHTML = "";
          dhsBankLastnameError.current.innerHTML = "";
          dhsBankFirstnameError.current.innerHTML = "";
          dhsRibError.current.innerHTML = "";
          dhsRibError.current.innerHTML = "";
        }
      }
    } else if (currency === "usdt") {
      if (paymentSelected === "binance pay") {
        if (!emailCurrencyEuro) {
          emailCurrencyEuroError.current.innerHTML = "Ce champ est requis";
        } else {
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.currency = currency;
          data.currencymethod = paymentSelected;
          data.emailCurrencyEuro = emailCurrencyEuro;
          emailCurrencyEuroError.current.innerHTML = "";
        }
      }
      if (paymentSelected === "trc20") {
        if (!usdtAdressTrx) {
          usdtAdressTrxError.current.innerHTML = "Ce champ est requis";
        } else {
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.currency = currency;
          data.currencymethod = paymentSelected;
          data.usdtAdressTrx = usdtAdressTrx;
          usdtAdressTrxError.current.innerHTML = "";
        }
      }
    } else if (currency === "cny") {
      if (paymentSelected === "alipay") {
        if (!cnyacount) {
          cnyacountError.current.innerHTML = "Ce champ est requis";
        } else {
          data.cnyacount = cnyacount;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.currency = currency;
          data.currencymethod = paymentSelected;
          data.cnyacount = cnyacount;
          cnyacountError.current.innerHTML = "";
        }
      }
    }
    if (!data) {
      console.log("Impossible de s'inscrire");
    } else {
      try {
        axios({
          method: "put",
          url: `${process.env.REACT_APP_CLIENT_URL}/users/${user?.user}`,
          data,
        }).then((res) => {
          console.log(res.data);
          dispatch(updateUser(res.data));
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleModif = () => {
    setModifProfil((prevModifyProfil) => !prevModifyProfil);
  };

  return (
    <div className="modifyprofil">
      {modifProfil || (
        <div className="my-infos">
          <div
            className="my-infos-user-profil"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!user?.person?.profil && (
              <span
                style={{
                  marginBottom: "-10px",
                  background: "#AD0000",
                  color: "#F4F4F4",
                  padding: "10px 8px",
                  borderRadius: "5px",
                }}
              >
                {language === "anglais"
                  ? "You can add a profile picture"
                  : "Vous pouvez ajouter une photo de profil"}
              </span>
            )}

            <img
              src={user?.person?.profil ? user?.person?.profil : profilUser}
              alt="profil user"
            />
          </div>
          <div className="my-infos-labels">
            <label htmlFor="">
              {language === "anglais" ? "Lastname" : "Prenom"}:{" "}
              {user?.person?.lastname}
            </label>
            <label htmlFor="">
              {language === "anglais" ? "Firstname" : "Nom"}:{" "}
              {user?.person?.firstname}
            </label>
            <label htmlFor="">
              {language === "anglais" ? "e-mail" : "Email"}:{" "}
              {user?.person?.email}
            </label>
            <label htmlFor="">
              {language === "anglais" ? "Adress" : "Adresse"}:{" "}
              {user?.person?.address}
            </label>
            <label htmlFor="">
              {language === "anglais" ? "phone" : "Téléphone"}:{" "}
              {user?.person?.phone}
            </label>
            <label htmlFor="">
              {language === "anglais" ? "Country" : "Pays"}:{" "}
              {user?.person?.country}
            </label>
            <label htmlFor="">
              {language === "anglais" ? "City" : "Ville"}: {user?.person?.city}
            </label>
            <label htmlFor="">
              {language === "anglais" ? "Currency" : "Devise"}:{" "}
              {user?.person?.currency}
            </label>

            {user?.person?.currency === "dhs" && (
              <div className="infos-payment">
                <h3>
                  {language === "anglais"
                    ? "Payment details"
                    : "Informations de paiements"}
                </h3>
                <div className="infos-payment-fields">
                  <label htmlFor="">
                    {language === "anglais"
                      ? "Payment's method"
                      : "Methode de paiements"}
                    : {user?.person?.currencymethod}
                  </label>
                  <label htmlFor="">
                    {language === "anglais" ? "Bank" : "Banque"}:{" "}
                    {user?.person?.dhsBank}
                  </label>
                  <label htmlFor="">
                    {language === "anglais" ? "Lastname" : "Prenom"}:{" "}
                    {user?.person?.dhsBankLastname}
                  </label>
                  <label htmlFor="">
                    {language === "anglais" ? "Firstname" : "Nom"}:{" "}
                    {user?.person?.dhsBankFirstname}
                  </label>
                  <label htmlFor="">
                    {language === "anglais" ? "RIB" : "RIB"}:{" "}
                    {user?.person?.dhsRib}
                  </label>
                </div>
              </div>
            )}

            {user?.person?.currency === "euro" && (
              <div className="infos-payment">
                <h3>
                  {language === "anglais"
                    ? "Payment details"
                    : "Informations de paiements"}
                </h3>
                <div className="infos-payment-fields">
                  <label htmlFor="">
                    {language === "anglais"
                      ? "Payment's method"
                      : "Methode de paiements"}
                    : {user?.person?.currencymethod}
                  </label>
                  {user?.person?.currencymethod === "skrill" && (
                    <label htmlFor="">
                      {language === "anglais"
                        ? "Payment Email"
                        : "Email de paimement"}
                      : {user?.person?.emailCurrencyEuro}
                    </label>
                  )}

                  {user?.person?.currencymethod === "payeer" && (
                    <label htmlFor="">
                      {language === "anglais"
                        ? "Payeer Account"
                        : "Compte Payeer"}
                      : {user?.person?.payeeraccount}
                    </label>
                  )}

                  {user?.person?.currencymethod === "paypal" && (
                    <label htmlFor="">
                      {language === "anglais"
                        ? "Payment Email"
                        : "Email de paimement"}
                      : {user?.person?.emailCurrencyEuro}
                    </label>
                  )}
                  {user?.person?.currencymethod === "sepa" && (
                    <label htmlFor="">
                      {language === "anglais" ? "IBAN" : "IBAN"}:{" "}
                      {user?.person?.ibanCurrency}
                    </label>
                  )}

                  {user?.person?.currencymethod === "paylib" && (
                    <div className="modify-profil-sepa">
                      <label htmlFor="">
                        {language === "anglais" ? "Lastname" : "Prénom"}:{" "}
                        {user?.person?.paylibcurencyLastname}
                      </label>
                      <label htmlFor="">
                        {language === "anglais" ? "Firstname" : "Nom"}:{" "}
                        {user?.person?.paylibcurencyFirstname}
                      </label>
                      <label htmlFor="">
                        {language === "anglais" ? "Phone" : "Téléphone"}:{" "}
                        {user?.person?.paylibcurencyTel}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {user?.person?.currency === "usdt" && (
              <div className="infos-payment">
                <h3>
                  {language === "anglais"
                    ? "Payment details"
                    : "Informations de paiements"}
                </h3>
                <div className="infos-payment-fields">
                  <label htmlFor="">
                    {language === "anglais"
                      ? "Payment's method"
                      : "Methode de paiements"}
                    : {user?.person?.currencymethod}
                  </label>
                  {user?.person?.currencymethod === "binance pay" && (
                    <label htmlFor="">
                      {language === "anglais"
                        ? "Payment Email"
                        : "Email de paimement"}
                      : {user?.person?.emailCurrencyEuro}
                    </label>
                  )}
                  {user?.person?.currencymethod === "trc20" && (
                    <label htmlFor="">
                      {language === "anglais" ? "TRX adress" : "Adresse TRX"}:{" "}
                      {user?.person?.usdtAdressTrx}
                    </label>
                  )}
                </div>
              </div>
            )}

            {user?.person?.currency === "cny" && (
              <div className="infos-payment">
                <h3>
                  {language === "anglais"
                    ? "Payment details"
                    : "Informations de paiements"}
                </h3>
                <div className="infos-payment-fields">
                  <label htmlFor="">
                    {language === "anglais"
                      ? "Payment's method"
                      : "Methode de paiements"}
                    : {user?.person?.currencymethod}
                  </label>
                  {user?.person?.currencymethod === "alipay" && (
                    <label htmlFor="">
                      {language === "anglais"
                        ? "Alipay account"
                        : "Compte alipay"}
                      : {user?.person?.emailCurrencyEuro}
                    </label>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {modifProfil ? (
        <button className="modifyprofil-btn" onClick={handleModif}>
          {language === "anglais"
            ? "Undo changes"
            : "Annuler les modifications"}
        </button>
      ) : (
        <button className="modifyprofil-btn" onClick={handleModif}>
          {language === "anglais"
            ? "Edit my infomations"
            : "Modifier mes informations"}
        </button>
      )}

      {modifProfil && (
        <form onSubmit={handleSignupForm}>
          <div className="form-encapsulate-two">
            <div>
              <label htmlFor="lastname">
                {" "}
                {language === "anglais" ? "Lastname" : "Prenom"}
              </label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder={
                  language === "anglais" ? "Your lastname" : "Prénom"
                }
              />
              <div ref={lastnameError} className="errors-signup"></div>
            </div>
            <div>
              <label htmlFor="firtname">
                {language === "anglais" ? "Firstname" : "Nom"}
              </label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder={language === "anglais" ? "Your firstname" : "Nom"}
              />
              <div ref={firstnameError} className="errors-signup"></div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="phone">
              {" "}
              {language === "anglais" ? "Phone number" : "Numéro de Téléphone"}
            </label>
            <input
              style={{
                outline: "none",
                border: "1px solid #ccc",
                fontSize: "15px",
                padding: "5px 10px",
                cursor: "pointer",
                marginTop: "5px",
                maxWidth: "380px",
              }}
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={
                language === "anglais" ? "Phone number" : "Numéro de Téléphone"
              }
            />
            <div ref={phoneError} className="errors-signup"></div>
          </div>
          <div className="form-other-address">
            <label htmlFor="address">
              {" "}
              {language === "anglais" ? "Adress" : "Adresse"}
            </label>
            <input
              type="text"
              id="address"
              placeholder="Votre adrresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div ref={addressError} className="errors-signup"></div>
          </div>
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
          <div className="input-filebase">
            {/* <label htmlFor="chooseprofil">Choississez une photo</label> */}
            <span className="choose-filebase">
              <FileBase
                type="file"
                id="chooseprofil"
                multiple={false}
                onDone={({ base64 }) => setProfil(base64)}
              />
            </span>

            <img
              src={profil ? profil : profilUser}
              alt="profil"
              className="profil-absolute"
            />
          </div>
          <div className="container-secondform">
            <div>
              <label htmlFor="currencyName">
                {language === "anglais" ? "Your Currency" : "Votre Devise"}
              </label>
              <select
                name="currencyName"
                id="currencyName"
                value={currency}
                onChange={handleSelectCurrency}
              >
                <option
                  value=""
                  style={{
                    color: "gray",
                  }}
                >
                  {" "}
                  {language === "anglais"
                    ? "Choose currency"
                    : "Choisissez le devise"}
                </option>
                <option value="euro">Euro</option>
                <option value="dhs">Dhs</option>
                <option value="usdt">USDT</option>
                {/* <option value="cny">CNY</option> */}
              </select>
              <div ref={currencyError} className="errors-signup"></div>
            </div>

            {currency === "dhs" && (
              <div>
                <label htmlFor="">
                  {" "}
                  {language === "anglais"
                    ? "Payment methods"
                    : "Moyens de paiement"}
                </label>
                <select
                  name="paymentDhs"
                  id="paymentDhs"
                  onChange={handleSelectPayment}
                >
                  <option
                    value=""
                    style={{
                      color: "gray",
                    }}
                  >
                    {language === "anglais" ? "Choose" : " Choisir"}
                  </option>
                  <option value="virement bancaire">
                    {" "}
                    {language === "anglais"
                      ? "Bank Transfer"
                      : "Virement bancaire"}
                  </option>
                </select>
                <div ref={paymentMethodError} className="errors-signup"></div>
              </div>
            )}
            {currency === "euro" && (
              <div>
                <label htmlFor="">
                  {" "}
                  {language === "anglais"
                    ? "Payment methods"
                    : "Moyens de paiement"}
                </label>
                <select
                  name="paymentEuro"
                  id="paymentEuro"
                  onChange={handleSelectPayment}
                >
                  <option
                    value=""
                    style={{
                      color: "gray",
                    }}
                  >
                    {language === "anglais" ? "Choose" : " Choisir"}
                  </option>
                  <option value="skrill">Skrill</option>
                  <option value="paypal">Paypal</option>
                  <option value="sepa">Sepa</option>
                  <option value="paylib">Paylib</option>
                  <option value="payeer">Payeer</option>
                </select>
                <div ref={paymentMethodError} className="errors-signup"></div>
              </div>
            )}
            {currency === "usdt" && (
              <div>
                <label htmlFor="">
                  {" "}
                  {language === "anglais"
                    ? "Payment methods"
                    : "Moyens de paiement"}
                </label>
                <select
                  name="paymentUsdt"
                  id="paymentUsdt"
                  onChange={handleSelectPayment}
                >
                  <option
                    value=""
                    style={{
                      color: "gray",
                    }}
                  >
                    {language === "anglais" ? "Choose" : " Choisir"}
                  </option>
                  <option value="binance pay">Binance pay</option>
                  <option value="trc20">TRC20</option>
                </select>
                <div ref={paymentMethodError} className="errors-signup"></div>
              </div>
            )}
            {currency === "cny" && (
              <div>
                <label htmlFor="">
                  {" "}
                  {language === "anglais"
                    ? "Payment methods"
                    : "Moyens de paiement"}
                </label>
                <select
                  name="paymentCny"
                  id="paymentCny"
                  onChange={handleSelectPayment}
                >
                  <option
                    value=""
                    style={{
                      color: "gray",
                    }}
                  >
                    Choisir
                  </option>
                  <option value="alipay">Alipay</option>
                </select>
                <div ref={paymentMethodError} className="errors-signup"></div>
              </div>
            )}
          </div>
          <div>
            {(paymentSelected === "skrill" ||
              paymentSelected === "paypal" ||
              paymentSelected === "binance pay") && (
              <div className="container-secondform-single-spb">
                <label htmlFor="paymentmail">
                  {" "}
                  {language === "anglais"
                    ? "Payment email"
                    : "Email de paiement"}
                </label>
                <input
                  type="text"
                  id="paymentmail"
                  name="paymentEmail"
                  value={emailCurrencyEuro}
                  onChange={(e) => setEmailCurrencyEuro(e.target.value)}
                  placeholder={
                    language === "anglais"
                      ? "Payment email"
                      : "Email de paiement"
                  }
                />
                <div
                  ref={emailCurrencyEuroError}
                  className="errors-signup"
                ></div>
              </div>
            )}

            {paymentSelected === "payeer" && (
              <div className="container-secondform-single-alipay">
                <label htmlFor="payeer">
                  {" "}
                  {language === "anglais" ? "Payeer account" : "Compte Payeer"}
                </label>
                <input
                  type="text"
                  id="payeer"
                  placeholder={
                    language === "anglais" ? "Payeer account" : "Compte Payeer"
                  }
                  value={payeeraccount}
                  onChange={(e) => setPayeerAccount(e.target.value)}
                />
                <div ref={payeeraccountError} className="errors-signup"></div>
              </div>
            )}

            {paymentSelected === "paylib" && (
              <div className="container-secondform-single-paylib">
                <label htmlFor="lastpaylibname">
                  {" "}
                  {language === "anglais" ? "Lastname" : "Prénom"}
                </label>
                <input
                  type="text"
                  id="lastpaylibname"
                  value={paylibcurencyLastname}
                  onChange={(e) => setPaylibCurencyLastname(e.target.value)}
                  placeholder={language === "anglais" ? "Lastname" : "Prénom"}
                />
                <div
                  ref={paylibcurencyLastnameError}
                  className="errors-signup"
                ></div>
                <label htmlFor="firstpaylibname">
                  {language === "anglais" ? "Firstname" : "Nom"}
                </label>
                <input
                  type="text"
                  id="firstpaylibname"
                  value={paylibcurencyFirstname}
                  onChange={(e) => setPaylibCurencyFirstname(e.target.value)}
                  placeholder={language === "anglais" ? "Firstname" : "Nom"}
                />
                <div
                  ref={paylibcurencyFirstnameError}
                  className="errors-signup"
                ></div>
                <label htmlFor="paylibtel">
                  {" "}
                  {language === "anglais"
                    ? "Phone number"
                    : "Numéro de Téléphone"}
                </label>
                <input
                  type="tel"
                  id="paylibtel"
                  value={paylibcurencyTel}
                  onChange={(e) => setPaylibCurencyTel(e.target.value)}
                  placeholder={
                    language === "anglais"
                      ? "Phone number"
                      : "Numéro de Téléphone"
                  }
                />
                <div
                  ref={paylibcurencyTelError}
                  className="errors-signup"
                ></div>
              </div>
            )}

            {paymentSelected === "virement bancaire" && (
              <div className="container-secondform-single-bank-transfert">
                <label htmlFor="bancTransfert">
                  {language === "anglais" ? "Bank" : "Banque"}
                </label>
                <select
                  name="bancdhsvirement"
                  id="bancTransfert"
                  value={dhsBank}
                  onChange={(e) => setDhsBank(e.target.value)}
                >
                  <option value="">
                    {language === "anglais"
                      ? "Choose the bank"
                      : "Choisir la banque"}
                  </option>
                  <option value="cih bank">CIH Bank</option>
                  <option value="attijariwafa bank">Attijariwafa Bank</option>
                  <option value="bmce">BMCE</option>
                  <option value="societe generale">Société Générale</option>
                  <option value="barid bank">Barid Bank</option>
                </select>
                <div ref={dhsBankError} className="errors-signup"></div>
                <label htmlFor="lastnamevirement">
                  {language === "anglais" ? "Lastname" : "Prénom"}
                </label>
                <input
                  type="text"
                  id="lastnamevirement"
                  value={dhsBankLastname}
                  onChange={(e) => setDhsBankLastname(e.target.value)}
                  placeholder={
                    language === "anglais" ? "Your lastname" : "Votre Prénom"
                  }
                />
                <div ref={dhsBankLastnameError} className="errors-signup"></div>
                <label htmlFor="firstnamevirement">
                  {language === "anglais" ? "Firstname" : "Nom"}
                </label>
                <input
                  type="text"
                  id="firstnamevirement"
                  value={dhsBankFirstname}
                  onChange={(e) => setDhsBankFirstname(e.target.value)}
                  placeholder={
                    language === "anglais" ? "Your firstname" : "Votre nom"
                  }
                />
                <div
                  ref={dhsBankFirstnameError}
                  className="errors-signup"
                ></div>
                <label htmlFor="rib">RIB</label>
                <input
                  type="text"
                  name="rib"
                  id="rib"
                  value={dhsRib}
                  onChange={(e) => setDhsRib(e.target.value)}
                  placeholder={
                    language === "anglais" ? "Your RIB" : "Votre RIB"
                  }
                />
                <div ref={dhsRibError} className="errors-signup"></div>
              </div>
            )}

            {paymentSelected === "sepa" && (
              <div className="container-secondform-single-sepa">
                <label htmlFor="iban">
                  {language === "anglais" ? "Your IBAN" : "Votre IBAN"}
                </label>
                <input
                  type="text"
                  placeholder={
                    language === "anglais" ? "Your IBAN" : "Votre IBAN"
                  }
                  id="iban"
                  value={ibanCurrency}
                  onChange={(e) => setIbanCurrency(e.target.value)}
                />
                <div ref={ibanCurrencyError} className="errors-signup"></div>
              </div>
            )}

            {paymentSelected === "trc20" && (
              <div className="container-secondform-single-trc">
                <label htmlFor="trc">
                  {language === "anglais" ? "TRX address" : "Adresse TRX"}
                </label>
                <input
                  type="text"
                  id="trc"
                  placeholder={
                    language === "anglais" ? "TRX address" : "Adresse TRX"
                  }
                  value={usdtAdressTrx}
                  onChange={(e) => setUsdtAdressTrx(e.target.value)}
                />
                <div ref={usdtAdressTrxError} className="errors-signup"></div>
              </div>
            )}

            {paymentSelected === "alipay" && (
              <div className="container-secondform-single-alipay">
                <label htmlFor="alipay">
                  {" "}
                  {language === "anglais" ? "Alipay account" : "Compte Alipay"}
                </label>
                <input
                  type="text"
                  id="alipay"
                  placeholder={
                    language === "anglais" ? "Alipay account" : "Compte Alipay"
                  }
                  value={cnyacount}
                  onChange={(e) => setCnyAccount(e.target.value)}
                />
                <div ref={cnyacountError} className="errors-signup"></div>
              </div>
            )}
          </div>
          {/* <div className="container-secondform">
           <div></div>
         </div> */}
          <input
            type="submit"
            style={{
              background: "#0b0809",
              color: "#F4F4F4",
              border: "none",
              borderRadius: "5px",
            }}
            value={
              language === "anglais"
                ? "Update your profile"
                : "Mettre à jour votre profile"
            }
            className="signup-secondform-signup"
          />
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
        </form>
      )}
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

export default ModifyProfil;
