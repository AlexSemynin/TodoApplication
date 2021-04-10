import { action, computed, makeObservable, observable } from "mobx";
import { NetworkInterfaceInfoIPv4 } from "node:os";
import IMainStore from "./interfaces/IMainStore";


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

    private _mainStore: IMainStore;

    constructor(mainStore: IMainStore) {
        makeObservable(this);
        this._mainStore = mainStore;
    }

    @observable
    private _todos: Array<ITodo> | null = null;

    @action
    async LoadTodos() : Promise<void|never> {
        const token = this._mainStore.AutoStore.getUser?.access_token;
        const response = await fetch("/api/todos",{
            method: "GET",
            headers:{
                "Accept": "application/json",
                "Authorization": "Bearer " + token  // передача токена в заголовке
            }
        });
        if (!response.ok) {
            const message = JSON.parse(await response.text()).errorText;
            throw new Error(`Ответ сервера: ${message}`);
        }else{
            this._todos = await response.json();
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
       headers.append("Authorization", "Bearer " + token)
       const response = await fetch("api/todos", {
           method: "POST",
           headers,
           body: JSON.stringify({
               text: todo.text,
               isComplited: todo.isComplited ?? false
           })
       });
       if(!response.ok){
            const message = JSON.parse(await response.text()).errorText;
            throw new Error(`Ответ сервера: ${message}`);
       }
       const newTodo : ITodo = await response.json();
       this._todos?.push(newTodo);
       return true;
    }

    @action
    async UpdateTodo(todo: ITodo) {
        const token = this._mainStore.AutoStore.getUser?.access_token;
        const response = await fetch("api/todos", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(todo)
        });
        if(!response.ok){
            const message = JSON.parse(await response.text()).errorText;
            throw new Error(`Ответ сервера: ${message}`);
        }
        const res = <ITodo>await response.json();
        this._todos?.forEach(t => {
            if(t.id == todo.id){
                todo = res;    
            }
        });
       
       
    }

    @action
    async RemoveTodo(id?: string) {
        const token = this._mainStore.AutoStore.getUser?.access_token;
        const response = await fetch(`api/todos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
        if(!response.ok){
           const message = JSON.parse(await response.text()).errorText;
           throw new Error(`Ответ сервера: ${message}`);
       }
    //    const res = await response.json();
       this._todos = this._todos?.filter(todo => todo.id !== id)??null;
    //    console.log(res);
    }

}