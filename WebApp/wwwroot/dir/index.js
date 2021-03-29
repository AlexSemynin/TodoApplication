import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './Main.css';
import App from './Views/App/App';
import { createBrowserHistory } from 'history';
import MainStore from './Store/MainStore';
const history = createBrowserHistory();
const mainStore = new MainStore();
ReactDOM.render(React.createElement(Provider, Object.assign({ MainStore: mainStore }, mainStore),
    React.createElement(Router, { history: history },
        React.createElement(App, null))), document.getElementById('root'));
//# sourceMappingURL=index.js.map