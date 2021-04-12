import React from 'react';
import classes from './Button.module.scss';


export type ButtonType = "error" | "success" | "primary" | "success-img";

export interface ButtonProps{
    type: ButtonType;
    disabled: boolean;
    onClick: Function;
}

const Button = (props: React.PropsWithChildren<ButtonProps>) =>{

    const cls = [
        classes.Button,
        classes[props.type]
    ]

    return(


        <button
            onClick={()=>props.onClick()}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;