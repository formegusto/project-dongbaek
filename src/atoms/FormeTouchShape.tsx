import React from "react";
import styled, { css, Keyframes, keyframes } from "styled-components";
import FlowersComponent from "../components/FlowersComponent";
// import FlowersComponent from "../components/FlowersComponent";

// animation station
/*
    1. up flash
    2. show light 
    3. shape background transparent
    4. show flower
    5. end splash - all white
*/

type Ani = {
  aniName: string;
  className: string;
  action: Keyframes;
  timeout: number;
  movement: string;
  isForwards: boolean;
};

type StaticAni = {
  [key: string]: Ani;
};

const ANIS: Ani[] = [
  {
    aniName: "up-flash",
    className: "flash",
    action: keyframes`
            from {
                transform: translateY(-0px);
            } to {
                transform: translateY(-69px);
            }
        `,
    timeout: 1,
    movement: "ease-out",
    isForwards: true,
  },
  {
    aniName: "show-light",
    className: "light",
    action: keyframes`
            0% {
              transform: scale(0);
            } 50% {
              transform: scale(1);
            } 100% {
              transform: scale(1);
              opacity: 0;
            }
        `,
    timeout: 1.25,
    movement: "cubic-bezier(0, 0, 0, 0.57)",
    isForwards: true,
  },
  {
    aniName: "transparent-back",
    className: "shape",
    action: keyframes`
            to {
              background-color: transparent;
            }
        `,
    timeout: 0,
    movement: "",
    isForwards: true,
  },
  {
    aniName: "show-flower",
    className: "red",
    action: keyframes`
        `,
    timeout: 0,
    movement: "",
    isForwards: true,
  },
  {
    aniName: "show-background",
    className: "background",
    action: keyframes`
          to {
            opacity: 1;
          }
        `,
    timeout: 1.5,
    movement: "",
    isForwards: true,
  },
];

function FormeTouchShape() {
  const [staticAnis, setStaticAnis] = React.useState<StaticAni>({});
  const [stationIdx, setStationIdx] = React.useState<number>(0);

  const aniEnd = React.useCallback(() => {
    setStationIdx((state) => state + 1);
  }, []);

  React.useEffect(() => {
    if (stationIdx < ANIS.length) {
      const el = document.getElementsByClassName(ANIS[stationIdx].className);
      const newAni = ANIS[stationIdx];
      setStaticAnis({
        ...staticAnis,
        [newAni.aniName]: newAni,
      });

      if (el) {
        (el[0] as HTMLElement).addEventListener("animationend", aniEnd);
      }
    }
    return () => {
      const el = document.getElementsByClassName(ANIS[stationIdx].className);

      if (el) {
        (el[0] as HTMLElement).removeEventListener("animationend", aniEnd);
      }
    };
  }, [stationIdx, aniEnd]); // eslint-disable-line

  return (
    <Block>
      <FlowersComponent hide={staticAnis["show-flower"] === undefined} />
      <Flash
        className="flash"
        ani={
          staticAnis["up-flash"]
            ? {
                ...staticAnis["up-flash"],
              }
            : undefined
        }
      >
        <Light
          className="light"
          ani={
            staticAnis["show-light"]
              ? {
                  ...staticAnis["show-light"],
                }
              : undefined
          }
        />
      </Flash>
      <Shape
        className="shape"
        ani={
          staticAnis["transparent-back"]
            ? {
                ...staticAnis["transparent-back"],
              }
            : undefined
        }
      />
      <Background
        className="background"
        ani={
          staticAnis["show-background"]
            ? {
                ...staticAnis["show-background"],
              }
            : undefined
        }
      />
    </Block>
  );
}

const Block = styled.div`
  position: relative;

  width: 520px;
  height: 360px;
`;

const Background = styled.div<{ ani?: Ani }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: #fff;

  opacity: 0;

  ${({ ani }) =>
    ani &&
    css`
      animation: ${ani.action} ${ani.timeout}s ${ani.movement}
        ${ani.isForwards ? "forwards" : ""};
    `};
`;

const Shape = styled.div<{ ani?: Ani }>`
  position: absolute;
  top: 0;

  width: 520px;
  height: 360px;

  border: 6px solid #fff;
  box-sizing: border-box;
  border-radius: 32px;

  background-color: #000;

  ${({ ani }) =>
    ani &&
    css`
      animation: ${ani.action} ${ani.timeout}s ${ani.movement}
        ${ani.isForwards ? "forwards" : ""};
    `};
`;

const Flash = styled.div<{ ani?: Ani }>`
  position: absolute;
  top: 0;
  left: calc(50% - 75px);

  width: 150px;
  height: 75px;

  border: 6px solid #fff;
  box-sizing: border-box;
  border-radius: 16px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  ${({ ani }) =>
    ani &&
    css`
      animation: ${ani.action} ${ani.timeout}s ${ani.movement}
        ${ani.isForwards ? "forwards" : ""};
    `};
`;

const Light = styled.div<{ ani?: Ani }>`
  position: absolute;
  top: -80px;
  left: calc(50% - 100px);

  width: 200px;
  height: 200px;

  transform: scale(0);
  background: radial-gradient(
    50% 50% at 50% 50%,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 100px;

  ${({ ani }) =>
    ani &&
    css`
      animation: ${ani.action} ${ani.timeout}s ${ani.movement}
        ${ani.isForwards ? "forwards" : ""};
    `};
`;

export default FormeTouchShape;
