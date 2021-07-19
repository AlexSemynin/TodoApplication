import { action, computed, makeObservable, observable } from "mobx";
import { NetworkInterfaceInfoIPv4 } from "node:os";
import CustomError from "../Servises/CustomError";
import IMainStore from "./interfaces/IMainStore";
import MainStore from "./MainStore";


export interface ITodo {
    id?: string;
    isComplited: boolean;
    text: string;
}

// export type changeTodoType = "remove" | "add" | "checkbox" | "text" | "position";
export enum changeTodoType{
    remove,
    add,
    checkbox,
    text,
    position
}

export default class TodoStore{

    private _mainStore: MainStore;

    constructor(mainStore: MainStore) {
        makeObservable(this);
        this._mainStore = mainStore;
        this._todos = null;
    }

    @observable
    private _todos: Array<ITodo> | null;

    @action
    async LoadTodos() : Promise<Array<ITodo>|never> {
        const token = this._mainStore.AutoStore.getUser?.access_token;
        if(token){
            const todos = <Array<ITodo>> await this._mainStore.BaseSerice.GetAutho("/todos", token);
            this._todos = todos.length ? todos.reverse() : [];
            return this._todos;
        }else{
            throw new CustomError("user not founded in localStorage :(", true);
        }
    }

    @computed
    get Todos(): Array<ITodo> | null {
        return this._mainStore.AutoStore.isLogin ? this._todos : null;
    }

    @action
    ClearStore(){
        this._todos = null;
    }

    @action
    async AddTodo(todo: ITodo): Promise<boolean | never> {
        const token = this._mainStore.AutoStore.getUser?.access_token;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + token);
        const body = JSON.stringify({
            text: todo.text,
            isComplited: todo.isComplited ?? false
        });

        await this._mainStore.BaseSerice.PostAutho<ITodo>("/todos", {headers, body});
        await this.LoadTodos();
        return true;
    }

    @action
    async UpdateTodo(todo: ITodo) {
        try{
            const token = this._mainStore.AutoStore.getUser?.access_token;
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + token);
            const response = await fetch(`/api/todos/change`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    id: todo.id,
                    text: todo.text,
                    isComplited: todo.isComplited
                }), //todo - observable object !== Model.Todo
            });
            if(!response.ok){
                const message = JSON.parse(await response.text()).errorText;
                throw new Error(`Ответ сервера: ${message}`);
            }
            const res = <ITodo>await response.json();
            this._todos = this._todos?.map(t => {
                if(t.id == todo.id){
                    return res;    
                }
                return t;
            })??null;
        }catch(e){
            throw new CustomError(`Ошибка при изменении: ${e.message}`, true);
        }
       
       
    }

    @action
    async RemoveTodo(id?: string) {
        try{
            const token = this._mainStore.AutoStore.getUser?.access_token;
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + token);
            const response = await fetch(`/api/todos/del`, {
                method: "POST",
                headers,
                body: JSON.stringify(id),
            });
            if(!response.ok){
                const message = JSON.parse(await response.text()).errorText;
                throw new Error(`Ответ сервера: ${message}`);
            }
            this._todos = this._todos?.filter(todo => todo.id !== id)??null;
        }catch(e){
            throw new CustomError(`ошибка при удалении: ${e.message}`, true);
        }
    }

}