import React from "react";
import { inject, observer } from "mobx-react";
import styled, { keyframes } from "styled-components";
import UIStore from "../store/UIStore";

type Props = {
  store?: UIStore;
};

function TimerModal({ store }: Props) {
  const [number, setNumber] = React.useState<number | undefined>(store?.timer);
  const [timeoutId, setTimeoutId] = React.useState<any>();

  React.useEffect(() => {
    let id = setInterval(() => {
      setNumber((number) => number! - 1);
    }, 1000);
    setTimeoutId(id);
  }, []);

  React.useEffect(() => {
    if (number === 0) {
      store?.changeTimerState(false);
      clearInterval(timeoutId);
      setTimeout(() => {
        const video = document.getElementsByTagName("video")[0];
        const canvas = document.getElementById(
          "capture-box"
        ) as HTMLCanvasElement;

        if (canvas) {
          const canvasContext = canvas.getContext("2d");
          canvasContext?.drawImage(video, 0, 0, 300, 150);

          const data = canvas.toDataURL("image/png");
          canvasContext?.clearRect(0, 0, 300, 150);
          canvasContext?.beginPath();

          if (data) store?.captureData(data);

          const film = document.getElementById("film") as HTMLDivElement;
          film!.classList.add("capturing");
        }
      }, 500);
    }
  }, [number, store, timeoutId]);

  return (
    <Screen>
      <Timer>{number}</Timer>
    </Screen>
  );
}

const Screen = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(18, 18, 18, 0.6);
`;

const AniTimer = keyframes`
    0% {
        opacity: 0;
        font-size: 48px;
    } 50% {
        opacity: 1;
        font-size: 96px;
    } 100% {
        opacity: 0;
    }
`;

const Timer = styled.h1`
  font-size: 96px;
  color: #fff;

  /* animation: ${AniTimer} 1s linear forwards; */
`;

export default inject((store: { uiStore: UIStore }) => ({
  store: store.uiStore,
}))(observer(TimerModal));
