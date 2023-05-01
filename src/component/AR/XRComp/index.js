import { Controllers, Hands } from "@react-three/xr";
import { useState } from "react";
import { useThree } from "@react-three/fiber";
import OffsetButton from "../OffsetButton";
import Videos from "../Videos";
import Images from "../Photos";
import Sounds from "../Sounds";

export default function XRComp(props) {
  const { ready, app_data } = props;
  const state = useThree();

  const [offsetSet, setOffsetSet] = useState(false);
  const [offsetPos, setOffsetPos] = useState([0, 0, 0]);
  const [offsetRot, setOffsetRot] = useState([0, 0, 0]);

  function setOffset() {
    if (!offsetSet) {
      if (state.camera.position) {
        setOffsetPos([state.camera.position.x, 0, state.camera.position.z]);
        setOffsetRot([0, state.camera.rotation.y, 0]);
      }
      setOffsetSet(true);
    }
  }

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group position={offsetPos} rotation={offsetRot}>
          {app_data.settings.ar.video && <Videos ready={ready} app_data={app_data} /> }
          {app_data.settings.ar.image && <Images ready={ready} app_data={app_data} /> }
          {app_data.settings.ar.audio && <Sounds ready={ready} app_data={app_data} /> }
      </group>
      <Controllers />
      <Hands />
    </>
  );
}
