import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Weight(props) {
  const { nodes, materials } = useGLTF("/assets/model/weight.glb");

  const { opacity } = props;


  materials["Material.001"].transparent = true;
  materials["Material.001"].thickness = 2;
  materials["Material.001"].ior = 2.5;

  useEffect(() => {
    materials["Material.001"].opacity = opacity;
    materials["Material.001"].transmission = 1 - opacity;
  }, [opacity]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.001"]}
        position={[0, 0.99, 0]}
      />
    </group>
  );
}

useGLTF.preload("/assets/model/weight.glb");
