import React from "react";
import { useCallback } from "react";
import styled, { css, keyframes } from "styled-components";
import FormeTouch from "../atoms/FormeTouch";

function DongbaekComponent() {
  const [allWhite, setAllWhite] = React.useState<boolean>(false);

  const changeAllWhite = useCallback(() => {
    setAllWhite(true);
  }, []);

  return (
    <DongbaekScreen>
      <DongbaekScreenWhite ani={allWhite} />
      <PolarBlock>
        <FormeTouch changeAllWhite={changeAllWhite} />
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
`;

export default DongbaekComponent;
