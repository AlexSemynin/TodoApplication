import React, { ReactNode } from "react";
// import MainLayout from "../HOC/MainLayout/MainLayout";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
// import CounterF from "../components/counter/counterF";
import MainLayout from '../HOC/mainLayout/mainLayout';
import Todo from '../components/Todo/TodoList/TodoList';

export default class App extends React.Component {
    public render(): ReactNode {
        return (
            <MainLayout>
                <Switch>
                    <Route exact={true} path="/" component={Todo} />
                    <Route exact={true} path="/counterFunc" component={Todo}/>
                </Switch>
            </MainLayout>
        );
    }
}