import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import UIStore from "../store/UIStore";

type Props = {
  videoStream?: MediaStream;
  store?: UIStore;
};

function FiltersModal({ videoStream, store }: Props) {
  React.useEffect(() => {
    if (videoStream) {
      const modalVideos = document.getElementsByClassName("modal-video");

      for (let i = 0; i < modalVideos.length; i++)
        (modalVideos.item(i) as HTMLVideoElement).srcObject = videoStream;
    }
  }, [videoStream]);

  const selectFilter = React.useCallback(
    (filterName: string) => {
      store?.changeFilter(filterName);
      store?.changeModalState(false);
    },
    [store]
  );

  return (
    <>
      <Modal.Background />
      <Modal.Screen>
        <Modal.Block>
          {store?.filters.map((filter, idx) => (
            <Color.Block
              className={filter.className}
              key={idx}
              onClick={() => selectFilter(filter.className)}
            >
              <Color.Video className="modal-video" autoPlay />
            </Color.Block>
          ))}
        </Modal.Block>
      </Modal.Screen>
    </>
  );
}

const Modal = {
  Background: styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background-color: rgba(18, 18, 18, 0.6);
  `,
  Screen: styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Block: styled.div`
    width: 700px;
    height: 870px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    padding: 36px 36px 0;
    box-sizing: border-box;

    background-color: #fff;

    border-radius: 16px;
  `,
};

const Color = {
  Block: styled.figure`
    width: 200px;
    height: 200px;

    margin: 0 0 12px;
    cursor: pointer;

    &:last-child {
      margin: 0 0 36px;
    }
  `,
  Video: styled.video`
    width: 100%;
    height: 100%;

    transform-origin: 50% 50%;
    transform: rotateY(180deg);

    object-fit: fill;
  `,
};

export default inject((store: { uiStore: UIStore }) => ({
  store: store.uiStore,
}))(observer(FiltersModal));
