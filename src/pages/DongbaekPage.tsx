import React from "react";
import DongbaekContainer from "../containers/DongbaekContainer";
import { FullScreen } from "../styles/Screen";
import _ from "lodash";

function DongbaekPage() {
  const refScreen = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    window.addEventListener(
      "scroll",
      _.throttle((e: any) => {
        const documentHeight = document.body.scrollHeight - window.innerHeight;
        const windowYOffset = window.pageYOffset;

        const rotY = (windowYOffset * 360) / documentHeight;
        const dimension = document.querySelector(
          ".dimension"
        ) as HTMLDivElement;
        dimension.style.transform = "rotateY(-" + rotY + "deg)";
      }, 16)
    );
  }, []);

  return (
    <FullScreen ref={refScreen}>
      <DongbaekContainer />
    </FullScreen>
  );
}

export default DongbaekPage;
