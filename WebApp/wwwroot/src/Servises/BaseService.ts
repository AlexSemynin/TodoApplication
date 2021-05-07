import CustomError from './CustomError';

export default class BaseService{

    protected baseUrl = "/api";
    
    public async PostAutho<T>(path: string, requestObj: {headers?: Headers, body: BodyInit, token?: string }): Promise<T>{
        // const token = this._mainStore.AutoStore.getUser?.access_token;
        let headers = requestObj.headers ?? new Headers();
        if(!headers.get("Authorization")){
            headers.append("Authorization", `Bearer ${requestObj.token}`);
        }
        return await this.Post(path, {headers, body: requestObj.body});
    }

    public async GetAutho<T>(path:string, token:string){
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        return await this.Get<T>(path, headers);
    }
    
    public async Get<T>(path:string, headers?: Headers): Promise<T> {

        const responce = headers ?
            await fetch(this.baseUrl + path, {headers})
            : await fetch(this.baseUrl + path);
        try{
            if(!responce.ok){
                if(responce.status == 401){
                    throw new Error("Ошибка авторизации");
                }
                const errorMessage = await responce.text();
                throw new Error(`Ошибка в запросе\n${errorMessage}`);
            }
            const data = <T> await responce.json();
            return data;
        }catch(e){
            throw new CustomError(e.message, true);
        }
    }

    public async Post<T>( path: string, requestObj: {headers?: Headers, body: BodyInit }): Promise<T>{
        let headers = requestObj.headers ?? new Headers();
        if(!headers.get("Content-Type")){
            headers.append("Content-Type", "application/json");
        }
        try{
            const responce = await fetch(this.baseUrl + path, {
                method: "POST",
                headers,
                body: requestObj.body
            });
            if(!responce.ok){
                if(responce.status == 401){
                    throw new Error("Ошибка авторизации");
                }
                const errorMessage = await responce.text();
                throw new Error(`Ошибка в запросе\n${errorMessage}`);
            }
            const data = <T> await responce.json();
            return data;
        }catch(e){
            throw new CustomError(e.message, true);
        }

    }
}