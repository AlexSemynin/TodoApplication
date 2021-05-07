import MainStore from '../Store/MainStore';
import CustomError from '../Servises/CustomError';

import { action, makeAutoObservable, observable } from "mobx";

export default class ErrorStore{
    private _mainStore: MainStore;
    constructor(mainStore: MainStore){
        this._mainStore = mainStore;
        this.errorList = [];
        this._lifeTime = 20000;
        makeAutoObservable(this);
    }
    private _lifeTime: number;

    @observable
    public errorList: Array<CustomError>;

    @action
    public SetError(err: CustomError){
        this.errorList.push(err);
        const timer = window.setTimeout(()=>{
            //this.errorList.shift(); //FIFO
            this.removeError(err);
            window.clearTimeout(timer);
        }, this._lifeTime);
    }

    @action
    public removeError(err: CustomError){
        this.errorList.splice(this.errorList.indexOf(err),1);
    }
}
