import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { store } from './app/store';
import './index.css';
import { Provider } from 'react-redux';
//import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {RouterProvider, createHashRouter} from '@vkontakte/vk-mini-apps-router';

//bridge.send('VKWebAppInit');

const router = createHashRouter([
    {
        path: '/',
        panel: 'home',
        view: 'mainView',
    },
    {
        path: '/details/:id',
        panel: 'details',
        view: 'mainView',
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider>
                <AdaptivityProvider>
                    <AppRoot>
                        <RouterProvider router={router}>
                            <App />
                        </RouterProvider>
                    </AppRoot>
                </AdaptivityProvider>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);
