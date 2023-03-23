import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import HeaderSections from "../Title/HeaderSections";
import { videos } from "../../utils/seeders";
import VideosCarousel from "../Carousel/VideosCarousel";

const VideoGallery = () => {
  const [videosBack, setVideosBack] = useState();

  useEffect(() => {
    let filtervideos = videos();
    filtervideos = filtervideos.slice(0, 3);
    setVideosBack(filtervideos);
  }, []);

  return (
    <div>
      <HeaderSections title={"Videos"} linkRef={"/videos"} />
      <Row className="mt-3 mb-5">
        <VideosCarousel data={videosBack} />
      </Row>
    </div>
  );
};

export default VideoGallery;
