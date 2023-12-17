import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from '@/App';
import store from './modules/store';

const rootNode = document.getElementById('root');

function renderApp() {
    if (rootNode) {
        const root = createRoot(rootNode);
        root.render(
            <ReduxProvider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ReduxProvider>
        );
    }
}

renderApp();

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
