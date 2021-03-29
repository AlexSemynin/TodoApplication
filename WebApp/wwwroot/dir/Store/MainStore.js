import LayoutStore from "./LayoutStore";
import ModalStore from "./ModalStore";
import TodoStore from "./TodoStore";
export default class MainStore {
    constructor() {
        Object.defineProperty(this, "ModalStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "LayoutStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "TodoStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ModalStore = new ModalStore(this);
        this.LayoutStore = new LayoutStore(this);
        this.TodoStore = new TodoStore(this);
    }
}
//# sourceMappingURL=MainStore.js.map