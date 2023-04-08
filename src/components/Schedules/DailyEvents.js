import React, { useState } from "react";
import { Tabs } from "antd";
import { dailyEvents } from "../../utils/seeders";
import './Schedules.css'

const DailyEvents = () => {
  const [keyBtn, setKeyBtn] = useState(1);
  const tabSelect = () => {
    let filterForDay = [];
    const dataEvents = dailyEvents();
    switch (parseInt(keyBtn)) {
      case 1: {
        filterForDay = dataEvents.filter((d) => d.day === "Domingo");
        break;
      }
      case 2: {
        filterForDay = dataEvents.filter((d) => d.day === "Lunes");
        break;
      }
      case 3: {
        filterForDay = dataEvents.filter((d) => d.day === "Martes");
        break;
      }
      case 4: {
        filterForDay = dataEvents.filter((d) => d.day === "Miercoles");
        break;
      }
      case 5: {
        filterForDay = dataEvents.filter((d) => d.day === "Jueves");
        break;
      }
      case 6: {
        filterForDay = dataEvents.filter((d) => d.day === "Viernes");
        break;
      }
      case 7: {
        filterForDay = dataEvents.filter((d) => d.day === "Sabado");
        break;
      }
      default: {
        break;
      }
    }

    const arr1 = filterForDay.filter((dat) => dat.eventType === 1)
    const arr2 = filterForDay.filter((dat) => dat.eventType === 2)
    return (
      <div className="pt-3">
        {arr1.length > 0 && (
          <div className='pb-2'>
          <h5 className='title-event-type'>Horarios de Misa</h5>
          {
          arr1.map((a, i) => (
            <div key={i} className='pb-2'>
            <div>
            <span>{a.time} - {a.text}</span>
            {a.additionalText && (
              <p>{a.additionalText}</p>
            )}
            </div>
            </div>
          ))
        }
          </div>
        )}
        {arr2.length > 0 && (
          <div className=''>
          <h5 className='title-event-type'>Celebraciones</h5>
          {
          arr2.map((a, i) => (
            <div key={i} className='pb-2'>
            <div>
            <span>{a.time} - {a.text}</span>
            {a.additionalText && (
              <p>{a.additionalText}</p>
            )}
            </div>
            </div>
          ))
        }
          </div>
        )}
      </div>
    );
  };
  const items = [
    {
      key: "1",
      label: `Domingo`,
      children: tabSelect(),
    },
    {
      key: "2",
      label: `Lunes`,
      children: tabSelect(),
    },
    {
      key: "3",
      label: `Martes`,
      children: tabSelect(),
    },
    {
      key: "4",
      label: `Miercoles`,
      children: tabSelect(),
    },
    {
      key: "5",
      label: `Jueves`,
      children: tabSelect(),
    },
    {
      key: "6",
      label: `Viernes`,
      children: tabSelect(),
    },
    {
      key: "7",
      label: `Sabado`,
      children: tabSelect(),
    },
  ];
  const onChange = (key) => {
    setKeyBtn(key);
  };

  return (
    <div className="pt-3 container-event">
      <h4 className='title-events'>Eventos cotidianos</h4>
      <hr/>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default DailyEvents;
