import React, { useState, useRef } from "react";

// import Recaptcha from "react-google-recaptcha";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import axios from "axios";

import { addUser } from "../features/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GrMail } from "react-icons/gr";
import { AiFillLock } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Signin = () => {
  const dispatch = useDispatch();
  const notyFyErrorSignin = () =>
    toast.error("Connexion échouée, veuillez réessayer ulterieurement");

  const convertDate = (date) => {
    const dateConverted = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateConverted;
  };

  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailError = useRef();
  const passwordError = useRef();
  const { language } = useSelector((state) => state.language);
  const handleLogin = (e) => {
    e.preventDefault();
    emailError.current.innerHTML = "";
    passwordError.current.innerHTML = "";
    if (!email || !password) {
      if (!email) {
        emailError.current.innerHTML = "Email inconnu";
      }
      if (!password) {
        passwordError.current.innerHTML =
          "Le mot de passe doit avoir 6 caracteres minimum";
      }
    } else {
      // console.log("Email " + email + "   password" + password);
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/users/login`,
          data: {
            email,
            password,
          },
          withCredentials: true,
        }).then((res) => {
          if (res.data.message) {
            emailError.current.innerHTML = res.data.message;
            // console.log(res.data);
          } else {
            // console.log(res.data);
            dispatch(addUser(res.data));
            // axios({
            //   method: "post",
            //   url: `${process.env.REACT_APP_CLIENT_URL}/connect`,
            //   data: {
            //     userId: res?.data?._id,
            //     lastname: res?.data?.lastname,
            //     firstname: res?.data?.firstname,
            //     dateToConnect: convertDate(new Date().getTime()),
            //   },
            // })
            //   .then((res) => console.log(res?.data))
            //   .catch((error) => console.log(error));
            window.location = "/";
          }
        });
      } catch (error) {
        // notyFyErrorSignin();
        console.log(error);
      }
    }
  };
  return (
    <div className={`signin ${location.pathname !== "/" && "signin-img"}`}>
      {location.pathname === "/" || (
        <h1 className="signin-title">
          {language === "anglais"
            ? "Log-In to Sell !"
            : "Connectez vous pour vendre !"}
        </h1>
      )}

      <div className="signin-container">
        <span className="signin-container-lock">
          <BiLock />
        </span>
        <form
          className="singnin-form"
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <div className="signin-form-mail">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoFocus
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                language === "anglais" ? "Your e-mail" : "Votre Email"
              }
            />
            <span className="signin-form-pass-iconMail">
              <GrMail />
            </span>
          </div>
          <div ref={emailError} className="errors-signin"></div>
          <div className="signin-form-pass">
            <label htmlFor="password">
              {language === "anglais" ? "Password" : "Mot de passe"}
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === "anglais" ? "Password" : "Mot de passe"}
            />
            <span className="signin-form-pass-iconPass">
              <AiFillLock />
            </span>
          </div>
          <div ref={passwordError} className="errors-signin"></div>
          {/* <div className="signin-form-privacy">
            <input
              type="checkbox"
              name="privacyCheck"
              id="privacyCheck"
              className="privacy-check"
            />
            <span className="privacy-condition">
              Veuillez accepte les <Link to="/">termes et conditions</Link> et
              la <Link to="/">politique de confidentialité</Link>
            </span>
          </div> */}
          {/* <Recaptcha sitekey="6LeYtyMiAAAAAEV7pge9JJlmGehyxtjca33zoiYe" /> */}
          <input
            type="submit"
            value={language === "anglais" ? "Sign In" : "Connexion"}
            className="form-login"
          />
          {language === "anglais" ? (
            <span
              style={{
                fontSize: "14px",
              }}
            >
              You do not have an account ?{" "}
              <Link
                to="/register"
                style={{
                  color: "#1652f0",
                }}
              >
                Sign up
              </Link>
            </span>
          ) : (
            <span
              style={{
                fontSize: "14px",
              }}
            >
              Vous n'avez pas de compte?{" "}
              <Link
                to="/register"
                style={{
                  color: "#1652f0",
                }}
              >
                Inscrivez vous
              </Link>
            </span>
          )}

          <div
            style={{
              textAlign: "center",
            }}
          >
            <Link to="/resetpassword">
              <span
                style={{
                  color: "#1652f0",
                }}
              >
                {language === "anglais"
                  ? "Forgot Password ?"
                  : "Mot de passe oublié"}
              </span>
            </Link>
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
        </form>
      </div>
    </div>
  );
};

export default Signin;
