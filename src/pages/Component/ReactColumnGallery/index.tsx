import React from "react";

import ColumnGallery, { Photo } from "react-column-gallery";
import { getRandomImage } from "@/data/image";
import { Alert, Space } from "antd";

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

const componentInfo = (
  <div>
    自行开发的组件，使用绝对定位实现：
    <Space>
      <a href="https://github.com/babyhzz/react-column-gallery" target="_blank" rel="noreferrer">
        github
      </a>
      <a href="https://www.npmjs.com/package/react-column-gallery" target="_blank" rel="noreferrer">
        npm
      </a>
    </Space>
  </div>
);

const ReactColumnGallery: React.FC = () => {
  const photos = getPhotos(100);

  return (
    <div className="page-container">
      <Alert message={componentInfo} style={{ marginBottom: 20 }} />
      <ColumnGallery photos={photos} spacing={8} />
    </div>
  );
};

export default ReactColumnGallery;
