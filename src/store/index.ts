import UIStore from "./UIStore";

class RootStore {
  uiStore: UIStore;

  constructor() {
    this.uiStore = new UIStore(this);
  }
}

export default RootStore;
