import React from "react";
import styled from "styled-components";
import Filters from "../store/Filters";

type Props = {
  videoStream?: MediaStream;
};

function FiltersModal({ videoStream }: Props) {
  React.useEffect(() => {
    if (videoStream) {
      const modalVideos = document.getElementsByClassName("modal-video");
      console.log(videoStream);

      for (let i = 0; i < modalVideos.length; i++) {
        console.log(modalVideos.item(i));
        (modalVideos.item(i) as HTMLVideoElement).srcObject = videoStream;
      }
    }
  }, [videoStream]);

  const selectFilter = React.useCallback((filterName: string) => {
    const filterFigure = document.getElementById(
      "display-filter"
    ) as HTMLElement;
    filterFigure.classList.forEach((f) => {
      if (Filters.filter((filter) => filter.className === f).length >= 1)
        filterFigure.classList.remove(f);
    });
    filterFigure.classList.add(filterName);
  }, []);

  return (
    <>
      <Modal.Background />
      <Modal.Screen>
        <Modal.Block>
          {Filters.map((filter, idx) => (
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

export default FiltersModal;
