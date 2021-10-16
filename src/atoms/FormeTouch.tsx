import React from "react";
import styled, { css, keyframes } from "styled-components";
import { RiCameraLensLine, RiPolaroidLine, RiTimer2Line } from "react-icons/ri";
import polarLogo from "../assets/polaroid-logo.png";
import { useCallback } from "react";
import FlowersComponent from "../components/FlowersComponent";
import { inject, observer } from "mobx-react";
import UIStore from "../store/UIStore";

type Props = {
  changeBorderAni: () => void;
  borderAni: boolean;
  changeAllWhite: () => void;
  bodyWhite: boolean;
  store?: UIStore;
};

function FormeTouch({
  borderAni,
  changeBorderAni,
  changeAllWhite,
  bodyWhite,
  store,
}: Props) {
  const refFlashBlock = React.useRef<HTMLDivElement>(null);
  const refBody = React.useRef<HTMLDivElement>(null);
  const refCanvas = React.useRef<HTMLCanvasElement>(null);
  const [showTitle, setShowTitle] = React.useState<boolean>(false);
  const [showFlower, setShowFlower] = React.useState<boolean>(false);

  React.useEffect(() => {
    // const video = document.getElementById("display-video") as HTMLVideoElement;
    // video.srcObject = store!.videoStream;
  }, [store]);

  React.useEffect(() => {
    if (refFlashBlock) {
      refFlashBlock.current?.addEventListener("animationend", () => {
        setShowFlower(true);
      });
    }

    if (refBody) {
      refBody.current?.addEventListener("animationend", () => {
        changeAllWhite();
      });
    }
  }, [changeAllWhite]);

  React.useEffect(() => {
    if (showFlower) {
      const dongbaekList = document.getElementsByClassName("dongbaek");
      for (let i = 0; i < dongbaekList.length; i++)
        dongbaekList.item(i)?.addEventListener("transitionend", (ev: any) => {
          if (ev.target.classList.contains("red")) {
            // setShowTitle(true);
            // const title = document.querySelector(
            //   ".title.background"
            // ) as HTMLDivElement;
            // title.addEventListener("animationend", () => {
            //   changeBorderAni();
            // });
          }
          if (ev.target.classList.contains("pink")) {
          }
        });
    }
  }, [showFlower, changeBorderAni]);

  const timerStart = useCallback(() => {
    store?.changeTimerState(true);
  }, [store]);

  return (
    <>
      <FlashBlock white={bodyWhite} ref={refFlashBlock} ani={borderAni}>
        <div className="back">
          <div className="vertical top" />
          <div className="horizontal right" />
          <div className="vertical bottom" />
          <div className="horizontal left" />
        </div>
      </FlashBlock>
      <BodyBack white={bodyWhite}>
        <ContentBlock className="display">
          <DisplayItem>
            <li onClick={timerStart}>
              <RiCameraLensLine />
            </li>
            <li onClick={() => store?.changeModalState(true)}>
              <RiPolaroidLine />
            </li>
            <li>
              <RiTimer2Line />
            </li>
          </DisplayItem>
          <DisplayBlock>
            <canvas id="capture-box" ref={refCanvas} />

            <Filter id="display-filter" className={store?.selectFilter}>
              <Display autoPlay id="display-video" />
            </Filter>

            <img src={polarLogo} alt="logo" className="logo" />
          </DisplayBlock>
        </ContentBlock>
        <div className="vertical top" />
        <div className="horizontal right">
          <div className="polar-enter" />
        </div>
        <div className="vertical bottom" />
        <div className="horizontal left" />
      </BodyBack>
      <PolarEnter>
        <Polar id="film">
          {store?.imgData ? (
            <figure className={store?.selectFilter}>
              <img src={store?.imgData} alt="result" className="result" />
            </figure>
          ) : (
            <div className="polar-wrap" />
          )}
        </Polar>
        <PolarBack>
          <div className="vertical top" />
          <div className="horizontal left" />
          <div className="vertical bottom" />
        </PolarBack>
      </PolarEnter>

      <Body white={bodyWhite} ani={borderAni} ref={refBody}>
        {/* {showFlower && <FlowersComponent />} */}
        {showTitle && <Title.Background className="title background" />}
        <LensBlock ani={borderAni}>
          <Lens ani={borderAni} />
        </LensBlock>
        {showTitle && (
          <Title.Wrap>
            <Title.Main className="title main">DONGBAEK</Title.Main>
            <Title.Sub className="title sub">pure someday</Title.Sub>
          </Title.Wrap>
        )}
      </Body>
    </>
  );
}

