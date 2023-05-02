import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  BsFillCaretRightFill,
  BsFillCaretLeftFill,
  BsNewspaper,
} from "react-icons/bs";
import { BiCategoryAlt, BiUserCircle } from "react-icons/bi";
import '../sidebar.css'

const Sidebar = ({ inactivo, setInactivo, tokenAuth, dataAuth, setTab }) => {
  const [initial, setInitial] = useState("");

  const changeTab = (dataTab) => {
    setTab(dataTab);
  };

  const itemsSideBar = [
    {
      title: 'Noticias',
      iconName: <BsNewspaper className="sizeIcon" />,
      name: 'Noticias'
    },
    {
      title: 'Categorias',
      iconName: <BiCategoryAlt className="sizeIcon" />,
      name: 'Categorias'
    },
    {
      title: 'Cuenta',
      iconName: <BiUserCircle className="sizeIcon" />,
      name: 'Cuenta'
    }

  ]
  useEffect(() => {
    const a = dataAuth?.name?.toUpperCase();
    setInitial(a?.substr(0, 1));
  }, [dataAuth]);
  return (
    <div
      className={`${
        inactivo
          ? `sidebarInactivo text-light bg-dark h-100`
          : `sidebar text-light bg-dark h-100`
      }`}
    >
      <Row
        className={`${
          inactivo
            ? "pt-4 pb-2 d-flex justify-content-center align-items-center m-0"
            : "pt-4 pb-2 d-flex justify-content-center align-items-center m-0"
        }`}
      >
        <Col
          xs={3}
          className={` ${
            inactivo
              ? `justify-content-center px-0 imgContainer`
              : `text-center px-0`
          }`}
        >
          <div className={`imgProfile text-center`}>{initial}AP</div>
        </Col>
        <Col xs={6} className="px-1">
          <p className={`${inactivo ? `inactivo` : "mb-0"}`}>
            {dataAuth?.nickname}
          </p>
        </Col>

        {inactivo ? (
          <Col
            xs={12}
            className={`text-light mt-3 btn-menu text-center px-0`}
            onClick={() => setInactivo(!inactivo)}
          >
            {<BsFillCaretRightFill title="Desplegar" className={`sizeIcon`} />}
          </Col>
        ) : (
          <Col
            xs={2}
            className={`p-0 text-light btn-menu`}
            onClick={() => setInactivo(!inactivo)}
          >
            {<BsFillCaretLeftFill title="Minimizar" className="sizeIcon" />}
          </Col>
        )}
      </Row>
      <hr />
      <ul className="text-decoration-none list-unstyled sidebarList">
        {
          itemsSideBar.map((items, i) =>(
            <li
            key={i}
            onClick={() => changeTab(items.title)}
            title={items.title}
            className={`${
              inactivo
                ? `sidebarListRow d-flex justify-content-center align-items-center`
                : `sidebarListRow d-flex justify-content-start px-3 align-items-center`
            }`}
          >
            <div className="">
              {items.iconName}
            </div>
            <div className={` ${inactivo ? `inactivo` : "ms-3"}`}>
              {items.name}
            </div>
          </li>
          ))
        }

      </ul>
    </div>
  );
};

export default Sidebar;
