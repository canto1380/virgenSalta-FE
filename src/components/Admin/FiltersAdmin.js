import React from "react";
import { Input, Space, Radio } from "antd";

import "./menus.css";
import { Col } from "react-bootstrap";

const { Search } = Input;

const FiltersAdmin = ({ deleted, setDeleted, setSearch }) => {
  const onChange = (e) => {
    setDeleted(e.target.value);
  };
  return (
    <div className="menuContainer">
      <div>
        <p className="fw-bolder">Filtros</p>
      </div>
      <div className="row d-flex justify-content-between align-items-center">
        <Col xs={12} lg={4} className='mb-3'>
          <Space direction="vertical"  style={{width: '100%'}}>
            <Search
            style={{width: '100%'}}
              placeholder="Nombre de categoría"
              enterButton="Buscar"
              size="medium"
              width={100}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Space>
        </Col>
        <Col xs={12} lg={8} className='mb-3'>
          <span className="me-4">Filtrar por: </span>
          <Radio.Group onChange={onChange} value={deleted}>
            <Radio value={undefined}>Todas</Radio>
            <Radio value={true}>Eliminadas</Radio>
            <Radio value={false}>No eliminadas</Radio>
          </Radio.Group>
        </Col>
      </div>
    </div>
  );
};

export default FiltersAdmin;
