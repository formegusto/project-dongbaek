import { makeAutoObservable } from "mobx";
import RootStore from ".";
import Filters, { Filter } from "./Filters";

class UIStore {
  root: RootStore;
  filters: Filter[];
  selectFilter: string;
  showModal: boolean;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.filters = Filters;
    this.selectFilter = "";
    this.showModal = false;
  }

  changeFilter(selectFilter: string) {
    this.selectFilter = selectFilter;
  }

  changeModalState(state: boolean) {
    this.showModal = state;
  }
}

export default UIStore;
