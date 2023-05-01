import "./App.css";
import { useContext } from "react";
import { AppContext } from "./component/Context";
import XRScene from "./component/AR/Scene";
import Intro from "./component/Pages/Intro";
import Gallery from "./component/Pages/Gallery";
import Description from "./component/Pages/Description";
import LanguageMenu from "./component/UI/Language";
import Menu from "./component/UI/Menu";
import { Center, Title } from "@mantine/core";

import app_data from "./data/app_data.json";

function App() {
  const appDetails = useContext(AppContext);

  return (
    <div className="App">
      <div id="content">
        {appDetails["page"] === "intro" && <Intro app_data={app_data} />}
        {appDetails["page"] === "ar" && (
          <div className="overflow-hidden">
            <XRScene app_data={app_data} />
          </div>
        )}
        {appDetails["page"] === "gallery" && <Gallery />}
        {appDetails["page"] === "info" && <Description app_data={app_data} />}
      </div>

      <div className="Header">
          {app_data.settings.bilingual && <LanguageMenu />}
        <Center>
          <Title order={2} className="main-title">
            {appDetails["lang"] == "en" ? app_data.title.en : app_data.title.cn}
          </Title>
        </Center>
        <Menu app_data={app_data} />
      </div>
    </div>
  );
}

export default App;
