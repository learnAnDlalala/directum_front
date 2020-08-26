import * as signalR from '@aspnet/signalr';
import { render } from 'pug';
import { showUsers, showCards, renderStats, addEvent, renderStart} from './render';

export default async function connectionSignalR() {
    const hub = new signalR.HubConnectionBuilder().withUrl('http://localhost:62265/roomsHub', {
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets
      })
        .build();
      
    await hub.start().catch(function(err){
        return console.error(err.toString());
    });
    hub.on('EndRoundEvent', roundData => {
        alert('Раунд закончился')
        console.log(roundData);
        renderStats(roundData);
    });
    hub.on('StartRoundEvent', roundData => {
        alert('Раунд начался');
        console.log (roundData);
        localStorage.setItem("RoundID", roundData.id);
        renderStart(roundData);
        
    })
    hub.on('UpdateUserLise', roomData=>{
        alert('пользователь ушел');
        showUsers(roomData.users);
    })
    return hub;
}




