import React from "react";
import DongbaekComponent from "../components/DongbaekComponent";

function DongbaekContainer() {
  React.useEffect(() => {
    const video = document.getElementsByTagName("video")[0];

    navigator.getUserMedia(
      {
        video: true,
      },
      (stream: any) => {
        video.srcObject = stream;
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);
  return <DongbaekComponent />;
}

export default DongbaekContainer;
