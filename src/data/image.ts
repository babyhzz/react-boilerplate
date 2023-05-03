type Size = {
  w: number;
  h: number;
};
const imageResolutions: Size[] = [
  { w: 320, h: 180 }, // 16:9
  { w: 360, h: 640 }, // 9:16
  { w: 512, h: 512 }, // 1:1
  { w: 640, h: 480 }, // 4:3
  { w: 480, h: 640 }, // 3:4
];

function getRandomResolution() {
  const index = Math.floor(Math.random() * imageResolutions.length);
  return imageResolutions[index];
}

export function getRandomImage() {
  const { w, h } = getRandomResolution();
  return {
    width: w,
    height: h,
    src: `https://picsum.photos/${w}/${h}`,
  };
}

export function getAvatars(count: number) {
  const urls: string[] = [];

  for (let i = 0; i < count; i += 1) {
    urls.push(`https://picsum.photos/24/24?id=${i}`);
  }

  return urls;
}
