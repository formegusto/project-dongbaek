import styled from "styled-components";
import FormeTouch from "../atoms/FormeTouch";

function DongbaekComponent() {
  return (
    <DongbaekScreen>
      <PolarBlock>
        <FormeTouch />
      </PolarBlock>
    </DongbaekScreen>
  );
}

const DongbaekScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #000;
`;

const PolarBlock = styled.div`
  position: relative;

  width: 520px;
  height: 360px;
`;

export default DongbaekComponent;
