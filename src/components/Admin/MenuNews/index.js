import React, { useState, useEffect, useContext } from "react";
import "./menuNews.css";
import { Container, Row, Col } from "react-bootstrap";
import { getNews } from "../../../utils/queryAPI/news";
import FiltersAdmin from "../FiltersAdmin";
import HeaderList from "../HeaderList";
import ListElements from "../ListElements";
import PaginationAdmin from "../Pagination";
import { User } from "../../../context/userProvider";
import { getNewsCategory } from "../../../utils/queryAPI/newsCategory";
import NewsAddEdit from "./NewsAddEdit";

// import moment from "moment/moment";
// import { api } from "../../../utils/api";
// import MsgError from "../../Messages/MsgError";

const MenuNews = () => {
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(undefined);
  const [idNewsCategory, setIdNewsCategory] = useState(undefined)
  const [newsData, setNewsData] = useState([]);
  const [newsCategoryData, setNewsCategoryData] = useState([]);
  const [band, setBand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSelected, setPageSelected] = useState(1);
  const [formAdd, setFormAdd] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [dataRegisterEdit, setDataRegisterEdit] = useState(null);

  const {
    state: { userToken },
  } = useContext(User);

  useEffect(() => {
    dataNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected, idNewsCategory]);

  const dataNews = async () => {
    const params = { search, deleted, page: pageSelected, idNewsCategory };
    const data = await getNews(params);
    setNewsData(data);
  };

  useEffect(() => {
    dataNewsCategory();
  }, []);
  const dataNewsCategory = async () => {
    const params = { limit: 1000 };
    const data = await getNewsCategory(params);
    setNewsCategoryData(data);
  };

  const resetValuesEdit = (valueEdit) => {
    setDataRegisterEdit(valueEdit);
    setFormEdit(!formEdit);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="mt-3">
          <div className={`pt-4 pb-1 px-4`}>
            <h3>Noticias</h3>
          </div>
        </Col>
      </Row>
      {!formAdd && !formEdit ? (
        <Row>
          <Col>
            <FiltersAdmin
              setSearch={setSearch}
              deleted={deleted}
              setDeleted={setDeleted}
              setIdNewsCategory={setIdNewsCategory}
              newsRoute="news"
              data={newsCategoryData?.allNewsCategory}
            />
            <HeaderList
              title="Listado de Noticias"
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <ListElements
              data={newsData?.allNews}
              userToken={userToken}
              band={band}
              setBand={setBand}
              resetValuesEdit={resetValuesEdit}
              routeAPI="news"
            />
            <PaginationAdmin
              data={newsData}
              pageSelected={pageSelected}
              setPageSelected={setPageSelected}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title="Nueva noticia"
              formAdd={formAdd}
              setFormAdd={setFormAdd}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              resetValuesEdit={resetValuesEdit}
            />
            <NewsAddEdit
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
              data={newsCategoryData?.allNewsCategory}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MenuNews;
