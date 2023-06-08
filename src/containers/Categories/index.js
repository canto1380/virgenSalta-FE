import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import BackdropSections from "../../components/Backdrops/BackdropSections";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import NewsFilter from "../Noticias/NewsFilter";
import { getNewsCategory } from "../../utils/queryAPI/newsCategory";
import CardNewsCategorypage from "../../components/Categories/CategoriesPage/CardNewsCategorypage";
import LayoutFoot from "../../components/Layout/LayoutFoot";
import PaginationAdmin from "../../components/Admin/Pagination";

const Categories = () => {
  const [search, setSearch] = useState("");
  const [pageSelected, setPageSelected] = useState(1);
  const [limit, setLimit] = useState(10);
  const [newsCategoryData, setNewsCategoryData] = useState([])
  const [newsCategoryInf, setNewsCategoryInf] = useState()
  const deleted = false

  useEffect(() => {
    dataNewsCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search, pageSelected, limit])

  const dataNewsCategory = async() => {
    const params= {search, deleted, page: pageSelected, limit}
    const data = await getNewsCategory(params)
    setNewsCategoryData(data.allNewsCategory)
    setNewsCategoryInf(data)
  }
  return (
    <div className="bg-gradient-1">
      <Layout />
      <BackdropSections title="Categorías" />
      <Container className="mt-3 pt-5">
        <NewsFilter
        typeFlag='newsCategory'
          setSearch={setSearch}
        />
        {newsCategoryData ? (
          <Row className='mt-3 pb-5'>
            <div>
              <h5 className='pb-2'>Lista de Categorías</h5>
            </div>
            {newsCategoryData?.map((data) => (
              <Col key={data._id} xs={12} md={6} lg={4} className="mb-4">
                <CardNewsCategorypage data={data} />
              </Col>
            ))}
            <Row>
              <Col>
                <PaginationAdmin
                  data={newsCategoryInf}
                  pageSelected={pageSelected}
                  setPageSelected={setPageSelected}
                  setLimit={setLimit}
                />
              </Col>
            </Row>
          </Row>
        ) : (
          <Spinner animation="grow" variant="info" />
        )}
      </Container>
      <LayoutFoot />
    </div>
  );
};

export default Categories;
