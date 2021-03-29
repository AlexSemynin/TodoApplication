import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props: {isOpen: boolean, navToggleHandler: any}) =>{
    const cls = [
        classes.Backdrop
    ];
    if(props.isOpen){
        cls.push(classes.isOpen);
    }
    return(
        <div 
            className={cls.join(' ')}
            onClick={props.navToggleHandler}
        />
    )
};

export default Backdrop;