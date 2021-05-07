import { action, makeObservable, observable } from "mobx";
import IMainStore from "./interfaces/IMainStore";
import MainStore from "./MainStore";


export type modalType = "ADD" | "AUTORIZE" | undefined;

export default class ModalStore{
    // Для простоты сделаем так, что в приложении может быть открыто только одно попап
    private _mainStore;
    constructor(mainStore: MainStore) {
        this._mainStore = mainStore;
        makeObservable(this);
    }

    @observable
    IsActive: boolean = false;

    @observable
    ModalType: modalType;

    @action
    OpenModal(type: modalType) {
        this.IsActive = true;
        this.ModalType = type;
    }

    @action
    CloseModal() {
        this.IsActive = false;
        this.ModalType = undefined;
    }
}