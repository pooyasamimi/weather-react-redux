import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/App"
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>

)

