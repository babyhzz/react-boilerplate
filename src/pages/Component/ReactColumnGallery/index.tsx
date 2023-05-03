import React from "react";

import ColumnGallery, { Photo } from "react-column-gallery";
import { getRandomImage } from "@/data/image";

const getPhotos = (count: number): Photo[] => {
  const photos: Photo[] = [];

  for (let i = 0; i < count; i += 1) {
    const image = getRandomImage();

    photos.push({
      key: i,
      src: `${image.src}?id=${i}`,
      width: image.width,
      height: image.height,
      alt: "",
      loading: "lazy",
    });
  }

  return photos;
};

const ReactColumnGallery: React.FC = () => {
  const photos = getPhotos(100);

  return (
    <div className="page-container">
      <ColumnGallery photos={photos} spacing={8} />
    </div>
  );
};

export default ReactColumnGallery;
