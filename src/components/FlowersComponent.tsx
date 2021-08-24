import styled from "styled-components";

type ColorType = "red" | "pink" | "white";
type FlowerStyle = {
  size: number /* is px */;
  color: ColorType;
  transformStyle?: string;
};

function Flower(props: FlowerStyle) {
  return (
    <OneFlower.Wrap {...props}>
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;

    transform: ${(props) => props.transformStyle};

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
      {(["red", "pink", "white"] as ColorType[]).map((color, idx) => (
        <Flower size={200} color={color} key={idx} />
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
