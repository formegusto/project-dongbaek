import React from "react";
import { useCallback } from "react";
import styled, { css } from "styled-components";
import FormeTouch from "../atoms/FormeTouch";

type Props = {
  changeFilterModalState: (state: boolean) => void;
};

function DongbaekComponent({ changeFilterModalState }: Props) {
  const refWhiteScreen = React.useRef<HTMLDivElement>(null);
  const [borderAni, setBorderAni] = React.useState<boolean>(false);
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

  const changeBorderAni = useCallback(() => {
    setBorderAni(true);
  }, []);

  return (
    <DongbaekScreen ani={allWhite}>
      <PolarBlock className="dimension">
        <FormeTouch
          borderAni={borderAni}
          changeBorderAni={changeBorderAni}
          changeAllWhite={changeAllWhite}
          bodyWhite={bodyFrontWhite}
          changeFilterModalState={changeFilterModalState}
        />
      </PolarBlock>
    </DongbaekScreen>
  );
}

const DongbaekScreen = styled.div<{ ani?: boolean }>`
  perspective: 1000px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  transition: 1s;

  ${({ ani }) =>
    ani
      ? css`
          background-color: #fff;
        `
      : css`
          background-color: #000;
        `}
`;

const PolarBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 520px;
  height: 360px;

  transform: rotateY(0deg) rotateX(0deg);
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
`;

export default DongbaekComponent;
