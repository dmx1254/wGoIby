import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const DofusRetro = ({ servers }) => {
  const { user } = useSelector((state) => state.user);
  // const { servers } = useSelector((state) => state.servers);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      servers.filter((server) => server.serverCategory === "dofus-retro")
    );
  }, [servers]);
  const { language } = useSelector((state) => state.language);

  const { eurorate } = useSelector((state) => state.eurorate);
  const { dollarate } = useSelector((state) => state.dollarate);
  const { usdtra } = useSelector((state) => state.usdtra);
  const { cnyrate } = useSelector((state) => state.cnyrate);

  return (
    <div className="dofus-retro">
      <h1 className="dofus-retro-title">Dofus Retro</h1>
      <table id="retro">
        <thead>
          {language === "anglais" ? (
            <tr>
              <th>
                <div className="divider">
                  <span>Server</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Price</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>USDT</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Paypal</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Skrill</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Paylib</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Sepa</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Payeer</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          ) : (
            <tr>
              <th>
                <div className="divider">
                  <span>Serveur</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Prix</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>USDT</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Paypal</span>
                </div>
              </th>
              <th>
                {" "}
                <div className="divider">
                  <span>Skrill</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Paylib</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Sepa</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Payeer</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          )}
        </thead>
        {language === "anglais" ? (
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.serverName}</td>
                <td>
                  {item.serverPriceDh}{" "}
                  <span className="currency-color">Dhs/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / usdtra).toFixed(2)}
                  <span className="currency-color">Usdt/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <a href="javascript:void(Tawk_API.toggle())">
                  <td
                    className={
                      item.serverStatus === "Disponible"
                        ? "success"
                        : item.serverStatus === "Stock complet"
                        ? "no-success"
                        : "quickly"
                    }
                  >
                    {item.serverStatus === "Disponible" && "Clic to sell"}
                    {item.serverStatus === "Stock complet" && "Full Stock"}
                    {item.serverStatus === "Vendre rapidement" &&
                      "Sell quickly"}
                  </td>
                </a>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.serverName}</td>
                <td>
                  {item.serverPriceDh}
                  <span className="currency-color">Dhs/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / usdtra).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <a href="javascript:void(Tawk_API.toggle())">
                  <td
                    className={
                      item.serverStatus === "Disponible"
                        ? "success"
                        : item.serverStatus === "Stock complet"
                        ? "no-success"
                        : "quickly"
                    }
                  >
                    {item.serverStatus === "Disponible"
                      ? "Cliquer pour vendre"
                      : item.serverStatus}
                  </td>
                </a>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DofusRetro;
