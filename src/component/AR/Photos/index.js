import {
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../../../utils/utils";
import ProjectionPlane from "../PhotoPlane";

import img_settings from "../../../data/img_settings.json";

// setup space for placement
const range = [
  [img_settings.space.x1, img_settings.space.x2],
  [img_settings.space.y1, img_settings.space.y2],
  [img_settings.space.z1, img_settings.space.z2],
];
const n = randomIntFromInterval(img_settings.min_images, img_settings.max_images);
const scaleRange = [img_settings.min_scale, img_settings.max_scale];

let images = [];

// generate video elements
for (let i = 0; i < n; i++) {
  let pos = [
    randomFloatFromInterval(range[0][0], range[0][1]),
    randomFloatFromInterval(range[1][0], range[1][1]),
    randomFloatFromInterval(range[2][0], range[2][1]),
  ];
  let rot = [0, randomFloatFromInterval(-3.14, 3.14), 0];
  let scale = randomFloatFromInterval(scaleRange[0], scaleRange[1]);
  images.push(
    <ProjectionPlane
      key={`photo-${i}`}
      position={pos}
      rotation={rot}
      scale={[scale, scale * img_settings.aspect_ratio, scale]}
      imgs={img_settings.files}
      is_transparent={img_settings.is_transparent}
    />
  );
}

export default function Images() {
  return <group>{images}</group>;
}
