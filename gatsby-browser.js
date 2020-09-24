import "./src/css/style.css";
import "./src/css/fonts.css";
import "./src/css/custom.css";
import React from "react";
import PropTypes from "prop-types";
import ContextProvider from './src/provider/ContextProvider';

export const wrapRootElement = ({ element }) => (
    <ContextProvider>{element}</ContextProvider>
);

wrapRootElement.propTypes = {
    element: PropTypes.node.isRequired,
};


// You can delete this file if you're not using it
export const registerServiceWorker = () => true

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
        `Esta aplicação foi atualizada. ` +
        `Recarregar para exibir a versão mais recente?`
    )

    if (answer === true) {
        window.location.reload()
    }
}

export const onServiceWorkerUpdateFound = () => {
    const showNotification = () => {
        Notification.requestPermission(result => {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification('Naturegel Cosméticos', {
                        body: 'Novo conteúdo está disponível!',
                        icon: 'link-to-your-icon',
                        vibrate: [200, 100, 200, 100, 200, 100, 400],
                        tag: 'request',
                        actions: [ // you can customize these actions as you like
                            {
                                action: console.log('update push'), // you should define this
                                title: 'Atualizar'
                            },
                            {
                                action: console.log('ignore push'), // you should define this
                                title: 'Ignorar'
                            }
                        ]
                    })
                })
            }
        })
    }

    showNotification()
}