const TitleAni = {
  Background: keyframes`
    0% {
      opacity: 0;
    } 100% {
      opacity: 1;
    }
  `,
  Wrap: keyframes`
    0% {
      opacity: 0;
    } 50% {
      opacity: 1;
    } 100% {
      opacity: 0;
    } 
  `,
  Main: keyframes`
    0% {
      transform: translateX(-20px);
    } 50% {
      transform: translateX(0px);
    } 100% {
      transform: translateX(20px);
    }
  `,
  Sub: keyframes`
    0% {
      transform: translateX(20px);
    } 50% {
      transform: translateX(0px);
    } 100% {
      transform: translateX(-20px);
    }
  `,
};

const Title = {
  Background: styled.div`
    position: absolute;

    width: 520px;
    height: 360px;

    background-color: #fff;

    animation: ${TitleAni.Background} 0.5s linear forwards;
  `,
  Wrap: styled.div`
    position: absolute;

    width: 520px;
    height: 360px;

    animation: ${TitleAni.Wrap} 2.5s linear forwards;
  `,
  Main: styled.h1`
    position: absolute;
    top: 50px;
    left: 50px;
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 44px;
    /* identical to box height */

    letter-spacing: -0.05em;

    color: #333333;

    animation: ${TitleAni.Main} 2.5s linear forwards;
  `,
  Sub: styled.h2`
    position: absolute;
    bottom: 50px;
    right: 50px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.2em;

    color: #333333;
    animation: ${TitleAni.Sub} 2.5s linear forwards;
  `,
};

const AniPolar = keyframes`
  0% {
    transform: translateZ(-2.5px) translateX(0)
  } 100% {
    transform: translateZ(-2.5px) translateX(400px)
  }
`;

const Polar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;

  width: 400px;
  height: 250px;

  border-radius: 0.5rem;

  box-shadow: 2px 2px 4px #333;
  background-color: #fff;

  &.capturing {
    animation: ${AniPolar} 4s forwards linear;
  }

  & * {
    width: 330px;
    height: 225px;
  }
`;

const PolarBack = styled.div`
  transform-style: preserve-3d;
  box-sizing: border-box;

  position: relative;

  width: 400px;
  height: 250px;

  border: 1px solid #000;

  background-color: #000;
  transform: translateZ(-5px);

  & > div {
    position: absolute;

    background-color: #000;
    border: 1px soild #000;
    box-sizing: border-box;
  }

  & > .horizontal {
    width: 5px;
    height: 250px;
  }

  & > .vertical {
    width: 400px;
    height: 5px;
  }

  & > .top {
    top: 0;

    transform: rotateX(90deg);
    transform-origin: 50% 0%;
  }

  & > .bottom {
    bottom: 0;
    transform-origin: 50% 100%;
    transform: rotateX(-90deg);
  }

  & > .left {
    left: 0;
    transform-origin: 0% 50%;
    transform: rotateY(-90deg);
  }
`;

const PolarEnter = styled.div`
  transform-style: preserve-3d;
  box-sizing: border-box;

  position: absolute;
  right: 0;

  width: 400px;
  height: 250px;

  border: 1px solid #000;

  transform: translateZ(-70px);
  background-color: #fff;
`;

const ContentBlock = styled.div`
  transform: translateZ(-2px);

  display: flex;
  flex-direction: row;
`;

const DisplayBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 1.5rem 1.25rem;

  & > canvas {
    position: absolute;
    width: 350px;
    height: 225px;
  }

  & > .logo {
    position: absolute;
    bottom: 0.25rem;
    left: calc(50% - 35px);
    transform: rotateY(180deg);
    width: 70px;

    filter: grayscale(100%);
  }
`;
const Filter = styled.figure`
  width: 350px;
  height: 225px;

  border-radius: 0.25rem;
`;
const Display = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
  /* transform: rotateY(180deg); */
