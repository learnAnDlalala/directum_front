import {checkRoute} from './router';
import { client } from './wrapperForFetch';
import def from './handlers';
window.onload = async () => {
    await def();
    await checkRoute();
}
window.onpopstate = async () => {
    await checkRoute();
}
