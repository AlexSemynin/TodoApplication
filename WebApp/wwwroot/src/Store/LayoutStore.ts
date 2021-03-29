import { action, computed, makeObservable, observable } from "mobx";
import IMainStore from "./interfaces/IMainStore";

export type ITheme = "Dark" | "Light";
const grad = {
    day: "linear-gradient(#e66465, #9198e5)",
    night: "linear-gradient(#9198e5, #e66465)"
};
// export type grad = "linear-gradient(#e66465, #9198e5)" | "linear-gradient(#9198e5, #e66465)";

export default class LayoutStore{
    //todo добавить язык
    private _mainStore;
    constructor(mainStore: IMainStore) {
        makeObservable(this);
        this._mainStore = mainStore;
        this.Theme = <ITheme>sessionStorage.getItem('theme') ?? "Light";
        document.querySelector('body')?.style.setProperty('--linearGradient', this.Theme=="Light" ? grad.day : grad.night);
    }

    @observable
    IsLoading: boolean = false;

    @computed //кэшируемое значение - вычисление инфы из других состояний
    get isModalActive() : boolean{
        return this._mainStore.ModalStore.IsActive;
    }

    @observable //наблюдаемое состояние. наблюдатель в приложении определит, что рендеринг зависит от Theme и когда это поле будет изменено, наблюдатель скажет реакту перерендарить поле
    Theme: ITheme;

    @action //обновляет наблюдаемое состояние - тему
    SwitchTheme(theme: ITheme) {
        if (theme == this.Theme)
            return;

        this.Theme = theme;
        //todo еще и в начале надо как-то устанавливать и сохранять в куки/localStore
        document.querySelector('body')?.style.setProperty('--linearGradient', theme=="Light" ? grad.day : grad.night);
        //
        sessionStorage.setItem('theme', theme);
    }

}