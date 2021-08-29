import React from "react";
import DongbaekContainer from "../containers/DongbaekContainer";
import { FullScreen } from "../styles/Screen";
import _ from "lodash";
import FiltersModal from "../components/FiltersModal";
import { inject, observer } from "mobx-react";
import UIStore from "../store/UIStore";
import TimerModal from "../components/TimerModal";

type Props = {
  store?: UIStore;
};

function DongbaekPage({ store }: Props) {
  const [videoStream, setVideoStream] = React.useState<MediaStream>();
  const refScreen = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const video = document.getElementById("display-video") as HTMLVideoElement;
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream: MediaStream) => {
        setVideoStream(stream);
        video.srcObject = stream;
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  React.useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.addEventListener(
      "scroll",
      _.throttle((e: any) => {
        const documentHeight = document.body.scrollHeight - window.innerHeight;
        const windowYOffset = window.pageYOffset;

        const rotY = (windowYOffset * 360) / documentHeight;
        const dimension = document.querySelector(
          ".dimension"
        ) as HTMLDivElement;
        dimension.style.transform = "rotateY(-" + rotY + "deg)";
      }, 16)
    );
  }, []);

  return (
    <FullScreen ref={refScreen}>
      <DongbaekContainer />
      {store?.showModal && <FiltersModal videoStream={videoStream} />}
      {store?.showTimerModal && <TimerModal />}
    </FullScreen>
  );
}

export default inject((store: { uiStore: UIStore }) => ({
  store: store.uiStore,
}))(observer(DongbaekPage));
