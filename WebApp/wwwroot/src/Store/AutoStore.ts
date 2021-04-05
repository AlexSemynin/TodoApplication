import { action, computed, makeObservable, observable } from "mobx";
import IMainStore from './interfaces/IMainStore';
import IAutoStore, {User} from './interfaces/IAutoStore';

export default class AutoStore implements IAutoStore {
    constructor(mainStore: IMainStore){
        makeObservable(this);
        this._mainStore = mainStore;
        // const user = localStorage.getItem("user");
        this._user =  localStorage.getItem("user") ?? null;
        this.isLogin = !!this._user;
    }

    private _autoLogoutMCec = 1000*60*20 //20 minuties  

    private _mainStore: IMainStore;

    @observable
    private _user: string | null;

    @computed
    get getUser() : User{
        const user = this._user;
        return user ? JSON.parse(user) : null;
    }

    @observable
    isLogin: boolean;

    @action
    async login(email: string, password: string){
        try{
            let response = await fetch('api/account/token', {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, 
                    password
                })
            });
            if (!response.ok) {
                const message = JSON.parse(await response.text()).errorText;
                throw new Error(`Ответ сервера: ${message}`);
            }else{
                this._user = await response.text();
                localStorage.setItem("user", this._user);
                this.isLogin = true;
                this.autoLogout(this._autoLogoutMCec);
            }
        }catch(e){
            throw new Error(e);
        }
    }

    @action
    async register(email: string, password: string, name?: string):Promise<string>{
        let message: string = "";
        try{
            let response = await fetch('api/account/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password, name})
            })
            if (!response.ok) {
                const eMessage = JSON.parse(await response.text()).errorText;
                message = "Ошибка сервера см. лог";
                throw new Error(`Ответ сервера: ${eMessage}`);
            }else{
                // this._user = await response.json();
                // this.isLogin = true;
                message = "Успешная регистрация";
            }
        }catch(e){
            message = `Ошибка - ${e.message}`
        }finally{
            return message;
        }
    }

    @action
    async logout(){
        localStorage.removeItem("user");
        this.isLogin = false;
        this._user = null;
        // Redirect to homePage
    }

    autoLogout(time: number){
        let timer = window.setTimeout(()=>{
            this.logout();
            window.clearTimeout(timer);
        }, time)
    }

}