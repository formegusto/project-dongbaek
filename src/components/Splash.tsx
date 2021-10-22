import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import FormeTouchShape from "../atoms/FormeTouchShape";
import UIStore from "../store/UIStore";

type Props = {
  store?: UIStore;
};

function Splash({ store }: Props) {
  const changeSplash = React.useCallback(() => {
    store?.changeSplash(false);
  }, [store]);

  return (
    <Screen>
      <FormeTouchShape changeSplash={changeSplash} />
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

export default inject((store: { uiStore: UIStore }) => ({
  store: store.uiStore,
}))(observer(Splash));
