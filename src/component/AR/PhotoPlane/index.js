import { useEffect, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  getDistance,
  mapRange,
  randomIntFromInterval,
} from "../../../utils/utils";

const max_distance = 3;
const min_distance = 0.5;
const opacityRange = [0, 1];

let next_update = 2;

function ImagePlane(props) {
  const { opacity, image } = props;

  return (
    <>
      <mesh>
        <planeGeometry />
        <meshStandardMaterial
          toneMapped={true}
          side={THREE.DoubleSide}
          transparent
          opacity={opacity}
          map={image}
          alphaMap={image}
        />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry />
        <meshStandardMaterial
          toneMapped={true}
          side={THREE.DoubleSide}
          transparent
          opacity={opacity * 0.5}
          map={image}
          alphaMap={image}
        />
      </mesh>
    </>
  );
}

export default function ProjectionPlane(props) {
  const { position, rotation, scale } = props;

  const { camera } = useThree();

  const [distance, setDistance] = useState(0);
  const [imgId1, setImgId1] = useState(randomIntFromInterval(1, 84));
  const [imgId2, setImgId2] = useState(randomIntFromInterval(1, 84));
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [opacity, setOpacity] = useState(0);
  const [opacity1, setOpacity1] = useState(0);
  const [curImg, setCurImg] = useState(1);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

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
    if (imgId1) {
      const textureLoader = new TextureLoader();
      textureLoader.load(`/assets/images/img (${imgId1}).jpg`, (t) => {
        setImage1(t);
      });
    }
    if (imgId2) {
      const textureLoader = new TextureLoader();
      textureLoader.load(`/assets/images/img (${imgId2}).jpg`, (t) => {
        setImage2(t);
      });
    }
  }, [imgId1, imgId2]);

  useFrame((state, delta) => {
    if (camera) {
      setDistance(getDistance(camera.position, pos));
      let exp = mapRange(
        distance,
        min_distance,
        max_distance,
        opacityRange[0],
        opacityRange[1]
      );
      setOpacity(opacityRange[1] - exp);

      if (opacity > 0) {
        if (curImg == 0) {
          if (opacity1 < 1) {
            setOpacity1(opacity1 + delta * 0.2);
          }
        } else {
          if (opacity1 > 0) {
            setOpacity1(opacity1 - delta * 0.2);
          }
        }

        if (next_update <= 0.05) {
          next_update = 10;
          if (curImg == 0) {
            setImgId2(randomIntFromInterval(1, 84));
          } else {
            setImgId1(randomIntFromInterval(1, 84));
          }
          setCurImg(1 - curImg);
        } else {
          next_update -= delta;
        }
      }
    }
  });

  return (
    <>
      <group position={position} rotation={rotation} scale={scale}>
        <ImagePlane opacity={opacity1} image={image1} />
        <ImagePlane opacity={1 - opacity1} image={image2} />
      </group>
    </>
  );
}
