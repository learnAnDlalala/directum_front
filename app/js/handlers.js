import {createNewRoom, createNewUser, getRoomList, enterRoom, getRoundInfo,test, startRound, endRound , restartRound} from './services'
import {utils} from './utils'
import { showRooms } from './render'
import connectionSignalR from './signalR'




export default async () => {
    const buttonCreateNewUser = document.querySelector('.enter_button');
    buttonCreateNewUser.addEventListener('click', async (e)=>{
        e.preventDefault();
        const name = document.querySelector('.new_user_name').value;
        const user =  await createNewUser(name);
        document.cookie = `userID = ${user.id}`;
        await connectionSignalR();
        location.hash =  '#main';
    });

    const buttonCreateNewRoom = document.querySelector('.create_room');
    buttonCreateNewRoom.addEventListener('click', async (e)=> {
        e.preventDefault();
        const name = document.querySelector('.room_name').value;
        const id = await createNewRoom(name, utils.UserID);
        location.hash = `#room?id=${id}`;
    });
    const testB = document.querySelector('.test');
    testB.addEventListener('click', async (e)=>{
        e.preventDefault();
       let a = await enterRoom();
       let b = a.rounds[a.rounds.length-1];
       let c = a.rounds.length;
       console.log (a);
       console.log (b);
    });
    const butonCreateNewRound = document.querySelector('.add_round');
    butonCreateNewRound.addEventListener('click',async(e)=>{
        e.preventDefault();
        const name = prompt('subject of round');
        await startRound(name);
    })
    const buttonResetRound = document.getElementById('Reset timer');
    buttonResetRound.addEventListener('click', async(e)=>{
        e.preventDefault();
        const title = document.querySelector('.main_title');
        const roundId = title.getAttribute('roundId');
        await restartRound(roundId);
    })
    const buttonEndRound = document.getElementById('Finish');
    buttonEndRound.addEventListener('click', async(e)=>{
        e.preventDefault();
        const title = document.querySelector('.main_title');
        const roundId = title.getAttribute('roundId');
        await endRound(roundId);
    })
}

