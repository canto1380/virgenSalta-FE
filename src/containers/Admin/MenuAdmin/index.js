import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getToken, getDataToken } from "../../../helpers/helpers";
import Sidebar from "../../../components/Admin/Sidebar";
import "../index.css";
import "../../../components/Admin/sidebar.css";
import MenuNews from "../../../components/Admin/MenuNews";
import MenuCategories from "../../../components/Admin/MenuCategories";
import MenuAccount from "../../../components/Admin/MenuAccount";
import { getUserById } from "../../../utils/queryAPI/user";
import Unauthorized from "../../../components/Unauthorized";
import { useParams } from "react-router-dom";
import MenuSchedules from "../../../components/Admin/MenuSchedules";

const MenuAdmin = ({ userInfo }) => {
  const [inactivo, setInactivo] = useState(false);
  const [tokenAuth, setTokenAuth] = useState([]);
  const [dataAuth, setDataAuth] = useState([]);
  const [userData, setUserData] = useState([]);
  const [modalUnauthorized, setModalUnauthorized] = useState(false);

  const {idTab} = useParams()

  useEffect(() => {
    const tokenData = getToken();
    setTokenAuth(tokenData);
    setDataAuth(getDataToken);
  }, []);
  useEffect(() => {
    dataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAuth]);
  const dataUser = async () => {
    const data = await getUserById(dataAuth?._id, tokenAuth);
    if (data === false) {
      setModalUnauthorized(true);
    }
    setUserData(data);
  };

  return (
    <Container
      fluid
      className="container-admin p-0 d-flex justify-content-start"
    >
      <Sidebar
        // setTab={setTab}
        inactivo={inactivo}
        setInactivo={setInactivo}
        tokenAuth={tokenAuth}
        dataAuth={dataAuth}
      />
      <Container fluid className='container-admin-data'>

      {idTab === "noticias" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`}`}>
          <MenuNews
            tokenAuth={tokenAuth}
            dataAuth={userData}
          />
        </div>
      )}
      {idTab === "categorias" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuCategories
            tokenAuth={tokenAuth}
            dataAuth={userInfo}
          />
        </div>
      )}
      {idTab === "cuenta" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuAccount
            tokenAuth={tokenAuth}
            dataAuth={userData}
          />
        </div>
      )}
      {idTab === "horarios" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuSchedules
            tokenAuth={tokenAuth}
            dataAuth={userData}
          />
        </div>
      )}

      {modalUnauthorized && (
        <div className="">
          <Unauthorized />
        </div>
      )}
      </Container>
    </Container>
  );
};

export default MenuAdmin;
