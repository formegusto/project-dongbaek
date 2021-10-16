import React from "react";
import styled, { css, keyframes } from "styled-components";
import FlowersData from "../store/FlowersData";

type ColorType = "red" | "pink" | "white";
/* is absolute */
type Rect = {
  x?: number;
  y?: number;
  rot?: number;
};

type AniInfo = {
  timeout: number;
  duration: number;
};
type FlowerStyle = {
  size: number /* is px */;
  color: ColorType;
  rect?: Rect;
  aniInfo?: AniInfo;
};

function Flower(props: FlowerStyle) {
  const refDongbaek = React.useRef<HTMLDivElement>(null);

  return (
    <OneFlower.Wrap
      {...props}
      ref={refDongbaek}
      className={`dongbaek ${props.color}`}
    >
      <OneFlower.Petal1 className="petal" />
      <OneFlower.Petal2 className="petal" />
      <OneFlower.Petal3 className="petal" />
      <OneFlower.Petal4 className="petal" />
      <OneFlower.Petal5 className="petal" />
      <OneFlower.Stamen className="stamen" />
    </OneFlower.Wrap>
  );
}

const FlowerAni = (rot: number) => keyframes`
  from {
    transform: rotateZ(30deg) scale(0);
  } to {
    transform: rotateZ(30deg) scale(8);
  }
`;

const OneFlower = {
  Wrap: styled.div<FlowerStyle>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    transform-origin: 50% 50%;

    ${({ rect }) =>
      rect &&
      css`
        top: ${rect.y}px;
        left: ${rect.x}px;

        ${rect.rot && `transform: rotateZ(${rect.rot}deg) scale(0)`}
      `};

    ${({ aniInfo, rect }) =>
      aniInfo &&
      rect &&
      rect.rot &&
      css`
        animation: ${FlowerAni(rect.rot)} ${aniInfo.timeout}s linear forwards;
        animation-delay: ${aniInfo.duration}s;
      `}

    & > .petal {
      position: absolute;
      width: ${(props) => props.size / 2}px;
      height: ${(props) => props.size / 2}px;
      border-radius: 100%;

      background-color: ${(props) =>
        props.color === "red"
          ? "rgba(255,0,0,0.2)"
          : props.color === "pink"
          ? "rgba(255, 192, 203, 0.4)"
          : "rgba(255, 255, 255, 0.4)"};
    }

    & > .petal:nth-child(1) {
      top: 0;
      left: calc(50% - ${(props) => props.size / 4}px);
    }

    & > .petal:nth-child(2) {
      top: calc(50% - ${(props) => props.size / 4}px);
      left: 0;
    }

    & > .petal:nth-child(3) {
      left: 50%;
      top: calc(50% - ${(props) => props.size / 4}px);
    }
    & > .petal:nth-child(4) {
      top: 50%;
      left: 10%;
    }
    & > .petal:nth-child(5) {
      top: 50%;
      left: 40%;
    }
    & > .stamen {
      position: absolute;
      width: ${(props) => props.size / 4}px;
      height: ${(props) => props.size / 4}px;
      background-color: rgba(255, 255, 0, 0.2);
      border-radius: 100%;
    }
  `,
  Petal1: styled.div``,
  Petal2: styled.div``,
  Petal3: styled.div``,
  Petal4: styled.div``,
  Petal5: styled.div``,
  Stamen: styled.div``,
};

function FlowersComponent({ hide }: { hide: boolean }) {
  return (
    <FlowersBlock hide={hide}>
      {FlowersData.map((flower, idx) => (
        <Flower
          size={200}
          color={flower.color}
          key={idx}
          rect={{ x: flower.x, y: flower.y, rot: flower.rot }}
          aniInfo={flower}
        />
      ))}
    </FlowersBlock>
  );
}

const FlowersBlock = styled.div<{ hide: boolean }>`
  position: absolute;

  width: 520px;
  height: 360px;

  border-radius: 32px;
  ${({ hide }) =>
    hide
      ? css`
          display: none;
          & * {
            animation-play-state: paused;
          }
        `
      : css`
          display: block;
          & * {
            animation-play-state: running;
          }
        `}
`;

export default FlowersComponent;
