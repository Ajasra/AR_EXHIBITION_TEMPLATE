import VideoPlane from "../VideoPlane";
import {
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../../../utils/utils";

// setup constant for the video
const range = [
  [-5, 5],
  [1, 1.2],
  [-5, 3],
];
const n = randomIntFromInterval(7, 13);
// const n = 3;

let videos = [];

// generate video elements
for (let i = 0; i < n; i++) {
  let v = randomIntFromInterval(1, 23);
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
      scale={[scale, scale, scale]}
      URL={`/assets/video/${v}.mp4`}
    />
  );
}

export default function Videos(props) {
  return <group>{videos}</group>;
}
