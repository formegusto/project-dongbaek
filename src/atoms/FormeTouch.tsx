import React from "react";
import styled, { css, keyframes } from "styled-components";

type Props = {
  changeAllWhite: () => void;
  bodyWhite: boolean;
};

function FormeTouch({ changeAllWhite, bodyWhite }: Props) {
  const refFlashBlock = React.useRef<HTMLDivElement>(null);
  const refBody = React.useRef<HTMLDivElement>(null);
  const [borderAni, setBorderAni] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (refFlashBlock) {
      refFlashBlock.current?.addEventListener("animationend", () => {
        setBorderAni(true);
      });
    }

    if (refBody) {
      refBody.current?.addEventListener("animationend", () => {
        changeAllWhite();
      });
    }
  }, [changeAllWhite]);

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
        <Display autoPlay />
        <div className="vertical top" />
        <div className="horizontal right" />
        <div className="vertical bottom" />
        <div className="horizontal left" />
      </BodyBack>
      <Body white={bodyWhite} ani={borderAni} ref={refBody}>
        <LensBlock ani={borderAni}>
          <Lens ani={borderAni} />
        </LensBlock>
      </Body>
    </>
  );
}

const Display = styled.video``;
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
    border-bottom: none;
    transform: translateY(-70px) translateZ(-35px);
  }
`;

const AniBorderWidth = keyframes`
  to {
    border: 2px solid #000;
  }
`;

const Body = styled.div<{ ani?: boolean; white?: boolean }>`
  z-index: 2;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 520px;
  height: 360px;

  border: 16px solid #ffffff;
  box-sizing: border-box;
  border-radius: 32px;
  background-color: #000;

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniBorderWidth} 1s forwards;
      background-color: transparent;
    `}
  ${(props) =>
    props.white &&
    css`
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
  background-color: transparent;

  transform: translateZ(-140px);
  transform-origin: 50% 50%;

  ${(props) =>
    props.white &&
    css`
      background-color: #fff;
    `}

  & > video {
    transform: translateZ(-10px);
    width: 300px;
    height: 150px;
  }

  & > div {
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
  }

  & > .left {
    left: 0;
    transform-origin: 0% 50%;
    transform: rotateY(-90deg);
  }
`;

const FlashBlock = styled.div<{ ani?: boolean; white?: boolean }>`
  transform-style: preserve-3d;

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
      animation: ${AniFlashBlockBorder} 1s forwards;
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
      background-color: #fff;
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

  width: 200px;
  height: 200px;

  border: 6px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100%;

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniBorderWidth} 1s forwards;
    `}
`;

const Lens = styled.div<{ ani?: boolean }>`
  width: 135px;
  height: 135px;

  border: 6px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100%;

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniBorderWidth} 1s forwards;
    `}
`;

export default FormeTouch;
