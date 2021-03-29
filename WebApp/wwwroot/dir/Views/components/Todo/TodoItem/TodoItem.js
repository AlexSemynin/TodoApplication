var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React from 'react';
import classes from './TodoItem.module.scss';
import { changeTodoType } from '../../../../Store/TodoStore';
import { inject, observer } from 'mobx-react';
// export default class TodoItem extends React.Component<ITodo, IState>{ ------- То сюда надо было бы передавать так: const todo: ITodo; <TodoItem {...todo}/>
let TodoItem = class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isChecked: this.props.todo.isComplited,
        // };
    }
    // checkedChange(todo: ITodo){
    //     this.props.changeHandler(todo, changeTodoType.checkbox);
    //     // this.setState({isChecked: !this.state.isChecked});
    //     // console.log(todo.id);
    // }
    render() {
        const todo = this.props.todo;
        const clsTextDeco = [classes.text];
        todo.isComplited ? clsTextDeco.push(classes.deco) : undefined;
        console.log(`render Li-id-${todo.id} isChecked=${todo.isComplited}`);
        return (React.createElement("li", { className: classes.Item },
            React.createElement("div", { className: classes['text-wrapper'] },
                React.createElement("input", { className: classes.complited, type: "checkbox", defaultChecked: todo.isComplited, onChange: () => { this.props.changeHandler(todo, changeTodoType.checkbox); } }),
                React.createElement("div", { className: classes.knobs }),
                React.createElement("span", { className: clsTextDeco.join(" ") }, todo.text)),
            React.createElement("div", { className: classes['button-wrapper'] },
                React.createElement("i", { className: 'fas fa-edit' }),
                React.createElement("i", { className: "fa fa-times", onClick: () => { this.props.changeHandler(todo, changeTodoType.remove); } }),
                React.createElement("i", { className: "fas fa-ellipsis-h" }))));
    }
};
TodoItem = __decorate([
    inject("TodoStore"),
    observer,
    __metadata("design:paramtypes", [Object])
], TodoItem);
export default TodoItem;
//# sourceMappingURL=TodoItem.js.map