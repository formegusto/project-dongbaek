import { makeAutoObservable } from "mobx";
import RootStore from ".";
import Filters, { Filter } from "./Filters";

class UIStore {
  root: RootStore;
  filters: Filter[];
  selectFilter: string;
  showModal: boolean;
  videoStream: MediaStream | null;
  timer: number;
  showTimerModal: boolean;
  imgData: string | null;

  constructor(root: RootStore) {
    console.log("이게 먼저임?");
    makeAutoObservable(this);
    this.root = root;
    this.filters = Filters;
    this.selectFilter = "";
    this.showModal = false;
    this.videoStream = null;
    this.timer = 5;
    this.showTimerModal = false;
    this.imgData = null;
    // navigator.getUserMedia(
    //   {
    //     video: true,
    //   },
    //   (stream: MediaStream) => {
    //     this.videoStream = stream;
    //   },
    //   (err) => {}
    // );
  }

  changeFilter(selectFilter: string) {
    this.selectFilter = selectFilter;
  }

  changeModalState(state: boolean) {
    this.showModal = state;
  }

  readyCam(videoStream: MediaStream) {
    this.videoStream = videoStream;
  }

  changeTimerState(state: boolean) {
    this.showTimerModal = state;
  }

  captureData(imgData: string) {
    this.imgData = imgData;
  }
}

export default UIStore;
