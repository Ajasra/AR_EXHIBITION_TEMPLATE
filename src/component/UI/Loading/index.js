import { useContext } from "react";
import { AppContext } from "../../Context";

export default function Loading() {
  const appDetails = useContext(AppContext);

  return (
    <div className="loading">
      {appDetails["lang"] === "en" ? (
        <>
          <h2>LOADING</h2>
          <div>
            Please open the link in your browser. For IOS devices you need to
            open it in the
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
        </>
      ) : (
        <>
          <h2>LOADING CN</h2>
          <div>
            Please open the link in your browser. For IOS devices you need to
            open it in the
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
        </>
      )}
    </div>
  );
}