`;
const DisplayItem = styled.ul`
  font-size: 1.5rem;

  padding: 1rem;

  & > li {
    border-radius: 100%;

    margin-bottom: 0.5rem;
    cursor: pointer;
    box-shadow: -0.5px -0.5px 4px #333;

    width: 2rem;
    height: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const AniFlashBlock = keyframes`
  from {
    transform: translateY(0) translateZ(-35px);
  }
  to {
    transform: translateY(-70px) translateZ(-35px);
  }
`;

const AniFlashBlockBorder = keyframes`
  from {
    transform: translateY(-70px) translateZ(-35px);
  }
  to {
    border: 2px solid #000;
    background-color: #fff;
    border-bottom: none;
    transform: translateY(-70px) translateZ(-35px);
  }
`;

const AniBorderWidth = keyframes`
  to {
    background-color: #fff;
    border: 2px solid #000;
  }
`;

const Body = styled.div<{ ani?: boolean; white?: boolean }>`
  z-index: 2;
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 520px;
  height: 360px;

  border: 16px solid #ffffff;
  box-sizing: border-box;
  border-radius: 32px;
  background-color: #000;

  transform-style: preserve-3d;

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniBorderWidth} 0s forwards;
      /* background-color: transparent; */
    `}
  ${(props) =>
    props.white &&
    css`
      transition: 1s;
      background-color: #fff;
    `}
`;

const BodyBack = styled.div<{ white?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;

  width: 520px;
  height: 360px;

  z-index: 2;
  position: absolute;
  top: 0;

  box-sizing: border-box;
  border: 2px solid #000;

  border-radius: 32px;
  /* background-color: transparent; */
  background-color: #fff;

  transform: translateZ(-140px);
  transform-origin: 50% 50%;

  ${(props) =>
    props.white &&
    css`
      background-color: #fff;
    `}

  & > div:not(.display) {
    box-sizing: border-box;
    position: absolute;
    border: 1px solid #000;

    background-color: #fff;
  }

  & > .vertical {
    width: calc(100% - 36px);
    left: 18px;
    height: 140px;
  }

  & > .horizontal {
    width: 140px;
    top: 18px;
    height: calc(100% - 36px);
  }

  & > .top {
    top: 0;

    transform: rotateX(90deg);
    transform-origin: 50% 0%;
  }

  & > .bottom {
    bottom: 0;
    transform-origin: 50% 100%;
    transform: rotateX(-90deg);
  }

  & > .right {
    right: 0;
    transform-origin: 100% 0%;
    transform: rotateY(90deg);

    & > .polar-enter {
      position: absolute;
      top: calc(50% - 125px);
      left: 70px;

      width: 5px;
      height: 250px;

      border: 1px solid #000;
      background-color: #000;

      box-sizing: border-box;
    }
  }

  & > .left {
    left: 0;
    transform-origin: 0% 50%;
    transform: rotateY(-90deg);
  }
`;

const FlashBlock = styled.div<{ ani?: boolean; white?: boolean }>`
  transform-style: preserve-3d;
  display: flex;

  position: absolute;
  z-index: 1;
  top: 0;
  left: calc(50% - 75px);

  width: 150px;
  height: 75px;

  border: 6px solid #ffffff;
  border-bottom: none;
  box-sizing: border-box;
  border-radius: 16px 16px 0 0;

  animation: ${AniFlashBlock} 1.2s forwards;

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniFlashBlockBorder} 0.3s forwards;
    `}

  ${(props) =>
    props.white &&
    css`
      background-color: #fff;
    `}

  & > .back {
    transform-style: preserve-3d;
    position: relative;

    border: 2px solid #000;
    box-sizing: border-box;
    border-bottom: none;
    border-radius: 16px 16px 0 0;

    width: 150px;
    height: 75px;

    transform: translateZ(-70px);

    & > div {
      box-sizing: border-box;
      position: absolute;
      border: 1px solid #000;
    }

    & > .vertical {
      width: calc(100% - 12px);
      left: 6px;
      height: 70px;
    }

    & > .horizontal {
      width: 70px;
      height: calc(100% - 6px);
      top: 6px;
    }

    & > .top {
      top: 0;

      transform: rotateX(90deg);
      transform-origin: 50% 0%;
    }

    & > .bottom {
      bottom: 0;
      transform-origin: 50% 100%;
      transform: rotateX(-90deg);
    }

    & > .right {
      right: 0;
      transform-origin: 100% 0%;
      transform: rotateY(90deg);
    }

    & > .left {
      left: 0;
      transform-origin: 0% 50%;
      transform: rotateY(-90deg);
    }
  }
`;

const LensBlock = styled.div<{ ani?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;

  width: 200px;
  height: 200px;

  border: 16px solid #fff;
  box-sizing: border-box;
  border-radius: 100%;

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniBorderWidth} 0s forwards;
    `}
`;

const Lens = styled.div<{ ani?: boolean }>`
  width: 135px;
  height: 135px;

  border: 16px solid #fff;
  box-sizing: border-box;
  border-radius: 100%;

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniBorderWidth} 0s forwards;
    `}
`;

export default inject((store: { uiStore: UIStore }) => ({
  store: store.uiStore,
}))(observer(FormeTouch));
