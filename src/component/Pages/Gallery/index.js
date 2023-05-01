import { AppContext } from "../../Context";
import { Container, Text, Title, Button } from "@mantine/core";
import { useContext, useState } from "react";
import {
  randomFloatFromInterval,
  randomIntFromInterval,
} from "../../../utils/utils";
import ImageGallery from "react-image-gallery";

import app_data from "../../../data/app_data.json";

let images = [];

for (let i = 1; i < app_data.settings.gallery.images; i++) {
  images.push({
    original: "/assets/images/img_" + i + ".jpg",
  });
}

console.log(app_data);

function Images() {
  return <ImageGallery items={images} autoPlay={true} />;
}

function GalleryEng() {
  const [works1, setWorks1] = useState(false);
  const [works2, setWorks2] = useState(false);
  const [works3, setWorks3] = useState(false);

  return (
    <Container className="gallery">
      <Title order={3}>Title</Title>
      <Text>Some text</Text>
      <br />
      {app_data.settings.gallery.video != "" && (
        <>
          {!works1 ? (
            <Button onClick={() => setWorks1(!works1)} className="bt-start">
                {app_data.settings.gallery.buttons.video.en}
            </Button>
          ) : (
            <video controls>
              <source src={app_data.settings.gallery.video} type="video/mp4" />
            </video>
          )}
        </>
      )}
      <br />
      {app_data.settings.gallery.audio != "" && (
        <>
          >
          {!works2 ? (
            <Button className="bt-start" onClick={() => setWorks2(!works2)}>
                {app_data.settings.gallery.buttons.audio.en}
            </Button>
          ) : (
            <audio controls src="/assets/RingoEn.mp3"></audio>
          )}
        </>
      )}
      <br />
      {app_data.settings.gallery.images > 0 && (
        <>
          {!works3 ? (
            <Button className="bt-start" onClick={() => setWorks3(!works3)}>
                {app_data.settings.gallery.buttons.images.en}
            </Button>
          ) : (
            <Images />
          )}
        </>
      )}
    </Container>
  );
}

function GalleryCn() {
  const [works1, setWorks1] = useState(false);
  const [works2, setWorks2] = useState(false);
  const [works3, setWorks3] = useState(false);


  return (
    <Container className="gallery">
        <Title order={3}>Title</Title>
        <Text>Some text</Text>
        <br />
        {app_data.settings.gallery.video != "" && (
            <>
                {!works1 ? (
                    <Button onClick={() => setWorks1(!works1)} className="bt-start">
                        {app_data.settings.gallery.buttons.video.cn}
                    </Button>
                ) : (
                    <video controls>
                        <source src={app_data.settings.gallery.video} type="video/mp4" />
                    </video>
                )}
            </>
        )}
        <br />
        {app_data.settings.gallery.audio != "" && (
            <>
                >
                {!works2 ? (
                    <Button className="bt-start" onClick={() => setWorks2(!works2)}>
                        {app_data.settings.gallery.buttons.audio.cn}
                    </Button>
                ) : (
                    <audio controls src="/assets/RingoEn.mp3"></audio>
                )}
            </>
        )}
        <br />
        {app_data.settings.gallery.images > 0 && (
            <>
                {!works3 ? (
                    <Button className="bt-start" onClick={() => setWorks3(!works3)}>
                        {app_data.settings.gallery.buttons.images.cn}
                    </Button>
                ) : (
                    <Images />
                )}
            </>
        )}
    </Container>
  );
}

export default function Gallery() {
  const appDetails = useContext(AppContext);

  return (
    <Container className="intro-container">
      {appDetails["lang"] == "en" ? <GalleryEng /> : <GalleryCn />}
    </Container>
  );
}
