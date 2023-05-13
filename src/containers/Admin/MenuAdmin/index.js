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
import { getNewsCategory } from "../../../utils/queryAPI/newsCategory";
import { getNews } from "../../../utils/queryAPI/news";

const MenuAdmin = ({ userInfo }) => {
  const [inactivo, setInactivo] = useState(false);
  const [tokenAuth, setTokenAuth] = useState([]);
  const [dataAuth, setDataAuth] = useState([]);
  const [tab, setTab] = useState("Noticias");
  const [userData, setUserData] = useState([]);
  const [newsCategoryData, setNewsCategoryData] = useState([]);
  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    const tokenData = getToken();
    setTokenAuth(tokenData);
    setDataAuth(getDataToken);
  }, []);
  useEffect(() => {
    dataUser();
    dataNewsCategory()
    dataNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAuth]);
  const dataUser = async () => {
    const data = await getUserById(dataAuth?._id, tokenAuth);
    setUserData(data);
  };
  const dataNewsCategory = async () => {
    const data = await getNewsCategory()
    setNewsCategoryData(data)
  }
  const dataNews = async () => {
    const data = await getNews()
    setNewsData(data)
  }
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
          <MenuNews tokenAuth={tokenAuth} dataAuth={userData} setTab={setTab} newsData={newsData}/>
        </div>
      )}
      {tab === "Categorias" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuCategories
            tokenAuth={tokenAuth}
            dataAuth={userInfo}
            setTab={setTab}
            newsCategoryData={newsCategoryData}
          />
        </div>
      )}
      {tab === "Cuenta" && (
        <div className={`${inactivo ? `parte2Inactivo` : `parte2`} `}>
          <MenuAccount
            tokenAuth={tokenAuth}
            dataAuth={userData}
            setTab={setTab}
          />
        </div>
      )}
    </Container>
  );
};

export default MenuAdmin;
