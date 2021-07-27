import React from "react";
import styled, { css, keyframes } from "styled-components";

type Props = {
  changeAllWhite: () => void;
};

function FormeTouch({ changeAllWhite }: Props) {
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
      <FlashBlock ref={refFlashBlock} ani={borderAni} />
      <Body ani={borderAni} ref={refBody}>
        <LensBlock ani={borderAni}>
          <Lens ani={borderAni} />
        </LensBlock>
      </Body>
    </>
  );
}

const AniFlashBlock = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-75px);
  }
`;

const AniFlashBlockBorder = keyframes`
  from {
    transform: translateY(-75px);
  }
  to {
    border: 2px solid #000;
    border-bottom: none;
    transform: translateY(-75px);
  }
`;

const AniBorderWidth = keyframes`
  to {
    border: 2px solid #000;
  }
`;

const Body = styled.div<{ ani?: boolean }>`
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
`;

const FlashBlock = styled.div<{ ani?: boolean }>`
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
