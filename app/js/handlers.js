import {createNewRoom, createNewUser, getRoomList, enterRoom, getRoundInfo,test, startRound, endRound , restartRound, chooseCard} from './services'
import {utils} from './utils'
import { showRooms } from './render'
import connectionSignalR from './signalR'
import { client } from './wrapperForFetch'


export const Vote =async (value)=>{
    const id= sessionStorage.getItem('RoundID');
     await chooseCard(id,value);}

export default async() => {
    const buttonCreateNewUser = document.querySelector('.enter_button');
    buttonCreateNewUser.addEventListener('click', async (e)=>{
        e.preventDefault();
        localStorage.setItem('UserID', ``);
        const name = document.querySelector('.new_user_name').value;
        const user =  await createNewUser(name);
        //document.cookie = `userID = ${user.id}`;
       localStorage.UserID = user.id;
        connectionSignalR();
        location.hash =  '#main';
    });

    const buttonCreateNewRoom = document.querySelector('.create_room');
    buttonCreateNewRoom.addEventListener('click', async (e)=> {
        e.preventDefault();
        const name = document.querySelector('.room_name').value;
        const id = await createNewRoom(name, utils.UserID);
        location.hash = `#room?id=${id}`;
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
        const roundId = localStorage.getItem('RoundID')*1;
        await restartRound(roundId);
    })
    const buttonEndRound = document.getElementById('Finish');
    buttonEndRound.addEventListener('click', async(e)=>{
        e.preventDefault();
        const title = document.querySelector('.main_title');
        const roundId = localStorage.getItem('RoundID')*1;
        await endRound(roundId);
    })
    const buttonInvite = document.querySelector('.side_link_button');
    buttonInvite.addEventListener('click', async(e)=>{
        e.preventDefault();
        navigator.clipboard.writeText(location.href).then(()=>{alert('Ссылка доабвлен в буфер обмена');}).catch(err=>{alert('Все стало плохо!')})
    })
}
