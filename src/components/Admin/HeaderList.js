import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "react-bootstrap";

const HeaderList = ({ title, formAdd, setFormAdd, loading, setLoading, formEdit, setFormEdit, resetValuesEdit }) => {

  const changeBand = ()=> {
    setFormAdd(!formAdd)
  }
  const changeBandRetur =() => {
    resetValuesEdit(null)
    setFormAdd(false)
    setFormEdit(false)
  }
  return (
    <div className="menuContainer mb-0 d-flex justify-content-between align-items-center">
      <div>
        <p className="fw-bolder mb-0">{formEdit ? 'Editar Categoría' : title}</p>
      </div>
      <div>
        {!formAdd && !formEdit ? (
          <Button
            onClick={changeBand}
            variant="outline"
            to={"/"}
            className="btn section-btn d-flex align-items-center"
          >
            <AiOutlinePlus
              style={{
                fontSize: 20,
                marginRight: 5,
              }}
            />
            Agregar
          </Button>
        ) : (
          <Button
            onClick={changeBandRetur}
            variant="outline"
            to={"/"}
            className={`btn section-btn d-flex align-items-center ${loading && `enabledField`}`}
          >
            <BiArrowBack
              style={{
                fontSize: 20,
                marginRight: 5,
              }}
            />
            Volver
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderList;
