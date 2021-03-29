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
import classes from './TodoList.module.scss';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { changeTodoType } from '../../../../Store/TodoStore';
import Loader from '../../UI/Loader/Loader';
import TodoItem from '../TodoItem/TodoItem';
import Modal from '../../UI/ModalPopup/Modal';
let TodoList = class TodoList extends React.Component {
    get todoStore() {
        return this.props.TodoStore;
    }
    constructor(props) {
        super(props);
        // this.isLoading = false;
    }
    // private _isLoading: boolean;
    // private todos: 
    componentDidMount() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`тудухи загружены - ${!!this.todoStore.Todos}`);
            const todos = (_a = this.todoStore.Todos) !== null && _a !== void 0 ? _a : yield this.todoStore.LoadTodos();
            console.log(todos);
        });
    }
    todoItemChange(todo, changeType) {
        switch (changeType) {
            case changeTodoType.add:
                break;
            case changeTodoType.remove:
                this.todoStore.RemoveTodo(todo.id);
                break;
            case changeTodoType.checkbox:
                todo.isComplited = !todo.isComplited;
                this.todoStore.UpdateTodo(todo);
                break;
            case changeTodoType.text:
                break;
            case changeTodoType.position:
                break;
            default:
                throw new Error("Добавь тип плиз");
        }
    }
    renderList() {
        var _a;
        return (((_a = this.todoStore.Todos) === null || _a === void 0 ? void 0 : _a.length) ?
            React.createElement("ul", null, this.todoStore.Todos.map((todo, index) => {
                return (React.createElement(TodoItem, { todo: todo, changeHandler: this.todoItemChange.bind(this), key: `todo_${index}` }));
            }))
            :
                React.createElement("span", null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0422\u043E\u0434\u043E!"));
    }
    renderPopup() {
        return (React.createElement(Modal, { isOpen: this.props.ModalStore.IsActive, closeHandler: () => this.props.ModalStore.CloseModal(), submitHandler: this.AddTodo.bind(this) }));
    }
    AddTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const isSuccess = yield this.todoStore.AddTodo(todo);
            if (isSuccess)
                this.props.ModalStore.IsActive = false;
        });
    }
    render() {
        console.log(`render TodoList`);
        return (React.createElement(React.Fragment, null,
            this.todoStore.Todos ?
                React.createElement("div", { className: classes.TodoList }, this.renderList())
                :
                    React.createElement("div", { className: classes["loaderWrapper"] },
                        React.createElement("div", null,
                            React.createElement(Loader, { isActive: true }))),
            React.createElement("i", { className: `${classes.AddTodo} fas fa-plus-circle`, onClick: () => this.props.ModalStore.OpenModal("ADD") }),
            this.renderPopup()));
    }
};
TodoList = __decorate([
    inject("TodoStore", "ModalStore"),
    observer,
    __metadata("design:paramtypes", [Object])
], TodoList);
export default TodoList;
//# sourceMappingURL=TodoList.js.map