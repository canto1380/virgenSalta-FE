import React, { useState } from "react";
import { Tabs } from "antd";
import "./Schedules.css";

const DailyEvents = ({ eventType, dailyEvent }) => {
  const [keyBtn, setKeyBtn] = useState(1);

  let arraa = [];
  eventType.forEach((data, i) => {
    arraa.push([{ i: data.eventName }]);
  });

  const tabSelect = () => {
    let filterForDay = [];
    const dataEvents = dailyEvent;
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
        filterForDay = dataEvents.filter((d) => d.day === "Miércoles");
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
        filterForDay = dataEvents.filter((d) => d.day === "Sábado");
        break;
      }
      default: {
        break;
      }
    }

    filterForDay.forEach((d) => {
      arraa.forEach((d1, i) => {
        if (d.idEventType.eventName === d1[0].i) {
          const resultado = d1.find((data) => data._id === d._id);
          if (!resultado) {
            d1.push(d);
          }
        }
      });
    });

    // const arr1 = filterForDay.filter(
    //   (dat) => dat.idEventType.eventName === "Misa"
    // );

    return (
      <div className="pt-3">
        {arraa && (
          <div className="bg-ligth">
            {arraa.map((data, i) => (
              <div key={i}>
                {data.length > 1 && (
                  <>
                    <h5 className="title-event-type">{data[0].i}</h5>
                  </>
                )}
                {data.map((data1, i) => (
                  <div key={i} className="pb-2">
                    {data1.i ? null : (
                      <>
                        <div>
                          <span>
                            {data1.time} - {data1.text}
                          </span>
                          {data1.additionalText && (
                            <p>{data1.additionalText}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
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
      <h4 className="title-events">Eventos cotidianos</h4>
      <hr />
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default DailyEvents;
