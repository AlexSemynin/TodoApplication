import React from 'react';
import classes from './MenuBurger.module.scss';

const MenuBurger = (props: {isOpen: boolean, onNavToggle: any}) =>{

    const cls = [
        classes.MenuBurger,
        'fa'
    ];
    if(props.isOpen){
        cls.push('fa-times', classes.isOpen);
    }else{
        cls.push('fa-bars');
    }

    return(
        <i 
            className={cls.join(' ')}
            onClick={props.onNavToggle}
        />
    )
}

export default MenuBurger;