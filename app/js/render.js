import { utils } from "./utils";
import connectionSignalR from "./signalR";
import {getCardsInDeck} from './services';

export const showRooms = async (roomArray)=>{
    const tmpl = document.getElementById('roomListTmpl').content;
    const roomsList = document.querySelector('.rooms_list_row');
    roomsList.innerHTML="";
    /* await cleanList(roomsList,'room'); */
    const clone = tmpl.cloneNode(true).querySelector('.room');
    await roomArray.forEach(el => {
        clone.innerText = el.name;
        roomsList.appendChild(clone.cloneNode(true));
    });
}
export const showCards = async (id)=>{
    const Deck = await getCardsInDeck(id);
    console.log (Deck)
    console.log(Deck.cards)
    const tmpl = document.getElementById('cardTmpl').content;
    const cardList = document.querySelector('.main_table_raw');
    cardList.innerHTML="";
    /* await cleanList (cardList,'card'); */
    const clone = tmpl.cloneNode(true).querySelector('.card');
    await Deck.cards.forEach(el=>{
        clone.innerText = el.value;
        clone.setAttribute('value',`${el.value}`);
        cardList.appendChild(clone.cloneNode(true));
    })
}
export const showUsers = async (userArray)=>{
    const tmpl = document.getElementById('userTmpl').content;
    const userList = document.querySelector('.users_row');
    userList.innerHTML="";
    /* await cleanList (userList,'user'); */
    const clone = tmpl.cloneNode(true).querySelector('.user');
    await userArray.forEach(el=>{
        clone.innerText=el.name;
        userList.appendChild(clone.cloneNode(true));
    })
}

export const showStory = async (storyArray)=>{
    const tmpl = document.getElementById('storyTmp').content;
    const storyList = document.querySelector('.storys');
    storyList.innerHTML="";
    /* await cleanList (storyList,'story'); */
    const clone = tmpl.cloneNode(true).querySelector('.story');
    await storyArray.forEach(el=>{
        clone.innerText=el.subject;
        cardList.appendChild(clone.cloneNode(true));
    })
}
/* const showContent = (tmpl,parentClass,childClass,array)=>{
    const tmpl = document.getElementById('tmpl').content;
    const list = document.querySelector(`.${parentClass}`);
    await cleanList(list,childClass);
    const clone = tmpl.cloneNode(true).querySelector(`.${childClass}`);
    await 
} */
 /*   const list = parent.querySelectorAll(`.${className}`);
    if (list){
        list.forEach(el=>{
   const cleanList = async (parent, className) =>{
          el.remove();
        })
    }
} */
export const renderRoom= async(roomData)=> {
    console.log (roomData);
    await renderOwnerButtons(roomData);
    await showUsers(roomData.users);
    
    if (roomData.rounds.length !== 0) {
        await showStory(roomData.rounds);
        console.log('fff')
        const lastRound = roomData.rounds[roomData.rounds.length-1];
        if (lastRound.end ===  "0001-01-01T00:00:00" ) {
            console.log ('start voted')
            const title=  document.querySelector('.main_title');
            title.setAttribute(roundId = lastRound.Id);
            await showCards(lastRound.cards);
        }


    }     
    
}
const renderOwnerButtons = async (roomData)=> {
    if (roomData.ownerID === utils.UserID) {
        const masterButtons = document.querySelectorAll('.master_only');
        masterButtons.forEach(element => {
        element.classList.add('active');
        });
    }
   
}
const renderStats = async (roundStats)=>{
    const statsList = document.getElementById('statsListTmpl').content;
    const table = document.querySelector('.main_table_raw');
    table.innerHTML="";
    const clone = statsList.cloneNode(true).querySelector('.user_vote');
    await roomArray.forEach(el => {
        clone.innerText = `${roundStats.cards.username = roundStats.cards.cardvalue}`
        roomsList.appendChild(clone.cloneNode(true));
    });
}
const renderTime = async (time)=>{
    const timer = document.querySelector('.time'); 
    timer.innerText = parseTime(time);
    
}

const parseTime = (time)=>{
    
    const hours = Math.floor(time /3600);
    const minutes = Math.floor(time/60) - hours* 60;
    const sec = time - (hours + minutes);
    return `${hours} : ${minutes} : ${sec}`
    
}
const renderTimer = async (data)=>{
    const timerValue = data.timer*1;
    if (timerValue >0) {
        let timer = setInterval(renderTime(timerValue),1000);
        setTimeout(()=> clearInterval(timer), timerValue);
    }
}
