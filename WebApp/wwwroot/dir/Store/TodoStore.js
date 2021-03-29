var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { action, computed, makeObservable, observable } from "mobx";
// export type changeTodoType = "remove" | "add" | "checkbox" | "text" | "position";
export var changeTodoType;
(function (changeTodoType) {
    changeTodoType[changeTodoType["remove"] = 0] = "remove";
    changeTodoType[changeTodoType["add"] = 1] = "add";
    changeTodoType[changeTodoType["checkbox"] = 2] = "checkbox";
    changeTodoType[changeTodoType["text"] = 3] = "text";
    changeTodoType[changeTodoType["position"] = 4] = "position";
})(changeTodoType || (changeTodoType = {}));
export default class TodoStore {
    constructor(mainStore) {
        Object.defineProperty(this, "_mainStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_todos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        makeObservable(this);
        this._mainStore = mainStore;
    }
    LoadTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/api/todos");
            if (!response.ok) {
                const message = JSON.parse(yield response.text()).errorText;
                throw new Error(`Ответ сервера: ${message}`);
            }
            else {
                this._todos = yield response.json();
            }
        });
    }
    get Todos() {
        return this._todos;
    }
    AddTodo(todo) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const response = yield fetch("api/todos", {
                method: "POST",
                headers,
                body: JSON.stringify({
                    text: todo.text,
                    isComplited: todo.isComplited
                })
            });
            if (!response.ok) {
                const message = JSON.parse(yield response.text()).errorText;
                throw new Error(`Ответ сервера: ${message}`);
            }
            const newTodo = yield response.json();
            (_a = this._todos) === null || _a === void 0 ? void 0 : _a.push(newTodo);
            return true;
        });
    }
    UpdateTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("api/todos", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });
            if (!response.ok) {
                const message = JSON.parse(yield response.text()).errorText;
                throw new Error(`Ответ сервера: ${message}`);
            }
            const res = yield response.json();
            //    this._todos?.filter(t=>t.id == todo.id)
            console.log(res);
        });
    }
    RemoveTodo(id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`api/todos/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                const message = JSON.parse(yield response.text()).errorText;
                throw new Error(`Ответ сервера: ${message}`);
            }
            //    const res = await response.json();
            this._todos = (_b = (_a = this._todos) === null || _a === void 0 ? void 0 : _a.filter(todo => todo.id !== id)) !== null && _b !== void 0 ? _b : null;
        });
    }
}
__decorate([
    observable,
    __metadata("design:type", Object)
], TodoStore.prototype, "_todos", void 0);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoStore.prototype, "LoadTodos", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TodoStore.prototype, "Todos", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoStore.prototype, "AddTodo", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoStore.prototype, "UpdateTodo", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoStore.prototype, "RemoveTodo", null);
//# sourceMappingURL=TodoStore.js.map