import {
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../../../utils/utils";
import SoundObject from "../SoundObject";

// setup constant for the video
const range = [
  [-5, 5],
  [1, 1.2],
  [-5, 3],
];
const n = randomIntFromInterval(7, 15);
// const n = 3;

let sounds = [];

// generate video elements
for (let i = 0; i < n; i++) {
  let v = randomIntFromInterval(1, 26);
  let pos = [
    randomFloatFromInterval(range[0][0], range[0][1]),
    randomFloatFromInterval(range[1][0], range[1][1]),
    randomFloatFromInterval(range[2][0], range[2][1]),
  ];
  let rot = [0, randomFloatFromInterval(-3.14, 3.14), 0];
  let scale = randomFloatFromInterval(0.01, 0.05);
  sounds.push(
    <SoundObject
      key={`sound-${i}`}
      position={pos}
      rotation={rot}
      scale={[scale, scale, scale]}
      url={`/assets/audio/${v}.mp3`}
      // coneInner={90}
      // coneOuter={120}
      rollof={0.1}
    />
  );
}

export default function Sounds() {
  return <group>{sounds}</group>;
}
