import VideoPlane from "../VideoPlane";
import {
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../../../utils/utils";

import video_settings from "../../../data/video_settings.json";

// setup space for placement
const range = [
  [video_settings.space.x1, video_settings.space.x2],
  [video_settings.space.y1, video_settings.space.y2],
  [video_settings.space.z1, video_settings.space.z2],
];
const n = randomIntFromInterval(video_settings.min_videos, video_settings.max_videos);

let videos = [];

// generate video elements
for (let i = 0; i < n; i++) {
  let v = randomIntFromInterval(1, video_settings.files);
  let pos = [
    randomFloatFromInterval(range[0][0], range[0][1]),
    randomFloatFromInterval(range[1][0], range[1][1]),
    randomFloatFromInterval(range[2][0], range[2][1]),
  ];
  let rot = [0, randomFloatFromInterval(-3.14, 3.14), 0];
  let scale = randomFloatFromInterval(0.2, 1.0);
  videos.push(
    <VideoPlane
      key={`video-${i}`}
      position={pos}
      rotation={rot}
      scale={[scale, scale * video_settings.aspect_ratio, scale]}
      URL={`/assets/video/${v}.mp4`}
      is_transparent={video_settings.is_transparent}
    />
  );
}

export default function Videos(props) {
  return <group>{videos}</group>;
}
