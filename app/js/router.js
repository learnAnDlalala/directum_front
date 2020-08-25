import {show} from './show.js';

export const checkRoute = function  () {
    console.log(window.location.hash);
    const currentUrlHash = window.location.hash.substring(1,5);
    console.log (currentUrlHash);
    switch(currentUrlHash) {
        case 'room':show.Room();break;
        case 'ente': show.Enter();break;
        case 'main':show.RoomsList();break;
        default: ;
    }
}