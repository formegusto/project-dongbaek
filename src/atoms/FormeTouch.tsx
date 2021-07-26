import styled from "styled-components";

function FormeTouch() {
  return (
    <>
      <FlashBlock />
      <Body>
        <LensBlock>
          <Lens></Lens>
        </LensBlock>
      </Body>
    </>
  );
}

const AniFlashBlock = styled.div`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-75px);
  }
`;

const Body = styled.div`
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
`;

const FlashBlock = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: calc(50% - 75px);

  width: 150px;
  height: 75px;

  border: 6px solid #ffffff;
  box-sizing: border-box;
  border-radius: 16px 16px 0 0;

  animation: ${AniFlashBlock} 0.7s forwards;
`;

const LensBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 200px;

  border: 6px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100%;
`;

const Lens = styled.div`
  width: 135px;
  height: 135px;

  border: 6px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100%;
`;

export default FormeTouch;
