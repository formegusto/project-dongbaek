import React from "react";
import DongbaekComponent from "../components/DongbaekComponent";

type Props = {
  changeFilterModalState: (state: boolean) => void;
};

function DongbaekContainer({ changeFilterModalState }: Props) {
  return <DongbaekComponent changeFilterModalState={changeFilterModalState} />;
}

export default DongbaekContainer;
