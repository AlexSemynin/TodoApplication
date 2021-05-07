import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './Main.css';
import App from './Views/App/App';
import { createBrowserHistory } from 'history';
import MainStore from './Store/MainStore';
import BaseService from './Servises/BaseService';
import CustomError from './Servises/CustomError';

const appService = new BaseService();
const mainStore = new MainStore(appService);

document.addEventListener("AddCustomError", (event: Event)=>{
    const custEv = event as CustomEvent<CustomError>;
    const custErr = custEv.detail;
    mainStore.ErrorStore.SetError(custErr);
});

ReactDOM.render(
    <Provider MainStore={mainStore} {...mainStore}>
        <Router history={mainStore.LocationInfo}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
