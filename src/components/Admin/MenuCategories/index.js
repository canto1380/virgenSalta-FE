import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FiltersAdmin from "../FiltersAdmin";
import HeaderList from "../HeaderList";
import ListElements from "../ListElements";
import { getNewsCategory } from "../../../utils/queryAPI/newsCategory";
import { User } from "../../../context/userProvider";
import FormAddEdit from "./FormAddEdit";
import PaginationAdmin from "../Pagination";

const MenuCategories = () => {
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(undefined);
  const [newsCategoryData, setNewsCategoryData] = useState([]);
  const [band, setBand] = useState(false);
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSelected, setPageSelected] = useState(1);
  const [formEdit, setFormEdit] = useState(false)
  const [dataRegisterEdit, setDataRegisterEdit ] = useState(null)

  const {
    state: { userToken },
  } = useContext(User);

  useEffect(() => {
    dataNewsCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deleted, band, pageSelected]);

  const dataNewsCategory = async () => {
    const params = { search, deleted, page: pageSelected };
    const data = await getNewsCategory(params);
    setNewsCategoryData(data);
  };
  const funci =(da) => {
    setDataRegisterEdit(da)
    setFormEdit(!formEdit)
  }
  return (
    <Container fluid>
      <Row>
        <Col className="mt-3">
          <div className={`pt-4 pb-1 px-4`}>
            <h3>Categorías</h3>
          </div>
        </Col>
      </Row>
      {!form && !formEdit ? (
        <Row>
          <Col>
            <FiltersAdmin
              setSearch={setSearch}
              deleted={deleted}
              setDeleted={setDeleted}
            />
            <HeaderList
              title="Listado de categorías"
              form={form}
              setForm={setForm}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              funci={funci}
            />
            <ListElements
              data={newsCategoryData}
              userToken={userToken}
              band={band}
              setBand={setBand}
              funci={funci}
            />
            <PaginationAdmin
              data={newsCategoryData}
              pageSelected={pageSelected}
              setPageSelected={setPageSelected}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <HeaderList
              title="Nueva categoría"
              form={form}
              setForm={setForm}
              loading={loading}
              setLoading={setLoading}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              funci={funci}
            />
            <FormAddEdit
              userToken={userToken}
              loading={loading}
              setLoading={setLoading}
              dataRegisterEdit={dataRegisterEdit}
            />
          </Col>
        </Row>
      )}

    </Container>
  );
};

export default MenuCategories;
