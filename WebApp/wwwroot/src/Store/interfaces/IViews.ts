export interface IFormControl{
    value: string;
    readonly type: IFormType;
    readonly label: string;
    valid: boolean;
    readonly errorMessage: string | undefined;
    toched: boolean | undefined;
    validation: any | undefined;

}

export enum IFormType{
    email="email",
    password="password",
    name="name",
}

export type ModalType = "AUTHPOPUP" |  "REGISTERPOPUP" | null;