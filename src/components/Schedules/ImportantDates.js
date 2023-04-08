import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { importantEvent, importantEventName } from "../../utils/seeders";
import "./Schedules.css";

const ImportantDates = () => {
  const [keyBtn, setKeyBtn] = useState(1);
  const [dataEventName, setDataEventName] = useState([]);
  const [dataEvent, setDataEvent] = useState([]);

  let arr = [];
  dataEventName.forEach((a) => {
    arr.push(a.id);
  });

  const tabSelect = () => {

    return (
      <div>
        {dataEvent.map((data) => (
          <div key={data.id}>
            {data?.idImportantEventName === parseInt(keyBtn) && (
              <div className='pb-3'>
              <h5 className='title-event-type'>{data.event}</h5>
              <div>
                <span>{data?.time} - {data?.descripcion}</span>

              </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  const items = [];
  dataEvent &&
    dataEventName.forEach((data, i) => {
      const obj = {
        key: i + 1,
        label: data.name,
        children: tabSelect(),
      };
      items.push(obj);
    });

  const onChange = (key) => {
    setKeyBtn(key);
  };
  useEffect(() => {
    let data = importantEventName();
    const dataFilter = data.filter((d) => d.active === true);
    setDataEventName(dataFilter);
  }, []);

  useEffect(() => {
    let data1 = importantEvent();
    let dataFilter1 = [];
    data1.forEach((as) => {
      if (as.idImportantEventName === 1 || as.idImportantEventName === 2) {
        dataFilter1.push(as);
      }
    });
    setDataEvent(dataFilter1);
  }, []);
  return (
    <>
      {dataEventName.length !== 0 && (
        <div className="container-event">
          <h4 className="title-events">Fechas Importantes</h4>
          <hr />
          <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </div>
      )}
    </>
  );
};

export default ImportantDates;
