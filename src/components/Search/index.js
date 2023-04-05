import React from "react";
import { Input } from "antd";
import { Row, Col } from "react-bootstrap";
const { Search } = Input;
const SearchInput = ({setSearch}) => {
  const onSearch = (value) => setSearch(value);
  return (
    <Row className="justify-content-end inputSearch">
      <Col xs={12} sm={6} md={4}>
        {/* <Input placeholder="Buscar por cualquier palabra/s" prefix={<SearchOutlined />} /> */}
        <Search
          placeholder="Buscar por cualquier palabra/s"
          onSearch={onSearch}
          enterButton
        />
      </Col>
    </Row>
  );
};

export default SearchInput;
