import React from "react";
import { useCallback } from "react";
import styled, { css, keyframes } from "styled-components";
import FormeTouch from "../atoms/FormeTouch";

function DongbaekComponent() {
  const refWhiteScreen = React.useRef<HTMLDivElement>(null);
  const [allWhite, setAllWhite] = React.useState<boolean>(false);
  const [bodyFrontWhite, setBodyFrontWhite] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (refWhiteScreen)
      refWhiteScreen.current?.addEventListener("animationend", () => {
        setBodyFrontWhite(true);
      });
  }, []);

  const changeAllWhite = useCallback(() => {
    setAllWhite(true);
  }, []);

  return (
    <DongbaekScreen>
      <DongbaekScreenWhite ani={allWhite} ref={refWhiteScreen} />

      <PolarBlock>
        <FormeTouch
          changeAllWhite={changeAllWhite}
          bodyWhite={bodyFrontWhite}
        />
      </PolarBlock>
    </DongbaekScreen>
  );
}

const AniWhiteScreen = keyframes`
  from {
    border-radius: 100%;
    trasform: scale(0);
  } to {
    transform: scale(1);
  }
`;

const DongbaekScreen = styled.div`
  perspective: 1000px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #000;
`;

const DongbaekScreenWhite = styled.div<{ ani?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #fff;

  transform: scale(0);

  ${(props) =>
    props.ani &&
    css`
      animation: ${AniWhiteScreen} 0.7s forwards;
    `}
`;

const PolarBlock = styled.div`
  position: relative;

  width: 520px;
  height: 360px;

  transform: rotateY(180deg) rotateX(0deg);
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
`;

export default DongbaekComponent;
