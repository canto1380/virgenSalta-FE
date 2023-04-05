import React from "react";

const FastAccess = () => {
  return (
    <div className="row justify-content-center text-center">
      <div className="col-xs-12 col-sm-4 col-lg-3 mb-3">
        {/* <button className="btn section-btn w-100">Horarios</button> */}
        <a href={'/horarios'} className="btn section-btn w-100">
          Horarios
        </a>
      </div>
      <div className="col-xs-12 col-sm-4 col-lg-3 mb-3">
      <a href={'/pedido-oracion'} className="btn section-btn w-100">
          Pedidos de Oración
        </a>
      </div>
      <div className="col-xs-12 col-sm-4 col-lg-3 mb-3">
      <a href={'/vivo-capilla'} className="btn section-btn w-100">
      Capilla en Vivo
        </a>
      </div>
    </div>
  );
};

export default FastAccess;
