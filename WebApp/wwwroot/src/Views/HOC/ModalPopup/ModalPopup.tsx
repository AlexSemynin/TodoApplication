import React, { ReactNode, useEffect, useState } from 'react';
import classes from './ModalPopup.module.scss';
import Backdrop from '../../components/UI/BackDrop/Backdrop';
import { InputFormType, IValidation } from 'Views/components/UI/Input/Input';
import Loader from '../../components/UI/Loader/Loader';


export type Footer = {isImage: boolean, content: ReactNode};

export interface IModalProps{
    headerText: string;
    // content: ReactNode;
    footer: Footer;
    // footer?: {
    //     isImage: boolean,
    //     content: ReactNode,
    //     // actionHandler?: (e?:SyntheticEvent) => void,
    //     // disabledButton?: boolean,
    // };

    isOpen: boolean;
    closeHandler: () => void;
    isLoading: boolean;
}

export interface IFormControl{
    value: string;
    readonly type: InputFormType;
    readonly label: string;
    valid: boolean;
    readonly errorMessage: string | undefined;
    toched: boolean | undefined;
    validation: IValidation | undefined;
}

export type ModalType = "AUTHPOPUP" |  "REGISTERPOPUP" | null;

const modalPopup = (props: React.PropsWithChildren<IModalProps>) => {

    // const [isOpen, toggleOpen] = useState(false);
    // useEffect(()=>{
    //     return () => {
    //         toggleOpen(false);
    //     }
    // });


    const renderHeader = () => {

        return(
            <React.Fragment>
                <span>
                {
                    <Loader isActive={props.isLoading}/>
                }
                </span>
                <span>{props.headerText}</span>
                <span onClick={props.closeHandler}><i className={"fa fa-times"}/></span>    
            </React.Fragment>
        )
    };

    const renderContent = () => {
        return(
            props.children
        )
    }

    const renderFooter = () => {

        // if(props.footer){
        //     const elem = (props.footer.isImage && props.actionHandler) ?
        //     <i className={`${props.footer.content}`} onClick={(e)=>props.actionHandler!(e)}/> //fas fa-check
        //     :
        //     <button onClick={(e) => { props.actionHandler!(e) }}>
        //         {props.footer?.content}
        //     </button>
        return props.footer?.content;
    };

    const cls = [
        classes.Modal,
        classes.isActive,
    ];
    // if(props.isOpen){
    //     cls.push(classes.isActive);
    // }

    return(
       <React.Fragment>
            <Backdrop isOpen={props.isOpen} navToggleHandler={props.closeHandler}/>
            <div className={cls.join(' ')}>
                <div className={classes.Header}>
                    {renderHeader()}
                </div>
                <div className={classes.Content}>
                    {/* <input className={classes.Txt} type="text" placeholder='что вы хотите сделать?'/>*/}
                    {renderContent()}
                </div>
                {props.footer ?
                    <div className={classes.Footer}>
                        {renderFooter()}
                    </div> 
                    : null}
            </div>
        </React.Fragment>
    );
};

export default modalPopup;