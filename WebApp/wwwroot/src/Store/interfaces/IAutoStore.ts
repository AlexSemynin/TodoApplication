export type User = {
    email: string;
    password: string;
    access_token: string;
    name?: string;
} | null;

export default interface IAutoStore{
    isLogin: boolean;
    getUser: User;
    login(email: string, password: string): Promise<void>;
    logout: Function;
    register: Function;
}