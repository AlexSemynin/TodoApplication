export type User = {
    userId: string;
    email: string;
    access_token: string;
    isAdmin: boolean;
    name: string;
    password?: string;
} | null;

export default interface IAutoStore{
    isLogin: boolean;
    getUser: User;
    login(email: string, password: string): Promise<void>;
    logout: Function;
    register: Function;
}