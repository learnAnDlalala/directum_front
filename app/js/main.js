import {checkRoute} from './router';
import { client } from './wrapperForFetch';
import def from './handlers';
window.onload = async () => {
    def();
}
window.onpopstate = async () => {
    await checkRoute();
}
