import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import thunk from 'redux-thunk';

import 'antd/dist/antd.css'

import App from './components/App/App';
import reducer from './reducers'
import * as serviceWorker from './serviceWorker';

import './index.css';


const store = createStore(reducer, {}, compose(
    applyMiddleware(thunk),
    (window.devToolsExtension && (process.env.NODE_ENV === 'development')) ? window.devToolsExtension() : f => f)
);

render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'development') {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
