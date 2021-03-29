var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { action, makeObservable, observable } from "mobx";
export default class ModalStore {
    constructor(mainStore) {
        // Для простоты сделаем так, что в приложении может быть открыто только одно попап
        Object.defineProperty(this, "_mainStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "IsActive", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ModalType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._mainStore = mainStore;
        makeObservable(this);
    }
    OpenModal(type) {
        this.IsActive = true;
        this.ModalType = type;
    }
    CloseModal() {
        this.IsActive = false;
        this.ModalType = undefined;
    }
}
__decorate([
    observable,
    __metadata("design:type", Boolean)
], ModalStore.prototype, "IsActive", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ModalStore.prototype, "ModalType", void 0);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ModalStore.prototype, "OpenModal", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModalStore.prototype, "CloseModal", null);
//# sourceMappingURL=ModalStore.js.map