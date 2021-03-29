import React from "react";
// import MainLayout from "../HOC/MainLayout/MainLayout";
import { Switch, Route } from "react-router";
// import CounterF from "../components/counter/counterF";
import MainLayout from '../HOC/mainLayout/mainLayout';
import Todo from '../components/Todo/TodoList/TodoList';
export default class App extends React.Component {
    render() {
        return (React.createElement(MainLayout, null,
            React.createElement(Switch, null,
                React.createElement(Route, { exact: true, path: "/", component: Todo }),
                React.createElement(Route, { exact: true, path: "/counterFunc", component: Todo }))));
    }
}
//# sourceMappingURL=App.js.map