import classes from './TodoList.module.scss';
import { inject, observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';
import TodoStore, { changeTodoType, ITodo } from '../../../../Store/TodoStore';
import Loader from '../../UI/Loader/Loader';
import TodoItem from '../TodoItem/TodoItem';
import Modal from '../../UI/ModalPopup/Modal';
import ModalStore from 'Store/ModalStore';
import AutoStore from 'Store/AutoStore';
import ModalPopup, { Footer } from '../../../HOC/ModalPopup/ModalPopup';
import Input from 'Views/components/UI/Input/Input';


interface IState{
    changedTodoInputState?: string;
    popupState:{
        isPopupActive: boolean,
        headerText: string,
        content: React.ReactNode,
        footer: Footer,
        type: TodoListPopupsType,
    }
}
type TodoListPopupsType = "ADD" | "CHANGE" | "CLEAN";

@inject("TodoStore", "ModalStore","AutoStore")
@observer
export default class TodoList extends React.Component<{TodoStore: TodoStore, ModalStore: ModalStore, AutoStore: AutoStore}, IState> {

    private get todoStore() {
        return this.props.TodoStore;
    }

    private get autoStore(){
        return this.props.AutoStore;
    }

    initialState: IState= {
        popupState: {
            isPopupActive: false,
            headerText: "",
            content: <React.Fragment></React.Fragment>,
            footer: {
                isImage: false,
                content: <React.Fragment></React.Fragment>
            },
            type: "CLEAN"
        }
    }

    constructor(props: {TodoStore: TodoStore, ModalStore: ModalStore, AutoStore: AutoStore}){
        super(props);
        this.state = this.initialState;
    }

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
                this.setState({changedTodoInputState: todo.text});
                const timer = window.setTimeout(()=>{
                    this.changePopupState("CHANGE", todo);
                    window.clearTimeout(timer);
                }, 0);
                break;
            case changeTodoType.position:
                break;
            default:
                throw new Error("Добавь тип плиз");
        }
    }

    updateTodoItemText(e: React.ChangeEvent<HTMLInputElement> /*React.MouseEvent<HTMLElement, MouseEvent>*/){
        const text = e.target.value;
        const popupState = this.state.popupState;
        const content = <input id={classes.popupContentInputId} value={text} type="text" onChange={(e)=>{this.updateTodoItemText(e)}}/>;
        popupState.content = content;
        this.setState({popupState});
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

    getInputValue(e: SyntheticEvent){
        const input: HTMLInputElement|null = document.querySelector(`#${classes.popupContentInputId}`);
        const value = input?.value.trimStart().trimEnd();
        if(value && value !== ""){ 
            return value;
        }else{
            return null;
        }
    }

    async submitValue(e: SyntheticEvent, type: TodoListPopupsType, oldTodo?: ITodo){
        const value = this.getInputValue(e);
        if(value){
            const todo: ITodo = {id: oldTodo?.id, text: value, isComplited: oldTodo?.isComplited ?? false}; 
            switch(type){
                case "ADD":
                    const isSuccess = await this.todoStore.AddTodo(todo);
                    if(isSuccess)
                        this.props.ModalStore.IsActive=false;
                break;
                case "CHANGE":
                    await this.todoStore.UpdateTodo(todo);
                break;
            }
            this.setState({popupState: this.initialState.popupState, changedTodoInputState: ""});
        }else{
            alert("БД пробелами засрать хочешь?");
        }
    }

    changePopupState(type: TodoListPopupsType, oldTodo?: ITodo){
        let isPopupActive: boolean;
        let headerText: string;
        let content: React.ReactNode;
        let footer: Footer;

        switch(type){
            case "CHANGE": {
                isPopupActive = true;
                headerText = "Изменить задачу";
                content = <input id={classes.popupContentInputId} value={this.state.changedTodoInputState} type="text" onChange={(e)=>{this.updateTodoItemText(e)}}/>;
                footer = {
                    isImage: true,
                    content: <i className='fas fa-check' onClick={(e)=>this.submitValue(e, type, oldTodo)}/>
                };
                
                break;
            }
            case "ADD": {
                isPopupActive = true;
                headerText = "Добавить тодо";
                content = <input id={classes.popupContentInputId} placeholder='что вы хотите сделать?' type="text"/>;
                footer = {
                    isImage: true,
                    content: <i className='fas fa-check' onClick={(e)=>this.submitValue(e, type)}/>
                }
                break;
            }
            case "CLEAN":{
                isPopupActive = false;
                headerText = this.initialState.popupState.headerText;
                content = this.initialState.popupState.content;
                footer = this.initialState.popupState.footer;
            }
            break;
        }

        this.setState({
            popupState: {
                isPopupActive,
                headerText,
                content,
                footer,
                type,
            }
        });
    }

    renderPopup(){
        return(
            <ModalPopup
                headerText={this.state.popupState.headerText}
                footer={this.state.popupState.footer}
                isOpen={this.state.popupState.isPopupActive}
                closeHandler={()=>{this.changePopupState("CLEAN")}}
                isLoading={false}
            >
                {this.state.popupState.content}
            </ModalPopup>
        )
    }

    render() {       
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
                <i className={`${classes.AddTodo} fas fa-plus-circle`} onClick={() => this.changePopupState("ADD")}/>

                {this.state.popupState.isPopupActive ? 
                    this.renderPopup() :
                    undefined
                }
            </React.Fragment>
        )
    }
}