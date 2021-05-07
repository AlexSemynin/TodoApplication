import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import classes from './Autorize.module.scss';
import { inject, observer } from 'mobx-react';
import Input, { IValidation } from '../UI/Input/Input';
import ModalPopup, {IModalProps, Footer, ModalType, IFormControl} from '../../HOC/ModalPopup/ModalPopup';
import AutoStore from '../../../Store/AutoStore';
import Button, {ButtonType} from '../UI/Button/Button';
import { History } from 'history/index';


type OpenType = boolean | null;

interface IAuthState {
    isOpen: OpenType;
    autoPopupType: ModalType;
}


const Autorize = inject("AutoStore","LocationInfo")( observer((props: React.PropsWithChildren<{AutoStore?: AutoStore, LocationInfo?: History,}>) => {

    const [autoState, changeState] = useState<IAuthState>({isOpen: false, autoPopupType: null});
    const [isFormVaild, changeValidForm] = useState(false);
    const [isFormLoading, changeStateFormLoader] = useState(false);
    const [formControls, changeControls] = useState<Array<IFormControl>>([
        {
            value: '',
            type: 'email',
            label: 'EMAIL',
            errorMessage: 'Введите корректный email',
            valid: false,
            toched: false,
            validation: {
                requied: true,
                email: true
            }
          },
          {
            value: '',
            type: "password",
            label: 'Пароль',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            toched: false,
            validation: {
                requied: true,
                minLength: 6
            }
          },
          {
            value: '',
            label: "Имя",
            type: "text",
            valid: true,
            errorMessage: undefined,
            toched: undefined,
            validation: undefined
          }
    ]);

    


    const renderInputs = (authType?: ModalType)=>{
        let controls = [...formControls];
        if(authType == "AUTHPOPUP"){
            controls = controls.filter(control => control.type !== "text");
        }

        return controls.map((control, index) =>{
            return(
                <Input
                    key={control.type.toString()+index}
                    value={control.value}
                    inputType={control.type}
                    label={control.label}
                    invalidText={control.errorMessage}
                    valid={control.valid}
                    toched={control.toched}
                    shouldValidate={!!control.validation}
                    onChange={(ev: any) => onChangeHandler(ev,control)}
                />
            )
        });
    }
    const onChangeHandler = (ev: any, control: IFormControl) => {
        // const formControls = JSON.parse(JSON.stringify(this.formControls));; // копировать контролы для дальнейшего их изменения easy 
        const _formControls = [...formControls];
        // const control = formControls[controlName];
        control.toched = true;
        control.value = ev.target.value;
        control.valid = isValidControl(ev.target.value, control.validation);

        _formControls.forEach(c => {
            if(c==control){ 
                Object.assign(c, control);
             }
        });
        
        changeControls(_formControls);
        const isAllControlValid = formControls.every(control => {return control.valid});

        changeValidForm(isAllControlValid);
    }

    const isValidControl = (value: string, validation?: IValidation) => {
        if(!validation) return true; //если кнотрол не нужно валидировать

        let isValid = true; 

        if(validation.requied){
            isValid = value.trim() !== "";
        }
        if(validation.email){
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase());
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength;
        }

        return isValid;
    }
    
    const clearInputs = () => {
        formControls.forEach((control, i)=>{
            control.value = "";
            control.toched=false;
        });
    }


    const renderContent = () => {

        return(
            <div className={classes.inputsWrapper}>
                {renderInputs(autoState.autoPopupType)}
            </div>
        )
    }


    const headerText = autoState.isOpen === null ? "" 
        : autoState.autoPopupType === "REGISTERPOPUP" ?
            "Регистрация" : "Авторизация";

            
    const footer: Footer= {
        isImage: false,
        content: (
            <React.Fragment>
                {
                    autoState.isOpen === null ? "" :
                        autoState.autoPopupType === "REGISTERPOPUP" ? 
                            <Button
                                type="success"
                                onClick={async () => {
                                    changeStateFormLoader(true);
                                    await props.AutoStore?.register(
                                        formControls.filter(c => c.type === "email")[0].value,
                                        formControls.filter(c => c.type === "password")[0].value,
                                        formControls.filter(c => c.type === "text")[0].value
                                    );
                                    changeStateFormLoader(false);
                                    changeState({isOpen: false, autoPopupType: null});
                                }}
                                disabled={!isFormVaild}
                            >
                                Зарегистрироваться
                            </Button> 
                            : <Button
                                type="success"
                                onClick={async () => {
                                    changeStateFormLoader(true);
                                    await props.AutoStore?.login(
                                        formControls.filter(c => c.type === "email")[0].value,
                                        formControls.filter(c => c.type === "password")[0].value
                                    );
                                    changeStateFormLoader(false);
                                    changeState({isOpen: false, autoPopupType: null});
                                    props.LocationInfo?.push("/todos");
                                }}
                                disabled={!isFormVaild}
                            >
                                Войти
                            </Button>
                }
            </React.Fragment>
        )
    };

    const openPopup = (isRegister: boolean) => {
        changeState({isOpen: true, autoPopupType: isRegister ? "REGISTERPOPUP" : "AUTHPOPUP" });
    };

    const closePopup = () => {
        changeState({isOpen: false, autoPopupType: null});
        clearInputs();
        changeValidForm(false);
    };

    return(
        <React.Fragment>




            <div className={classes.profileWrapper}>
                {props.AutoStore?.isLogin ?
                <React.Fragment>
                    <span>Hi, {props.AutoStore.getUser?.name ?? props.AutoStore.getUser?.email}</span>
                    <div className={classes.BtnLogoutWrapper}>
                        <Button type="primary" disabled={false} onClick={()=>{props.AutoStore?.logout(); props.LocationInfo?.push("/")}}>logout</Button>
                    </div>
                </React.Fragment> :
                <React.Fragment>
                    <div className={classes.BtnLogoutWrapper}>
                        <Button disabled={false} type="success" onClick={() => openPopup(false)}>login</Button>
                        <Button disabled={false} type="success" onClick={() => openPopup(true)}>register</Button>
                    </div>
                </React.Fragment>
                }
            </div>

            
            {
                autoState.isOpen ? 
                <ModalPopup 
                    headerText={headerText}
                    footer={footer}
                    isOpen={autoState.isOpen}
                    closeHandler={closePopup}
                    isLoading={isFormLoading}
                >
                    <div>{renderContent()}</div>
                </ModalPopup>
                :
                undefined
            }
        </React.Fragment>
    )
}));

export default Autorize;