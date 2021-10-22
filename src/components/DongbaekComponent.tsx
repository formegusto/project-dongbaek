import React from "react";
import { useCallback } from "react";
import styled, { css } from "styled-components";
import FormeTouch from "../atoms/FormeTouch";

function DongbaekComponent() {
  const refWhiteScreen = React.useRef<HTMLDivElement>(null);
  const [borderAni, setBorderAni] = React.useState<boolean>(false);
  const [bodyFrontWhite, setBodyFrontWhite] = React.useState<boolean>(false);

  React.useEffect(() => {
    // if (refWhiteScreen)
    // refWhiteScreen.current?.addEventListener("animationend", () => {
    //   setBodyFrontWhite(true);
    // });
  }, []);

  const changeBorderAni = useCallback(() => {
    // setBorderAni(true);
  }, []);

  return (
    <DongbaekScreen>
      <PolarBlock className="dimension">
        <FormeTouch
          borderAni={borderAni}
          changeBorderAni={changeBorderAni}
          bodyWhite={bodyFrontWhite}
        />
      </PolarBlock>
    </DongbaekScreen>
  );
}

const DongbaekScreen = styled.div`
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

  background-color: #fff;
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

  & *:not(.display-item) {
    opacity: 0;
  }
`;

export default DongbaekComponent;
