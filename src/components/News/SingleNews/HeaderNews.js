import React from "react";
import { Image } from "react-bootstrap";
import "./singleNews.css";

const HeaderNews = ({ data }) => {
  const date = new Date(data?.createdAt);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  const minuts = date.getMinutes()


  return (
    <div>
      <h1 className="single-news-title">{data?.title}</h1>
      <p className="single-news-subtitle">{data?.subtitle}</p>
      <div className="text-secondary">
        <span>{`${day}/${month}/${year}`} |</span>
        <span> {`${hour}:${minuts}hs`}</span>
      </div>
      <div className="pt-3 pb-4">
        <Image
          src={data?.photos[0]}
          className="w-100 image-news"
        />
        <p className="text-secondary lead ps-2 mb-0">{data?.caption}</p>
      </div>
    </div>
  );
};

export default HeaderNews;
