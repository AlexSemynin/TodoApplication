import React, { ReactNode } from "react";
// import MainLayout from "../HOC/MainLayout/MainLayout";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
// import CounterF from "../components/counter/counterF";
import MainLayout from '../HOC/mainLayout/mainLayout';
import Todo from '../components/Todo/TodoList/TodoList';
import { inject } from "mobx-react";
import AuthStore from "../../Store/AutoStore";
import MainPage from "../../Views/components/MainPage/MainPage";

@inject("AutoStore")
export default class App extends React.Component<{AutoStore?: AuthStore}> {

    private get authStore(): AuthStore{
        return this.props.AutoStore!;
    }

    public render(): ReactNode {
        return (
            <MainLayout>
                {
                    this.authStore.isLogin ? 
                    <Switch>
                        <Route exact={true} path="/" component={MainPage} />
                        <Route exact={true} path="/Todo" component={Todo}/>
                    </Switch> 
                    :
                    <Switch>
                        <Route exact={true} path="/" component={MainPage} />
                    </Switch>
                }
            </MainLayout>
        );
    }
}