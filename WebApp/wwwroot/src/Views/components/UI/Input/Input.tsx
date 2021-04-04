import React from 'react';
// const classes = require('./Input.css');
import classes from './Input.module.scss';

export interface IInputProps{
    label: string;
    onChange: (ev: any)=>void;
    value?: any;
    inputName?: string;

    shouldValidate: boolean;
    invalidText?: string;
    inputType?: InputFormType;
    valid?: boolean;
    toched?: boolean;
}

export type InputFormType = "button"|"checkbox"|"file"|"hidden"|"image"|"password"|"radio"|"reset"|"submit"|"text"|"email";

export interface IValidation{
    requied: boolean;
    email?: boolean;
    minLength?: number;
}

const isInvalid = (valid:boolean|undefined, toched:boolean|undefined, shouldValidate:boolean|undefined ) => {
    return !valid && toched && shouldValidate;
}

const Input = (props: React.PropsWithChildren<IInputProps>) => {

    const inputType = props.inputType ?? "text";
    const cls = [
        classes.Input,
    ];
    const htmlFor = `${inputType.toString()}-${Math.random()}`;

    if(isInvalid(props.valid, props.toched, props.shouldValidate)){
        cls.push(classes.IsInvalid)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label  }</label>
            <input
                id={htmlFor}
                type={inputType}
                onChange={props.onChange}
                value={props.value}
                name={props.inputName}
            />
            {
                isInvalid(props.valid, props.toched, props.shouldValidate) ? 
                    <span>{props.invalidText || "Введите верное значение"}</span>
                    : null
            }
        </div>
    )
}

export default Input;