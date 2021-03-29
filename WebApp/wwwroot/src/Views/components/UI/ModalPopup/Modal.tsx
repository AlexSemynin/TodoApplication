import React, { SyntheticEvent } from 'react';
import { ITodo } from 'Store/TodoStore';
import Backdrop from '../BackDrop/Backdrop';
import classes from './Modal.module.scss';


const Modal = (props: {isOpen: boolean, submitHandler:any, closeHandler: any}) => {


    const submitHandler1 = (ev: SyntheticEvent) =>{
        const input : HTMLInputElement | null = document.querySelector(`.${classes.Txt}`);
        const value = input?.value.trimStart().trimEnd();
        let todo: ITodo;
        if(value && input){
            todo = {text: value, isComplited: false};
            props.submitHandler(todo);
            input.value = '';
        }
    }

    console.log(`render POPUP`);
    const cls = [
        classes.Modal
    ];
    if(props.isOpen){
        cls.push(classes.isActive);
    }
    return(
        <React.Fragment>
            <Backdrop isOpen={props.isOpen} navToggleHandler={props.closeHandler}/>
            <div className={cls.join(' ')}>
                <div className={classes.Header}>
                    <span></span>
                    <span>Добавить тодо</span>
                    <span onClick={props.closeHandler}><i className={"fa fa-times"}/></span>    
                </div>
                <div className={classes.Content}>
                    <input className={classes.Txt} type="text" placeholder='что вы хотите сделать?'/>
                    <i className='fas fa-check' onClick={(e)=>submitHandler1(e)}/>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Modal;