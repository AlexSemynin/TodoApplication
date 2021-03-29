import React from 'react';
import classes from './Loader.module.scss';

const Loader = ( props: { isActive: boolean, } ) =>{
    const cls = [
        classes.Loader
    ];

    if(props.isActive){
        cls.push(classes.active);
    };

    return(
        <div className={cls.join(' ')}>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader;