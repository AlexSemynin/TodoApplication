export default class CustomError extends Error{
    constructor(message: string, isShowForUser?: boolean){
        super(message);
        this.isShowForUser = isShowForUser ?? false;
        this.isOnlyDev = !this.isShowForUser;

        const event = new CustomEvent("AddCustomError", {
            detail: this
        });
        
        window.document.dispatchEvent(event);
        // console.error(message);
        //throw new Error(message);
    }

    public isOnlyDev: boolean;
    public isShowForUser: boolean;
}
