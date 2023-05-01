import {
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../../../utils/utils";
import SoundObject from "../SoundObject";

import sound_settings from "../../../data/audio_settings.json";

// setup space for placement
const range = [
  [sound_settings.space.x1, sound_settings.space.x2],
  [sound_settings.space.y1, sound_settings.space.y2],
  [sound_settings.space.z1, sound_settings.space.z2],
];
const n = randomIntFromInterval(sound_settings.min_sounds, sound_settings.max_sounds);

let sounds = [];
// generate sound elements
for (let i = 0; i < n; i++) {
  let v = randomIntFromInterval(1, sound_settings.files);
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
      rollof={0.1}
      show_weight={sound_settings.show_weight}
    />
  );
}

export default function Sounds() {
  return <group>{sounds}</group>;
}
