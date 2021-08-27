import React from "react";
import styled, { css } from "styled-components";
import FlowersData from "../store/FlowersData";

type ColorType = "red" | "pink" | "white";
/* is absolute */
type Rect = {
  x?: number;
  y?: number;
  rot?: number;
};

type FlowerStyle = {
  size: number /* is px */;
  color: ColorType;
  rect?: Rect;

  timeout?: number;
  duration?: number;
};

function Flower(props: FlowerStyle) {
  const refDongbaek = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    setTimeout(
      () => {
        if (refDongbaek.current) {
          refDongbaek.current.style.transform = `rotateZ(${props.rect?.rot}deg) scale(3)`;
        }
      },
      props.duration ? props.duration : 10
    );
  }, [props]);

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

const OneFlower = {
  Wrap: styled.div<FlowerStyle>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    transform-origin: 50% 50%;

    ${({ timeout }) => css`
      transition: ${timeout}s ease-out;
    `}

    ${({ rect }) =>
      rect &&
      css`
        top: ${rect.y}px;
        left: ${rect.x}px;

        ${rect.rot && `transform: rotateZ(${rect.rot}deg) scale(0)`}
      `};

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

function FlowersComponent() {
  return (
    <FlowersBlock>
      {FlowersData.map((flower, idx) => (
        <Flower
          size={200}
          color={flower.color}
          key={idx}
          rect={{ x: flower.x, y: flower.y, rot: flower.rot }}
          timeout={flower.timeout}
          duration={flower.duration}
        />
      ))}
    </FlowersBlock>
  );
}

const FlowersBlock = styled.div`
  position: absolute;

  width: 520px;
  height: 360px;

  border-radius: 32px;
`;

export default FlowersComponent;
