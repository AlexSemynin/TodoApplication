import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import IMainStore from "./interfaces/IMainStore";


export interface Aphorism{
    id?: number;
    author: string;
    content: string;
}

export default class AphorismStore{
    private _mainStore: IMainStore;

    constructor(mainStore: IMainStore){
        makeAutoObservable(this);
        this._mainStore = mainStore;
        this._currentAphorism = null;
        this.isLoading = false;
        this.LoadRandomAphorism();
    }

    @observable 
    public isLoading: boolean;
    @observable
    private _currentAphorism: Aphorism | null;

    @action
    public async LoadRandomAphorism(){
        this.isLoading = true;
        const resp = await fetch("/api/slovo");
        if(!resp.ok){
            const errorMessage = await resp.text();
            throw new Error(`Ошибка при получении афоризма. Ответ сервера:\n ${errorMessage}`);
        }
        this.isLoading = false;
        this._currentAphorism = <Aphorism> await resp.json();
        return this._currentAphorism;
    }

    @computed
    get GetRandomAphorism(){
        return this._currentAphorism;
    }

    @action async CreateAphorism(aphorism: Aphorism){

        if(!this._mainStore.AutoStore.getUser?.isAdmin){
            throw new Error("Ошибка при создании афоризма: только админ могет");
        }
        this.isLoading = true;
        const token = this._mainStore.AutoStore.getUser?.access_token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + token);

        const resp = await fetch("api/slovo", {
            method: "POST",
            headers,
            body: JSON.stringify(aphorism)
        });
        if(!resp.ok){
            throw new Error("Ошибка при создании афоризма:")
        }

        this._currentAphorism = <Aphorism> await resp.json();
        this.isLoading = false;
        return this._currentAphorism;
    }

}