import React from 'react';
import classes from './TodoItem.module.scss';
import TodoStore, {ITodo, changeTodoType} from '../../../../Store/TodoStore';
import { inject, observer } from 'mobx-react';

interface IState {
    isChecked: boolean
}

type propsTodo = {
    todo: ITodo,
    changeHandler: Function
    todoStore?: TodoStore
}

// export default class TodoItem extends React.Component<ITodo, IState>{ ------- То сюда надо было бы передавать так: const todo: ITodo; <TodoItem {...todo}/>
@inject("TodoStore")
@observer
export default class TodoItem extends React.Component<propsTodo, IState>{


    constructor(props: propsTodo) {
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

    render(){
        const todo = this.props.todo;
        const clsTextDeco = [classes.text];
        todo.isComplited ? clsTextDeco.push(classes.deco) : undefined;

        console.log(`render Li-id-${todo.id} isChecked=${todo.isComplited}`);

        return(
            <li className={classes.Item}>
                {/* <div className={classes['todo-wrapper']}> */}
                    <div className={classes['text-wrapper']}>
                        <input className={classes.complited} type="checkbox" defaultChecked={todo.isComplited} onChange={()=>{this.props.changeHandler(todo, changeTodoType.checkbox)}}/>
                        <div className={classes.knobs}></div>
                        <span className={clsTextDeco.join(" ")}>{todo.text}</span>
                    </div>
                    <div className={classes['button-wrapper']}>
                        <i className='fas fa-edit'/>
                        <i className="fa fa-times" onClick={()=>{this.props.changeHandler(todo, changeTodoType.remove)}}/>
                        <i className="fas fa-ellipsis-h"/>
                    </div>
                {/* </div> */}
            </li>
        )
    }
}