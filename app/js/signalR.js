import * as signalR from '@aspnet/signalr';
import { render } from 'pug';
import { showUsers, showCards} from './render';

export default async function connectionSignalR() {
    const hub = new signalR.HubConnectionBuilder().withUrl('http://localhost:62265/roomsHub').build();
      
    await hub.start().catch(function(err){
        return console.error(err.toString());
    });
    hub.on('EndRoundEvent', roundData => {
        alert('Раунд закончился');
        console.log(roundData);
    });
    hub.on('StartRoundEvent', roundData => {
        alert('Раунд начался');
        console.log (roundData);
        showCards(roundData.deckID)
    })
    return hub;
}

/* connectionSignalR.on ('UpdateUsersEvent', roomData =>{
const usersList = roomData.users;
showUsers(usersList);
});
connectionSignalR.on ('StartRoundEvent', roundData => {

});
connectionSignalR.on ('EndRoundEvent', roundData => {

}); */


