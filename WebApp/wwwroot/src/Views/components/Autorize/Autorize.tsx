import React, { Dispatch, SetStateAction, useState } from 'react';
import classes from './Autorize.module.scss';
import { inject, observer } from 'mobx-react';
import Input from '../UI/Input/Input';
import ModalPopup, {IModalProps, Footer} from '../../HOC/ModalPopup/ModalPopup';
import * as interfaces from '../../../Store/interfaces/IViews';
import AutoStore from '../../../Store/AutoStore';



type OpenType = boolean | null;

interface IAuthState {
    isOpen: OpenType;
    autoPopupType: interfaces.ModalType;
}


const Autorize = inject("AutoStore")( observer((props: React.PropsWithChildren<{AutoStore?: AutoStore}>) => {

    const [autoState, changeState] = useState<IAuthState>({isOpen: false, autoPopupType: null});
    

    const formControls : Array<interfaces.IFormControl> = [
        {
          value: '',
          type: interfaces.IFormType.email,
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
          type: interfaces.IFormType.password,
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
          type: interfaces.IFormType.name,
          valid: true,
          errorMessage: undefined,
          toched: undefined,
          validation: undefined
        }
      ];



    const headerText = autoState.isOpen === null ? "" 
        : autoState.autoPopupType === "REGISTERPOPUP" ?
            "Регистрация" : "Авторизация";

            
    const footer: Footer= {
        isImage: false,
        content: (
            <div>
                {
                    autoState.isOpen === null ? "" :
                        autoState.autoPopupType === "REGISTERPOPUP" ? 
                            <button>Зарегистрироваться</button> 
                            : <button>Войти</button> 
                }
            </div>
        )
    };

    const openPopup = (isRegister: boolean) => {
        changeState({isOpen: true, autoPopupType: isRegister ? "REGISTERPOPUP" : "AUTHPOPUP" });
    };

    const closePopup = () => {
        changeState({isOpen: false, autoPopupType: null});
    };

    return(
        <React.Fragment>




            <div className={classes.profileWrapper}>
                {props.AutoStore?.isLogin ?
                <React.Fragment>
                    <span>Hi, {props.AutoStore.getUser?.name ?? props.AutoStore.getUser?.email}</span>
                    <button onClick={()=>props.AutoStore?.logout()}>logout</button>
                </React.Fragment> :
                <React.Fragment>
                    <button onClick={() => openPopup(false)}>login</button>
                    <button onClick={() => openPopup(true)}>register</button>
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
                >
                    <div>content</div>
                </ModalPopup>
                :
                undefined
            }







        </React.Fragment>
    )


    //   const renderInputs = (authType?: interfaces.ModalType)=>{
    //     let controls = [...formControls];
    //     if(authType == "AUTHPOPUP"){
    //         controls = controls.filter(control => control.type !== interfaces.IFormType.name);
    //     }

    //     return controls.map((control, index) =>{
    //         return(
    //             <Input
    //                 key={control.type.toString()+index}
    //                 value={control.value}
    //                 inputType={control.type}
    //                 label={control.label}
    //                 invalidText={control.errorMessage}
    //                 valid={control.valid}
    //                 toched={control.toched}
    //                 shouldValidate={!!control.validation}
    //                 onChange={(ev) => this.onChangeHandler(ev,control)}
    //             />
    //         )
    //     });
    // }


    // onChangeHandler(ev, control: interfaces.IFormControl){
    //     // const formControls = JSON.parse(JSON.stringify(this.formControls));; // копировать контролы для дальнейшего их изменения easy 
    //     const formControls = [...this.formControls];
    //     // const control = formControls[controlName];
    //     control.toched = true;
    //     control.value = ev.target.value;
    //     control.valid = this.IsValidControl(ev.target.value, control.validation);

    //     formControls.forEach(c => {
    //         if(c==control){ 
    //             Object.assign(c, control);
    //          }
    //     });
        
    //     this.formControls = formControls;
    //     const isAllControlValid = formControls.every(control => {return control.valid});

    //     // this.formControls = formControls;
    //     this.isFormValid = isAllControlValid;

    // }

    // IsValidControl(value, validation){
    //     if(!validation) return true; //если кнотрол не нужно валидировать

    //     let isValid = true; 

    //     if(validation.requied){
    //         isValid = value.trim() !== "";
    //     }
    //     if(validation.email){
    //         const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //         isValid = re.test(String(value).toLowerCase());
    //     }
    //     if(validation.minLength){
    //         isValid = value.length >= validation.minLength;
    //     }

    //     return isValid;
    // }
    // ClearInputs(){
    //     Object.keys(this.formControls).forEach((controlName, i) => {
    //         this.formControls[controlName].value = "";
    //         this.formControls[controlName].toched = false;
    //     });
    // }



    // const submitHandler1 = (ev: SyntheticEvent) => {
    //     const input : HTMLInputElement | null = document.querySelector(`.${classes.Txt}`);
    //     const value = input?.value.trimStart().trimEnd();
    //     let todo: ITodo;
    //     if(value && input){
    //         todo = {text: value, isComplited: false};
    //         props.submitHandler(todo);
    //         input.value = '';
    //     }
    // }

    // const content = (
    //     <div className={classes.contentWrapper}>
    //         <
    //     </div>
    // )

    // const modalProps: IModalProps = {
    //     headerText: props.isRegister ? "Регистрация" : "Авторизация",
    //     content:
    // }

    // return(
    //     <ModalPopup >

    //     </ModalPopup>

    // )
}));

export default Autorize;