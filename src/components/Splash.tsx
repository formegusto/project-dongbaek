import styled from "styled-components";
import FormeTouchShape from "../atoms/FormeTouchShape";

function Splash() {
  return (
    <Screen>
      <FormeTouchShape />
    </Screen>
  );
}

const Screen = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Splash;
