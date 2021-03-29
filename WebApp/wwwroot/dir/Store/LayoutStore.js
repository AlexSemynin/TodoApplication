var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { action, computed, makeObservable, observable } from "mobx";
const grad = {
    day: "linear-gradient(#e66465, #9198e5)",
    night: "linear-gradient(#9198e5, #e66465)"
};
// export type grad = "linear-gradient(#e66465, #9198e5)" | "linear-gradient(#9198e5, #e66465)";
export default class LayoutStore {
    constructor(mainStore) {
        var _a, _b;
        //todo добавить язык
        Object.defineProperty(this, "_mainStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "IsLoading", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "Theme", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
        this._mainStore = mainStore;
        this.Theme = (_a = sessionStorage.getItem('theme')) !== null && _a !== void 0 ? _a : "Light";
        (_b = document.querySelector('body')) === null || _b === void 0 ? void 0 : _b.style.setProperty('--linearGradient', this.Theme == "Light" ? grad.day : grad.night);
    }
    get isModalActive() {
        return this._mainStore.ModalStore.IsActive;
    }
    SwitchTheme(theme) {
        var _a;
        if (theme == this.Theme)
            return;
        this.Theme = theme;
        //todo еще и в начале надо как-то устанавливать и сохранять в куки/localStore
        (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.style.setProperty('--linearGradient', theme == "Light" ? grad.day : grad.night);
        //
        sessionStorage.setItem('theme', theme);
    }
}
__decorate([
    observable,
    __metadata("design:type", Boolean)
], LayoutStore.prototype, "IsLoading", void 0);
__decorate([
    computed //кэшируемое значение - вычисление инфы из других состояний
    ,
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], LayoutStore.prototype, "isModalActive", null);
__decorate([
    observable //наблюдаемое состояние. наблюдатель в приложении определит, что рендеринг зависит от Theme и когда это поле будет изменено, наблюдатель скажет реакту перерендарить поле
    ,
    __metadata("design:type", String)
], LayoutStore.prototype, "Theme", void 0);
__decorate([
    action //обновляет наблюдаемое состояние - тему
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LayoutStore.prototype, "SwitchTheme", null);
//# sourceMappingURL=LayoutStore.js.map