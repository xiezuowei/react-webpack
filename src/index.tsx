import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';

const root = document.getElementById('root');

function render() {
    if (root) {
        ReactDOM.render(<App/>, root);
    }
}

render();

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
