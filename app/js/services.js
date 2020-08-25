import { client } from './wrapperForFetch';
import {utils} from './utils.js'

function getUrlId (){
    const a = location.hash.split('id=')[1];
    console.log(a);
    return a*1;
}

export const createNewRoom = async (roomName, userID)=>{
    const data = {name: roomName, OwnerID : userID};
    const id = await client('room/', {body:data});
    return id;
    }
export const createNewUser = async (userName)=>{
    const data = {name: userName};
    const user = await client('user/auf',{body:data});
    return user;
}
export const startRound = async (theme )=> {
    const data = { roomID : getUrlId(), deckID : 1 , subject : theme , timer : 30};
    await client('round',{body : data});
}
export const enterRoom = async ()=>{
    const id = getUrlId();
    const data ={id : utils.UserID}
    console.log ('id===',utils.UserID);
    const result = await client(`room/${id}`,{body:data});
    return result;
}
export const getRoomList = async ()=>{
   let roomList = await client(`room/`);
    return roomList;
}
export const getUserList = async ()=> {
    let idRoom = getUrlId();
    let userList = await client(`room/${idRoom}`);
    return userList;
}
export const getDeck = async ()=>{
    
}
export const getRoundInfo = async ()=>{
    let idRoom = getUrlId();
    let roundInfo = await client (`round/2`);
    return roundInfo;
}
export const endRound = async (idRound)=> {
    const data = { id : idRound};
    client('round/end', {body:data});
}
export const restartRound = async (idRound)=>{
    const data = {id: idRound};
    client ('round/restart', {body:data})
}

export const chooseCard = async (idCard)=>{

}
export const test = async (userName)=>{
    return client('room');
    /* await fetch('http://localhost:62265/api/room',{
        method: 'GET',
        body: data,
        credentials: 'include'
      });
 */
}
export const getCardsInDeck = async (id)=>{
    return await client(`deck/${id}`)
}