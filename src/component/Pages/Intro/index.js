import { Title, Text, Container, List, Button, Center } from "@mantine/core";
import { useContext } from "react";
import { AppContext, AppDispatchContext } from "../../Context";
import ImageGallery from "react-image-gallery";

import images from "../../../data/intro_images.json"

console.log(images);

function Images() {
  return (
    <ImageGallery
      items={images}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showBullets={true}
      autoPlay={true}
    />
  );
}

export default function Intro({app_data}) {
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

  return (
    <Container className="intro-container">
      {appDetails["lang"] == "en" ? (
        <>
          <Center>
            {app_data.settings.intro.slideshow && <Images />}
          </Center>
          
          <Text>
            Here could be any project description or text if needed
          </Text>
          <List>
            <List.Item>
              item 1
            </List.Item>
            <List.Item>
              item 2
            </List.Item>
          </List>
          <br />
          <Title order={5}>INSTRUCTION</Title>
          <List>
            <List.Item>
              item 1
            </List.Item>
            <List.Item>
              item with {" "}
              <a
                href="https://apps.apple.com/us/app/webxr-viewer/id1295998056"
                target="_blank"
              >
                link.
              </a>
            </List.Item>
          </List>
          <br />
          <Text>
            You can watch a &nbsp;
            <a
              href="#"
              onClick={() => {
                SetMenu("gallery");
              }}
            >
              video preview
            </a>{" "}
            if you have difficulty viewing it on your phone.
          </Text>
          <br />
          
          <Button
            className="bt-start"
            onClick={() => {
              SetMenu("ar");
            }}
          >
            {app_data.settings.intro.start_text.en}
          </Button>
          
        </>
      ) : (
        <>
          <Center>
            <Images />
          </Center>

          
          <br />
          <Button
            className="bt-start"
            onClick={() => {
              SetMenu("ar");
            }}
          >
            {app_data.settings.intro.start_text.cn}
          </Button>
        </>
      )}
    </Container>
  );
}
