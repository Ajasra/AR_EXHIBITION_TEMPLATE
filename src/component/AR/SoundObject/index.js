import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getDistance, mapRange } from "../../../utils/utils";
import { Interactive } from "@react-three/xr";
import Weight from "../Weight";
import { Text } from "@react-three/drei";

const max_distance = 2.5;
const min_distance = 0.5;
const trigger_play = 2.5;
const opacityRange = [0, 1];

export default function SoundObject(props) {
  const {
    url,
    position,
    rotation,
    scale,
    coneInner = 360,
    coneOuter = 360,
    rollof = 1,
    distanceModel = "exponential",
    text = "",
    show_weight = false,
  } = props;

  const sound = useRef();
  const { camera } = useThree();

  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);

  const [ready, setReady] = useState(false);
  const [distance, setDistance] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.panner.distanceModel = distanceModel;
    sound.current.panner.rolloffFactor = rollof;
    sound.current.panner.coneInnerAngle = coneInner;
    sound.current.panner.coneOuterAngle = coneOuter;
    sound.current.setLoop(true);
    camera.add(listener);
    setReady(true);
    return () => camera.remove(listener);
  }, []);

  useEffect(() => {
    if (position) {
      setPos({
        x: position[0],
        y: position[1],
        z: position[2],
      });
    }
  }, [position]);

  useEffect(() => {
    if (ready) {
      if (distance < trigger_play) {
        if (!isPlaying) {
          sound.current.play();
          setIsPlaying(true);
        }
      } else {
        if (isPlaying) {
          sound.current.stop();
          setIsPlaying(false);
        }
      }
    }
  }, [distance]);

  useFrame(() => {
    if (camera) {
      setDistance(getDistance(camera.position, pos));
      setOpacity(
        opacityRange[1] -
          mapRange(
            distance,
            min_distance,
            max_distance,
            opacityRange[0],
            opacityRange[1]
          )
      );
    }
  });

  return (
    <Interactive onSelect={null}>
      <group position={position} rotation={rotation} scale={scale}>
        {opacity > -2 && (
          <>
            <Text
              scale={[10, 10, 10]}
              position={[0, 0.4, 0]}
              fontSize={0.2}
              fillOpacity={opacity}
              color="#000"
              anchorX="center"
              anchorY="middle"
            >
              {text}
            </Text>
            {show_weight && (
              <Weight
                opacity={1 - opacity}
                position={[0, -position[1] / scale[0], 0]}
              />
            )}
            <positionalAudio
              autoplay={false}
              ref={sound}
              args={[listener]}
              distance={2}
            />
          </>
        )}
      </group>
    </Interactive>
  );
}
