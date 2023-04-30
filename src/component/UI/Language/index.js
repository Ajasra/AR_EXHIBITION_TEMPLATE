import { Container } from "@mantine/core";

import { useContext } from "react";
import {AppContext, AppDispatchContext} from "../../Context";

export default function LanguageMenu() {
  const appDetails = useContext(AppContext);
  const setAppDetails = useContext(AppDispatchContext);

  function changeLanguage() {
    if (appDetails["lang"] === "cn") {
      setAppDetails({
        ...appDetails,
        lang: "en",
      });
    } else {
      setAppDetails({
        ...appDetails,
        lang: "cn",
      });
    }
  }

  return (
    <Container className="language-menu">
      <Container
        className={
          appDetails["lang"] == "en"
            ? "language-menu-item active"
            : "language-menu-item"
        }
        onClick={changeLanguage}
      >
        EN
      </Container>
      <Container
        className={
          appDetails["lang"] != "en"
            ? "language-menu-item active"
            : "language-menu-item"
        }
        onClick={changeLanguage}
      >
        中文
      </Container>
    </Container>
  );
}
