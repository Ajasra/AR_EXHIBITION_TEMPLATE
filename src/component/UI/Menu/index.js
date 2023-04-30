import { Container, Tooltip } from "@mantine/core";
import { useContext } from "react";

import {
  CameraIcon,
  ImageIcon,
  ReaderIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { AppContext, AppDispatchContext } from "../../Context";

export default function Menu({ app_data }) {
  const appDetails = useContext(AppContext);
  const setAppDetails = useContext(AppDispatchContext);

  function SetMenu(item) {
    if (appDetails["page"] != item) {
      setAppDetails({
        ...appDetails,
        page: item,
      });
    }
  }

  const tooltips = app_data.menu;

  return (
    <Container className="menu">
      {app_data.settings.pages.intro && (
        <Container
          className="menu-item"
          onClick={() => {
            SetMenu("home");
          }}
        >
          <Tooltip label={tooltips[appDetails["lang"]].home}>
            <RocketIcon className="svg-icon" onClick={null} />
          </Tooltip>
        </Container>
      )}
      <Container
        className="menu-item"
        onClick={() => {
          SetMenu("ar");
        }}
      >
        <Tooltip label={tooltips[appDetails["lang"]].ar}>
          <CameraIcon className="svg-icon" onClick={null} />
        </Tooltip>
      </Container>
      {app_data.settings.pages.gallery && (
        <Container
          className="menu-item"
          onClick={() => {
            SetMenu("gallery");
          }}
        >
          <Tooltip label={tooltips[appDetails["lang"]].gallery}>
            <ImageIcon className="svg-icon" onClick={null} />
          </Tooltip>
        </Container>
      )}
      {app_data.settings.pages.info && (
        <Container
          className="menu-item"
          onClick={() => {
            SetMenu("info");
          }}
        >
          <Tooltip label={tooltips[appDetails["lang"]].info}>
            <ReaderIcon className="svg-icon" onClick={null} />
          </Tooltip>
        </Container>
      )}
    </Container>
  );
}
