import React, { Suspense } from "react";
import { Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import Box from "../Box";

export default function OffsetButton(props) {
  const { setOffset } = props;

  function onSelect() {
    setOffset();
  }

  return (
    <Interactive onSelect={onSelect}>
      <Box
        color="cyan"
        scale={[0.5, 0.5, 0.5]}
        size={[0.4, 0.1, 0.1]}
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
            Calibrate
          </Text>
        </Suspense>
      </Box>
    </Interactive>
  );
}
