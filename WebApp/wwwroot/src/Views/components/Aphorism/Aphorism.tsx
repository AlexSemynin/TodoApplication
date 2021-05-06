import { inject, observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import ModalPopup from '../../../Views/HOC/ModalPopup/ModalPopup';
import AphorismStore, { Aphorism } from '../../../Store/AphorismStore';
import AutoStore from '../../../Store/AutoStore';
import ModalStore from '../../../Store/ModalStore';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import Input from '../UI/Input/Input';
import classes from './Aphorism.module.scss';

// type formAphorism = {canSend: boolean, aphorism: Aphorism}


const Aphorism = inject("AutoStore", "AphorismStore", "ModalStore")(observer(
    (props: React.PropsWithChildren<{AutoStore?: AutoStore, AphorismStore?: AphorismStore, ModalStore?:ModalStore}>) => {
        const autoStore = props.AutoStore!;
        const aphorismStore = props.AphorismStore!;
        const modalStore = props.ModalStore!;

        //const [aphorism, changeAphorism] = useState<Aphorism|null>(aphorismStore.GetRandomAphorism);
        const [canSubmit, changeCanSubmit] = useState(false);
        const contentInput = useRef<HTMLInputElement>(null);
        const authorInput = useRef<HTMLInputElement>(null);
        const initBtnCls = [classes.Icons, classes.reload, "fas fa-sync-alt"];
        const [reloadBtnCls, changeReloadBtnCls] = useState(initBtnCls.join(" "));
        

        const cleanInputs = () =>{
            if(authorInput.current && contentInput.current){
                authorInput.current.value = "";
                contentInput.current.value = "";
                changeCanSubmit(false);
            }
        }


        return(
        <div className={classes.Aphorism}>
            <h2 className={classes.Content}>{aphorismStore.GetRandomAphorism?.content}</h2>
            <h3 className={classes.Author}>{aphorismStore.GetRandomAphorism?.author}</h3>
            {/* <div style={{position: 'absolute', width: "100%", height: '100%', top:0, right:0,zIndex:-1}}>
                <Loader isActive={aphorismStore.isLoading}/>
            </div> */}
            <Button
                type="non-style"
                disabled={false}
                onClick={async () => {
                    initBtnCls.push(classes.isActive);
                    changeReloadBtnCls(initBtnCls.join(" "));
                    await aphorismStore.LoadRandomAphorism();
                    const timer = window.setTimeout(()=>{
                        initBtnCls.pop();
                        changeReloadBtnCls(initBtnCls.join(" "));
                        window.clearTimeout(timer);
                    }, 300);
                }}
            >
                <i className={reloadBtnCls}/>
            </Button>
            {
                autoStore.getUser?.isAdmin ?
                <>
                    <Button
                        type="non-style"
                        disabled={false}
                        onClick={()=>{ modalStore.IsActive=true; }}
                    >
                        <i className={`${classes.Icons} ${classes.add} fas fa-plus-circle`}/>
                    </Button>

                    <ModalPopup
                        headerText="Add Aphorism"
                        footer={{
                            isImage: true,
                            content:
                                <Button
                                    type="success-img"
                                    disabled={ (!canSubmit && autoStore.getUser?.isAdmin) ?? true}
                                    onClick={async () => {
                                        let content = contentInput.current?.value;
                                        let author = authorInput.current?.value;
                                        if(authorInput.current && contentInput.current && content && author){
                                            aphorismStore.CreateAphorism({content, author});
                                            cleanInputs();
                                            modalStore.IsActive = false;
                                        }
                                    }}
                                >
                                    <i className={`fas fa-check`}/>
                                </Button>
                        }}
                        isOpen={modalStore.IsActive}
                        closeHandler={() => {
                            cleanInputs();
                            modalStore.IsActive=false;
                        }}
                        isLoading={aphorismStore.isLoading}
                    >
                        <Input                    
                            label="Высказывание"
                            onChange={(e: InputEvent) => {
                                const canSubmit = !!contentInput.current?.value.trim() && !!authorInput.current?.value.trim();
                                changeCanSubmit(canSubmit);
                            }}
                            shouldValidate={false}
                            ref={contentInput}
                            
                        />

                        <Input
                            label="Автор"
                            onChange={(e: InputEvent) => {
                                const canSubmit = !!contentInput.current?.value.trim() && !!authorInput.current?.value.trim();
                                changeCanSubmit(canSubmit);
                            }}
                            shouldValidate={false}
                            ref={authorInput}
                        />
                        

                    </ModalPopup>
                </>
                :
                <></>
            }
        </div>)
    }
));

export default Aphorism;