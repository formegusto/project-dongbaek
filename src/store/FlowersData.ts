type FlowerData = {
  color: "red" | "pink" | "white";
  x: number;
  y: number;
  rot: number;
  timeout: number;
  duration: number;
};

export default [
  {
    color: "red",
    x: 32,
    y: 192,
    rot: -33,
    timeout: 2,
    duration: 0.5,
  },
  {
    color: "pink",
    x: 44,
    y: -29,
    rot: -21,
    timeout: 4,
    duration: 0.1,
  },
  {
    color: "white",
    x: 266,
    y: 97,
    rot: 24,
    timeout: 2.5,
    duration: 0.35,
  },
] as FlowerData[];
