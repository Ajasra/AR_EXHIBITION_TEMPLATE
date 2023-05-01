import { useEffect, useState } from "react";
import * as THREE from "three";
import { Interactive } from "@react-three/xr";
import { useFrame, useThree } from "@react-three/fiber";
import { getDistance, mapRange } from "../../../utils/utils";

const max_distance = 2;
const min_distance = 0.5;
const trigger_play = 2;
const opacityRange = [0, 1];

function Video(props) {
  const { URL, position, rotation, scale, is_transparent } = props;
  const { camera } = useThree();

  const [distance, setDistance] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: URL,
      crossOrigin: "Anonymous",
      loop: true,
      muted: false,
      volume: 0.3,
      autoplay: false,
    })
  );

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
    if (distance < trigger_play) {
      if (!isPlaying) {
        video.play();
        setIsPlaying(true);
      }
    } else {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      }
    }
    video.volume = 0.3 * opacity;
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
    <>
      {distance < max_distance * 1.2 && (
        <Interactive onSelect={null}>
          <group position={position} rotation={rotation}>
            <mesh scale={scale}>
              <planeGeometry />
              <meshStandardMaterial
                toneMapped={true}
                side={THREE.DoubleSide}
                transparent
                opacity={opacity}
                emissive={0xffffff}
                emissiveIntensity={opacity * 2}
              >
                <videoTexture attach="map" args={[video]} />
                <videoTexture attach="emissiveMap" args={[video]} />
                {is_transparent && (
                  <videoTexture attach="alphaMap" args={[video]} />
                )}
              </meshStandardMaterial>
            </mesh>
          </group>
        </Interactive>
      )}
    </>
  );
}

export default function VideoPlane(props) {
  return (
    <>
      <Video {...props} />
    </>
  );
}
