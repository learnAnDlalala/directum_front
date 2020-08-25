import connectionSignalR from './signalR'
import {createNewRoom, createNewUser, getRoomList, enterRoom, getRoundInfo,test} from './services'

import {showRooms,renderRoom} from './render.js'

export const show = {
    async RoomsList () {
        const a =  await getRoomList();
        showRooms(a);

        document.getElementById('content').classList.remove('active');
        document.getElementById('enter').classList.remove('active');
        document.getElementById('rooms').classList.add('active');
    },
  async Room () {
        const a = await enterRoom();
        await renderRoom(a);
        document.getElementById('enter').classList.remove('active');
        document.getElementById('rooms').classList.remove('active');
        document.getElementById('content').classList.add('active');
    },
    Enter () {
        document.getElementById('rooms').classList.remove('active');
        document.getElementById('content').classList.remove('active');
        document.getElementById('enter').classList.add('active');
    }
}