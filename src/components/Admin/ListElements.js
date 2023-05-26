import React, { useState, useEffect } from "react";
import { List, Skeleton, Spin } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Button } from "react-bootstrap";
import { api } from "../../utils/api";
import "./menus.css";
import Unauthorized from "../Unauthorized";

const ListElements = ({ data, userToken, band, setBand, resetValuesEdit, routeAPI }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modalUnauthorized, setModalUnauthorized] = useState(false);

  const convertRoute = routeAPI[0].toUpperCase() + routeAPI.slice(1);
  const handleDelete = async (deleted, id) => {
    try {
      if (deleted) {
        const res = await api(
          "PATCH",
          `${routeAPI}/restore${convertRoute}/${id}`,
          null,
          userToken
        );
        if (res.status === 200) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setBand(!band);
          }, 2500);
        }
        if (res.response.status === 401) {
          setModalUnauthorized(true);
        }
      } else {
        const res = await api(
          "PATCH",
          `${routeAPI}/delete${convertRoute}/${id}`,
          null,
          userToken
        );
        if (res.status === 200) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setBand(!band);
          }, 2500);
        }
        if (res.response.status === 401) {
          setModalUnauthorized(true);
        }
      }
    } catch (error) {}
  };

  // const [aas, setAas] = useState([]);
  // useEffect(() => {
  //   setAas(data?.allNewsCategory);
  // }, [data]);
  useEffect(() => {
    setInitLoading(false);
  }, []);
  return (
    <div className="menuContainer mt-0">
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button variant="outline" title="Editar" key="list-loadmore-edit" onClick={() => resetValuesEdit(item)}>
                <EditOutlined className="styleIcons" />
              </Button>,
              <Button
                variant="outline-light"
                key="list-loadmore-more"
                title={item?.deleted ? "Restaurar" : "Eliminar"}
                onClick={() => handleDelete(item.deleted, item._id)}
              >
                {item?.deleted === true ? (
                  <RollbackOutlined className="styleIcons c-green" />
                ) : (
                  <DeleteOutlined className="styleIcons c-red" />
                )}
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<p className="mb-0">{item?.nameCategory} {item?.title}</p>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      {/* {aas &&
        aas.length &&
        aas.map((d) => {

          const a = d.backdrop.split('/')
          const len =a.length
          const b = a[len -2]
          return (
            <div key={d._id}>
              <img src={`https://drive.google.com/uc?id=${b}`} alt={d._id} />
            </div>
          );
        })} */}
      {loading && (
        <div className="loadingSpin">
          <Spin />
        </div>
      )}
      {modalUnauthorized && (
        <div className="">
          <Unauthorized />
        </div>
      )}
    </div>
  );
};

export default ListElements;
