import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import BackdropNews from "../../components/News/NewsPage/BackdropNews";
import CardNewsPage from "../../components/News/NewsPage/CardNewsPage";
import { noticias } from "../../utils/seeders";
import { Pagination } from "antd";
import Search from "../../components/Search";

const Noticias = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1 });
  const [loading, setLoading] = useState(false);
  const [noticiasUse, setNoticiasUse] = useState();

  const getActivities = async (page) => {
    setLoading(true);

    let query = { page: page || pagination.page };

    if (search !== "") query = { ...query, search };

    const params = new URLSearchParams(query).toString();
    console.log(noticiasUse, loading, params);

    // const {
    //   success,
    //   docs,
    //   hasNextPage,
    //   hasPrevPage,
    //   nextPage,
    //   totalDocs,
    //   totalPages
    //   // page
    // } = await api('get', 'activities', `?${params}`, {}, '')

    setLoading(false);

    // if(success) {
    setNoticiasUse(noticias);
    setPagination({
      hasNextPage: 4,
      hasPrevPage: 1,
      nextPage: 4,
      page,
      limit: 5,
      totalDocs: 40,
      totalPages: 4,
    });
    // }
  };
  useEffect(() => {
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const doSearch = () => {
    getActivities(1);
  };
  console.log(search)
  return (
    <div className="img-backpage">
      <BackdropNews />
      <Container className="mt-5 pt-5">
        <Search setSearch={setSearch}/>
        {noticias.length > 0 ? (
          <Row className="mt-3 pb-5">
            {noticias?.map((noti, i) => (
              <Col key={i} xs={12} md={6} lg={4} className="mb-4">
                <CardNewsPage info={noti} />
              </Col>
            ))}
            {pagination.totalPages && (
              <Pagination
                className="text-center"
                defaultCurrent={1}
                defaultPageSize={pagination.limit}
                onChange={(page) => getActivities(page)}
                style={{ float: "right", margin: 20 }}
                total={pagination.totalDocs}
              />
            )}
          </Row>
        ) : (
          <Spinner animation="grow" variant="info" />
        )}
      </Container>
    </div>
  );
};

export default Noticias;
