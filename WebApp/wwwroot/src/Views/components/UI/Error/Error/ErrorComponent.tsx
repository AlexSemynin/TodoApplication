import React from 'react';
import CustomError from 'Servises/CustomError';
import classes from './Error.module.scss';

const ErrorComponent = (props: {
        customError: CustomError,
        onCloseHandler: Function,
    }) => {

    return(
        <div className={classes.ErrorComp}>
            <i 
                className={"fa fa-times"}
                onClick={() => props.onCloseHandler()}
            />
            <span>
                {props.customError.message}
            </span>
        </div>
    )
};

export default ErrorComponent;