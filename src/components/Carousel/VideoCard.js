import React from "react";
import { Card } from "react-bootstrap";
import "../News/news.css";
import ReactPlayer from "react-player";
import "../VideoGallery/videoGallery.css";

const VideoCard = ({ data, i }) => {
  return (
    <div className="">
      <Card className="cardvideo-container border border-0">
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/YjBSl8v1u8w?origin=https://virgendesalta.netlify.app"
          title="Video de la Virgen de Salta"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <p className="mb-0 cardvideo-title">
          {data?.titulo} {i + 1}
        </p>
      </Card>
      <Card className="mt-5 border border-0">
        <ReactPlayer
          url={require("../../videos/Presentacin1 - Comprimida.mp4")}
          // url="https://www.youtube.com/embed/YjBSl8v1u8w"
          width="100%"
          height="200px"
          controls
        />
        <p className="mb-0 cardvideo-title">
          {data?.titulo} {i + 1}
        </p>
      </Card>
    </div>
  );
};

export default VideoCard;
