import classes from './TodoList.module.scss';
import { inject, observer } from 'mobx-react';
import React from 'react';
import TodoStore, { changeTodoType, ITodo } from '../../../../Store/TodoStore';
import Loader from '../../UI/Loader/Loader';
import TodoItem from '../TodoItem/TodoItem';
import Modal from '../../UI/ModalPopup/Modal';
import ModalStore from 'Store/ModalStore';
import AutoStore from 'Store/AutoStore';


@inject("TodoStore", "ModalStore","AutoStore")
@observer
export default class TodoList extends React.Component<{TodoStore: TodoStore, ModalStore: ModalStore, AutoStore: AutoStore}> {

    private get todoStore() {
        return this.props.TodoStore;
    }

    private get autoStore(){
        return this.props.AutoStore;
    }

    constructor(props: {TodoStore: TodoStore, ModalStore: ModalStore, AutoStore: AutoStore}){
        super(props);
        // this.isLoading = false;
    }

    // private _isLoading: boolean;
    // private todos: 

    async componentDidMount() {
        console.log(`тудухи загружены - ${!!this.todoStore.Todos}`);
        const todos = this.todoStore.Todos ?? await this.todoStore.LoadTodos();
        console.log(todos);
    }

    todoItemChange(todo: ITodo, changeType: changeTodoType){
        switch(changeType){
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

    renderList(){
        return(
                this.todoStore.Todos?.length ? 
                <ul>
                    {this.todoStore.Todos.map((todo: ITodo, index) =>{
                        return(<TodoItem 
                                    todo={todo}
                                    changeHandler={this.todoItemChange.bind(this)}
                                    key={`todo_${index}`}
                                />)
                    })}
                </ul>
                :
                <span>Добавить Тодо!</span>
        )
    }

    renderPopup(){
        return(
            <Modal 
                isOpen={this.props.ModalStore.IsActive}
                closeHandler={() => this.props.ModalStore.CloseModal()}
                submitHandler={this.AddTodo.bind(this)}/>
        )
    }

    async AddTodo(todo: ITodo){
        const isSuccess = await this.todoStore.AddTodo(todo);
        if(isSuccess)
            this.props.ModalStore.IsActive=false;
    }

    render() {
        console.log(`render TodoList`);
        return ( 
            <React.Fragment>
                {
                    this.todoStore.Todos ? 
                        <div className={classes.TodoList}>
                            {this.renderList()}                        
                        </div>
                        :
                        <div className={classes["loaderWrapper"]}>
                            <div>
                                <Loader isActive={true}></Loader>
                            </div>
                        </div>
                }
                <i className={`${classes.AddTodo} fas fa-plus-circle`} onClick={() => this.props.ModalStore.OpenModal("ADD")}/>
                {/* <Modal isOpen={false} closeHandler/> */}
                {this.renderPopup()}
            </React.Fragment>
        )
    }
}