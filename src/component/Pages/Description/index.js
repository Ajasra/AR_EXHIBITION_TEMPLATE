import { AppContext } from "../../Context";
import { Center, Container, Text} from "@mantine/core";
import { useContext } from "react";
import ImageGallery from "react-image-gallery";

import images from "../../../data/info_images.json";

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

function DescriptionEng() {
  return (
    <>
      <br />
      <Text>
        Description text
      </Text>
        <br />
      <Center>
        <Images />
      </Center>
      <br />
      <Text>
        continue text
      </Text>
      <br />
      <Center>
        <img src="/assets/PanSH.png" width={256} />
      </Center>
    </>
  );
}

function DescriptionCn() {
  return (
    <>
      <Text>
        chinese text
      </Text>
        <br />
      <Center>
        <Images />
      </Center>
      <br />
      <Text>
        continue text
      </Text>
      <Center>
        <img src="/assets/img_1.png" width={256} />
      </Center>
    </>
  );
}

export default function Description() {
  const appDetails = useContext(AppContext);

  return (
    <Container className="intro-container">
      {appDetails["lang"] == "en" ? <DescriptionEng /> : <DescriptionCn />}
    </Container>
  );
}
