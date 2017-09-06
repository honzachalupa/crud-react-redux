import 'babel-polyfill';
import 'svgxuse';
import init from './init';
import factory from './factory';
import { render } from './render';
import Root from './components/Root';
import configureStore from './store/configureStore';

const app = (config) => {
    const store = configureStore(config);

    render(Root, document.querySelector('#root'), {}, store);
};

app(window.config);
