import {
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../../../utils/utils";
import ProjectionPlane from "../PhotoPlane";

// setup constant for the video
const range = [
  [-5, 5],
  [1, 2],
  [-5, 5],
];
const n = randomIntFromInterval(5, 20);
const scaleRange = [0.1, 0.6];

let images = [];
let imgs = 25;

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
      scale={[scale, scale, scale]}
      imgs={imgs}
    />
  );
}

export default function Images() {
  return <group>{images}</group>;
}
