import React, { SyntheticEvent } from 'react';
import {inject, observer} from 'mobx-react';
import classes from './Error.module.scss';
import ErrorComponent from './Error/ErrorComponent';
import ErrorStore from '../../../../Store/ErrorStore';
import CustomError from 'Servises/CustomError';


const ErrorWrapper = inject("ErrorStore")(observer((props: React.PropsWithChildren<{ErrorStore?: ErrorStore}> ) =>{
    const errorStore = props.ErrorStore!;
    const cls = [classes.ErrorWrapper];
    errorStore.errorList.length ? cls.push(classes.Active) : undefined;

    const closeHandler = (err: CustomError) => {
        errorStore.removeError(err);
    }

    return(
        <div className={cls.join(" ")}>
            <ul>
                {errorStore.errorList?.map((element, i) => {
                    return(
                        <li key={`error-component-${i}`}>
                            <ErrorComponent
                                customError={element}
                                onCloseHandler={() => closeHandler(element)}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}));

export default ErrorWrapper;