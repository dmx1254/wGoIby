import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import FileBase from "react-file-base64";
import profilUser from "../assets/default-user.png";

import emailjs from "@emailjs/browser";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { City } from "country-state-city";
import { BsCheckLg } from "react-icons/bs";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useSelector } from "react-redux";
const lookup = require("country-code-lookup");

const Signup = () => {
  const [dataStock, setDataStock] = useState();
  const [firstFip, setFisrtFip] = useState(lookup.byCountry("Albania").iso2);
  const [countrySelected, setCountrySelected] = useState("");
  const [codeCountry, setCodeCountry] = useState();
  const [citySelected, setCitySelected] = useState(
    City.getCitiesOfCountry(firstFip)
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [currency, setCurrency] = useState("");
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
  const [usdtPaymentEmail, setUsdtPaymentEmail] = useState("");
  const [usdtAdressTrx, setUsdtAdressTrx] = useState("");
  const [cnyacount, setCnyAccount] = useState("");
  const [payeeraccount, setPayeerAccount] = useState("");
  const [profil, setProfil] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [allCountry, setAllCountry] = useState(lookup.countries);
  const [percentCount, setPercentCount] = useState(0);
  const [toggleFirstStep, setToggleFirstStep] = useState(true);
  const [toggleSecondStep, setToggleSecondStep] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  let [paymentSelected, setPaymentSelected] = useState({
    paymentEuro: "",
    paymentDhs: "",
    paymentUsdt: "",
    paymentCny: "",
  });
  const [verifyCode, setVerifyCode] = useState(false);

  const lastnameError = useRef();
  const firstnameError = useRef();
  const emailError = useRef();
  const passwordError = useRef();
  const phoneError = useRef();
  const addressError = useRef();
  const cityError = useRef();
  const codeError = useRef();
  const confirmPasswordError = useRef();
  const countrySelectedError = useRef();
  const nextError = useRef();
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

  useEffect(() => {
    setFisrtFip(lookup.byCountry(countrySelected)?.iso2);
  }, [countrySelected]);
  useEffect(() => {
    setCitySelected(City.getCitiesOfCountry(firstFip));
  }, [countrySelected, firstFip]);

  const handleSelectCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const handleSelectPayment = (e) => {
    setPaymentSelected(([e.target.name] = e.target.value));
  };

  const notifyEmail = () =>
    toast.success(
      "Vérifier votre adresse e-mail, le code de vérification vous est envoyé"
    );

  const notifyEmailError = (mess) => toast.error(mess);

  const sendEmail = () => {
    const codeGenerated = () => {
      const generateRandomCode =
        "0123456789abcdefghijklmnopkrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      let myCode = "";
      for (let i = 0; i < 4; i++) {
        let code = Math.floor(Math.random() * generateRandomCode.length);
        myCode += generateRandomCode[code];
      }
      return myCode;
    };

    const codeSending = codeGenerated();
    var templateParams = {
      user_name: "Ibendouma",
      user_email: email,
      message: `Votre code de confirmation est: ${codeSending}`,
    };

    emailjs
      .send(
        "service_3pl4lcy",
        "template_wuj5kqm",
        templateParams,
        "FsoutDjD1w8st7me5"
      )
      .then(
        function (response) {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/code`,
            data: {
              code: codeSending,
            },
          }).then((res) => {
            // console.log(res.data);
            notifyEmail();
            setVerifyCode(true);
          });
          // console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const notifyFirstStep = () =>
    toast.success(
      "Premiere etape réussie, il ne vous reste qu'une seule étape pour valider votre inscription"
    );

  const notyFySuccessRegister = () =>
    toast.success("Inscription réussie, veuillez vous connecter");

  const handleConfirmEmail = (e) => {
    e.preventDefault();
    emailError.current.innerHTML = "";
    passwordError.current.innerHTML = "";
    confirmPasswordError.current.innerHTML = "";
    lastnameError.current.innerHTML = "";
    firstnameError.current.innerHTML = "";
    phoneError.current.innerHTML = "";
    addressError.current.innerHTML = "";
    cityError.current.innerHTML = "";
    codeError.current.innerHTML = "";
    countrySelectedError.current.innerHTML = "";
    nextError.current.innerHTML = "";
    if (!firstname || !lastname) {
      if (!firstname) {
        firstnameError.current.innerHTML =
          "Ce champ doit comporter au minimum 2 caracteres";
      }
      if (!lastname) {
        lastnameError.current.innerHTML =
          "Ce champ doit comporter au minimum 2 caracteres";
      }
    } else if (!countrySelected || !city) {
      if (!countrySelected) {
        countrySelectedError.current.innerHTML =
          "Veuiller choisr un pays avant de continuer";
      }

      if (!city) {
        cityError.current.innerHTML = "Ce champ ne doit pas être vide";
      }
    } else if (!phone) {
      phoneError.current.innerHTML =
        "Veuiller saisir un numéro de téléphone valide";
    } else if (!address) {
      addressError.current.innerHTML = "Ce champ ne doit pas être vide";
    } else if (!email || !password) {
      if (!email) {
        emailError.current.innerHTML = "Email inconnu";
      }

      if (!password) {
        passwordError.current.innerHTML =
          "Le mot de passe doit comporter au minimum 6 caracteres";
      }
    } else if (confirmPassword !== password) {
      confirmPasswordError.current.innerHTML =
        "Les mots de passe ne correspondent pas";
    } else {
      try {
        sendEmail();
        // axios({
        //   method: "post",
        //   url: `${process.env.REACT_APP_CLIENT_URL}/checkemail`,
        //   data: {
        //     email,
        //   },
        // }).then((res) => {
        //   console.log(res.data);
        //   notifyEmail();
        //   // language === "anglais" && notifyEmailEnglish();
        //   // language === "espagnol" && notifyEmailEspanish();
        //   setVerifyCode(true);
        // });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(emailCurrencyEuro)
  // console.log(usdtAdressTrx)
  // console.log(currency)

  const handleNextStep = () => {
    emailError.current.innerHTML = "";
    passwordError.current.innerHTML = "";
    confirmPasswordError.current.innerHTML = "";
    lastnameError.current.innerHTML = "";
    firstnameError.current.innerHTML = "";
    phoneError.current.innerHTML = "";
    addressError.current.innerHTML = "";
    cityError.current.innerHTML = "";
    codeError.current.innerHTML = "";
    countrySelectedError.current.innerHTML = "";
    nextError.current.innerHTML = "";
    if (!firstname || !lastname) {
      if (!firstname) {
        firstnameError.current.innerHTML =
          "Ce champ doit comporter au minimum 2 caracteres";
      }
      if (!lastname) {
        lastnameError.current.innerHTML =
          "Ce champ doit comporter au minimum 2 caracteres";
      }
    } else if (!countrySelected || !city) {
      if (!countrySelected) {
        countrySelectedError.current.innerHTML =
          "Veuiller choisr un pays avant de continuer";
      }

      if (!city) {
        cityError.current.innerHTML = "Ce champ est requis";
      }
    } else if (!phone) {
      phoneError.current.innerHTML =
        "Veuiller saisir un numéro de téléphone valide";
    } else if (!address) {
      addressError.current.innerHTML = "Ce champ ne doit pas être vide";
    } else if (!email || !password) {
      if (!email) {
        emailError.current.innerHTML = "Email inconnu";
      }

      if (!password) {
        passwordError.current.innerHTML =
          "Le mot de passe doit comporter au minimum 6 caracteres";
      }
    } else if (confirmPassword !== password) {
      confirmPasswordError.current.innerHTML =
        "Les mots de passe ne correspondent pas";
    } else {
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/checkemail/verifycode`,
          data: {
            code: code.trim(),
          },
        }).then((res) => {
          if (res.data.message === true) {
            console.log(res.data);
            setPercentCount(50);
            setToggleFirstStep(false);
            setToggleSecondStep(true);
            notifyFirstStep();
          } else {
            codeError.current.innerHTML = "Le code saisi est incorrect";
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          data.email = email;
          data.password = password;
          data.cnyacount = cnyacount;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.country = country;
          data.city = city;
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
          data.country = countrySelected;
          data.city = city;
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
          data.email = email;
          data.password = password;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.country = countrySelected;
          data.city = city;
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
          data.email = email;
          data.password = password;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.country = countrySelected;
          data.city = city;
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
          data.email = email;
          data.password = password;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.country = countrySelected;
          data.city = city;
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
          data.email = email;
          data.password = password;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.country = countrySelected;
          data.city = city;
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
          data.email = email;
          data.password = password;
          data.cnyacount = cnyacount;
          data.profil = profil;
          data.lastname = lastname;
          data.firstname = firstname;
          data.phone = phone;
          data.address = address;
          data.country = countrySelected;
          data.city = city;
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
      console.log(data);
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/users/register`,
          data,
        }).then((res) => {
          if (res.data.errors) {
            notifyEmailError(res.data.errors.email);
          } else {
            // console.log(res.data);
            setPercentCount(100);
            notyFySuccessRegister();
            window.location = "/login";
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="signup">
      <h1 className="signup-title-signup">
        {language === "anglais"
          ? "Welcome on ibytrade.com, Register to get more offers !"
          : " Bienvenue sur ibytrade.com, inscrivez vous pour avoir plus d'offres !"}
      </h1>
      <div className="signup-progress">
        <ProgressBar
          percent={percentCount}
          height={20}
          filledBackground="linear-gradient(to right, #129af6, #2357bd)"
        >
          <Step transition="scale">
            {({ accomplished }) => (
              <BsCheckLg
                style={{
                  color: "#34ef47",
                  marginLeft: "20px",
                  fontSize: "22px",
                }}
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <BsCheckLg
                style={{
                  color: "#34ef47",
                  marginLeft: "20px",
                  fontSize: "22px",
                }}
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <BsCheckLg
                style={{
                  color: "#34ef47",
                  marginRight: "20px",
                  fontSize: "22px",
                }}
              />
            )}
          </Step>
        </ProgressBar>
      </div>

      {toggleFirstStep && !toggleSecondStep && (
        <div className="signup-firstform">
          <form onSubmit={handleConfirmEmail}>
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
                  placeholder={
                    language === "anglais" ? "Your firstname" : "Nom"
                  }
                />
                <div ref={firstnameError} className="errors-signup"></div>
              </div>
            </div>
            <div className="form-encapsulate-two">
              <div>
                <label htmlFor="country">
                  {" "}
                  {language === "anglais" ? "Country" : "Pays"}
                </label>
                <select
                  name="country"
                  id="country"
                  value={countrySelected}
                  onChange={(e) => setCountrySelected(e.target.value)}
                >
                  {language === "anglais" ? (
                    <option
                      value="Choose a country"
                      style={{
                        color: "gray",
                      }}
                    >
                      Choose a country
                    </option>
                  ) : (
                    <option
                      value="Choose a country"
                      style={{
                        color: "gray",
                      }}
                    >
                      Choisir un pays
                    </option>
                  )}
                  {allCountry.map((country) => (
                    <option value={country.country}>{country.country}</option>
                  ))}
                </select>
                <div ref={countrySelectedError} className="errors-signup"></div>
              </div>

              <div>
                <label htmlFor="city">
                  {" "}
                  {language === "anglais" ? "City" : "Ville"}
                </label>
                <select
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {language === "anglais" ? (
                    <option
                      value="Choose a country"
                      style={{
                        color: "gray",
                      }}
                    >
                      Choose a city
                    </option>
                  ) : (
                    <option
                      value="Choose a country"
                      style={{
                        color: "gray",
                      }}
                    >
                      Choisir une ville
                    </option>
                  )}
                  {citySelected.map((city) => (
                    <option value={city.name}>{city.name}</option>
                  ))}
                </select>
                <div ref={cityError} className="errors-signup"></div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className="signup-input-phone"
            >
              <label htmlFor="phone">
                {" "}
                {language === "anglais"
                  ? "Phone number"
                  : "Numéro de Téléphone"}
              </label>
              <input
                style={{
                  outline: "none",
                  border: "1px solid #ccc",
                  fontSize: "15px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginTop: "5px",
                  width: "100%",
                }}
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={
                  language === "anglais"
                    ? "Phone number"
                    : "Numéro de Téléphone"
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
            <div className="form-other-mailconfirm">
              <label htmlFor="email">
                {language === "anglais" ? "e-mail" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === "anglais" ? "e-mail" : "Email"}
              />
              <div ref={emailError} className="errors-signup"></div>
              <label htmlFor="password">
                {language === "anglais" ? "Password" : "Mot de passe"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  language === "anglais" ? "Password" : "Mot de passe"
                }
                id="password"
              />
              <div ref={passwordError} className="errors-signup"></div>
              <label htmlFor="confirmpassword">
                {language === "anglais"
                  ? "Confirm Password"
                  : "Confirmer mot de passe"}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmpassword"
                placeholder={
                  language === "anglais"
                    ? "Confirm Password"
                    : "Confirmer mot de passe"
                }
              />
              <div ref={confirmPasswordError} className="errors-signup"></div>
              <div className="emailconfirm-container">
                <input
                  type="text"
                  placeholder={
                    language === "anglais" ? "enter the code" : "entrer le code"
                  }
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {!code.length && (
                  <button
                    className="emailconfirm-btn"
                    onClick={handleConfirmEmail}
                  >
                    {" "}
                    {language === "anglais"
                      ? "Receive the code"
                      : "Obtenir le code"}
                  </button>
                )}
              </div>
              <div ref={codeError} className="errors-signup"></div>
            </div>

            <div ref={nextError} className="errors-signup"></div>
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
          {verifyCode && code && (
            <button className="formsubmit-next" onClick={handleNextStep}>
              {language === "anglais" ? "Next" : "Suivant"}
            </button>
          )}
          <div className="already_have_account">
            {language === "anglais" ? (
              <span>
                You already have an account,{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#129af6",
                  }}
                >
                  log in
                </Link>
              </span>
            ) : (
              <span>
                Vous avez déjà un compte,{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#129af6",
                  }}
                >
                  connectez-vous
                </Link>
              </span>
            )}
          </div>
        </div>
      )}
      {!toggleFirstStep && toggleSecondStep && (
        <div className="signup-secondform">
          <form onSubmit={handleSignupForm}>
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
                  {/* <option
                    value=""
                    style={{
                      color: "gray",
                    }}
                  >
                    Choisissez le devise
                  </option> */}
                  <option
                    style={{
                      color: "gray",
                    }}
                    value=""
                  >
                    Choisissez le devise
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
              {/* {currency === "cny" && (
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
                      CNY
                    </option>
                    <option value="alipay">Alipay</option>
                  </select>
                  <div ref={paymentMethodError} className="errors-signup"></div>
                </div>
              )} */}
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
                    type="email"
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
                  <div
                    ref={dhsBankLastnameError}
                    className="errors-signup"
                  ></div>
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

              {/* {paymentSelected === "alipay" && (
                <div className="container-secondform-single-alipay">
                  <label htmlFor="alipay">
                    {" "}
                    {language === "anglais"
                      ? "Alipay account"
                      : "Compte Alipay"}
                  </label>
                  <input
                    type="text"
                    id="alipay"
                    placeholder={
                      language === "anglais"
                        ? "Alipay account"
                        : "Compte Alipay"
                    }
                    value={cnyacount}
                    onChange={(e) => setCnyAccount(e.target.value)}
                  />
                  <div ref={cnyacountError} className="errors-signup"></div>
                </div>
              )} */}

              {paymentSelected === "payeer" && (
                <div className="container-secondform-single-alipay">
                  <label htmlFor="payeer">
                    {" "}
                    {language === "anglais"
                      ? "Payeer account"
                      : "Compte Payeer"}
                  </label>
                  <input
                    type="text"
                    id="payeer"
                    placeholder={
                      language === "anglais"
                        ? "Payeer account"
                        : "Compte Payeer"
                    }
                    value={payeeraccount}
                    onChange={(e) => setPayeerAccount(e.target.value)}
                  />
                  <div ref={payeeraccountError} className="errors-signup"></div>
                </div>
              )}
            </div>
            {/* <div className="container-secondform">
              <div></div>
            </div> */}
            <input
              type="submit"
              value={
                language === "anglais"
                  ? "Confirm your registration"
                  : "Valider Votre inscription"
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
        </div>
      )}
    </div>
  );
};

export default Signup;
