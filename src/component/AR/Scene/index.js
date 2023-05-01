import { XR, XRButton } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import XRComp from "../XRComp";
import app_data from "../../../data/app_data.json";

function Loading() {
  return (
    <div className="loading">
      <h2>LOADING</h2>
      <div>
        Please open the link in your browser. For IOS devices you need to open
        it in the
        <a
          href="https://apps.apple.com/us/app/webxr-viewer/id1295998056"
          target="_blank"
        >
          WebXR viewer
        </a>
      </div>
      <div className="halfOpacity">
        <img className="d-block" src="/loading.svg" alt="Loading" />
      </div>
    </div>
  );
}

export default function XRScene({ app_data }) {
  const [ready, setReady] = useState(false);

  const XRbutton = useRef();

  function enterAR() {
    if (XRbutton.current) {
      if (XRbutton.current.innerText != "AR unsupported") {
        setReady(true);
      }
    }
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <XRButton
          mode="AR"
          onClick={enterAR}
          className="ar-button"
          ref={XRbutton}
        />

        <Canvas>
          <XR referenceSpace="local-floor" enterOnly={true}>
            <XRComp ready={ready} app_data={app_data} />
          </XR>
        </Canvas>
      </Suspense>
    </>
  );
}
