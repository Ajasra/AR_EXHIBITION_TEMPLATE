import React, { Suspense, useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { getDistance, mapRange } from "../../../utils/utils";
import Box from "../Box";

export default function Button3D(props) {
  const { position, camera, setOffset } = props;

  const [hover, setHover] = useState(false);
  const [color, setColor] = useState("blue");

  const [text, setText] = useState("Welcome");
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

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
    setOffset();
  };

  useFrame(() => {
    if (camera) {
      let distance = getDistance(camera.position, pos);
      // console.log(distance);
      setText(distance.toFixed(2));
      setText(mapRange(distance, 1, 3, 1, 10).toString());
    }
  });

  return (
    <Interactive
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
      onSelect={onSelect}
    >
      <Box
        color={color}
        scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]}
        size={[0.4, 0.1, 0.1]}
        opacity={0.5}
        transparent={true}
        {...props}
      >
        <Suspense fallback={null}>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.05}
            color="#000"
            anchorX="center"
            anchorY="middle"
          >
            {text}
          </Text>
        </Suspense>
      </Box>
    </Interactive>
  );
}
