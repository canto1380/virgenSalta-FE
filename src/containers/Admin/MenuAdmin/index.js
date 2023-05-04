import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getToken, getDataToken } from "../../../helpers/helpers";
import Sidebar from "../../../components/Admin/Sidebar";
import "../index.css";
import "../../../components/Admin/sidebar.css";
import MenuNews from "../../../components/Admin/MenuNews";
import MenuCategories from "../../../components/Admin/MenuCategories";

const MenuAdmin = ({ userInfo }) => {
  const [inactivo, setInactivo] = useState(false);
  const [tokenAuth, setTokenAuth] = useState([]);
  const [dataAuth, setDataAuth] = useState([]);
  const [tab, setTab] = useState("Noticias");

  useEffect(() => {
    const tokenData = getToken();
    setTokenAuth(tokenData);
    setDataAuth(getDataToken)
  }, [tokenAuth]);

  console.log(tokenAuth);
  console.log(dataAuth)

  return (
    <Container
      fluid
      className="container-admin p-0 d-flex justify-content-start"
    >
      <Sidebar
        setTab={setTab}
        inactivo={inactivo}
        setInactivo={setInactivo}
        tokenAuth={tokenAuth}
        dataAuth={dataAuth}
      />
      {tab === "Noticias" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`}`}>
          <MenuNews tokenAuth={tokenAuth} dataAuth={userInfo} setTab={setTab} />
        </div>
      )}
      {tab === "Categorias" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuCategories
            tokenAuth={tokenAuth}
            dataAuth={userInfo}
            setTab={setTab}
          />
        </div>
      )}
    </Container>
  );
};

export default MenuAdmin;
